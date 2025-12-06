// app/api/admin/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Booking } from '@jifywigs/shared/models';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const bookings = await Booking.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}