// components/ClientCartCount.tsx
'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import React from 'react';

export default function ClientCartCount() {
  const { cart } = useCart();
  const itemCount = cart.reduce((count, item) => count + item.quantidade, 0);

  return (
    <Link href="/carrinho" className="relative p-2 text-gray-300 hover:text-nexus-blue transition duration-150">
      {/* Ícone de carrinho simples (você pode usar um ícone SVG se quiser) */}
      🛒
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-black transform translate-x-1/2 -translate-y-1/2 bg-nexus-secondary rounded-full">
          {itemCount}
        </span>
      )}
    </Link>
  );
}