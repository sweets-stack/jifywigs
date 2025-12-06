// app/api/admin/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Order } from '@jifywigs/shared/models';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')
      .lean();
    
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}