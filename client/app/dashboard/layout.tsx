'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardNav } from '@/components/layout/DashboardNav';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?callbackUrl=/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jify-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-width content area that starts below the Header */}
      <div className="flex min-h-screen pt-16">
        {/* Desktop Sidebar - starts below Header */}
        <div className="hidden lg:block w-64 sticky top-18 h-[calc(100vh-4rem)]">
          <DashboardNav />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8">
          {/* IMPORTANT: Render DashboardNav for mobile menu button */}
          <div className="lg:hidden">
            <DashboardNav />
          </div>
          
          {/* Content Container */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
