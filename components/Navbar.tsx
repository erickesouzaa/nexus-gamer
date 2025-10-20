// components/Navbar.tsx (CÓDIGO 100% CORRIGIDO E FINAL)

import Link from 'next/link';
// IMPORTANTE: USAMOS O CLIENTE DE DADOS (LEITURA) para evitar o erro no Layout
import { createServerSupabaseClientData } from '@/utils/supabase-server-data'; 
import LogoutButton from './LogoutButton'; 
// Ações de modificação (login/logout) estão importadas APENAS no arquivo de botão/ação, não aqui.

export default async function Navbar() {
  // 1. Cria o cliente Supabase Server (Leitura)
  const supabaseServer = createServerSupabaseClientData(); 
  const { data: { user } } = await supabaseServer.auth.getUser();
  const isLoggedIn = !!user; 

  return (
    <nav className="bg-black text-nexus-secondary border-b border-nexus-accent p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 1. LOGO */}
        <Link href="/" className="text-2xl font-extrabold text-nexus-secondary hover:text-nexus-primary transition duration-150 mr-4">
          NEXUS
        </Link>
        
        {/* 2. CAMPO DE BUSCA CENTRALIZADO (Apenas em Desktop) */}
        <div className="flex-grow max-w-lg hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Digite o que você procura..."
              className="w-full px-4 py-2 pl-10 border border-nexus-accent rounded-full bg-gray-900 text-white placeholder-gray-500 focus:ring-nexus-primary focus:border-nexus-primary"
            />
            <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        {/* 3. ÍCONES DE AÇÃO */}
        <div className="flex items-center space-x-4 ml-4">
          
          {/* ÍCONE DE BUSCA MOBILE (Aparece em Mobile, some em Desktop) */}
          <button className="text-gray-400 hover:text-nexus-primary md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>

          {/* Link Fixo: Precisa de ajuda? */}
          <Link href="/produtos" className="text-sm text-gray-400 hover:text-nexus-primary transition duration-150 hidden lg:block">
            Precisa de ajuda?
          </Link>

          {/* Icone Minha Conta / Login */}
          {isLoggedIn ? (
            <>
              {/* Ícone Minha Conta */}
              <Link href="/minha-conta" className="text-gray-400 hover:text-nexus-primary transition duration-150 flex items-center space-x-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z" /></svg>
              </Link>
            </>
          ) : (
            // Icone Login
            <> 
              <Link href="/auth/login" className="flex items-center text-gray-400 hover:text-nexus-primary transition duration-150 space-x-1">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1a3 3 0 013-3h7a3 3 0 013 3z" /></svg>
              </Link>
            </>
          )}

          {/* Carrinho (Fixo no final) */}
          <Link href="/carrinho/checkout" className="relative p-1 text-gray-400 hover:text-nexus-primary transition duration-150">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.2 4h12.4m-8.8 4a1 1 0 11-2 0 1 1 0 012 0zm14 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}