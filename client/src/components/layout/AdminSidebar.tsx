// components/admin/AdminSidebar.tsx - FIXED
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  CubeIcon,
  CalendarIcon,
  ShoppingBagIcon,
  UsersIcon,
  AcademicCapIcon,
  CogIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon, exact: true },
    { name: 'Products', href: '/admin/products', icon: CubeIcon, exact: false },
    { name: 'Services', href: '/admin/services', icon: CalendarIcon, exact: false },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBagIcon, exact: false },
    { name: 'Customers', href: '/admin/customers', icon: UsersIcon, exact: false },
    { name: 'Bookings', href: '/admin/bookings', icon: CalendarIcon, exact: false },
    { name: 'Training', href: '/admin/training', icon: AcademicCapIcon, exact: false },
    { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon, exact: false },
    { name: 'Settings', href: '/admin/settings', icon: CogIcon, exact: false },
  ];

  // Helper function to check if item is active
  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    } else {
      // For non-exact matches, check if current path starts with the href
      // Special case for /admin to not match /admin/products
      if (href === '/admin') {
        return pathname === '/admin';
      }
      return pathname?.startsWith(href + '/') || pathname === href;
    }
  };

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col mt-9">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-jify-primary to-jify-primary/80 flex items-center justify-center">
            <span className="text-white font-bold">J</span>
          </div>
          <div>
            <span className="text-jify-primary font-bold text-xl">JifyWigs</span>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-jify-primary to-jify-primary/80 flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || 'Admin User'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            <div className="mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-jify-primary/10 text-jify-primary">
                {user?.role?.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                active
                  ? 'bg-jify-primary-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${active ? 'text-white' : 'text-gray-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-3">
          <Link
            href="/"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3 text-gray-400" />
            Back to Store
          </Link>
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};