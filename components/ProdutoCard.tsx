// components/ProdutoCard.tsx
// Este é um componente de SERVIDOR, que agora atua como um link simples

import React from 'react';
import Link from 'next/link'; // Importe o componente Link

// Definição da interface (importada pelo Catálogo)
export interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem_url: string;
}

const ProdutoCard: React.FC<{ produto: Produto }> = ({ produto }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg bg-gray-800 text-white flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-nexus-primary">{produto.nome}</h2>
        <p className="text-sm text-gray-400 mb-2 min-h-12">{produto.descricao}</p>
      </div>
      <div>
        <p className="text-2xl font-extrabold text-green-400 mt-2">
          R$ {produto.preco ? produto.preco.toFixed(2).replace('.', ',') : '0,00'}
        </p>
        
        {/* O BOTÃO AGORA É UM LINK DIRETO PARA O CHECKOUT */}
        <Link 
          href="/carrinho/checkout" 
          className="mt-4 w-full bg-nexus-secondary hover:bg-opacity-80 text-black font-bold py-2 rounded transition duration-150 text-center block"
        >
          Comprar Agora (NTFY Teste)
        </Link>
      </div>
    </div>
  );
};

export default ProdutoCard;