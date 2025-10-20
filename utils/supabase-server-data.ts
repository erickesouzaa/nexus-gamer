// utils/supabase-server-data.ts (CÓDIGO COMPLETO E FINAL)

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// FUNÇÃO CRÍTICA: Cria o cliente apenas para LEITURA de dados (Catálogo, Navbar, Minha Conta)
export function createServerSupabaseClientData() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // FUNÇÃO DE LEITURA (get)
        get(name: string) { return cookieStore.get(name)?.value; },
        
        // As funções set, remove e getAll são omitidas para evitar
        // o erro de tipagem persistente no Vercel/Next.js.
      },
    }
  );
}