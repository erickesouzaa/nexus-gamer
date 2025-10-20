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
        // @ts-ignore
        get(name: string) { return cookieStore.get(name)?.value; },
        // set, remove e getAll são omitidos para que o Next.js não reclame de modificação no layout
      },
    }
  );
}