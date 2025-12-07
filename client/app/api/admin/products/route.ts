// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { proxyToExpress } from '../../../../lib/api-proxy';

export async function GET(request: NextRequest) {
  try {
    const { status, data } = await proxyToExpress(request, '/products');
    return NextResponse.json(data, { status });
  } catch (error: any) {
    console.error('Products proxy error:', error);
    return NextResponse.json([], { status: 200 });
  }
}