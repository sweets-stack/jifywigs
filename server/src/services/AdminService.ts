import { 
  Product, 
  Order, 
  User, 
  Booking, 
  Service, 
  Training, 
  Wholesale, 
  Analytics 
} from '@jifywigs/shared/models';

interface ServiceDefinition {
  basePrice: number;
  // Add other properties as needed
}

export class AdminService {
  static async getAnalyticsDashboard(range: string = 'month') {
    const dateFilter = this.getDateRange(range);
    
    const [
      totalProducts,
      pendingBookings,
      ordersThisWeek,
      totalCustomers,
      trainingEnrollments,
      wholesaleApplications,
      recentOrders,
      recentBookings,
      revenueData,
      topProducts
    ] = await Promise.all([
      // Products
      Product.countDocuments(),
      
      // Bookings
      Booking.countDocuments({ 
        status: 'pending',
        createdAt: { $gte: dateFilter }
      }),
      
      // Orders this week
      Order.countDocuments({ 
        createdAt: { $gte: dateFilter }
      }),
      
      // Total customers
      User.countDocuments({ role: 'customer' }),
      
      // Training enrollments
      Training.countDocuments({ 
        status: 'enrolled',
        createdAt: { $gte: dateFilter }
      }),
      
      // Wholesale applications
      Wholesale.countDocuments({ 
        status: 'pending',
        createdAt: { $gte: dateFilter }
      }),
      
      // Recent orders
      Order.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('userId', 'name email')
        .lean(),
      
      // Recent bookings
      Booking.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
      
      // Revenue data
      this.getRevenueData(dateFilter),
      
      // Top products
      this.getTopProducts(dateFilter)
    ]);

    // Calculate revenue stats
    const revenue = revenueData.reduce((sum: any, item: any) => sum + item.total, 0);
    const avgOrderValue = ordersThisWeek > 0 ? revenue / ordersThisWeek : 0;
    
    // Removed undefined variable 'selectedServices' and 'svc.basePrice' reference
    // If you need to calculate total for services, you should pass the services array as parameter
    // const total = selectedServices.reduce((sum: number, svc: ServiceDefinition) => sum + svc.basePrice, 0);

    return {
      overview: {
        totalProducts,
        pendingBookings,
        ordersThisWeek,
        totalCustomers,
        trainingEnrollments,
        wholesaleApplications,
        revenue,
        avgOrderValue: Math.round(avgOrderValue * 100) / 100 // Keep 2 decimal places
      },
      recent: {
        orders: recentOrders,
        bookings: recentBookings
      },
      charts: {
        revenue: revenueData,
        topProducts
      }
    };
  }

  private static getDateRange(range: string): Date {
    const now = new Date();
    const date = new Date(now);
    
    switch (range) {
      case 'day':
        date.setDate(date.getDate() - 1);
        break;
      case 'week':
        date.setDate(date.getDate() - 7);
        break;
      case 'month':
        date.setMonth(date.getMonth() - 1);
        break;
      case 'quarter':
        date.setMonth(date.getMonth() - 3);
        break;
      case 'year':
        date.setFullYear(date.getFullYear() - 1);
        break;
      default:
        date.setMonth(date.getMonth() - 1); // Default to month
    }
    
    return date;
  }

  private static async getRevenueData(since: Date): Promise<Array<{date: string, total: number, count: number}>> {
    const revenueData = await Order.aggregate([
      {
        $match: {
          status: { $in: ['delivered', 'completed'] },
          createdAt: { $gte: since }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          total: { $sum: '$total' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    return revenueData.map((item: any) => ({
      date: item._id,
      total: item.total,
      count: item.count
    }));
  }

  private static async getTopProducts(since: Date) {
    const topProducts = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: since }
        }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          name: { $first: '$items.name' },
          quantity: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { quantity: -1 } },
      { $limit: 5 }
    ]);
    
    return topProducts;
  }

  static async exportMetric(metric: string, range: string): Promise<string> {
    const dateFilter = this.getDateRange(range);
    let data: string[][] = [];
    
    switch (metric) {
      case 'orders':
        const orders = await Order.find({ createdAt: { $gte: dateFilter } })
          .sort({ createdAt: -1 })
          .populate('userId', 'name email')
          .lean();
        
        data = [
          ['Order ID', 'Customer', 'Total', 'Status', 'Date'],
          ...orders.map((order: any) => [
            order._id.toString(),
            order.userId?.name || 'N/A',
            `$${order.total}`,
            order.status,
            new Date(order.createdAt).toLocaleDateString()
          ])
        ];
        break;
        
      case 'revenue':
        const revenueData = await this.getRevenueData(dateFilter);
        data = [
          ['Date', 'Revenue', 'Order Count'],
          ...revenueData.map((item: any) => [
            item.date,
            `$${item.total}`,
            item.count.toString()
          ])
        ];
        break;
        
      case 'customers':
        const customers = await User.find({ 
          role: 'customer',
          createdAt: { $gte: dateFilter }
        })
          .sort({ createdAt: -1 })
          .lean();
        
        data = [
          ['Customer ID', 'Name', 'Email', 'Join Date', 'Order Count'],
          ...customers.map((customer: any) => [
            customer._id.toString(),
            customer.name || 'N/A',
            customer.email,
            new Date(customer.createdAt).toLocaleDateString(),
            customer.orderCount?.toString() || '0'
          ])
        ];
        break;
        
      default:
        data = [['Error', 'Invalid metric specified']];
    }
    
    return data.map(row => row.join(',')).join('\n');
  }
}