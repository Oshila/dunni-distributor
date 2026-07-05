'use client';

import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Hero } from '@/app/components/Hero';
import { FeaturedProducts } from '@/app/components/FeaturedProducts';
import { Newsletter } from '@/app/components/Newsletter';
import { CartDrawer } from '@/app/components/CartDrawer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FeaturedProducts />
      <Newsletter />
      <Footer />
      <CartDrawer />
    </>
  );
}