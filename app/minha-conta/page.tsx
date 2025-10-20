// app/minha-conta/page.tsx (CÓDIGO 100% CORRIGIDO)

import { createServerSupabaseClientData } from '@/utils/supabase-server-data'; 
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
// import { format } from 'date-fns'; // Removido para evitar erro de dependência. Usaremos o new Date().toLocaleDateString()

// --- TIPOS ---
// Definição de Tipos para Tipagem Segura (Ajuste conforme sua tabela pedidos)
interface OrderItem {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

interface Order {
  id: number;
  created_at: string;
  status: string; // Ex: 'pendente_pagamento', 'pago', 'entregue'
  valor_total: number;
  itens_comprados: OrderItem[];
  cliente_id: string;
}
// -------------


export default async function MinhaContaPage() {
  
  // 1. Cria o cliente Supabase Server
  const supabaseServer = createServerSupabaseClientData(); 

  // 2. Obtém a sessão e o usuário diretamente (Corrige o erro de desestruturação)
  const { data: { user } } = await supabaseServer.auth.getUser(); 

  if (!user) { // Redireciona se não houver usuário
    redirect('/auth/login');
  }
  
  // --- BUSCA DE DADOS (AGORA FUNCIONA) ---
  const { data: orders, error: ordersError } = await supabaseServer
    .from('pedidos')
    .select('id, created_at, status, valor_total, itens_comprados, cliente_id')
    .eq('cliente_id', user.id) // Filtra apenas pelos pedidos do usuário logado
    .order('created_at', { ascending: false });

  if (ordersError) {
    console.error('Erro ao carregar pedidos:', ordersError);
    return <div className='text-red-500 p-8'>Erro ao carregar seus pedidos. Tente novamente.</div>;
  }
  // --- FIM DA BUSCA ---


  // Lógica para extrair o Nome/Nickname
  const userName = user.user_metadata.nome || user.email;

  // Função simples para formatar data sem a biblioteca date-fns
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-extrabold text-nexus-blue">Olá, {userName}!</h1>
            <LogoutButton />
        </div>

        <p className="text-gray-400 mb-10">
          Aqui está o histórico e o status de liberação dos seus códigos NEXUS Gamer.
        </p>

        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2 text-nexus-primary">
            Histórico de Pedidos
        </h2>

        {/* CONDICIONAL PARA EXIBIR PEDIDOS OU MENSAGEM */}
        {orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order: Order) => (
              <div key={order.id} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xl font-bold text-nexus-secondary">Pedido #{order.id}</p>
                    <p className="text-sm text-gray-400">
                      Data: {formatDate(order.created_at)}
                    </p>
                  </div>
                  <div className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      order.status.includes('pendente') ? 'bg-yellow-600 text-black' : 
                      order.status.includes('pago') ? 'bg-blue-600 text-white' : 
                      'bg-green-600 text-white'
                  }`}>
                    {order.status.toUpperCase().replace('_', ' ')}
                  </div>
                </div>

                <p className="text-lg font-medium mb-4">
                  Total: R$ {order.valor_total.toFixed(2).replace('.', ',')}
                </p>

                <h3 className="text-md font-semibold mb-2 border-t border-gray-700 pt-3 text-gray-300">Itens Comprados:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-400 text-sm">
                  {order.itens_comprados.map((item) => (
                    <li key={item.id}>{item.nome} (Qtd: {item.quantidade})</li>
                  ))}
                </ul>

                {/* Área do Código de Resgate (Placeholder) */}
                {order.status === 'entregue' && (
                    <div className="mt-4 p-3 bg-green-900/50 border border-green-700 rounded-md">
                        <p className="font-semibold text-green-300">CÓDIGO DE RESGATE:</p>
                        <p className="text-lg font-mono text-green-100">XXX-ABC-1234 (Placeholder)</p>
                    </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <p className="text-gray-400">Você ainda não possui pedidos registrados.</p>
            <Link href="/produtos" className="mt-4 inline-block text-nexus-blue hover:underline">
              Ir para o Catálogo
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}