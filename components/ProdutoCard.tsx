// components/ProdutoCard.tsx (CÓDIGO COMPLETO COM IMAGEM)

import React from 'react';
import Link from 'next/link'; 
import Image from 'next/image'; // <-- IMPORTAÇÃO OBRIGATÓRIA

// Definição da interface
export interface Produto { 
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem_url: string; // <-- A URL da sua imagem
}

const ProdutoCard: React.FC<{ produto: Produto }> = ({ produto }) => {
  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700 
                    hover:border-nexus-blue transition duration-300 transform hover:scale-[1.02] 
                    flex flex-col justify-between text-center text-nexus-secondary"> 

      {/* EXIBIÇÃO DA IMAGEM */}
      {produto.imagem_url && (
        <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden mx-auto">
          <Image
            src={produto.imagem_url}
            alt={produto.nome}
            fill // Preenche o contêiner
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
            priority // Carregamento rápido
          />
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-2 text-nexus-primary uppercase truncate"> 
            {produto.nome}
        </h2>

        <p className="text-sm mb-4 min-h-12">
            {produto.descricao}
        </p>
      </div>
      <div>
        <p className="text-3xl font-extrabold text-green-400 mt-2 mb-4">
          {produto.preco ? `R$ ${produto.preco.toFixed(2).replace('.', ',')}` : 'GRÁTIS'}
        </p>

        <Link 
          href="/carrinho/checkout" 
          className="w-full bg-nexus-secondary text-black font-extrabold py-3 rounded-lg 
                     shadow-lg hover:shadow-nexus-secondary transition duration-150 block uppercase"
        >
          COMPRAR AGORA
        </Link>
      </div>
    </div>
  );
};

export default ProdutoCard;