'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍦</span>
              <span className="text-xl font-bold text-white">joiiee.treats</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium artisanal ice cream crafted with love and the finest ingredients.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/menu" className="hover:text-pink-400 transition-colors">Menu</Link></li>
              <li><Link href="/about" className="hover:text-pink-400 transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          {/* Flavors */}
          <div>
            <h4 className="text-white font-semibold mb-3">Popular Flavors</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-pink-400 transition-colors cursor-pointer">Loaded Ice Cream</li>
              <li className="hover:text-pink-400 transition-colors cursor-pointer">Oreos & Cream</li>
              <li className="hover:text-pink-400 transition-colors cursor-pointer">Plain Vanilla</li>
              <li className="hover:text-pink-400 transition-colors cursor-pointer">Loaded Chocolate</li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Get in Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>📱 +234 816 312 6734</li>
              <li>📧 hello@joiiee.com</li>
              <li>📍 Lagos, Nigeria</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 joiiee.treats. All rights reserved.</p>
          <p className="flex items-center gap-1">
           OshilaTech
          </p>
        </div>
      </div>
    </footer>
  );
};