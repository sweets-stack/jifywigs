// client/src/hooks/useCart.ts
import { useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // In real app: sync with localStorage or API
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validate the parsed data
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // In useCart.ts
const addToCart = (item: Omit<CartItem, 'qty'>, quantity: number = 1) => {
  setItems((prev) => {
    const existing = prev.find((i) => i.id === item.id);
    if (existing) {
      return prev.map((i) => 
        i.id === item.id 
          ? { ...i, qty: i.qty + quantity } 
          : i
      );
    }
    return [...prev, { ...item, qty: quantity }];
  });
};

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setItems((prev) => 
      prev.map((item) => 
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart: () => setItems([]),
  };
};