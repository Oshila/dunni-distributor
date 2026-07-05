'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { getProducts } from '@/app/services/productService';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts();
      if (result.success) {
        // Ensure each product has default values
        const productsWithDefaults = (result.products || []).map((p: any) => ({
          ...p,
          sizes: Array.isArray(p.sizes) ? p.sizes : ['M'],
          colors: Array.isArray(p.colors) ? p.colors : [],
          price: p.price || 0,
          inStock: p.inStock !== undefined ? p.inStock : true,
        }));
        setProducts(productsWithDefaults);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-500">Loading products...</p>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Premium <span className="text-gradient">Fashion</span>
            </h2>
            <p className="text-gray-500 mt-3">No products yet. Add some from the admin panel!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-500 text-sm font-semibold rounded-full mb-4">
            Our Collection
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Premium <span className="text-gradient">Fashion</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Discover our curated collection of premium fashion pieces
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id || index} 
              {...product} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};