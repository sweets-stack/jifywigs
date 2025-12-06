import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JifyWigs - Premium Human Hair Wigs & Wig Care Services',
  description: 'Nigeria\'s leading provider of premium human hair wigs and professional wig care services.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gray-50">
        {/* Black top background (10px) */}
        <div className="fixed top-0 left-0 right-0 h-24 bg-black z-40"></div>
        
        <AuthProvider>
          <Header />
          <CartProvider>
            <main className="relative z-10 pt-5"> {/* Add padding top to push content down */}
              {children}
             <Footer />
            </main>
          </CartProvider>
          
        </AuthProvider>
      </body>
    </html>
  );
}