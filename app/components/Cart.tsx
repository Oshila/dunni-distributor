'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/app/providers/CartProvider';

export const Cart = () => {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingBag className="w-12 h-12 text-pink-200 mx-auto mb-3" />
        <p className="text-gray-400 text-sm">Your cart is empty</p>
        <p className="text-gray-300 text-xs">Add some delicious ice cream!</p>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-between bg-white/50 rounded-xl p-3"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-xl">{item.emoji || '🍦'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400">{item.size}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-6 h-6 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center text-pink-500 text-xs"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-6 h-6 rounded-full bg-pink-400 hover:bg-pink-500 flex items-center justify-center text-white text-xs"
                >
                  +
                </button>
              </div>
              
              <span className="text-sm font-semibold text-pink-500 w-16 text-right">
                ₦{(item.price * item.quantity).toLocaleString()}
              </span>
              
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-300 hover:text-red-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      <div className="border-t border-pink-100 pt-3 mt-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Total</span>
          <span className="text-xl font-bold text-pink-500">
            ₦{total.toLocaleString()}
          </span>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-gray-400 hover:text-pink-500 transition-colors mt-1"
        >
          Clear cart
        </button>
      </div>
    </motion.div>
  );
};