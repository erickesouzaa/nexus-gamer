// app/page.tsx (CÓDIGO COMPLETO - AJUSTE FINAL)

import Link from 'next/link';
import { createServerSupabaseClientData } from '@/utils/supabase-server-data'; 
import ProdutoCard, { Produto } from '@/components/ProdutoCard'; 

// Componente para exibir um único carrossel/linha de destaque
async function FeaturedProducts() {
    const supabaseServer = createServerSupabaseClientData();
    
    // Busca apenas 4 produtos para o destaque na Home
    const { data: produtos, error } = await supabaseServer
        .from('produtos')
        .select('*')
        .limit(4); 

    if (error || !produtos || produtos.length === 0) {
        return <p className="text-gray-500 text-center">Nenhum destaque encontrado.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {produtos.map((produto) => (
                <ProdutoCard key={produto.id} produto={produto as Produto} />
            ))}
        </div>
    );
}

export default function RootPage() {
  return (
    // Adiciona o espaçamento no topo para a barra Navbar (pt-16 é a altura aproximada da barra)
    <main className="text-gray-800 pt-16"> 
      
      {/* 1. SEÇÃO HERO/BANNER DE DESTAQUE */}
      <div className="w-full h-[450px] bg-gray-100 
                    flex items-center justify-center relative border-b border-gray-300">
        
        <div className="relative z-10 text-center p-8">
          {/* Slogan Principal: Texto Escuro */}
          <h1 className="text-6xl md:text-7xl font-black text-gray-800 mb-2 drop-shadow-md">
            O SEU HUB DE ACESSO IMEDIATO!
          </h1>
          {/* Slogan Secundário: Azul Céu para destaque */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-500 mb-8 drop-shadow-md">
            CÓDIGOS GARANTIDOS EM ATÉ 24 HORAS.
          </h2>
          <Link href="/produtos">
            <button className="bg-blue-500 text-white font-extrabold py-3 px-10 rounded-lg 
                     shadow-lg hover:opacity-90 transition duration-300 transform hover:scale-105 uppercase">
              VER CATÁLOGO COMPLETO
            </button>
          </Link>
        </div>
      </div>
      
      {/* 2. ÍCONES DE CONFIANÇA */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 py-8 px-4 text-center border-b border-gray-300/50">
          <div className="p-4"><p className="text-2xl font-bold text-blue-500">24H</p><p className="text-sm text-gray-800">Entrega Expressa Garantida</p></div>
          <div className="p-4"><p className="text-2xl font-bold text-blue-500">PIX</p><p className="text-sm text-gray-800">5% OFF Fixo no PIX</p></div>
          <div className="p-4"><p className="text-2xl font-bold text-blue-500">100%</p><p className="text-sm text-gray-800">Garantia de Código Válido</p></div>
          <div className="p-4"><p className="text-2xl font-bold text-blue-500">🛒</p><p className="text-sm text-gray-800">Suporte a Clientes</p></div>
      </div>

      {/* 3. SEÇÃO DE PRODUTOS EM DESTAQUE */}
      <div className="max-w-7xl mx-auto p-8">
         <h2 className="text-3xl font-bold text-gray-800 border-b border-gray-300 pb-3 mb-6">
            Lançamentos e Destaques
         </h2>
         <FeaturedProducts /> 
         <div className="text-center mt-10">
            <Link href="/produtos" className="text-blue-500 hover:text-blue-700 underline">
                Ver todo o catálogo
            </Link>
         </div>
      </div>
      
    </main>
  );
}