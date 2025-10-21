// components/Navbar.tsx (CÓDIGO 100% CORRIGIDO - LINKS VISÍVEIS)

import Link from 'next/link';
import Image from 'next/image'; 
import { createServerSupabaseClientData } from '@/utils/supabase-server-data'; 
import LogoutButton from './LogoutButton'; 
import SearchBar from './SearchBar'; 
import MobileSearchButton from './MobileSearchButton'; 


export default async function Navbar() {
  const supabaseServer = createServerSupabaseClientData(); 
  const { data: { user } } = await supabaseServer.auth.getUser();
  const isLoggedIn = !!user; 
  const isAdmin = user && user.app_metadata && user.app_metadata.role === 'admin';

  return (
    <nav className="bg-black text-nexus-secondary border-b border-nexus-accent p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 1. LOGO: IMAGEM NEXUS GAMES */}
        <Link href="/" className="flex items-center h-full max-h-10">
          <Image
            src="/nexus-games-logo.png"
            alt="NEXUS GAMES Logo"
            width={180} 
            height={40} 
            priority 
            className="drop-shadow-lg w-auto h-full" 
          />
        </Link>
        
        {/* 2. BUSCA RESPONSIVA */}
        <SearchBar /> 

        {/* 3. ÍCONES DE AÇÃO */}
        <div className="flex items-center space-x-4 ml-4">
          
          {/* ÍCONE DE BUSCA MOBILE (Ativa a barra de pesquisa) */}
          <MobileSearchButton />

          {/* Link Fixo: Precisa de ajuda? */}
          <Link href="/produtos" className="text-sm text-nexus-secondary hover:text-nexus-primary transition duration-150 hidden lg:block">
            Precisa de ajuda?
          </Link>
          
          {/* LINK DE ADMIN (SÓ PARA ADMIN LOGADO) */}
          {isAdmin && (
             <Link href="/admin/pedidos" className="text-sm font-bold text-red-500 hover:text-red-400 transition duration-150 md:block">
                ADMIN
             </Link>
          )}

          {/* Icone Minha Conta / Login */}
          {isLoggedIn ? (
            <>
              {/* Ícone Minha Conta (Perfil) */}
              <Link href="/minha-conta" className="text-nexus-secondary hover:text-nexus-primary transition duration-150 flex items-center space-x-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z" /></svg>
              </Link>
            </>
          ) : (
            // Icone Login
            <> 
              <Link href="/auth/login" className="flex items-center text-nexus-secondary hover:text-nexus-primary transition duration-150 space-x-1">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7l-6 6m2 2l-6 6M10 14l2 2m-1-5l2 2m-4-2l2 2m-6 4a4 4 0 110-8 4 4 0 010 8zm8-12a4 4 0 110-8 4 4 0 010 8z" /></svg>
              </Link>
            </>
          )}

          {/* Carrinho (Fixo no final) */}
          <Link href="/carrinho/checkout" className="relative p-1 text-nexus-secondary hover:text-nexus-primary transition duration-150">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.2 4h12.4m-8.8 4a1 1 0 11-2 0 1 1 0 012 0zm14 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}