'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Star, Truck, Shield } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-rose-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-md border border-rose-100"
            >
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-medium text-gray-700">Premium Fashion</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs font-medium text-rose-500">New Arrivals</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="text-gray-800">Style That </span>
              <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">Speaks</span>
              <br />
              <span className="text-gray-800">For You</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 max-w-md leading-relaxed"
            >
              Discover the latest fashion trends. Premium quality clothes, bags, and accessories curated just for you.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Shop Now
                <ShoppingBag size={18} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-105"
              >
                Our Story
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8 pt-4 flex-wrap"
            >
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-rose-400" />
                <span className="text-sm text-gray-600">Fast delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-rose-400" />
                <span className="text-sm text-gray-600">Quality guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-400 text-lg">👗</span>
                <span className="text-sm text-gray-600">Curated collections</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Content - 3D Fashion Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Main Fashion Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[200px] leading-none">👗</div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 right-0 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-rose-100"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🛍️</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">New Collection</p>
                    <p className="text-xs text-gray-500">Spring/Summer 2026</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-0 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-rose-100"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">4.9/5</p>
                    <p className="text-xs text-gray-500">1,200+ reviews</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                className="absolute top-1/3 left-0 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-rose-100"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💃</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Trendy Styles</p>
                    <p className="text-xs text-gray-500">Affordable luxury</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};