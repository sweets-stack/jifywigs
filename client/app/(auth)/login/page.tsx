'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, login } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log('🔄 User already authenticated, checking role...');
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          const isAdminUser = ['admin', 'super_admin', 'manager'].includes(userData.role);
          
          if (isAdminUser) {
            console.log('🔄 Admin detected, redirecting to admin panel');
            router.push('/admin');
          } else {
            console.log('🔄 Regular user, redirecting to dashboard');
            const redirectUrl = searchParams.get('callbackUrl') || '/dashboard';
            router.push(redirectUrl);
          }
        } catch (error) {
          console.error('❌ Error parsing user data:', error);
          router.push('/dashboard');
        }
      }
    }
  }, [isAuthenticated, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const user = await login(email, password);
      
      // Check user role and redirect accordingly
      const isAdminUser = ['admin', 'super_admin', 'manager'].includes(user.role);
      
      if (isAdminUser) {
        console.log('✅ Admin logged in, redirecting to admin panel');
        router.push('/admin');
      } else {
        console.log('✅ Regular user logged in, redirecting to dashboard');
        const redirectUrl = searchParams.get('callbackUrl') || '/dashboard';
        router.push(redirectUrl);
      }
    } catch (error: any) {
      console.error('❌ Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'}/auth/google`;
  };

  const handleAppleSignIn = () => {
    alert('Apple Sign In will be available soon!');
  };

  // Show loading screen if already authenticated (redirecting)
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jify-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6">
        {/* Logo */}
        <div className="text-center mb-8">          
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your JifyWigs account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
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
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-jify-primary-600 hover:text-jify-primary-700">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 pr-12"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-jify-primary-500 to-jify-primary-600 hover:from-jify-primary-600 hover:to-jify-primary-700 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </Button>
            
            
          </form>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-transparent shadow-lg text-black hover:bg-gray-200"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <FcGoogle className="w-5 h-5 mr-3" />
              Continue with Google
            </Button>
           </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-semibold text-jify-primary-600 hover:text-jify-primary-700">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>By signing in, you agree to our <Link href="/terms" className="text-jify-primary-600 hover:underline">Terms</Link> and <Link href="/privacy" className="text-jify-primary-600 hover:underline">Privacy Policy</Link></p>
        </div>
      </div>
    </div>
  );
}