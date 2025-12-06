'use client';

import { useState, useEffect } from 'react';
import { 
  Package, 
  Sparkles, 
  Heart, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Truck,
  ShoppingBag,
  Calendar,
  Star,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardStats {
  pendingOrders: number;
  activeServices: number;
  wishlistItems: number;
  totalSpent: number;
}

interface RecentActivity {
  id: string;
  type: 'order' | 'service' | 'wishlist';
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'in-progress' | 'cancelled';
  timestamp: string;
  amount?: number;
}

export default function DashboardOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    pendingOrders: 0,
    activeServices: 0,
    wishlistItems: 0,
    totalSpent: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'order',
      title: 'Order #JW-2024-001',
      description: 'Classic Straight Wig - 22 inches',
      status: 'completed',
      timestamp: '2 hours ago',
      amount: 24999
    },
    {
      id: '2',
      type: 'service',
      title: 'Wig Revamp Service',
      description: 'Deep conditioning & styling',
      status: 'in-progress',
      timestamp: '1 day ago'
    },
    {
      id: '3',
      type: 'order',
      title: 'Order #JW-2024-002',
      description: 'Lace Front Closure',
      status: 'pending',
      timestamp: '3 days ago',
      amount: 18999
    }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // In production, fetch from API
        setTimeout(() => {
          setStats({
            pendingOrders: 2,
            activeServices: 1,
            wishlistItems: 5,
            totalSpent: 43998
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'in-progress':
        return Clock;
      case 'pending':
        return AlertCircle;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-jify-primary-500 to-jify-primary-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, <span className="text-jify-primary-100">{user?.name || 'Customer'}!</span>
            </h1>
            <p className="text-jify-primary-100 mt-2">
              Here's what's happening with your account today.
            </p>
          </div>
          <Button
            variant="secondary"
            className="mt-4 md:mt-0 bg-white hover:text-jify-primary-500 text-black"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Start Shopping
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? '...' : stats.pendingOrders}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-jify-primary-100 to-jify-primary-200">
                <Package className="w-6 h-6 text-jify-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Services</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? '...' : stats.activeServices}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? '...' : stats.wishlistItems}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-100 to-pink-200">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₦{loading ? '...' : stats.totalSpent.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-green-200">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <p className="text-sm text-gray-600">Your latest orders and services</p>
              </div>
              <Button variant="ghost" size="sm" className="text-jify-primary-600">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const StatusIcon = getStatusIcon(activity.status);
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-jify-primary-100 to-jify-primary-200 mr-4">
                        {activity.type === 'order' && <Package className="w-5 h-5 text-jify-primary-600" />}
                        {activity.type === 'service' && <Sparkles className="w-5 h-5 text-purple-600" />}
                        {activity.type === 'wishlist' && <Heart className="w-5 h-5 text-pink-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                            <StatusIcon className="w-3 h-3" />
                            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {activity.timestamp}
                          </span>
                          {activity.amount && (
                            <span className="text-sm font-semibold text-gray-900">
                              ₦{activity.amount.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Support */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-gradient-to-r from-jify-primary-500 to-jify-primary-600 hover:from-jify-primary-600 hover:to-jify-primary-700">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Place New Order
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Book Service
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Truck className="w-4 h-4 mr-2" />
                Track Order
              </Button>
            </CardContent>
          </Card>

          {/* Customer Support */}
          <Card className="bg-gradient-to-br from-jify-primary-50 to-jify-primary-100 border-jify-primary-200">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-xl bg-white mb-4">
                  <Star className="w-8 h-8 text-jify-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our support team is here to help with any questions.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full border-jify-primary-300 text-jify-primary-700">
                    Live Chat
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-jify-primary-500 to-jify-primary-600">
                    Contact Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

     
    </div>
  );
}