import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@jifywigs/shared/models';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('Starting admin creation...');
    
    await connectToDatabase();
    
    const body = await request.json();
    console.log('Request body received:', body);
    
    const { email, password, name } = body;
    
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: `User with email ${email} already exists` },
        { status: 400 }
      );
    }
    
    // Create admin
    const hashedPassword = await bcrypt.hash(password, 12);
    const adminUser = await User.create({
      email,
      password: hashedPassword,
      name: name || 'Admin',
      role: 'admin',
      isVerified: true,
    });
    
    console.log('Admin created successfully:', adminUser.email);
    
    return NextResponse.json({
      success: true,
      message: 'Admin created successfully',
      user: {
        id: adminUser._id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      }
    });
    
  } catch (error: any) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to create admin',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
