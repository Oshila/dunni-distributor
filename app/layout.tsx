import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from './providers/CartProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "joiiee.treats - Premium Ice Cream",
  description: "Crafted with love, delivered with joy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}