// utils/supabase-server-actions.ts (CORREÇÃO FINAL)

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createServerSupabaseClientActions() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // @ts-ignore
        get(name: string) { return cookies().get(name)?.value; }, 
        
        // @ts-ignore
        set(name: string, value: string, options) { cookies().set(name, value, options); },
        
        // CORREÇÃO: Removemos o parâmetro 'value: string' que era desnecessário aqui
        // @ts-ignore
        remove(name: string, options) { 
            cookies().set(name, '', options);
        },
      },
    }
  );
}