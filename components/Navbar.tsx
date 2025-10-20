// components/Navbar.tsx (CÓDIGO COMPLETO)

import Link from 'next/link';
// Importa o cliente APENAS de leitura
import { createServerSupabaseClientData } from '@/utils/supabase-server-data'; 
import LogoutButton from './LogoutButton';

export default async function Navbar() {
  // 1. Cria o cliente Supabase Server (Leitura)
  const supabaseServer = createServerSupabaseClientData();
  const { data: { user } } = await supabaseServer.auth.getUser();
  const isLoggedIn = !!user; // true ou false

  return (
    <nav className="bg-gray-900 border-b border-gray-700 p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold text-nexus-primary hover:text-nexus-secondary transition duration-150">
          NEXUS
        </Link>

        {/* Links de Navegação */}
        <div className="flex space-x-6 items-center">
          
          {/* Link Fixo: Catálogo */}
          <Link href="/produtos" className="text-gray-300 hover:text-nexus-blue transition duration-150">
            Catálogo
          </Link>

          {/* Condicional: Se estiver logado, mostra "Minha Conta" e "Logout" */}
          {isLoggedIn ? (
            <>
              {/* Opções de Logado */}
              <Link href="/minha-conta" className="text-gray-300 hover:text-nexus-blue transition duration-150">
                Minha Conta
              </Link>
              <span className="text-gray-500">|</span>
              <LogoutButton />
            </>
          ) : (
            // Opções Deslogado
            <Link href="/auth/login" className="bg-nexus-secondary text-black font-bold py-1.5 px-4 rounded-lg hover:opacity-90 transition duration-300">
              Login
            </Link> 
          )}
        </div>
      </div>
    </nav>
  );
}