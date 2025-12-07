import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@jifywigs/shared/models';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const customers = await User.find({ role: 'customer' })
      .sort({ createdAt: -1 })
      .select('-password -__v')
      .lean();
    
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      [],
      { status: 200 }
    );
  }
}
