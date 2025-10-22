// app/page.tsx (APENAS O AJUSTE CRÍTICO DE LAYOUT)

export default function RootPage() {
  return (
    // ADICIONE pt-12 AQUI PARA DAR ESPAÇO AO NAVBAR
    <main className="text-nexus-secondary pt-12"> 
      
      {/* 1. SEÇÃO HERO/BANNER DE DESTAQUE */}
      <div className="w-full h-[450px] bg-gray-800 // Fundo ESCURO para contrastar com a Hero
                    flex items-center justify-center relative border-b border-nexus-accent">
        
        {/* ... (Resto do Hero) ... */}
      </div>
      {/* ... (Restante do conteúdo) ... */}
    </main>
  );
}