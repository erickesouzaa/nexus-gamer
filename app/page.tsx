// app/page.tsx (NOVO LAYOUT COM BANNER)

import Link from 'next/link';

export default function RootPage() {
  return (
    <main className="bg-nexus-dark text-nexus-secondary">
      
      {/* 1. SEÇÃO HERO/BANNER */}
      <div className="w-full h-[500px] bg-gray-800 flex items-center justify-center relative overflow-hidden">
        
        {/* Simulação da Imagem de Fundo (Substitua por sua arte) */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30" 
             style={{ backgroundImage: "url('/placeholder-gamer-banner.jpg')" }}>
        </div>

        {/* Conteúdo do Banner */}
        <div className="relative z-10 text-center p-8">
          <h1 className="text-7xl font-black text-white mb-4 drop-shadow-lg">
            ENVIO EXPRESSO
          </h1>
          <h2 className="text-4xl font-extrabold text-nexus-primary mb-8 drop-shadow-lg">
            SEU CÓDIGO EM ATÉ 1 HORA!
          </h2>
          <Link href="/produtos">
            <button className="bg-nexus-primary text-black font-extrabold py-3 px-10 rounded-full shadow-2xl hover:opacity-90 transition duration-300 transform hover:scale-105 uppercase">
              COMEÇAR A COMPRAR
            </button>
          </Link>
        </div>
      </div>
      
      {/* 2. ÍCONES DE CONFIANÇA (Como no Rafa Gamer) */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 py-8 px-4 text-center">
          
          <div className="p-4 rounded-lg">
            <p className="text-xl font-bold text-white">📦 Envio Digital</p>
            <p className="text-sm text-gray-400">Por E-mail ou WhatsApp</p>
          </div>
          
          <div className="p-4 rounded-lg">
            <p className="text-xl font-bold text-white">💳 Parcele em até 12x</p>
            <p className="text-sm text-gray-400">No cartão de crédito</p>
          </div>
          
          <div className="p-4 rounded-lg">
            <p className="text-xl font-bold text-white">💰 Ganhe 5% OFF</p>
            <p className="text-sm text-gray-400">Pagando com PIX</p>
          </div>

          <div className="p-4 rounded-lg">
            <p className="text-xl font-bold text-white">🛡️ Compra Segura</p>
            <p className="text-sm text-gray-400">Garantia de código válido</p>
          </div>

      </div>

      {/* 3. Seção de Destaque do Catálogo (Você pode adicionar mais aqui) */}
      <div className="max-w-7xl mx-auto p-4">
         <h2 className="text-3xl font-bold text-white border-b border-nexus-accent pb-3 mb-6">Produtos em Destaque</h2>
         <p className="text-gray-400">O catálogo viria aqui, mas vamos deixar simples por enquanto.</p>
      </div>
      
    </main>
  );
}