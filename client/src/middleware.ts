import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  // ✅ PROTECT ADMIN ROUTES (except /admin/login)
  if (path.startsWith('/admin') && path !== '/admin/login') {
    if (!token) {
      console.log('🔒 No token for admin route, redirecting to admin login');
      const redirectUrl = new URL('/admin/login', request.url);
      redirectUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(redirectUrl);
    }
    // Token exists, let client-side handle role validation
    return NextResponse.next();
  }

  // ✅ PROTECT USER DASHBOARD ROUTES
  const userDashboardRoutes = [
    '/dashboard',
    '/profile',
    '/orders',
    '/wishlist',
    '/settings',
  ];

  if (userDashboardRoutes.some(route => path.startsWith(route))) {
    if (!token) {
      console.log('🔒 No token for dashboard route, redirecting to login');
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
