// app/produtos/page.tsx

import { createServerSupabaseClientData } from '@/utils/supabase-server-data'; 
import ProdutoCard, { Produto } from '@/components/ProdutoCard'; 

// Este é um Server Component que recebe os parâmetros de busca da URL
export default async function HomePage({ searchParams }: { searchParams: { q?: string } }) {
  const supabaseServer = createServerSupabaseClientData();
  const searchTerm = searchParams.q;

  let query = supabaseServer
    .from('produtos')
    .select('*');

  // LÓGICA DE BUSCA: Adiciona o filtro se o termo de busca existir
  if (searchTerm) {
    // Filtra pelo nome ou descrição, ignorando maiúsculas/minúsculas (ilike)
    query = query.or(`nome.ilike.%${searchTerm}%,descricao.ilike.%${searchTerm}%`);
  }

  // Executa a consulta e ordena por nome
  const { data: produtos, error } = await query.order('nome', { ascending: true }); 

  if (error) {
    console.error('Erro ao carregar produtos:', error);
    return <div className="p-8 text-red-500">Erro ao carregar produtos. Tente novamente.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-4xl font-extrabold mb-4 text-center text-nexus-primary border-b border-gray-700 pb-3">
          CATÁLOGO NEXUS GAMER
        </h1>
        <p className="text-center text-gray-400 mb-10">
          {searchTerm 
            ? `Resultados para "${searchTerm}"`
            : `Encontre seu próximo upgrade digital: de códigos de skins a passes de batalha exclusivos.`
          }
        </p>
        
        {produtos && produtos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {produtos.map((produto) => (
              <ProdutoCard key={produto.id} produto={produto as Produto} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 p-10 bg-gray-800 rounded-lg">
            {searchTerm 
                ? `Nenhum produto encontrado para "${searchTerm}".`
                : `Nenhum produto cadastrado. Cadastre um!`
            }
            </div>
        )}
        
      </div>
    </main>
  );
}