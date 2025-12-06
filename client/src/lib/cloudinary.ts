// client/src/lib/auth.ts
// For client-side, we only need type-safe session check
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export interface AuthSession {
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Client-side hook already exists — this is for server actions
export async function getServerSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) return null;

  try {
    // In real app: decode JWT and fetch user
    // For now: mock
    return {
      user: {
        id: 'mock-user-id',
        name: 'Mock User',
        email: 'mock@example.com',
        role: 'customer'
      }
    } as AuthSession;
  } catch {
    return null;
  }
}