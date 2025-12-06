// client/src/components/marketing/NewsletterSignup.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface NewsletterSignupProps {
  location?: 'footer' | 'hero' | 'sidebar';
  className?: string;
}

export const NewsletterSignup = ({ location = 'footer', className = '' }: NewsletterSignupProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  if (location === 'hero') {
    return (
      <div className={`max-w-md ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-jify-primary-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="font-semibold text-gray-700">Newsletter</span>
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jify-primary-500"
            required
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    );
  }

  // Footer variant (default)
  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-jify-primary-500 focus:ring-1 focus:ring-jify-primary-500"
            required
          />
          <div className="absolute right-3 top-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-jify-primary-600 hover:bg-jify-primary-700 text-white"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Subscribing...
            </span>
          ) : isSubmitted ? (
            <span className="flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Subscribed!
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Subscribe
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          )}
        </Button>
        
        {isSubmitted && (
          <p className="text-green-400 text-sm text-center">
            Thanks for subscribing! Check your email for confirmation.
          </p>
        )}
        
        <p className="text-gray-400 text-xs text-center">
          By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
};