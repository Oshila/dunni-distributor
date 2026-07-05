'use client';

import { motion } from 'framer-motion';
import { Heart, Award, Users, Leaf, Sparkles, ShoppingBag } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { CartDrawer } from '@/app/components/CartDrawer';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Made with Passion',
      description: 'Every piece is carefully selected and curated with love for fashion and style.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We source only the finest materials and fabrics for our collections.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in empowering our community through affordable luxury fashion.'
    },
    {
      icon: Leaf,
      title: 'Sustainable Fashion',
      description: 'We are committed to ethical sourcing and sustainable fashion practices.'
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-rose-50 via-white to-pink-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-6xl mb-4 block">👗</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
                Our <span className="text-gradient">Story</span>
              </h1>
              <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                Dunni the Distributor was born from a passion for fashion. 
                We believe everyone deserves to look and feel their best with 
                premium quality clothing and accessories.
              </p>
              <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
                <span className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                  <Sparkles size={16} className="text-rose-500" />
                  <span className="text-sm text-gray-700">Est. 2026</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                  <ShoppingBag size={16} className="text-rose-500" />
                  <span className="text-sm text-gray-700">Premium Collections</span>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-500 text-sm font-semibold rounded-full mb-4">
                Our Values
              </span>
              <h2 className="text-3xl font-bold text-gray-800">
                What We <span className="text-gradient">Stand For</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-rose-50/50 rounded-3xl p-6 text-center hover:shadow-soft transition-all border border-rose-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gradient-to-br from-rose-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-soft border border-rose-100 text-center"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                To make premium fashion accessible to everyone by curating 
                high-quality, stylish pieces that empower individuals to express 
                their unique personality through what they wear.
              </p>
              <div className="flex items-center justify-center gap-2 mt-6">
                <span className="text-2xl">✨</span>
                <span className="text-sm font-medium text-gray-700">Style That Speaks For You</span>
                <span className="text-2xl">✨</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}