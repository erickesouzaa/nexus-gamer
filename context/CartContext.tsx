// context/CartContext.tsx (CÓDIGO COMPLETO)
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

interface CartContextType {
  cart: CartItem[];
  total: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const total = cart.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  const addToCart = (newItem: CartItem) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === newItem.id);

      if (existingItem) {
        return currentCart.map(item =>
          item.id === newItem.id
            ? { ...item, quantidade: item.quantidade + newItem.quantidade }
            : item
        );
      } else {
        return [...currentCart, newItem];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(currentCart => currentCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};