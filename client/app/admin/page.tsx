// client/app/admin/page.tsx (AdminOverview)
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  CubeIcon,
  CalendarIcon,
  ShoppingBagIcon,
  UsersIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { StatCard } from '@/components/admin/StatCard';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  overview: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
    pendingBookings?: number;
    ordersThisWeek?: number;
    trainingEnrollments?: number;
    revenue?: number;
    avgOrderValue?: number;
    lowStockProducts?: number;
    outOfStockProducts?: number;
    completedTrainings?: number;
    trainingRevenue?: number;
  };
  recent: {
    orders: Array<{
      _id: string;
      total: number;
      totalAmount?: number;
      status: string;
      createdAt: string;
      userId?: { name: string; email: string };
    }>;
    bookings?: Array<{
      _id: string;
      bookingId: string;
      customerName: string;
      totalAmount: number;
      status: string;
      scheduledDate: string;
    }>;
  };
}

export default function AdminOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/admin/login');
      return;
    }

    if (isAuthenticated && isAdmin) {
      fetchDashboardData();
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching dashboard data...');
      const response = await fetch('/api/admin/analytics?range=week');
      
      const responseText = await response.text();
      console.log('Response status:', response.status);
      console.log('Response text:', responseText.substring(0, 200));
      
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`API returned non-JSON response: ${responseText.substring(0, 100)}...`);
      }
      
      if (!response.ok) {
        throw new Error(data.error || data.message || `API Error: ${response.status}`);
      }
      
      console.log('Dashboard data received:', data);
      
      // Transform the API response to match our expected structure
      const transformedData: DashboardStats = {
        overview: {
          totalProducts: data.overview?.totalProducts || 0,
          totalOrders: data.overview?.totalOrders || 0,
          totalRevenue: data.overview?.totalRevenue || 0,
          totalCustomers: data.overview?.totalCustomers || 0,
          pendingBookings: data.overview?.pendingBookings || 0,
          ordersThisWeek: data.overview?.ordersThisWeek || data.overview?.totalOrders || 0,
          trainingEnrollments: data.overview?.trainingEnrollments || 0,
          revenue: data.overview?.totalRevenue || 0,
          avgOrderValue: data.overview?.avgOrderValue || 0,
          lowStockProducts: data.overview?.lowStockProducts || 0,
          outOfStockProducts: data.overview?.outOfStockProducts || 0,
          completedTrainings: data.overview?.completedTrainings || 0,
          trainingRevenue: data.overview?.trainingRevenue || 0
        },
        recent: {
          orders: data.recentOrders || [],
          bookings: data.recentBookings || []
        }
      };
      
      setStats(transformedData);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error instanceof Error ? error.message : 'Failed to load dashboard data');
      
      // Don't set fallback data
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  const testApiConnection = async () => {
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      alert(`API Test: ${data.message}\nStatus: ${response.status}`);
    } catch (error) {
      alert(`API Test Failed: ${error}`);
    }
  };

  // Render error state
  if (error && !stats) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Unable to load data</p>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-400 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-red-800">Connection Error</h3>
              <p className="text-red-700 mt-1 font-mono text-sm">{error}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  onClick={fetchDashboardData}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Retry Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={testApiConnection}
                >
                  Test API Connection
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('http://localhost:3005/api/admin/analytics?range=week', '_blank')}
                >
                  Open API in Browser
                </Button>
              </div>
              <div className="mt-4 text-sm">
                <p className="text-gray-600">Troubleshooting steps:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Check if the API route exists at <code className="bg-gray-100 px-2 py-1 rounded">/api/admin/analytics</code></li>
                  <li>Run <code className="bg-gray-100 px-2 py-1 rounded">npm run init-db</code> to add sample data</li>
                  <li>Check server console for MongoDB connection errors</li>
                  <li>Verify .env.local has correct MONGODB_URI</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Loading data...</p>
          </div>
          <Button
            onClick={testApiConnection}
            variant="outline"
            size="sm"
          >
            Test API
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">No data available</p>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-400 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-yellow-800">No Data Found</h3>
              <p className="text-yellow-700 mt-1">The database appears to be empty or no data matches your query.</p>
              <div className="mt-4">
                <Button
                  onClick={fetchDashboardData}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { overview, recent } = stats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Overview of your store performance and recent activity
          </p>
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
            <CheckCircleIcon className="w-4 h-4 mr-1" />
            Real Data Loaded
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={fetchDashboardData}
            variant="outline"
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </Button>
          <Button
            onClick={testApiConnection}
            variant="ghost"
            size="sm"
            title="Test API Connection"
          >
            Test API
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard
          title="Products"
          value={overview.totalProducts}
          icon={<CubeIcon className="w-6 h-6" />}
          link="/admin/products"
        />
        <StatCard
          title="Pending Bookings"
          value={overview.pendingBookings || 0}
          icon={<CalendarIcon className="w-6 h-6" />}
          link="/admin/bookings"
        />
        <StatCard
          title="Orders (Week)"
          value={overview.ordersThisWeek || overview.totalOrders}
          icon={<ShoppingBagIcon className="w-6 h-6" />}
          link="/admin/orders"
        />
        <StatCard
          title="Customers"
          value={overview.totalCustomers}
          icon={<UsersIcon className="w-6 h-6" />}
          link="/admin/customers"
        />
        <StatCard
          title="Training"
          value={overview.trainingEnrollments || 0}
          icon={<AcademicCapIcon className="w-6 h-6" />}
          link="/admin/training"
        />
        <StatCard
          title="Revenue"
          value={`₦${(overview.revenue || overview.totalRevenue || 0).toLocaleString()}`}
          icon={<CurrencyDollarIcon className="w-6 h-6" />}
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock (≤5)</p>
                <p className="text-2xl font-bold text-gray-900">{overview.lowStockProducts || 0}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900">{overview.outOfStockProducts || 0}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-gray-900">₦{(overview.avgOrderValue || 0).toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-sm text-jify-primary hover:underline">
              View all →
            </Link>
          </CardHeader>
          <CardContent>
            {(recent.bookings && recent.bookings.length > 0) ? (
              <div className="space-y-4">
                {recent.bookings.map((booking) => (
                  <div key={booking._id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{booking.bookingId}</p>
                      <p className="text-sm text-gray-600">{booking.customerName}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {booking.status.replace('_', ' ')}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        ₦{booking.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recent bookings
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-jify-primary hover:underline">
              View all →
            </Link>
          </CardHeader>
          <CardContent>
            {recent.orders.length > 0 ? (
              <div className="space-y-4">
                {recent.orders.map((order) => (
                  <div key={order._id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">ORD-{order._id?.slice(-6) || 'N/A'}</p>
                      <p className="text-sm text-gray-600">
                        {order.userId?.name || 'Customer'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.status}
                      </span>
                      <p className="text-sm font-medium mt-1">
                        ₦{(order.total || order.totalAmount || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recent orders
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}