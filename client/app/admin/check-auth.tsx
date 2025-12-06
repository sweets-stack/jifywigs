'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAuthCheck() {
  const router = useRouter();
  
  useEffect(() => {
    const checkAdmin = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          const isAdmin = ['admin', 'super_admin', 'manager'].includes(userData.role);
          
          if (!isAdmin) {
            console.log('❌ Not admin, redirecting to dashboard');
            router.push('/dashboard');
          }
        } catch (error) {
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
    };
    
    checkAdmin();
  }, [router]);
  
  return null;
}