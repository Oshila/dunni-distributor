'use client';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
      <Footer />
      <CartDrawer />
    </>
  );
}