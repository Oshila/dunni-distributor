'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { CartDrawer } from '@/app/components/CartDrawer';
import { ProductCard } from '@/app/components/ProductCard';
import { getProducts } from '@/app/services/productService';

export default function MenuPage() {
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

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 bg-gradient-to-b from-rose-50 to-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">
              Our <span className="text-gradient">Collection</span>
            </h1>
            <p className="text-gray-500 mt-2">Premium fashion for every occasion</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id || index} {...product} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}