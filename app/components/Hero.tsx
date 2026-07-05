'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Star, Truck, Shield, Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 sm:pt-28 overflow-hidden">
      {/* Background with fashion pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-pink-50" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 pt-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-rose-100"
            >
              <Sparkles size={16} className="text-rose-500" />
              <span className="text-xs font-semibold text-gray-700">New Arrivals</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span className="text-xs font-medium text-rose-500">Spring/Summer 2026</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1]"
            >
              <span className="text-gray-800">Elevate Your</span>
              <br />
              <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 bg-clip-text text-transparent">
                Style Game
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 max-w-md leading-relaxed"
            >
              Discover premium fashion that speaks for you. From elegant dresses to statement accessories — curated just for you.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Shop Now
                <ShoppingBag size={18} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-gray-100"
              >
                Our Story
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8 pt-4 flex-wrap"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  <Truck size={18} className="text-rose-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Free Delivery</p>
                  <p className="text-xs text-gray-500">On orders over ₦50,000</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  <Shield size={18} className="text-rose-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Quality Guarantee</p>
                  <p className="text-xs text-gray-500">100% authentic</p>
                </div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-6 pt-2"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-sm font-medium text-gray-700 ml-1">4.9/5</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-600">2,500+ Happy Customers</span>
            </motion.div>
          </motion.div>

          {/* Right Content - Fashion Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Main Fashion Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-[120px] sm:text-[180px] leading-none">👗</span>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-rose-100 max-w-[140px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-lg">
                    🛍️
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">New Collection</p>
                    <p className="text-[10px] text-gray-500">50+ styles</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-0 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-rose-100 max-w-[120px]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-lg">
                    ⭐
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">4.9/5</p>
                    <p className="text-[10px] text-gray-500">1.2k reviews</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
                className="absolute bottom-20 right-0 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-rose-100 max-w-[110px]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-lg">
                    💃
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Trendy</p>
                    <p className="text-[10px] text-gray-500">Affordable</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Sale Tag */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [-5, 5, -5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-3 -left-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1.5 rounded-full shadow-lg"
              >
                <span className="text-xs font-bold">🔥 20% OFF</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};