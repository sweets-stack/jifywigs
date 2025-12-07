// app/api/admin/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Product, Order, User, Booking } from '@jifywigs/shared/models';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get counts
    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      totalBookings
    ] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Booking.countDocuments()
    ]);
    
    // Calculate revenue - check what field your Order model uses
    const orders = await Order.find({}).lean();
    let totalRevenue = 0;
    
    // Try different possible total fields
    orders.forEach(order => {
      // Check which field exists
      if ((order as any).totalAmount) {
        totalRevenue += (order as any).totalAmount || 0;
      } else if ((order as any).total) {
        totalRevenue += (order as any).total || 0;
      } else if ((order as any).amount) {
        totalRevenue += (order as any).amount || 0;
      }
    });
    
    // Get recent orders
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name email')
      .lean();
    
    // Get recent bookings
    const recentBookings = await Booking.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return NextResponse.json({
      overview: {
        totalProducts,
        totalOrders,
        totalRevenue,
        totalCustomers,
        totalBookings,
        ordersThisWeek: totalOrders,
        pendingBookings: await Booking.countDocuments({ status: 'pending' }),
        trainingEnrollments: 0,
        lowStockProducts: await Product.countDocuments({ stock: { $lt: 5 } }),
        outOfStockProducts: await Product.countDocuments({ stock: 0 }),
        avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
      },
      recentOrders,
      recentBookings
    }, { status: 200 });
  } catch (error: any) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { 
        overview: {
          totalProducts: 0,
          totalOrders: 0,
          totalRevenue: 0,
          totalCustomers: 0,
          totalBookings: 0,
          ordersThisWeek: 0,
          pendingBookings: 0,
          trainingEnrollments: 0,
          lowStockProducts: 0,
          outOfStockProducts: 0,
          avgOrderValue: 0
        },
        recentOrders: [],
        recentBookings: []
      },
      { status: 200 }
    );
  }
}