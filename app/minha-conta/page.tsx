// app/minha-conta/page.tsx (CÓDIGO COMPLETO E FINAL)

import { createServerSupabaseClientData } from '@/utils/supabase-server-data'; 
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton'; 

// Esta é uma página de Servidor, ideal para checar o estado de autenticação de forma segura
export default async function MinhaContaPage() {
  // 1. Cria o cliente Supabase Server (Leitura)
  const supabaseServer = createServerSupabaseClientData(); 

  // 2. Pega a sessão do usuário de forma segura
  const { data: { user } } = await supabaseServer.auth.getUser(); 

  // 3. Se não houver usuário logado (usuário = null), redireciona para o login
  if (!user) {
    redirect('/auth/login');
  }

  // LÓGICA DE NOME (Corrigida)
  const userName = user.user_metadata.nome || user.email;

  // 4. Usuário logado: Exibe o conteúdo da conta
  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-nexus-blue">
          Olá, {userName}!
        </h1>
        <p className="text-gray-400 mb-8">
          Bem-vindo à sua área de códigos do NEXUS Gamer. Aqui estão seus produtos digitais.
        </p>

        {/* Simulação da lista de códigos comprados */}
        <h2 className="text-2xl font-bold mb-4 text-nexus-primary">
          Seus Códigos de Resgate
        </h2>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-gray-500">
            Ainda não há um sistema de pedidos. 
            <br/>
            Quando implementarmos, os códigos comprados aparecerão aqui!
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          {/* O botão de Logout */}
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}