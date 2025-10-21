// app/admin/pedidos/AdminOrderCard.tsx (CÓDIGO COMPLETO COM CAMINHO CORRIGIDO)
'use client'; 
import React, { useState } from 'react';
import { releaseCode } from '@/utils/authActions'; 
import Link from 'next/link';

// Tipos (simples, ajuste conforme o order do page.tsx)
interface Order {
  id: number;
  created_at: string;
  status: string;
  valor_total: number;
  contato_whatsapp: string;
  itens_comprados: Array<{ id: number; nome: string; quantidade: number }>;
  cliente_id: string;
}

export default function AdminOrderCard({ order }: { order: Order }) {
  const [status, setStatus] = useState(order.status);
  const [mensagem, setMensagem] = useState('');

  // Função para formatar preço (R$ 49,00)
  const formatPrice = (price: number) => 
    `R$ ${price.toFixed(2).replace('.', ',')}`;
  
  // Função que será executada ao clicar no botão de Aprovar
  const handleRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('Processando liberação e verificando estoque...');

    // Assumimos que o primeiro item do pedido é o produto que queremos liberar a chave
    const produtoId = order.itens_comprados[0]?.id.toString(); 

    if (!produtoId) {
        setMensagem('❌ Erro: Produto não identificado no pedido.');
        return;
    }

    // CHAMA O SERVER ACTION REAL
    const response = await releaseCode(order.id, produtoId); 

    if (response.error) {
        setMensagem(`❌ Erro: ${response.error}`);
    } else {
        setMensagem(`✅ ${response.message || 'Chave liberada e status atualizado.'}`);
        setStatus('entregue'); // Atualiza o status localmente para 'entregue'
    }
  };

  // Exibição detalhada para o Admin
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-nexus-blue/50">
      <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
        <h3 className="text-2xl font-bold text-nexus-secondary">Pedido #{order.id}</h3>
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
            status === 'entregue' ? 'bg-green-600' : status.includes('pendente') ? 'bg-yellow-600 text-black' : 'bg-red-600'
        }`}>
          {status.toUpperCase().replace('_', ' ')}
        </span>
      </div>

      <p className="text-lg mb-2">
        Cliente ID: <span className="font-semibold text-white">{order.cliente_id.substring(0, 8)}...</span>
      </p>
      <p className="text-lg mb-4">
        WhatsApp: <a href={`https://wa.me/55${order.contato_whatsapp.replace(/\D/g, '')}`} target="_blank" className="text-nexus-blue hover:underline">{order.contato_whatsapp}</a>
      </p>

      <p className="text-lg font-bold text-nexus-primary">Total: {formatPrice(order.valor_total)}</p>
      
      <p className="text-sm text-gray-500 mt-4">Itens: {order.itens_comprados.map(i => `${i.nome} (x${i.quantidade})`).join(', ')}</p>

      {/* ÁREA DE APROVAÇÃO E ENVIO */}
      {status === 'pendente_pagamento' && (
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

      {status === 'entregue' && (
        <div className='mt-6 p-4 bg-green-900/50 border border-green-700 rounded-lg'>
            <p className='font-semibold text-green-300'>{mensagem || 'CHAVE LIBERADA COM SUCESSO.'}</p>
            <p className='text-xs text-gray-400 mt-1'>O cliente foi notificado. Confirme o envio do comprovante.</p>
            <Link href={`https://wa.me/55${order.contato_whatsapp.replace(/\D/g, '')}`} target="_blank" className="text-sm text-green-100 hover:underline mt-2 inline-block">
                Reenviar WhatsApp de Confirmação
            </Link>
        </div>
      )}
    </div>
  );
}