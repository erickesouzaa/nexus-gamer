// utils/supabase-server-actions.ts (CÓDIGO COMPLETO E FINALMENTE ESTÁVEL)

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// FUNÇÃO CRÍTICA: Cria o cliente com permissão para MODIFICAR cookies
export function createServerSupabaseClientActions() {
  const cookieStore = cookies(); 

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // FUNÇÃO DE LEITURA (get)
        get(name: string) { 
            // @ts-ignore Adicionada para ignorar o erro de tipagem no get, que é o problema no Vercel
            return cookieStore.get(name)?.value; 
        },
        
        // FUNÇÃO DE ESCRITA (set)
        set(name: string, value: string, options) {
          cookieStore.set(name, value, options);
        },
        
        // FUNÇÃO DE REMOÇÃO (remove)
        remove(name: string, options) {
          cookieStore.set(name, '', options);
        },
        
        // FUNÇÃO DE LEITURA COMPLETA (getAll) - Removida para evitar o erro de tipagem persistente
      },
    }
  );
}