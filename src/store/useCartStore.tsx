import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  favorites: number[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  toggleFavorite: (id: number) => void;
  isInCart: (id: number) => boolean;
  isFavorite: (id: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const addToCart = (item: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setItems(prevItems => prevItems.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(id)
        ? prevFavorites.filter((fid) => fid !== id)
        : [...prevFavorites, id]
    );
  };

  const isInCart = (id: number) => {
    return items.some((item) => item.id === id);
  };

  const isFavorite = (id: number) => {
    return favorites.includes(id);
  };

  const value: CartContextType = {
    items,
    favorites,
    addToCart,
    removeFromCart,
    toggleFavorite,
    isInCart,
    isFavorite,
  };

  return React.createElement(
    CartContext.Provider,
    { value },
    children
  );
};

export const useCartStore = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartStore must be used within a CartProvider');
  }
  return context;
};