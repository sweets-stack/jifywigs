'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  CheckCircleIcon,
  XCircleIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BookingStatus } from '@jifywigs/shared/enums';

interface Booking {
  _id: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  services: Array<{
    name: string;
    price: number;
  }>;
  totalAmount: number;
  scheduledDate: string;
  status: BookingStatus;
  deliveryType: string;
  notes?: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        setBookings(bookings.map(booking => 
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        ));
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case BookingStatus.CONFIRMED:
        return 'bg-blue-100 text-blue-800';
      case BookingStatus.RECEIVED:
        return 'bg-purple-100 text-purple-800';
      case BookingStatus.IN_PROGRESS:
        return 'bg-indigo-100 text-indigo-800';
      case BookingStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case BookingStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.bookingId.includes(searchTerm) ||
                         booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.scheduledDate) > new Date() && 
    !['cancelled', 'completed'].includes(booking.status)
  ).length;

  const totalRevenue = bookings
    .filter(booking => booking.status === BookingStatus.COMPLETED)
    .reduce((sum, booking) => sum + booking.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Bookings</h1>
          <p className="text-gray-600 mt-1">
            Manage wig care service appointments and schedules
          </p>
        </div>
        <Link href="/admin/bookings/new">
          <Button className="bg-jify-primary hover:bg-jify-primary/90">
            <CalendarIcon className="w-5 h-5 mr-2" />
            New Booking
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingBookings}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₦{totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <ClockIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Bookings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => 
                    new Date(b.scheduledDate).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <UserIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as BookingStatus | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary focus:border-jify-primary"
              >
                <option value="all">All Status</option>
                {Object.values(BookingStatus).map(status => (
                  <option key={status} value={status}>
                    {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <select
                onChange={(e) => {
                  // Handle date filtering
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary focus:border-jify-primary"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-jify-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading bookings...</p>
            </div>
          ) : filteredBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Services
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
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
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.bookingId}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {booking.customerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.customerEmail}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <PhoneIcon className="w-3 h-3 mr-1" />
                            {booking.customerPhone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {booking.services.map(s => s.name).join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {new Date(booking.scheduledDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(booking.scheduledDate).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">
                          ₦{booking.totalAmount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status.replace('_', ' ')}
                          </span>
                          {booking.status === BookingStatus.PENDING && (
                            <>
                              <button
                                onClick={() => updateBookingStatus(booking._id, BookingStatus.CONFIRMED)}
                                className="text-green-600 hover:text-green-800"
                                title="Confirm Booking"
                              >
                                <CheckCircleIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateBookingStatus(booking._id, BookingStatus.CANCELLED)}
                                className="text-red-600 hover:text-red-800"
                                title="Cancel Booking"
                              >
                                <XCircleIcon className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link href={`/admin/bookings/${booking._id}`}>
                            <Button size="sm" variant="ghost">
                              View Details
                            </Button>
                          </Link>
                          {booking.status === BookingStatus.PENDING && (
                            <Button
                              size="sm"
                              onClick={() => updateBookingStatus(booking._id, BookingStatus.CONFIRMED)}
                              className="bg-jify-primary hover:bg-jify-primary/90"
                            >
                              Confirm
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <FunnelIcon className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No bookings found</h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your filters or create a new booking.
              </p>
              <Link href="/admin/bookings/new" className="mt-4 inline-block">
                <Button className="bg-jify-primary hover:bg-jify-primary/90">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  New Booking
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}