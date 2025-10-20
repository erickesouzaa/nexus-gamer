// utils/supabase-server-data.ts (CLIENTE APENAS PARA LEITURA DE DADOS)

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createServerSupabaseClientData() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookies().get(name)?.value; },
        // SEM set/remove para satisfazer a regra do Next.js em Server Components
      },
    }
  );
}