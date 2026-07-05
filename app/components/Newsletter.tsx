'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useState } from 'react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl p-8 sm:p-12 text-center border border-rose-100"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Get <span className="text-gradient">10% Off</span>
          </h2>
          <p className="text-gray-500 mb-6">
            Subscribe for exclusive offers and new collection announcements
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:outline-none transition-colors bg-white text-gray-700 placeholder-gray-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Subscribe
            </button>
          </form>

          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-500 text-sm mt-3"
            >
              ✅ Subscribed successfully! Check your email.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};