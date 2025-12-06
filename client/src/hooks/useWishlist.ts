// client/src/hooks/useWishlist.ts
import { useState, useEffect } from 'react';

export const useWishlist = () => {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const toggle = (id: string) => {
    setItems((prev) => 
      prev.includes(id) 
        ? prev.filter((i) => i !== id) 
        : [...prev, id]
    );
  };

  const isInWishlist = (id: string) => {
    return items.includes(id);
  };

  return {
    items,
    toggle,
    isInWishlist,
    clearWishlist: () => setItems([]),
  };
};