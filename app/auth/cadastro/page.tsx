// app/auth/cadastro/page.tsx (CÓDIGO COMPLETO E CORRIGIDO COM O CAMPO NOME)

'use client'; // <-- ESSENCIAL: Permite usar estados e eventos de formulário

import { useState } from 'react';
import { signup } from '@/utils/authActions'; // Importa a lógica de Server Action
import Link from 'next/link';

export default function CadastroPage() {
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setMessage(null);
    
    // Chama o Server Action que agora salva o nome
    const response = await signup(formData); 

    if (response.error) {
      setMessage({ type: 'error', text: response.error });
    } else {
      setMessage({ 
        type: 'success', 
        text: 'Cadastro realizado com sucesso! Verifique seu e-mail para confirmar sua conta antes de fazer login.' 
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-2xl border border-nexus-blue/50">
        <h1 className="text-3xl font-extrabold text-white mb-6 text-center">
          Crie sua Conta NEXUS
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

        {/* Formulário com a ação de submissão do Server Action */}
        <form action={handleSubmit} className="space-y-6"> 
          
          {/* NOVO CAMPO: NOME / NICKNAME */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-300">
              Seu Nome / Nickname
            </label>
            <input
              id="nome"
              name="nome" // <<-- O NOME CORRETO PARA PEGAR NO SERVER ACTION
              type="text"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nexus-primary focus:border-nexus-primary bg-gray-700 text-white"
              placeholder="Ericke, The Destroyer, etc."
            />
          </div>

          {/* CAMPO: E-MAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              E-mail Gamer
            </label>
            <input
              id="email"
              name="email" // <<-- Nome do campo é 'email'
              type="email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nexus-primary focus:border-nexus-primary bg-gray-700 text-white"
              placeholder="seu@emailgamer.com"
            />
          </div>

          {/* CAMPO: SENHA */}
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
            {isSubmitting ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Já tem conta? 
          <Link href="/auth/login" className="font-medium text-nexus-blue hover:text-nexus-primary ml-1">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}