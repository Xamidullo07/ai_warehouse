import { useState, useCallback } from 'react';
import type { CartItem } from "../types";

// Using a simple store pattern with React hooks
let cartItems: CartItem[] = [];
let favoriteIds: string[] = [];
let listeners: (() => void)[] = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

export const useCartStore = () => {
  const [, forceUpdate] = useState({});

  const reRender = useCallback(() => {
    forceUpdate({});
  }, []);

  // Subscribe to changes
  useState(() => {
    listeners.push(reRender);
    return () => {
      listeners = listeners.filter(listener => listener !== reRender);
    };
  });

  const addToCart = useCallback((item: CartItem) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    
    if (existingItem) {
      cartItems = cartItems.map((i) =>
        i.id === item.id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      cartItems = [...cartItems, item];
    }
    notifyListeners();
  }, []);

  const removeFromCart = useCallback((id: string) => {
    cartItems = cartItems.filter((item) => item.id !== id);
    notifyListeners();
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    if (favoriteIds.includes(id)) {
      favoriteIds = favoriteIds.filter((fid) => fid !== id);
    } else {
      favoriteIds = [...favoriteIds, id];
    }
    notifyListeners();
  }, []);

  const isInCart = useCallback((id: string) => {
    return cartItems.some((item) => item.id === id);
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favoriteIds.includes(id);
  }, []);

  return {
    items: cartItems,
    favorites: favoriteIds,
    addToCart,
    removeFromCart,
    toggleFavorite,
    isInCart,
    isFavorite,
  };
};