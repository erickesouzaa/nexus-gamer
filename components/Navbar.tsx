// components/Navbar.tsx (CÓDIGO 100% CORRIGIDO E FINAL)

import Link from 'next/link';
import { createServerSupabaseClientData } from '@/utils/supabase-server-data'; 
import LogoutButton from './LogoutButton'; 
import SearchBar from './SearchBar'; // Componente de Busca Responsiva
import MobileSearchButton from './MobileSearchButton';

export default async function Navbar() {
  // Cria o cliente Supabase Server (Leitura) e checa o status de login
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
        
        {/* 2. BUSCA RESPONSIVA */}
        <SearchBar /> 

        {/* 3. ÍCONES DE AÇÃO */}
        <div className="flex items-center space-x-4 ml-4">
          
          {/* ÍCONE DE BUSCA MOBILE (Ativa a barra de pesquisa) */}
          <MobileSearchButton />

          {/* Link Fixo: Precisa de ajuda? */}
          <Link href="/produtos" className="text-sm text-gray-400 hover:text-nexus-primary transition duration-150 hidden lg:block">
            Precisa de ajuda?
          </Link>

          {/* Icone Minha Conta / Login */}
          {isLoggedIn ? (
            <>
              {/* Ícone Minha Conta (Perfil/Cabeça e Ombros) */}
              <Link href="/minha-conta" className="text-gray-400 hover:text-nexus-primary transition duration-150 flex items-center space-x-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z" /></svg>
              </Link>
            </>
          ) : (
            // Icone Login (SVG CHAVE - Corrigido o bug de renderização no celular)
            <> 
              <Link href="/auth/login" className="flex items-center text-gray-400 hover:text-nexus-primary transition duration-150 space-x-1">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7l-6 6m2 2l-6 6M10 14l2 2m-1-5l2 2m-4-2l2 2m-6 4a4 4 0 110-8 4 4 0 010 8zm8-12a4 4 0 110-8 4 4 0 010 8z" /></svg>
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