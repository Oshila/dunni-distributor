'use client';

import Link from 'next/link';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
// Remove the social icons from lucide-react import

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">👗</span>
              <span className="text-xl font-bold text-white">Dunni</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium fashion that speaks for you. Elegant dresses, bags, and accessories curated just for you.
            </p>
            <div className="flex gap-3 mt-4">
              {/* Social Icons - Using emojis as fallback */}
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-rose-500 transition-colors">
                <span className="text-gray-300 text-sm">📸</span>
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-rose-500 transition-colors">
                <span className="text-gray-300 text-sm">🐦</span>
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-rose-500 transition-colors">
                <span className="text-gray-300 text-sm">📘</span>
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-rose-500 transition-colors">
                <span className="text-gray-300 text-sm">▶️</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/menu" className="hover:text-rose-400 transition-colors">Shop All</Link></li>
              <li><Link href="/about" className="hover:text-rose-400 transition-colors">About Us</Link></li>
              <li><Link href="/my-orders" className="hover:text-rose-400 transition-colors">My Orders</Link></li>
              <li><Link href="/admin" className="hover:text-rose-400 transition-colors">Admin</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-rose-400 transition-colors cursor-pointer">Dresses</li>
              <li className="hover:text-rose-400 transition-colors cursor-pointer">Bags</li>
              <li className="hover:text-rose-400 transition-colors cursor-pointer">Shoes</li>
              <li className="hover:text-rose-400 transition-colors cursor-pointer">Accessories</li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-rose-400 flex-shrink-0" />
                <span>+234 816 312 6734</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-rose-400 flex-shrink-0" />
                <span>hello@dunni.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-rose-400 flex-shrink-0" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 Dunni the Distributor. All rights reserved.</p>
          <p className="flex items-center gap-1">
            OshilaTech
          </p>
        </div>
      </div>
    </footer>
  );
};