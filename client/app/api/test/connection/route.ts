// app/api/test/connection/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing MongoDB connection...');
    
    // Try to connect
    const db = await connectToDatabase();
    
    // Check connection state
    const connectionState = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    
    return NextResponse.json({
      success: true,
      connection: 'Connected to MongoDB',
      connectionState: states[connectionState],
      host: mongoose.connection.host,
      name: mongoose.connection.name,
      models: Object.keys(mongoose.models),
      collections: (await mongoose.connection.db?.listCollections().toArray()) || []
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      env: {
        MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set'
      }
    }, { status: 500 });
  }
}