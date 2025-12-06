'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!acceptTerms) {
      alert('Please accept the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });
      
      if (res.ok) {
        const data = await res.json();
        document.cookie = `token=${data.token}; path=/; secure; samesite=strict`;
        alert('Registration successful! Welcome to JifyWigs!');
        window.location.href = '/dashboard';
      } else {
        const error = await res.json();
        alert(error.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    alert('Google sign-up will be implemented');
  };

  const handleAppleSignUp = () => {
    alert('Apple sign-up will be implemented');
  };

  const checkPasswordStrength = (password: string) => {
    const checks = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    return {
      checks,
      strength: (passedChecks / totalChecks) * 100,
    };
  };

  const passwordStrength = checkPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-jify-primary-500 to-jify-primary-600 mb-4">
            <span className="text-2xl font-bold text-white">JW</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join JifyWigs today</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Registration Form FIRST */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full h-12"
                  placeholder="John Doe"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-12"
                  placeholder="+234 800 000 0000"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-12"
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative mb-3">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full h-12 pr-12"
                  placeholder="Create a strong password"
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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Password strength</span>
                    <span className={`font-medium ${
                      passwordStrength.strength < 50 ? 'text-red-500' :
                      passwordStrength.strength < 80 ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {passwordStrength.strength < 50 ? 'Weak' :
                       passwordStrength.strength < 80 ? 'Medium' : 'Strong'}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        passwordStrength.strength < 50 ? 'bg-red-500' :
                        passwordStrength.strength < 80 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                  
                  {/* Password Requirements */}
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      {passwordStrength.checks.minLength ? 
                        <FaCheck className="w-4 h-4 text-green-500 mr-2" /> : 
                        <FaTimes className="w-4 h-4 text-red-400 mr-2" />}
                      At least 8 characters
                    </div>
                    <div className="flex items-center">
                      {passwordStrength.checks.hasUpperCase ? 
                        <FaCheck className="w-4 h-4 text-green-500 mr-2" /> : 
                        <FaTimes className="w-4 h-4 text-red-400 mr-2" />}
                      One uppercase letter
                    </div>
                    <div className="flex items-center">
                      {passwordStrength.checks.hasNumber ? 
                        <FaCheck className="w-4 h-4 text-green-500 mr-2" /> : 
                        <FaTimes className="w-4 h-4 text-red-400 mr-2" />}
                      One number
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full h-12 pr-12"
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                id="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-jify-primary-600 rounded focus:ring-jify-primary-500"
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <Link href="/terms" className="text-jify-primary-600 hover:text-jify-primary-700 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-jify-primary-600 hover:text-jify-primary-700 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-jify-primary-500 to-jify-primary-600 hover:from-jify-primary-600 hover:to-jify-primary-700 text-white font-semibold"
              disabled={isLoading || !acceptTerms}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Sign Up Buttons SECOND */}
          <div className="space-y-4 mb-8">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-gray-300 hover:bg-gray-50"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
            >
              <FcGoogle className="w-5 h-5 mr-3" />
              Sign up with Google
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-gray-300 hover:bg-gray-50"
              onClick={handleAppleSignUp}
              disabled={isLoading}
            >
              <AiFillApple className="w-5 h-5 mr-3" />
              Sign up with Apple
            </Button>
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-jify-primary-600 hover:text-jify-primary-700">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} JifyWigs. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}