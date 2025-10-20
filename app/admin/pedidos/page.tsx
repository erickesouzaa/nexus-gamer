// app/admin/pedidos/page.tsx
// Este é um Server Component para buscar todos os pedidos.

import { createServerSupabaseClientActions } from '@/utils/supabase-server-actions'; 
import { redirect } from 'next/navigation';
import AdminOrderCard from './AdminOrderCard'; // Vamos criar este componente

// Tipos necessários
interface Order {
  id: number;
  created_at: string;
  status: string;
  valor_total: number;
  contato_whatsapp: string;
  itens_comprados: Array<{ id: number; nome: string; quantidade: number }>;
  cliente_id: string;
}

export default async function AdminPedidosPage() {
  const supabaseServer = createServerSupabaseClientActions();

  // 🚨 SEGURANÇA BÁSICA: Redirecionar se não for Admin 🚨
  // Por enquanto, vamos permitir acesso a qualquer usuário logado. 
  // Depois, você implementará a verificação real de Admin/Roles.
  const { data: { user } } = await supabaseServer.auth.getUser();
  if (!user) {
     redirect('/auth/login');
  }

  // 1. BUSCAR TODOS OS PEDIDOS PENDENTES
  const { data: orders, error } = await supabaseServer
    .from('pedidos')
    .select('*')
    .order('created_at', { ascending: true }); // Pedidos mais antigos primeiro

  if (error) {
    console.error('Erro ao carregar pedidos:', error);
    return <div className="text-red-500 p-8">Erro ao carregar painel de pedidos.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-nexus-primary">Painel NEXUS Admin</h1>
        <p className="text-lg text-gray-400 mb-8">Gestão de Pedidos e Liberação de Códigos Digitais.</p>

        <h2 className="text-2xl font-bold mb-6 text-nexus-blue">Pedidos Pendentes ({orders?.length || 0})</h2>

        <div className="space-y-6">
          {orders?.length === 0 ? (
            <p className="p-8 bg-gray-800 rounded-lg text-center text-gray-500">Nenhum pedido pendente de aprovação. Bom trabalho!</p>
          ) : (
            orders?.map((order) => (
              <AdminOrderCard key={order.id} order={order as Order} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}