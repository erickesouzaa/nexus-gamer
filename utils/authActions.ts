// utils/authActions.ts (AÇÕES DE AUTH E CHECKOUT FINAL)

'use server';

import { redirect } from 'next/navigation';
import { createServerSupabaseClientActions } from './supabase-server-actions'; 
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { execa } from 'execa'; // <<< NOVO IMPORT

// Interface para os itens do carrinho (mesmo que simulemos)
export interface CartItem {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

// Tópico NTFY
const NTFY_TOPIC = "notificacao_de_compra_no_nexus_game";


// Função auxiliar para criar o cliente de Auth (usado em todas as funções)
function createSupabaseAuthClient() {
    return createServerSupabaseClientActions();
}

type AuthResponse = {
  error: string | null;
  pedidoId?: number; 
};

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

// --- FUNÇÃO DE CHECKOUT (COM NTFY/cURL) ---

/**
 * Função para registrar o pedido no Supabase e notificar o administrador (NTFY)
 */
export async function createOrder(
    formData: FormData, 
    cartItems: CartItem[], 
    totalValue: number
): Promise<AuthResponse> {
    
    const supabase = createSupabaseAuthClient(); 
    const supabaseDB = createServerSupabaseClientActions(); 

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

    // 2. NOTIFICAÇÃO MANUAL NTFY (USANDO cURL/execa PARA CONTORNAR ERRO DE REDE)
    
    const totalFormatado = `R$ ${totalValue.toFixed(2).replace('.', ',')}`;
    const nomeCliente = user.user_metadata.nome || 'Cliente Não Nomeado';

    const ntfyTitle = `💰 NOVO PEDIDO NEXUS #${pedido.id} - ${totalFormatado}`;
    const ntfyMessage = `Cliente: ${nomeCliente} | WhatsApp: ${whatsapp} \nItens: ${cartItems.map(i => i.nome).join(', ')}`;

    try {
        await execa('curl', [
            '-H', `Title: ${ntfyTitle}`, 
            '-H', 'Priority: high',
            '-H', 'Tags: money,cart', 
            '-d', ntfyMessage,
            `https://ntfy.sh/${NTFY_TOPIC}`
        ]);
        console.log("Notificação NTFY enviada com sucesso (via cURL).");
    } catch (ntfyError) {
        console.error("Falha ao enviar notificação NTFY (continuando...):", ntfyError);
        // Opcional: Aqui você pode colocar a notificação do Discord como fallback!
    }

    return { error: null, pedidoId: pedido.id };
}
// utils/authActions.ts (ADICIONAR FUNÇÃO DE ADMIN)

/**
 * Função de Admin para liberar a próxima chave de produto
 */
export async function releaseCode(pedidoId: number, produtoId: number): Promise<AuthResponse> {
    'use server';

    const supabase = createSupabaseAuthClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 1. CHECAGEM DE ADMIN (Segurança)
    if (!user || user.app_metadata.role !== 'admin') {
        return { error: 'Acesso negado. Apenas administradores podem liberar códigos.' };
    }

    // 2. BUSCAR CHAVE DISPONÍVEL (Tabela chaves_de_produto)
    const { data: chave, error: chaveError } = await supabase
        .from('chaves_de_produto')
        .select('chave_mestra, chaves_secundarias')
        .eq('produto_id', produtoId)
        .eq('disponivel', true)
        .maybeSingle(); // Pega a primeira chave mestra disponível

    if (chaveError || !chave || chave.chaves_secundarias.length === 0) {
        return { error: 'Chave principal esgotada ou não encontrada. Recarregue o estoque.' };
    }

    // 3. EXTRAIR A PRÓXIMA CHAVE SECUNDÁRIA
    const [proximaChave, ...chavesRestantes] = chave.chaves_secundarias;

    if (!proximaChave) {
        return { error: 'Não há chaves secundárias disponíveis neste estoque.' };
    }

    // 4. ATUALIZAR O ESTOQUE E O PEDIDO (Transação simulada)
    
    // a) Atualiza a tabela de chaves (REMOVE A CHAVE USADA)
    const { error: stockUpdateError } = await supabase
        .from('chaves_de_produto')
        .update({ 
            chaves_secundarias: chavesRestantes, // Salva o array sem a chave usada
            disponivel: chavesRestantes.length > 0 // Marca como indisponível se o array estiver vazio
        })
        .eq('produto_id', produtoId);

    if (stockUpdateError) {
        return { error: 'Falha ao atualizar o estoque.' };
    }

    // b) Atualiza a tabela de pedidos (MARCA COMO ENTREGUE e salva a chave)
    const { error: orderUpdateError } = await supabase
        .from('pedidos')
        .update({ 
            status: 'entregue',
            codigos_entregues: [proximaChave] // Salva o código que o cliente recebeu
        })
        .eq('id', pedidoId);

    if (orderUpdateError) {
        return { error: 'Falha ao atualizar status do pedido.' };
    }

    // 5. ENVIAR NOTIFICAÇÃO REAL (NTFY) PARA O ADMIN
    const ntfyTitle = `✅ CHAVE LIBERADA #${pedidoId}`;
    await fetch(`https://ntfy.sh/notificacao_de_compra_no_nexus_game`, { 
        method: 'POST',
        body: `Pedido #${pedidoId} liberado. Chave: ${proximaChave}. Estoque restante: ${chavesRestantes.length}`,
        headers: { 'Title': ntfyTitle, 'Priority': 'low', 'Tags': 'check' }
    });


    return { 
        error: null, 
        message: `Chave liberada com sucesso: ${proximaChave}. O estoque foi atualizado.`,
        // O cliente verá essa chave no Minha Conta
    };
}