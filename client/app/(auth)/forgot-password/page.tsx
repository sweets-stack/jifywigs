// client/app/(auth)/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const error = await res.json();
        alert(error.message || 'Failed to send reset email');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      alert('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-jify-primary-500 to-jify-primary-600 mb-4">
            <FaEnvelope className="w-8 h-8 text-white" />
          </div>
          
          {isSubmitted ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900">Check Your Email</h1>
              <p className="text-gray-600 mt-2">
                We've sent a password reset link to your email
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
              <p className="text-gray-600 mt-2">
                Enter your email to receive a reset link
              </p>
            </>
          )}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {isSubmitted ? (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <FaCheckCircle className="w-10 h-10 text-green-500" />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Sent!</h3>
                <p className="text-gray-600">
                  We've sent password reset instructions to:
                </p>
                <p className="font-medium text-gray-900 mt-1">{email}</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail('');
                    }}
                  >
                    Try Another Email
                  </Button>
                  
                  <Link href="/login">
                    <Button
                      type="button"
                      className="w-full bg-gradient-to-r from-jify-primary-500 to-jify-primary-600 hover:from-jify-primary-600 hover:to-jify-primary-700 text-white"
                    >
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12"
                    placeholder="you@example.com"
                    disabled={isLoading}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Enter the email address associated with your account
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-jify-primary-500 to-jify-primary-600 hover:from-jify-primary-600 hover:to-jify-primary-700 text-white font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Reset Link'}
                </Button>
              </form>

              {/* Back to Login */}
              <div className="mt-8 text-center">
                <Link href="/login" className="inline-flex items-center text-jify-primary-600 hover:text-jify-primary-700 font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? <Link href="/contact" className="text-jify-primary-600 hover:underline">Contact Support</Link></p>
        </div>
      </div>
    </div>
  );
}