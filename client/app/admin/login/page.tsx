'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isAdmin, adminLogin } = useAuth();

  // Simple redirect if already authenticated as admin
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      console.log('✅ Already admin, redirecting...');
      const redirectUrl = searchParams.get('callbackUrl') || '/admin';
      router.push(redirectUrl);
    }
  }, [isAuthenticated, isAdmin, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    
    try {
      console.log('🔐 Attempting admin login...');
      const user = await adminLogin(email, password);
      
      console.log('✅ Admin login successful, user:', user);
      
      // Wait a moment for state to update, then redirect
      setTimeout(() => {
        const redirectUrl = searchParams.get('callbackUrl') || '/admin';
        console.log('🔄 Redirecting to:', redirectUrl);
        router.push(redirectUrl);
      }, 100);
      
    } catch (error: any) {
      console.error('❌ Admin login error:', error);
      setError(error.message || 'Admin login failed. Please check your credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Show loading state while checking auth
  if (isAuthenticated && isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jify-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-6">
        {/* Logo */}
        <div className="text-center mb-8">
          
          <h1 className="text-3xl font-bold text-gray-900">JifyWigs Admin Portal</h1>
          <p className="text-gray-600 mt-2">Administrator access only</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-jify-primary-100">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12"
                placeholder="admin@jifywigs.com"
                disabled={isLoggingIn}
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 pr-12"
                  placeholder="••••••••"
                  disabled={isLoggingIn}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoggingIn}
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-jify-primary-600 to-jify-primary-700 hover:from-jify-primary-700 hover:to-jify-primary-800 text-white font-semibold"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0-6.627 5.373-12 12-12v4c-4.97 0-9 4.03-9 9h4z"></path>
                  </svg>
                  Verifying Admin Access...
                </span>
              ) : 'Sign In as Admin'}
            </Button>

            <div className="text-center mt-4 pt-4 border-t border-gray-200">
              <Link 
                href="/login" 
                className="text-sm text-jify-primary-600 hover:text-jify-primary-700 font-medium"
              >
                ← Customer Login Portal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}