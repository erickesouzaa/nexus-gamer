// utils/authActions.ts (CÓDIGO COMPLETO E FINALMENTE ESTÁVEL)

'use server';

import { redirect } from 'next/navigation';
import { createServerSupabaseClientActions } from './supabase-server-actions'; 
import { execa } from 'execa'; 


function createSupabaseAuthClient() {
    return createServerSupabaseClientActions();
}

export interface CartItem {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

type AuthResponse = {
  error: string | null;
  pedidoId?: number; 
  message?: string; 
};

// --- FUNÇÃO CRÍTICA PARA O CHECKOUT (createOrder) ---

/**
 * Função para registrar o pedido no Supabase e notificar o administrador (NTFY)
 */
export async function createOrder(
    formData: FormData, 
    cartItems: CartItem[], 
    totalValue: number
): Promise<AuthResponse> {
    'use server';

    const supabase = createSupabaseAuthClient(); 
    const supabaseDB = createSupabaseAuthClient(); 

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Usuário não autenticado. Faça login para finalizar.' };
    }

    const whatsapp = formData.get('whatsapp') as string;
    
    // 1. REGISTRAR O PEDIDO NO SUPABASE
    const { data: pedido, error: dbError } = await supabaseDB
        .from('pedidos') 
        .insert({
            cliente_id: user.id,
            status: 'pendente_pagamento',
            valor_total: totalValue,
            itens_comprados: cartItems, 
            contato_whatsapp: whatsapp,
            codigos_entregues: []
        })
        .select()
        .single();

    if (dbError || !pedido) {
        console.error("Erro no DB ao criar pedido:", dbError);
        return { error: 'Falha ao processar o pedido no sistema. Tente novamente.' };
    }

    // 2. NOTIFICAÇÃO MANUAL NTFY
    const totalFormatado = `R$ ${totalValue.toFixed(2).replace('.', ',')}`;
    const nomeCliente = user.user_metadata.nome || 'Cliente Não Nomeado';
    const ntfyTitle = `🛒 NOVO PEDIDO NEXUS #${pedido.id}`;
    const ntfyMessage = `Cliente: ${nomeCliente} | Total: ${totalFormatado} | Contato: ${whatsapp}`;

    try {
        await execa('curl', [
            '-H', `Title: ${ntfyTitle}`, 
            '-H', 'Priority: high',
            '-H', 'Tags: money,cart', 
            '-d', ntfyMessage,
            `https://ntfy.sh/notificacao_de_compra_no_nexus_game`
        ]);
    } catch (ntfyError) {
        console.error("Falha ao enviar NTFY (continuando...):", ntfyError);
    }

    return { error: null, pedidoId: pedido.id };
}

// --- FUNÇÕES DE AUTENTICAÇÃO (MANTIDAS) ---

export async function signup(formData: FormData): Promise<AuthResponse> {
  const supabase = createSupabaseAuthClient();
  
  const nome = formData.get('nome') as string; 
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password || !nome) { 
    return { error: 'Nome, E-mail e senha são obrigatórios.' };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        data: { nome: nome }
    }
  });

  if (error) {
    if (error.message.includes('already registered')) {
        return { error: 'Este e-mail já está em uso. Tente fazer login.' };
    }
    return { error: `Falha no cadastro: ${error.message}` };
  }
  return { error: null };
}

export async function login(formData: FormData): Promise<AuthResponse> {
    const supabase = createSupabaseAuthClient();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'E-mail e senha são obrigatórios.' };
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: 'E-mail ou senha incorretos. Tente novamente.' };
    }
    redirect('/minha-conta');
}

export async function logout() {
    const supabase = createSupabaseAuthClient();
    await supabase.auth.signOut();
    redirect('/');
}

// --- FUNÇÃO DE ADMIN (releaseCode) ---

/**
 * Função de Admin para liberar a próxima chave de produto
 */
export async function releaseCode(pedidoId: number, produtoId: string): Promise<AuthResponse> {
    'use server';

    const supabase = createSupabaseAuthClient(); 
    const supabaseDB = createSupabaseAuthClient(); 

    const { data: { user } } = await supabase.auth.getUser();

    // 1. CHECAGEM DE ADMIN (Segurança)
    if (!user || user.app_metadata.role !== 'admin') {
        return { error: 'Acesso negado. Apenas administradores podem liberar códigos.' };
    }

    // 2. BUSCAR CHAVE DISPONÍVEL (Tabela chaves_de_produto)
    const { data: chave, error: chaveError } = await supabaseDB
        .from('chaves_de_produto')
        .select('chave_mestra, senha_mestra')
        .eq('produto_id', produtoId) 
        .eq('disponivel', true)
        .maybeSingle(); 
    
    if (chaveError || !chave) {
        return { error: 'Chave principal esgotada ou não encontrada. Recarregue o estoque.' };
    }

    // 3. O CÓDIGO A SER ENVIADO É A PRÓPRIA CHAVE MESTRA E SENHA
    const codigoCompleto = `Login: ${chave.chave_mestra} | Senha: ${chave.senha_mestra}`;

    // 4. ATUALIZAR O ESTOQUE E O PEDIDO (Transação simulada)
    
    // a) ATUALIZA A TABELA DE CHAVES (Marca a chave como indisponível/usada)
    const { error: stockUpdateError } = await supabaseDB
        .from('chaves_de_produto')
        .update({ 
            disponivel: false 
        })
        .eq('chave_mestra', chave.chave_mestra); 

    if (stockUpdateError) {
        return { error: 'Falha ao marcar chave como usada no estoque.' };
    }

    // b) Atualiza a tabela de pedidos (MARCA COMO ENTREGUE e salva o código)
    const { error: orderUpdateError } = await supabaseDB
        .from('pedidos')
        .update({ 
            status: 'entregue',
            codigos_entregues: [codigoCompleto]
        })
        .eq('id', pedidoId);

    if (orderUpdateError) {
        return { error: 'Falha ao atualizar status do pedido.' };
    }

    // 5. ENVIAR NOTIFICAÇÃO PARA O ADMIN (NTFY)
    const ntfyTitle = `✅ CHAVE LIBERADA #${pedidoId}`;
    try {
        await execa('curl', [
            '-H', `Title: ${ntfyTitle}`, 
            '-H', 'Priority: high',
            '-H', 'Tags: check', 
            '-d', `Pedido #${pedidoId} liberado! Dados: ${codigoCompleto}`,
            `https://ntfy.sh/notificacao_de_compra_no_nexus_game`
        ]);
    } catch (ntfyError) {
        console.error("Falha ao enviar NTFY (continuando...):", ntfyError);
    }


    return { 
        error: null, 
        message: `Código liberado com sucesso: ${codigoCompleto}.`,
    };
}