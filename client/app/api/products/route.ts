import { NextRequest, NextResponse } from 'next/server';

const EXPRESS_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Build query string
    const queryString = searchParams.toString();
    const url = `${EXPRESS_API_URL}/products${queryString ? `?${queryString}` : ''}`;
    
    console.log(`🔄 Proxying request to: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
    
  } catch (error: any) {
    console.error('❌ Error proxying products request:', error);
    
    // Return empty array on error
    return NextResponse.json([], { status: 200 });
  }
}