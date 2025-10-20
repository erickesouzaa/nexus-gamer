// app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { login } from '@/utils/authActions';
import Link from 'next/link';

export default function LoginPage() {
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        setMessage(null);

        // Note: O Server Action de login fará o redirecionamento se for bem-sucedido
        const response = await login(formData); 

        if (response && response.error) {
            setMessage({ type: 'error', text: response.error });
        }
        // Se não houver erro, a função 'login' redireciona via Next.js.

        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-2xl border border-nexus-blue/50">
            <h1 className="text-3xl font-extrabold text-white mb-6 text-center">
            Acesso NEXUS
            </h1>

            {/* Mensagem de Feedback */}
            {message && (
                <div 
                className={`p-3 rounded mb-4 text-center text-sm font-semibold ${
                    message.type === 'error' ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'
                }`}
                >
                {message.text}
                </div>
            )}

            {/* O formulário agora usa o Server Action 'handleSubmit' */}
            <form action={handleSubmit} className="space-y-6">
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    E-mail Gamer
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nexus-primary focus:border-nexus-primary bg-gray-700 text-white"
                    placeholder="seu@emailgamer.com"
                />
                </div>

                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Senha Secreta
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nexus-primary focus:border-nexus-primary bg-gray-700 text-white"
                    placeholder="******"
                />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black ${
                        isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-nexus-secondary hover:bg-opacity-80'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexus-secondary transition duration-150`}
                >
                    {isSubmitting ? 'Entrando...' : 'Fazer Login'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
                Não tem conta? 
                <Link href="/auth/cadastro" className="font-medium text-nexus-blue hover:text-nexus-primary ml-1">
                    Crie sua conta aqui!
                </Link>
            </p>
        </div>
        </div>
    );
}