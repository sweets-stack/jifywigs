// client/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📦 Proxy received:', body);
    
    // Point to backend on port 3001
    const backendUrl = 'http://localhost:3001/api/auth/register';
    console.log('🔄 Forwarding to:', backendUrl);
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    console.log('✅ Backend response:', { status: response.status, data });
    
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('❌ Proxy error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}