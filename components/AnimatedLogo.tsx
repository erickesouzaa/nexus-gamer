// components/AnimatedLogo.tsx
'use client';

import React from 'react';

// Este CSS define a animação de pulso/brilho
// Você precisará garantir que ele seja reconhecido pelo Tailwind
const pulseStyle = `
    @keyframes nexus-pulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 191, 255, 0.7); /* Cor Azul Neon */
        }
        70% {
            box-shadow: 0 0 0 10px rgba(0, 191, 255, 0);
        }
    }
    .animate-nexus-pulse {
        animation: nexus-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
`;

export default function AnimatedLogo() {
  return (
    <>
      {/* Adiciona o estilo da animação globalmente (no header do componente) */}
      <style dangerouslySetInnerHTML={{ __html: pulseStyle }} />

      {/* O container principal do Logo */}
      <div className="flex items-center justify-center h-full">
        <span 
          className="text-4xl font-extrabold p-2 bg-nexus-primary rounded-full text-white 
                     animate-nexus-pulse border-4 border-nexus-blue" 
        >
          N
        </span>
      </div>
    </>
  );
}