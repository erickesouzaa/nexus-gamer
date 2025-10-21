// components/ProdutoCard.tsx (CÓDIGO COMPLETO - IMAGEM E TEXTOS AJUSTADOS)

import React from 'react';
import Link from 'next/link'; 
// NÃO IMPORTAMOS MAIS 'next/image'

// Definição da interface
export interface Produto { 
  id: string; 
  nome: string;
  preco: number;
  descricao: string;
  imagem_url: string; 
}

const ProdutoCard: React.FC<{ produto: Produto }> = ({ produto }) => {
  return (
    // Ajusta a altura mínima do card para acomodar o novo layout
    <div className="bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-700 
                    hover:border-nexus-blue transition duration-300 transform hover:scale-[1.02] 
                    flex flex-col justify-between text-center min-h-[420px] text-nexus-secondary"> 
      
      {/* EXIBIÇÃO DA IMAGEM: object-contain para mostrar a imagem completa */}
      {produto.imagem_url && (
        <div className="relative h-48 w-full mb-3 rounded-lg overflow-hidden mx-auto flex items-center justify-center">
          <img 
            src={produto.imagem_url} 
            alt={produto.nome}
            className="w-auto h-full object-contain" // <-- AGORA É 'object-contain'
          />
        </div>
      )}

      <div>
        {/* Título: Reduzido para h3, tamanho menor */}
        <h3 className="text-xl font-bold mb-1 text-nexus-primary uppercase truncate"> 
            {produto.nome}
        </h3>
        
        {/* Descrição: Padrão Cinza Claro, texto menor */}
        <p className="text-xs mb-3 min-h-10 text-gray-400"> 
            {produto.descricao}
        </p>
      </div>
      <div>
        {/* Preço: Reduzido, mas ainda em destaque */}
        <p className="text-2xl font-extrabold text-green-400 mt-2 mb-3"> 
          {produto.preco ? `R$ ${produto.preco.toFixed(2).replace('.', ',')}` : 'GRÁTIS'}
        </p>
        
        <Link 
          href="/carrinho/checkout" 
          className="w-full bg-nexus-secondary text-black font-extrabold py-2 px-4 rounded-lg 
                     shadow-lg hover:shadow-nexus-secondary transition duration-150 block uppercase text-sm" // Botão menor
        >
          COMPRAR AGORA
        </Link>
      </div>
    </div>
  );
};

export default ProdutoCard;