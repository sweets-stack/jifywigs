'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon, 
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

// Define types
interface DropdownItem {
  name: string;
  href: string;
}

interface NavLink {
  name: string;
  href?: string;
  dropdown?: boolean;
}

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [promptType, setPromptType] = useState<'wishlist' | 'cart' | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const { items: cartItems, totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600); // 1.5 second delay

    return () => clearTimeout(timer);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  const handleDropdown = (name: string, forceOpen?: boolean) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setOpenDropdown(forceOpen ? name : openDropdown === name ? null : name);
  };

  // All Wigs dropdown items
  const allWigsDropdownItems: DropdownItem[] = [
    // Categories
    { name: 'Bone Straight', href: '/shop?category=bone-straight' },
    { name: 'Curly', href: '/shop?category=curly' },
    { name: 'Colored', href: '/shop?category=colored' },
    { name: 'Braided', href: '/shop?category=braided' },
    { name: 'Men\'s Hair', href: '/shop?category=mens' },
    
    // Types & Lace
    { name: 'Frontal Wigs', href: '/shop?lace=frontal' },
    { name: 'Closure Wigs', href: '/shop?lace=closure' },
    { name: 'Glueless Wigs', href: '/shop?type=glueless' },
    
    // Special
    { name: 'Wig Accessories', href: '/shop?category=accessories' },
    { name: 'Hair Tools', href: '/shop?category=tools' },
    { name: 'New Arrivals', href: '/shop?new=true' },
    { name: 'On Sale', href: '/shop?sale=true' },
    { name: 'Wig Care Services', href: '/services' },
  ];

  const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'All Wigs', dropdown: true },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Wholesale', href: '/wholesale' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      // Show login prompt instead of redirecting
      setPromptType('cart');
      setShowLoginPrompt(true);
    } else {
      router.push('/cart');
    }
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      // Show login prompt instead of redirecting
      setPromptType('wishlist');
      setShowLoginPrompt(true);
    } else {
      router.push('/dashboard/wishlist');
    }
  };

  const handleLoginPromptAction = () => {
    setShowLoginPrompt(false);
    router.push('/login');
  };

  const handleCancelPrompt = () => {
    setShowLoginPrompt(false);
    setPromptType(null);
  };

  // Helper to safely close dropdown
  const closeDropdown = () => setOpenDropdown(null);

  return (
    <header 
      className={`sticky top-0 z-50 bg-black shadow-md transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
      style={{ top: '10px' }} // Position header below the black top bar
    >
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in duration-300">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0">
                <ExclamationCircleIcon className="w-6 h-6 text-jify-primary-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Login Required
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {promptType === 'wishlist' 
                    ? 'You need to login to view your wishlist.' 
                    : 'You need to login to view your cart.'}
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={handleCancelPrompt}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleLoginPromptAction}
                className="flex-1 bg-jify-primary-500 hover:bg-jify-primary-600 text-white"
              >
                Login Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className={`hidden md:flex items-center justify-between px-6 py-2 text-sm bg-black transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-center">
          <span className="text-gray-300">Free Delivery on Orders Over ₦50,000</span>
        </div>
        <div className="flex space-x-6">
          <button 
            onClick={() => router.push('/track')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Track Order
          </button>
          <button 
            onClick={() => router.push('/faq')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            FAQs
          </button>
          <button 
            onClick={() => router.push('/blog')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Blog
          </button>
        </div>
      </div>

      {/* Main Nav */}
      <div className={`px-4 sm:px-6 lg:px-8 py-4 transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={closeDropdown}>
            <div className="relative inline-flex items-center">
              <span className="text-white font-bold font-heading text-3xl tracking-tight relative">
                JifyWigs
                {/* TM positioned above and to the right */}
                <span className="absolute -top-1 -right-2.5 text-[8px] font-bold text-gray-300 leading-none">
                  TM
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => handleDropdown('all-wigs')}
                  onMouseLeave={() => {
                    dropdownTimeout.current = setTimeout(() => handleDropdown('', false), 300);
                  }}
                >
                  <button
                    onClick={() => handleDropdown('all-wigs')}
                    className="flex items-center font-medium text-white hover:text-jify-primary-300 transition-colors"
                  >
                    {link.name}
                    <ChevronDownIcon className="w-4 h-4 ml-1 text-white" />
                  </button>
                  {openDropdown === 'all-wigs' && (
                    <div
                      className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 z-20"
                      onMouseEnter={() => handleDropdown('all-wigs', true)}
                      onMouseLeave={() => handleDropdown('', false)}
                    >
                      <div className="p-3 grid grid-cols-2 gap-2">
                        {allWigsDropdownItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="px-3 py-2.5 text-sm rounded hover:bg-jify-primary-50/10 text-gray-900 hover:text-jify-primary-500 transition-colors flex items-center"
                            onClick={closeDropdown}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href!}
                  className="font-medium text-white hover:text-jify-primary-300 transition-colors"
                  onClick={closeDropdown}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist - Always Visible */}
            <button 
              className="relative p-2 text-white hover:text-jify-primary-300 transition-colors"
              onClick={handleWishlistClick}
              aria-label="Wishlist"
            >
              <HeartIcon className="w-6 h-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Cart - Always Visible */}
            <button 
              className="relative p-2 text-white hover:text-jify-primary-300 transition-colors"
              onClick={handleCartClick}
              aria-label="Shopping Cart"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-jify-primary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Authentication Buttons */}
            {isAuthenticated ? (
              // Logged In - Show Profile Dropdown
              <div className="relative">
                <button
                  className="flex items-center space-x-2 p-2 text-white hover:text-jify-primary-300 transition-colors"
                  onClick={() => handleDropdown('profile')}
                >
                  <div className="w-8 h-8 rounded-full bg-jify-primary-500/80 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:inline text-sm font-medium">
                    {user?.name?.split(' ')[0] || 'Account'}
                  </span>
                  <ChevronDownIcon className="w-4 h-4 hidden md:block text-white" />
                </button>
                
                {openDropdown === 'profile' && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-20">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 hover:text-jify-primary-500"
                        onClick={closeDropdown}
                      >
                        Dashboard
                        <ChevronRightIcon className="w-4 h-4 ml-auto" />
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 hover:text-jify-primary-500"
                          onClick={closeDropdown}
                        >
                          Admin Panel
                          <ChevronRightIcon className="w-4 h-4 ml-auto" />
                        </Link>
                      )}
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => {
                          handleLogout();
                          closeDropdown();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-900"
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Not Logged In - Show Login/Signup
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    router.push('/login');
                    closeDropdown();
                  }}
                  className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 hover:text-white"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    router.push('/register');
                    closeDropdown();
                  }}
                  className="bg-jify-primary-500 hover:bg-jify-primary-600 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white hover:text-jify-primary-300"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-y-0 right-0 w-80 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center bg-white justify-between p-5 border-b">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-jify-primary-500 font-bold text-xl">JifyWigs</span>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto bg-white max-h-[calc(100vh-120px)]">
              {/* Mobile Navigation Links */}
              <div className="space-y-1 mb-6">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div key={link.name} className="mb-4">
                      <button
                        className="flex justify-between w-full items-center font-medium py-2.5 text-gray-900"
                        onClick={() => setOpenDropdown(openDropdown === 'mobile-all-wigs' ? null : 'mobile-all-wigs')}
                      >
                        {link.name}
                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${openDropdown === 'mobile-all-wigs' ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === 'mobile-all-wigs' && (
                        <div className="ml-4 mt-2 space-y-2 max-h-60 overflow-y-auto pr-2">
                          {allWigsDropdownItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block text-sm text-gray-600 hover:text-jify-primary-500 py-1.5 px-3 rounded hover:bg-jify-primary-50/10"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href!}
                      className="block font-medium py-2.5 text-gray-900 hover:text-jify-primary-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </div>

              {/* Mobile Auth Section */}
              <div className="pt-6 mt-6 border-t border-gray-100">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 px-2 py-3 bg-gray-50 rounded-lg mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-jify-primary-500 to-jify-primary-600 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
                        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-lg mb-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                      <ChevronRightIcon className="w-4 h-4" />
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-lg mb-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Admin Panel
                        <ChevronRightIcon className="w-4 h-4" />
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-red-600 border border-red-200 rounded-lg font-medium hover:bg-red-50"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        router.push('/login');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-white border border-jify-primary-500 text-jify-primary-500 hover:bg-jify-primary-50/10"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        router.push('/register');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-jify-primary-500 hover:bg-jify-primary-600 text-white"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};