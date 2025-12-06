// client/app/admin/customers/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
  address?: string;
  city?: string;
  state?: string;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
}

interface Booking {
  _id: string;
  bookingId: string;
  totalAmount: number;
  status: string;
  scheduledDate: string;
  services: Array<{ name: string }>;
}

export default function CustomerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchCustomerData();
  }, [id]);

  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      
      // Fetch customer details
      const customerRes = await fetch(`/api/admin/customers/${id}`);
      if (!customerRes.ok) throw new Error('Customer not found');
      const customerData = await customerRes.json();
      setCustomer(customerData);

      // Fetch customer orders
      const ordersRes = await fetch(`/api/admin/customers/${id}/orders`);
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      }

      // Fetch customer bookings
      const bookingsRes = await fetch(`/api/admin/customers/${id}/bookings`);
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData);
      }

    } catch (error) {
      console.error('Error fetching customer data:', error);
      alert('Customer not found');
      router.push('/admin/customers');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('NGN', '₦');
  };

  const calculateStats = () => {
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
    const totalBookings = bookings.length;

    return { totalOrders, totalSpent, avgOrderValue, totalBookings };
  };

  const getCustomerType = () => {
    if (!customer) return 'New';
    
    const { totalOrders } = calculateStats();
    if (totalOrders > 10) return 'VIP';
    if (totalOrders > 5) return 'Regular';
    if (totalOrders > 0) return 'Active';
    return 'New';
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-jify-primary-500"></div>
        <p className="mt-4 text-gray-600">Loading customer...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Customer not found</p>
        <Link href="/admin/customers" className="mt-4 inline-block">
          <Button variant="outline">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Customers
          </Button>
        </Link>
      </div>
    );
  }

  const stats = calculateStats();
  const customerType = getCustomerType();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/customers" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Customers
          </Link>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
            <div className="flex items-center space-x-2">
              <Badge variant={
                customerType === 'VIP' ? 'primary' :
                customerType === 'Regular' ? 'success' :
                customerType === 'Active' ? 'default' : 'secondary'
              }>
                {customerType} Customer
              </Badge>
              {customer.role !== 'customer' && (
                <Badge variant="warning">
                  {customer.role.toUpperCase()}
                </Badge>
              )}
              {customer.isVerified && (
                <Badge variant="success">
                  Verified
                </Badge>
              )}
            </div>
          </div>
          <p className="text-gray-600 mt-1">
            Customer since {new Date(customer.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingBagIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(stats.totalSpent)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(stats.avgOrderValue)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <StarIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Service Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Customer Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Customer Information</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium">{customer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email Address</p>
                      <p className="font-medium flex items-center">
                        <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {customer.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="font-medium flex items-center">
                        <PhoneIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {customer.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Account Type</p>
                      <p className="font-medium capitalize">{customer.role}</p>
                    </div>
                  </div>

                  {(customer.address || customer.city || customer.state) && (
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        Address Information
                      </h3>
                      <div className="space-y-1">
                        {customer.address && <p className="text-gray-600">{customer.address}</p>}
                        <div className="flex space-x-4">
                          {customer.city && <p className="text-gray-600">{customer.city}</p>}
                          {customer.state && <p className="text-gray-600">{customer.state}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Recent Orders</h2>
                  <Link href={`/admin/customers/${id}/orders`}>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="space-y-3">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order._id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium">Order #{order.orderNumber}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{formatPrice(order.total)}</p>
                            <Badge variant={
                              order.status === 'delivered' ? 'success' :
                              order.status === 'cancelled' ? 'danger' :
                              'default'
                            }>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <ShoppingBagIcon className="w-12 h-12 mx-auto text-gray-300" />
                      <p className="mt-2">No orders yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Summary */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Account Summary</h2>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium">
                      {new Date(customer.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email Verified</span>
                    <Badge variant={customer.isVerified ? 'success' : 'warning'}>
                      {customer.isVerified ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer Type</span>
                    <Badge variant={customerType === 'VIP' ? 'primary' : 'default'}>
                      {customerType}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Quick Actions</h2>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open(`mailto:${customer.email}`, '_blank')}
                  >
                    <EnvelopeIcon className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open(`https://wa.me/${customer.phone.replace(/\D/g, '')}`, '_blank')}
                  >
                    <ChatBubbleLeftIcon className="w-4 h-4 mr-2" />
                    WhatsApp Message
                  </Button>
                  <Link href={`/admin/orders/new?customer=${customer._id}`}>
                    <Button className="w-full bg-jify-primary-500 hover:bg-jify-primary-600">
                      <ShoppingBagIcon className="w-4 h-4 mr-2" />
                      Create Order
                    </Button>
                  </Link>
                  <Link href={`/admin/bookings/new?customer=${customer._id}`}>
                    <Button variant="outline" className="w-full">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Create Booking
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Customer Notes */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Add Note</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <textarea
                      placeholder="Add internal note about this customer..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                    />
                    <Button className="w-full bg-jify-primary-500 hover:bg-jify-primary-600">
                      Save Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Order History</h2>
              <Link href={`/admin/orders/new?customer=${customer._id}`}>
                <Button className="bg-jify-primary-500 hover:bg-jify-primary-600">
                  Create New Order
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order #
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {order.orderNumber}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-bold text-gray-900">
                              {formatPrice(order.total)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={
                              order.status === 'delivered' ? 'success' :
                              order.status === 'cancelled' ? 'danger' :
                              order.status === 'pending' ? 'warning' : 'default'
                            }>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link href={`/admin/orders/${order._id}`}>
                              <Button size="sm" variant="ghost">
                                View Details
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingBagIcon className="w-16 h-16 mx-auto text-gray-300" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
                  <p className="mt-2 text-gray-500">
                    This customer hasn't placed any orders yet.
                  </p>
                  <Link href={`/admin/orders/new?customer=${customer._id}`} className="mt-4 inline-block">
                    <Button className="bg-jify-primary-500 hover:bg-jify-primary-600">
                      Create First Order
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Service Bookings</h2>
              <Link href={`/admin/bookings/new?customer=${customer._id}`}>
                <Button className="bg-jify-primary-500 hover:bg-jify-primary-600">
                  New Booking
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Booking #{booking.bookingId}</p>
                          <p className="text-sm text-gray-600">
                            Scheduled: {new Date(booking.scheduledDate).toLocaleDateString()}
                          </p>
                          <div className="mt-1">
                            {booking.services.map((service, idx) => (
                              <span key={idx} className="text-sm text-gray-600">
                                {service.name}{idx < booking.services.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatPrice(booking.totalAmount)}</p>
                          <Badge variant={
                            booking.status === 'completed' ? 'success' :
                            booking.status === 'cancelled' ? 'danger' :
                            booking.status === 'pending' ? 'warning' : 'default'
                          }>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Link href={`/admin/bookings/${booking._id}`}>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="w-16 h-16 mx-auto text-gray-300" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No bookings found</h3>
                  <p className="mt-2 text-gray-500">
                    This customer hasn't booked any services yet.
                  </p>
                  <Link href={`/admin/bookings/new?customer=${customer._id}`} className="mt-4 inline-block">
                    <Button className="bg-jify-primary-500 hover:bg-jify-primary-600">
                      Schedule First Booking
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Customer Activity</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  {/* Timeline items */}
                  <div className="space-y-8">
                    {/* Account Created */}
                    <div className="relative">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="ml-12">
                        <p className="font-medium">Account Created</p>
                        <p className="text-sm text-gray-600">
                          {new Date(customer.createdAt).toLocaleDateString()} at {new Date(customer.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {/* Order Activities */}
                    {orders.slice(0, 3).map((order, index) => (
                      <div key={order._id} className="relative">
                        <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <ShoppingBagIcon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="ml-12">
                          <p className="font-medium">Order #{order.orderNumber} placed</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()} • {formatPrice(order.total)} • {order.status}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Booking Activities */}
                    {bookings.slice(0, 3).map((booking, index) => (
                      <div key={booking._id} className="relative">
                        <div className="absolute left-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <CalendarIcon className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="ml-12">
                          <p className="font-medium">Booking #{booking.bookingId} scheduled</p>
                          <p className="text-sm text-gray-600">
                            {new Date(booking.scheduledDate).toLocaleDateString()} • {formatPrice(booking.totalAmount)} • {booking.status}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Last Updated */}
                    <div className="relative">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <ClockIcon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="ml-12">
                        <p className="font-medium">Profile Updated</p>
                        <p className="text-sm text-gray-600">
                          Last updated: {new Date(customer.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}