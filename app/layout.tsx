// app/layout.tsx (CÓDIGO COMPLETO E FINAL)

import type { Metadata } from 'next';
import './globals.css'; // Importa as estilizações globais (incluindo Tailwind)
import Navbar from '@/components/Navbar'; 
import ClientProvider from '@/components/ClienteProvider'; // O provedor do Carrinho

export const metadata: Metadata = {
  title: 'NEXUS Gamer - E-commerce de Códigos Digitais',
  description: 'Códigos e boosts exclusivos para gamers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {/* CORREÇÃO: ENVOLVEMOS TODA A APLICAÇÃO NO CLIENTPROVIDER para que o carrinho funcione */}
        <ClientProvider>
          <Navbar /> 
          {children} 
        </ClientProvider>
      </body>
    </html>
  );
}