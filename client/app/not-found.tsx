// client/app/not-found.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home, Search, ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Icon Container */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping opacity-20">
            <div className="w-48 h-48 bg-jify-primary/30 rounded-full mx-auto"></div>
          </div>
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-jify-primary/20 to-jify-primary/10 rounded-full blur-xl"></div>
            <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center">
              <div className="relative">
                <AlertCircle className="w-16 h-16 text-jify-primary-500 bg-white animate-pulse-slow" />
                
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Page Not Found
            </h1>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-jify-primary/10 to-pink-100 text-jify-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Search className="w-4 h-4" />
              We couldn't find what you're looking for
            </div>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              The page you're looking for might have been moved, deleted, or never existed.
              Don't worry though, we can help you find your way back!
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Quick Suggestions
            </h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-xs font-bold">1</span>
                </div>
                <span className="text-gray-700">Check the URL for typos</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-xs font-bold">2</span>
                </div>
                <span className="text-gray-700">Try using our search feature</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-xs font-bold">3</span>
                </div>
                <span className="text-gray-700">Browse our popular categories</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="flex items-center justify-center gap-2 px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
            <Link href="/">
              <Button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-jify-primary to-jify-primary/90 hover:from-jify-primary/90 hover:to-jify-primary">
                <Home className="w-4 h-4" />
                Go to Homepage
              </Button>
            </Link>
            <Button
              onClick={() => window.location.reload()}
              variant="ghost"
              className="flex items-center justify-center gap-2 px-6 py-3"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>

          {/* Popular Links */}
          <div className="pt-8 border-t border-gray-200 mt-8">
            <p className="text-gray-500 text-sm mb-4">Popular Pages</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { label: 'Shop', href: '/shop' },
                { label: 'Services', href: '/services' },
                { label: 'Contact', href: '/contact' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Blog', href: '/blog' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg border border-gray-200 hover:border-jify-primary hover:text-jify-primary transition-all duration-200 text-sm font-medium shadow-sm hover:shadow"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="relative mt-12">
            <div className="absolute -top-6 left-1/4 w-8 h-8 bg-jify-primary/20 rounded-full"></div>
            <div className="absolute -bottom-4 right-1/4 w-6 h-6 bg-jify-primary/10 rounded-full"></div>
            <div className="absolute top-4 right-1/3 w-4 h-4 bg-pink-300/20 rounded-full"></div>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Still lost?{' '}
                <Link 
                  href="/contact" 
                  className="text-jify-primary hover:underline font-medium"
                >
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}