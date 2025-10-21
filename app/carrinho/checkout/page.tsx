// app/carrinho/checkout/page.tsx (CÓDIGO COMPLETO FINAL)
'use client';

import { createOrder, CartItem } from '@/utils/authActions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// DADOS SIMULADOS DE COMPRA CORRIGIDOS
const SIMULATED_CART: CartItem[] = [{
  id: 'a491f645-7370-46d4-a1f8-8d34d7ab4478', 
  nome: 'Red Dead Redemption 2', 
  preco: 49.00, 
  quantidade: 1
}];
const SIMULATED_TOTAL = SIMULATED_CART[0].preco * SIMULATED_CART[0].quantidade;

const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;


export default function CheckoutPage() {
    const router = useRouter();
    const [whatsapp, setWhatsapp] = useState('');
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Se o cliente não está logado, a Server Action falhará e o cliente será redirecionado para o login.
    
    const handleCheckout = async (formData: FormData) => {
        setIsSubmitting(true);
        setMessage(null);

        const currentWhatsapp = formData.get('whatsapp') as string;
        if (!currentWhatsapp) {
             setMessage({ type: 'error', text: 'Por favor, informe seu WhatsApp para o envio.' });
             setIsSubmitting(false);
             return;
        }

        // Chama a Server Action
        const response = await createOrder(formData, SIMULATED_CART, SIMULATED_TOTAL);

        if (response.error) {
            if (response.error.includes('autenticado')) {
                router.push('/auth/login');
                return;
            }
            setMessage({ type: 'error', text: response.error });
        } else {
            // Sucesso: Redireciona para a tela de confirmação
            router.push(`/carrinho/confirmacao?pedido=${response.pedidoId}`);
        }
        setIsSubmitting(false);
    };

    return (
        <main className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-lg shadow-2xl border border-nexus-blue/50">
                <h1 className="text-3xl font-extrabold text-white mb-6 text-center">
                    Checkout de Teste (NTFY)
                </h1>

                {message && (
                    <div className={`p-3 rounded mb-4 text-center text-sm font-semibold ${message.type === 'error' ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'}`}>
                        {message.text}
                    </div>
                )}
                
                {/* 1. Detalhes do Pedido (Simulado) */}
                <h2 className="text-xl font-bold mb-3 text-nexus-primary">Resumo do Pedido</h2>
                <div className="space-y-2 mb-6 border-b border-gray-700 pb-4">
                    <div className="flex justify-between text-gray-400 text-sm">
                        <span>{SIMULATED_CART[0].nome}</span>
                        <span>{formatPrice(SIMULATED_TOTAL)}</span>
                    </div>
                </div>

                <div className="flex justify-between text-2xl font-extrabold mb-8">
                    <span>TOTAL A PAGAR:</span>
                    <span className="text-nexus-secondary">{formatPrice(SIMULATED_TOTAL)}</span>
                </div>

                {/* 2. Formulário de Checkout (Finalização) */}
                <form action={handleCheckout} className="space-y-6">
                    <h2 className="text-xl font-bold mb-3 text-nexus-primary">Detalhes de Envio</h2>
                    
                    <div>
                        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300">
                            WhatsApp (Para envio do Código)
                        </label>
                        <input
                            id="whatsapp"
                            name="whatsapp"
                            type="text"
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nexus-primary focus:border-nexus-primary bg-gray-700 text-white"
                            placeholder="(XX) XXXXX-XXXX"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                        />
                    </div>

                    <p className="text-sm text-gray-400 bg-gray-700 p-3 rounded">
                        * Este é um pedido de TESTE ({SIMULATED_CART[0].nome}). O código será enviado manualmente após o pagamento.
                    </p>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black ${
                            isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-nexus-secondary hover:bg-opacity-80'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexus-secondary transition duration-150`}
                    >
                        {isSubmitting ? 'Registrando Pedido...' : `Registrar Pedido de ${formatPrice(SIMULATED_TOTAL)}`}
                    </button>
                </form>
            </div>
        </main>
    );
}