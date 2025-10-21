// utils/supabase-server-data.ts (CLIENTE DE LEITURA CORRIGIDO)

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createServerSupabaseClientData() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
        // ESSENCIAL: As funções set/remove são vazias para evitar o erro no Layout/Navbar
        set() {},
        remove() {},
      },
    }
  );
}