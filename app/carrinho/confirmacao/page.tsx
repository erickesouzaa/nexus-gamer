// app/carrinho/confirmacao/page.tsx
import Link from 'next/link';
import { Suspense } from 'react';

// Componente principal para extrair os parâmetros da URL
function ConfirmacaoContent({ searchParams }: { searchParams: { pedido: string } }) {
    const pedidoId = searchParams.pedido || 'N/A';
    const pixKey = "a-sua-chave-pix-aqui"; // <-- SUA CHAVE PIX REAL AQUI!

    return (
        <main className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
            <div className="max-w-md bg-gray-800 p-8 rounded-lg shadow-2xl border border-nexus-primary/50 text-center">
                <h1 className="text-3xl font-extrabold text-nexus-secondary mb-4">
                    Pedido Registrado!
                </h1>
                <p className="text-gray-300 mb-6">
                    Seu pedido **#{pedidoId}** foi registrado com sucesso. 
                    Aguardamos a confirmação do pagamento para enviar seus códigos!
                </p>

                {/* INSTRUÇÕES DE PAGAMENTO */}
                <h2 className="text-xl font-bold mb-3 text-nexus-blue">
                    1. Pague via PIX
                </h2>
                <p className="bg-gray-700 p-4 rounded break-words text-lg font-mono mb-6">
                    {pixKey}
                </p>

                <h2 className="text-xl font-bold mb-3 text-nexus-blue">
                    2. Confirmação
                </h2>
                <p className="text-gray-300 mb-8">
                    Envie o comprovante de pagamento para o nosso WhatsApp (com o número do pedido **#{pedidoId}**)
                    para que possamos processar o pedido rapidamente.
                </p>

                <Link href="/minha-conta">
                    <button className="w-full py-3 bg-nexus-primary text-white font-bold rounded-lg hover:opacity-90 transition duration-150">
                        VER MINHA CONTA
                    </button>
                </Link>
            </div>
        </main>
    );
}

// Wrap com Suspense para usar searchParams
export default function ConfirmacaoPage({ searchParams }: { searchParams: { pedido: string } }) {
    return (
        <Suspense fallback={<div>Carregando confirmação...</div>}>
            <ConfirmacaoContent searchParams={searchParams} />
        </Suspense>
    );
}