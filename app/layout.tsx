// app/layout.tsx (CÓDIGO COMPLETO E CORRIGIDO COM FOOTER)

import type { Metadata } from 'next';
import './globals.css'; // Importa as estilizações globais (incluindo Tailwind)
import Navbar from '@/components/Navbar'; 
import ClientProvider from '@/components/ClienteProvider'; // <-- CORREÇÃO: Removido o 'e' (ClienteProvider -> ClientProvider)
import Footer from '@/components/Footer'; // <-- Importado o Footer (Se você o criou na pasta components)

export const metadata: Metadata = {
  title: 'NEXUS Gamer - E-commerce de Códigos Digitais',
  description: 'Códigos e boosts exclusivos para gamers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 // app/layout.tsx (APENAS A TAG BODY)

// ...
  return (
    // Garante que o fundo principal use o preto fosco e o texto use o cinza prateado
    <html lang="pt-BR" className="bg-nexus-dark text-nexus-secondary"> 
      <body>
        <ClientProvider> 
          <Navbar /> 
          {children} 
          <Footer /> 
        </ClientProvider>
      </body>
    </html>
  );
}