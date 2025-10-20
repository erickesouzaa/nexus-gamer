// utils/supabase-server-actions.ts (CÓDIGO COMPLETO E FINAL)

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// FUNÇÃO CRÍTICA: Cria o cliente com permissão para MODIFICAR cookies (usado em Server Actions)
export function createServerSupabaseClientActions() {
  const cookieStore = cookies(); 

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // FUNÇÃO DE LEITURA (get)
        // @ts-ignore
        get(name: string) { return cookieStore.get(name)?.value; },
        
        // FUNÇÃO DE ESCRITA (set)
        // @ts-ignore
        set(name: string, value: string, options) {
          cookieStore.set(name, value, options);
        },
        
        // FUNÇÃO DE REMOÇÃO (remove)
        // @ts-ignore
        remove(name: string, options) {
          cookieStore.set(name, '', options);
        },
      },
    }
  );
}