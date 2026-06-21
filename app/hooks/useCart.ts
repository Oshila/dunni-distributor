'use client';

import { useState, useEffect } from 'react';
import { toppings, sizes } from '@/app/data/products';

export interface CartItem {
  id: string;
  toppingId: string;
  sizeId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  icon: string;
}

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  console.log('useCart - isOpen:', isOpen); // Debug
  
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  const addItem = (toppingId: string, sizeId: string) => {
    const topping = toppings.find(t => t.id === toppingId);
    const size = sizes.find(s => s.id === sizeId);
    
    if (!topping || !size) {
      console.error('Topping or size not found:', toppingId, sizeId);
      return;
    }
    
    const itemId = `${toppingId}-${sizeId}`;
    const price = size.price;
    
    setItems(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      const newItem = {
        id: itemId,
        toppingId,
        sizeId,
        name: topping.name,
        size: size.label,
        price: price,
        quantity: 1,
        icon: topping.emoji
      };
      
      return [...prev, newItem];
    });
    
    console.log('Opening cart from addItem');
    setIsOpen(true);
  };
  
  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(itemId);
      return;
    }
    setItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  const getQuantity = (toppingId: string, sizeId: string) => {
    const item = items.find(i => i.toppingId === toppingId && i.sizeId === sizeId);
    return item?.quantity || 0;
  };
  
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return { 
    items, 
    addItem, 
    removeItem, 
    updateQuantity, 
    getQuantity,
    clearCart, 
    total, 
    itemCount,
    isOpen,
    setIsOpen
  };
};