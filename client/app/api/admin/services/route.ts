// app/api/admin/services/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Service } from '@jifywigs/shared/models';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const services = await Service.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    
    const service = new Service(data);
    await service.save();
    
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}