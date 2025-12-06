'use client';

import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { MobileSidebar } from '@/components/admin/MobileSidebar';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  // Check if current path is login page
  const isLoginPage = pathname === '/admin/login';

  // If it's the login page, don't check auth - just render
  if (isLoginPage) {
    return <>{children}</>;
  }

  // For all other admin pages, check auth
  useEffect(() => {
    if (!isLoading) {
      console.log('🔍 Admin layout - Checking auth:', { isAuthenticated, isAdmin });
      
      if (!isAuthenticated || !isAdmin) {
        console.log('❌ Not authenticated or not admin, redirecting to admin login');
        router.push('/admin/login');
      } else {
        console.log('✅ Admin access granted');
        setIsCheckingAuth(false);
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  if (isLoading || isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jify-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated/admin (will redirect in useEffect)
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                type="button"
                className="lg:hidden -ml-2 p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
              
              <div className="flex-1 flex justify-end items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <div className="h-6 w-px bg-gray-200" />
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">
                      Admin Dashboard
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}