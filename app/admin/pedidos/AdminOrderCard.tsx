// app/admin/pedidos/AdminOrderCard.tsx
'use client'; 
import { useState } from 'react';
// Nota: A função de envio (releaseCode) será criada no authActions.ts

// Tipos (simples, ajuste conforme o order do page.tsx)
interface Order {
  id: number;
  created_at: string;
  status: string;
  valor_total: number;
  contato_whatsapp: string;
  itens_comprados: Array<any>;
  cliente_id: string;
}

export default function AdminOrderCard({ order }: { order: Order }) {
  const [status, setStatus] = useState(order.status);
  const [chaveMestra, setChaveMestra] = useState('');
  const [senhaMestra, setSenhaMestra] = useState('');
  const [chaveLiberada, setChaveLiberada] = useState('');
  const [mensagem, setMensagem] = useState('');

  // 🚨 FUNÇÃO DE ENVIO DE CÓDIGO (Será conectada ao Server Action)
  const handleRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('Processando liberação...');

    // 1. Lógica do Backend (Server Action) virá aqui:
    //    a) Buscar a próxima chave disponível (Chave Secundária).
    //    b) Marcar no chaves_de_produto que essa chave secundária foi usada.
    //    c) Atualizar o status do pedido para 'APROVADO'.
    //    d) Enviar NOTIFICAÇÃO de CÓDIGO REAL para o cliente.

    // Simulação do resultado:
    const resultadoSimulado = {
      success: true, 
      // O backend retornaria a chave mestra e a chave secundária liberada
      // chaveLiberada: 'ContaSecundaria@cliente03', 
      // chaveMestra: 'rdr2@master.com'
    };

    if (resultadoSimulado.success) {
       setMensagem('✅ Pedido APROVADO! Chave Liberada e Cliente Notificado.');
       setStatus('APPROVED');
    } else {
       setMensagem('❌ Erro: Chave não encontrada ou erro no DB.');
    }
  };

  // Exibição detalhada para o Admin
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-nexus-blue/50">
      <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
        <h3 className="text-2xl font-bold text-nexus-secondary">Pedido #{order.id}</h3>
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
            status === 'APPROVED' ? 'bg-green-600' : status === 'PENDING' ? 'bg-yellow-600' : 'bg-red-600'
        }`}>
          {status}
        </span>
      </div>

      <p className="text-lg mb-2">
        Cliente: <span className="font-semibold text-white">{order.itens_comprados[0]?.nome || order.cliente_id}</span>
      </p>
      <p className="text-lg mb-4">
        WhatsApp: <a href={`https://wa.me/${order.contato_whatsapp}`} target="_blank" className="text-nexus-blue hover:underline">{order.contato_whatsapp}</a>
      </p>

      <p className="text-lg font-bold text-nexus-primary">Total: R$ {order.valor_total.toFixed(2).replace('.', ',')}</p>

      <p className="text-sm text-gray-500 mt-4">Itens: {order.itens_comprados.map(i => `${i.nome} (x${i.quantidade})`).join(', ')}</p>

      {/* ÁREA DE APROVAÇÃO E ENVIO */}
      {status === 'PENDING' && (
        <form onSubmit={handleRelease} className="mt-6 p-4 border border-yellow-600/50 rounded-lg space-y-4">
          <p className='text-sm text-yellow-300'>{mensagem || 'Aguardando pagamento e liberação da chave.'}</p>

          <button
            type="submit"
            className="w-full py-2 bg-nexus-secondary text-black font-bold rounded-md hover:bg-opacity-90"
          >
            APROVAR PEDIDO & LIBERAR CÓDIGO
          </button>
        </form>
      )}

      {status === 'APPROVED' && (
        <div className='mt-6 p-4 bg-green-900/50 border border-green-700 rounded-lg'>
            <p className='font-semibold text-green-300'>CHAVE LIBERADA COM SUCESSO.</p>
            <p className='text-xs text-gray-400 mt-1'>O cliente foi notificado com as chaves mestras e secundárias via WhatsApp.</p>
        </div>
      )}
    </div>
  );
}