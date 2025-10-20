// components/ClientProvider.tsx
'use client';

import React, { ReactNode } from 'react';
import { CartProvider } from '@/context/CartContext'; // <-- Certifique-se que CartContext existe

// Este componente atua como um wrapper para todas as funcionalidades de cliente
export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}