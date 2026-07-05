'use client';

import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/app/providers/CartProvider';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  sizes?: string[];  // Make optional with default
  colors?: string[];
  index?: number;
}

export const ProductCard = ({ 
  id, 
  name, 
  description, 
  image, 
  price, 
  sizes = ['M'],  // Default sizes if none provided
  colors, 
  index = 0 
}: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || 'M');
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(name, selectedSize, price || 0, '👗');
  };

  // Handle missing data
  const displayPrice = price || 0;
  const displayName = name || 'Unnamed Product';
  const displayDescription = description || 'No description available';
  const displayImage = image || '/images/placeholder.jpg';
  const displaySizes = Array.isArray(sizes) && sizes.length > 0 ? sizes : ['M'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-rose-100"
    >
      <div className="relative h-64 bg-gradient-to-br from-rose-50 to-pink-50 overflow-hidden">
        <img
          src={displayImage}
          alt={displayName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.jpg';
          }}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-rose-500 text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {colors && colors.length > 0 ? `${colors.length} Colors` : 'New'}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-rose-500 transition-colors">
          {displayName}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{displayDescription}</p>

        <div className="flex gap-2 mt-4 flex-wrap">
          {displaySizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedSize === size
                  ? 'bg-rose-400 text-white shadow-md'
                  : 'bg-rose-50 text-gray-600 hover:bg-rose-100'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-rose-100">
          <span className="text-2xl font-bold text-rose-500">
            ₦{displayPrice.toLocaleString()}
          </span>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors flex items-center gap-2 shadow-md"
          >
            <Plus size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};