// app/produtos/page.tsx (CÓDIGO COMPLETO)

import { createServerSupabaseClientData } from '@/utils/supabase-server-data'; // Importa o cliente de leitura
import ProdutoCard, { Produto } from '@/components/ProdutoCard'; 

export default async function HomePage() {
  const supabaseServer = createServerSupabaseClientData();

  const { data: produtos, error } = await supabaseServer
    .from('produtos')
    .select('*');

  if (error) {
    console.error('Erro ao carregar produtos:', error);
    return <div className="p-8 text-red-500">Erro ao carregar produtos. Tente novamente.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-nexus-blue">
        Catálogo NEXUS Gamer
      </h1>
      
      {produtos && produtos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto as Produto} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Nenhum produto cadastrado. Cadastre um!</p>
      )}
    </main>
  );
}