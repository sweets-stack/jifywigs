'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  ShoppingBag, 
  Sparkles, 
  Heart, 
  User, 
  Settings,
  Menu,
  X,
  Bell,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: Home, exact: true },
  { name: 'My Orders', href: '/dashboard/orders', icon: ShoppingBag, exact: false },
  { name: 'Services', href: '/dashboard/services', icon: Sparkles, exact: false },
  { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart, exact: false },
  { name: 'Profile', href: '/dashboard/profile', icon: User, exact: false },
];

export const DashboardNav = () => {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    } else {
      if (href === '/dashboard') {
        return pathname === '/dashboard';
      }
      return pathname === href || pathname.startsWith(href + '/');
    }
  };

  return (
    <>
      {/* Mobile Menu Button - Positioned below Header */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-24 left-4 z-50 p-2 bg-jify-primary-600 text-white rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block w-64">
        <nav className="flex flex-col bg-gradient-to-b from-jify-primary-50 to-white border-r border-gray-200 h-[calc(100vh-4rem)]">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-jify-primary-500 to-jify-primary-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">JifyWigs</h1>
                <p className="text-xs text-jify-primary-600 font-medium">Customer Dashboard</p>
              </div>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-jify-primary-100 to-jify-primary-200 flex items-center justify-center">
                <User className="w-6 h-6 text-jify-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 truncate">{user?.name || 'Customer'}</h3>
                <p className="text-sm text-gray-500 truncate">{user?.email || 'customer@email.com'}</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-jify-primary-500 to-jify-primary-600 text-white shadow-md shadow-jify-primary-200'
                      : 'text-gray-700 hover:bg-jify-primary-50 hover:text-jify-primary-700'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-jify-primary-500'}`} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-jify-primary-50 hover:text-jify-primary-700 w-full transition-colors">
              <Bell className="w-5 h-5" />
              Notifications
            </button>
            <button 
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 w-full transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar Overlay - Adjusted for Header */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar - Starts below Header */}
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl overflow-y-auto mt-16">
            {/* Mobile Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <Link 
                href="/" 
                className="flex items-center gap-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-jify-primary-500 to-jify-primary-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">JifyWigs</h1>
                  <p className="text-xs text-jify-primary-600 font-medium">Dashboard</p>
                </div>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="p-4 space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                      active
                        ? 'bg-gradient-to-r from-jify-primary-500 to-jify-primary-600 text-white'
                        : 'text-gray-700 hover:bg-jify-primary-50'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-jify-primary-500'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile User Info */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-jify-primary-100 to-jify-primary-200 flex items-center justify-center">
                  <User className="w-5 h-5 text-jify-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user?.name || 'Customer'}</h3>
                  <p className="text-xs text-gray-500">{user?.email || 'customer@email.com'}</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};