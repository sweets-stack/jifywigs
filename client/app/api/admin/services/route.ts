// app/api/admin/services/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Return empty array since Express doesn't have /admin/services
  return NextResponse.json([], { status: 200 });
}

export async function POST(request: NextRequest) {
  // Return 501 Not Implemented
  return NextResponse.json(
    { 
      error: 'Service management not available in this version',
      message: 'Use the admin panel in Express backend directly'
    },
    { status: 501 }
  );
}