// app/admin/pedidos/page.tsx (CÓDIGO COMPLETO COM CLIENTE DE LEITURA)

// IMPORTANTE: O CLIENTE DE LEITURA
import { createServerSupabaseClientData } from '@/utils/supabase-server-data'; 
import { redirect } from 'next/navigation';
import AdminOrderCard from './AdminOrderCard'; 

// Tipos necessários
interface Order {
  id: number;
  created_at: string;
  status: string;
  valor_total: number;
  contato_whatsapp: string;
  itens_comprados: Array<any>;
  cliente_id: string;
}

export default async function AdminPedidosPage() {
  // CRUCIAL: USAMOS O CLIENTE DE DADOS/LEITURA (Data)
  const supabaseServer = createServerSupabaseClientData();
  
  // 🚨 1. CHECAGEM DE ADMIN (Segurança)
  const { data: { user } } = await supabaseServer.auth.getUser();
  // Esta checagem de role é segura porque o cliente 'Data' só LÊ cookies
  if (!user || user.app_metadata.role !== 'admin') {
     redirect('/auth/login');
  }

  // 2. BUSCAR TODOS OS PEDIDOS PENDENTES
  const { data: orders, error } = await supabaseServer
    .from('pedidos')
    .select('id, created_at, status, valor_total, contato_whatsapp, itens_comprados, cliente_id')
    .order('created_at', { ascending: true }); 

  if (error) {
    console.error('Erro ao carregar pedidos:', error);
    return <div className="text-red-500 p-8">Erro ao carregar painel de pedidos.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-nexus-primary">Painel NEXUS Admin</h1>
        <p className="text-lg text-gray-400 mb-8">Gestão de Pedidos e Liberação de Códigos Digitais.</p>

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