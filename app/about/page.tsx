'use client';

import { motion } from 'framer-motion';
import { Heart, Award, Users, Leaf } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every scoop is crafted with passion and care, using only the finest ingredients.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We use only natural, high-quality ingredients to create the perfect ice cream.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in bringing joy to our community through delicious ice cream.'
    },
    {
      icon: Leaf,
      title: 'Sustainable',
      description: 'We are committed to sustainable practices and eco-friendly packaging.'
    }
  ];
  
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="bg-gradient-primary py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-6xl mb-4 block">🍦</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
                Our <span className="text-gradient">Story</span>
              </h1>
              <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                joiiee.treats was born from a simple idea: to create the most delicious, 
                premium ice cream that brings joy to every single person who tastes it.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Values */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Our <span className="text-gradient">Values</span>
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-pink-50/50 rounded-3xl p-6 text-center hover:shadow-soft transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}