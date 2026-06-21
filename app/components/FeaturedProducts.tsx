'use client';

import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';

const products = [
  {
    id: 'loaded',
    name: 'Loaded Ice Cream',
    description: 'Cookies & chocolate chunks',
    emoji: '🍪',
    image: '/images/loaded-1.2l.jpg',
    sizes: [
      { id: '330ml', label: '330ml', price: 5000 },
      { id: '550ml', label: '550ml', price: 8000 },
      { id: '1.2L', label: '1.2L', price: 16000 },
    ]
  },
  {
    id: 'oreo',
    name: 'Oreos & Cream',
    description: 'Just Oreos',
    emoji: '🍫',
    image: '/images/oreo-1.2l.jpg',
    sizes: [
      { id: '330ml', label: '330ml', price: 5000 },
      { id: '550ml', label: '550ml', price: 8000 },
      { id: '1.2L', label: '1.2L', price: 16000 },
    ]
  },
  {
    id: 'vanilla',
    name: 'Plain Vanilla',
    description: 'Classic vanilla',
    emoji: '🍦',
    image: '/images/vanilla-1.2l.jpg',
    sizes: [
      { id: '330ml', label: '330ml', price: 5000 },
      { id: '550ml', label: '550ml', price: 8000 },
      { id: '1.2L', label: '1.2L', price: 16000 },
    ]
  },
  {
    id: 'chocolate',
    name: 'Plain Chocolate',
    description: 'Rich chocolate',
    emoji: '🍫',
    image: '/images/chocolate-1.2l.jpg',
    sizes: [
      { id: '330ml', label: '330ml', price: 5000 },
      { id: '550ml', label: '550ml', price: 8000 },
      { id: '1.2L', label: '1.2L', price: 16000 },
    ]
  },
  {
    id: 'loaded-chocolate',
    name: 'Loaded Chocolate',
    description: 'Cookies & chocolate chunks',
    emoji: '🍪',
    image: '/images/chocolate-loaded-1.2l.jpg',
    sizes: [
      { id: '330ml', label: '330ml', price: 5000 },
      { id: '550ml', label: '550ml', price: 8000 },
      { id: '1.2L', label: '1.2L', price: 16000 },
    ]
  }
];

export const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-500 text-sm font-semibold rounded-full mb-4">
            Our Collection
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Premium <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">Flavors</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Discover our most loved ice cream flavors, crafted with premium ingredients
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} {...product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};