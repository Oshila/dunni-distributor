'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { ProductCard } from '../components/ProductCard';
import { toppings } from '../data/products';
import { useCart } from '../hooks/useCart';

export default function MenuPage() {
  const { addItem, getQuantity } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    Object.fromEntries(toppings.map(t => [t.id, '330ml']))
  );
  
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 bg-gradient-primary min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-white/80 text-pink-500 text-sm font-semibold rounded-full mb-4">
              Full Menu
            </span>
            <h1 className="text-4xl font-bold text-gray-800">
              Our <span className="text-gradient">Collection</span>
            </h1>
            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              Explore our full range of premium ice cream flavors
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {toppings.map((topping, index) => (
              <ProductCard
                key={topping.id}
                topping={topping}
                selectedSize={selectedSizes[topping.id] || '330ml'}
                quantity={getQuantity(topping.id, selectedSizes[topping.id] || '330ml')}
                onAdd={(sizeId) => addItem(topping.id, sizeId)}
                onRemove={() => {
                  const sizeId = selectedSizes[topping.id] || '330ml';
                  // handled in parent
                }}
                onSizeChange={(sizeId) => {
                  setSelectedSizes(prev => ({
                    ...prev,
                    [topping.id]: sizeId
                  }));
                }}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}