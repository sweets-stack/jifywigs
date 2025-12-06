import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    console.log('📊 Analytics API called');
    
    // Simple test response
    const testData = {
      overview: {
        totalOrders: 42,
        totalRevenue: 12500,
        totalCustomers: 156,
        totalProducts: 89
      },
      recentOrders: [
        { id: '1', customer: 'John Doe', amount: 199.99, status: 'completed' },
        { id: '2', customer: 'Jane Smith', amount: 299.99, status: 'pending' }
      ],
      topProducts: [
        { name: 'Product A', sales: 150 },
        { name: 'Product B', sales: 120 }
      ],
      revenueData: [
        { date: '2024-12-01', revenue: 1500 },
        { date: '2024-12-02', revenue: 2300 }
      ],
      timeRange: 'week'
    };
    
    return NextResponse.json(testData);
    
  } catch (error: any) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch analytics',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}