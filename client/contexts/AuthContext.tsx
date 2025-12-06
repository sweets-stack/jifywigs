// contexts/AuthContext.tsx - Fixed Version
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Use environment variable or default to Express server
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'staff' | 'super_admin' | 'manager' | 'customer';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  adminLogin: (email: string, password: string) => Promise<User>;
  register: (userData: any) => Promise<User>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState<string | null>(null);
  const router = useRouter();

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin' || user?.role === 'manager';
  const isStaff = user?.role === 'staff' || isAdmin;

  // Handle redirects
  useEffect(() => {
    if (shouldRedirect) {
      console.log('🔄 Performing redirect to:', shouldRedirect);
      router.push(shouldRedirect);
      setShouldRedirect(null);
    }
  }, [shouldRedirect, router]);

  // Initialize auth from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('token') || localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('user') || localStorage.getItem('auth_user');
        
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          console.log('✅ Auth initialized from localStorage, user role:', JSON.parse(storedUser).role);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        clearAuth();
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const clearAuth = () => {
    setToken(null);
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  };

  const updateAuthState = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    
    // Set cookie for middleware
    document.cookie = `token=${newToken}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
  };

  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      console.log('🔐 Attempting login for:', email);
      console.log('🌐 Using Express backend at:', `${API_BASE_URL}/auth/login`);
      
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      console.log('📨 Login response:', data);
      
      if (res.ok && data.token && data.user) {
        console.log('✅ Login successful, user role:', data.user.role);
        updateAuthState(data.token, data.user);
        return data.user;
      } else {
        throw new Error(data.message || data.error || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (email: string, password: string): Promise<User> => {
    const user = await login(email, password);
    
    // Check if user has admin role
    if (!['admin', 'super_admin', 'manager'].includes(user.role)) {
      clearAuth();
      throw new Error('Access denied. Admin privileges required.');
    }
    
    return user;
  };

  const register = async (userData: any): Promise<User> => {
    setIsLoading(true);
    try {
      console.log('🌐 Using Express backend at:', `${API_BASE_URL}/auth/register`);
      
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData),
      });
      
      const data = await res.json();
      console.log('📨 Registration response:', data);
      
      if (res.ok && data.token && data.user) {
        updateAuthState(data.token, data.user);
        return data.user;
      } else {
        throw new Error(data.message || data.error || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint on Express backend if needed
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      clearAuth();
      setShouldRedirect('/');
    }
  };

  const refreshUser = async () => {
    if (!token || typeof window === 'undefined') return;
    
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('auth_user', JSON.stringify(data.user));
        }
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  // Add API interceptor for token refresh (optional)
  useEffect(() => {
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      let [resource, config = {}] = args;
      const url = typeof resource === 'string' ? resource : (resource as Request).url;
      
      // Add token to requests to Express backend
      if (url?.includes(API_BASE_URL) && token) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${token}`,
        };
      }
      
      return originalFetch(resource, config);
    };
    
    return () => {
      window.fetch = originalFetch;
    };
  }, [token]);

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-jify-primary mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Initializing authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        adminLogin,
        register,
        logout,
        isAuthenticated: !!token,
        isAdmin,
        isStaff,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}