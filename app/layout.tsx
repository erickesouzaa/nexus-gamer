// app/layout.tsx (CÓDIGO FINAL E LIMPO)

import type { Metadata } from 'next';
import './globals.css'; 
import Navbar from '@/components/Navbar'; 
import ClientProvider from '@/components/ClienteProvider'; 
import Footer from '@/components/Footer'; 

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
    <html lang="pt-BR" className="h-full"> 
      {/* CORREÇÃO: REMOVEMOS TODAS AS CLASSES DE COR DO BODY E DEIXAMOS O GLOBAL CUIDAR DISSO */}
      <body className="min-h-full"> 
        <ClientProvider> 
          <Navbar /> 
          {children} 
          <Footer /> 
        </ClientProvider>
      </body>
    </html>
  );
}