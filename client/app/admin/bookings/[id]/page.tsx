// client/app/admin/bookings/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BookingStatus } from '@jifywigs/shared/enums';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ScissorsIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChatBubbleLeftIcon,
  PhotoIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

interface BookingService {
  serviceId: string;
  name: string;
  price: number;
}

interface Booking {
  _id: string;
  bookingId: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  services: BookingService[];
  totalAmount: number;
  scheduledDate: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  status: BookingStatus;
  notes?: string;
  photos: string[];
  assignedTo?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export default function BookingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/bookings/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBooking(data);
      } else {
        throw new Error('Booking not found');
      }
    } catch (error) {
      console.error('Error fetching booking:', error);
      alert('Booking not found');
      router.push('/admin/bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (newStatus: BookingStatus, reason?: string) => {
    if (!booking) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: newStatus,
          ...(reason && { cancellationReason: reason })
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setBooking(updatedData);
        setShowCancelModal(false);
        setCancellationReason('');
        alert('Booking status updated successfully!');
      } else {
        throw new Error('Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status');
    } finally {
      setUpdating(false);
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
      case BookingStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      case BookingStatus.AWAITING_APPROVAL:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return <ClockIcon className="w-5 h-5" />;
      case BookingStatus.CONFIRMED:
        return <CheckCircleIcon className="w-5 h-5" />;
      case BookingStatus.RECEIVED:
        return <TruckIcon className="w-5 h-5" />;
      case BookingStatus.IN_PROGRESS:
        return <ScissorsIcon className="w-5 h-5" />;
      case BookingStatus.COMPLETED:
        return <CheckCircleIcon className="w-5 h-5" />;
      case BookingStatus.CANCELLED:
      case BookingStatus.REJECTED:
        return <XCircleIcon className="w-5 h-5" />;
      default:
        return null;
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

  const getNextStatus = (currentStatus: BookingStatus): BookingStatus[] => {
  const statusFlow: Record<BookingStatus, BookingStatus[]> = {
    [BookingStatus.PENDING]: [BookingStatus.AWAITING_APPROVAL, BookingStatus.REJECTED], // Changed from CONFIRMED to AWAITING_APPROVAL
    [BookingStatus.AWAITING_APPROVAL]: [BookingStatus.CONFIRMED, BookingStatus.REJECTED], // Added this
    [BookingStatus.CONFIRMED]: [BookingStatus.RECEIVED, BookingStatus.CANCELLED],
    [BookingStatus.RECEIVED]: [BookingStatus.IN_PROGRESS, BookingStatus.CANCELLED],
    [BookingStatus.IN_PROGRESS]: [BookingStatus.COMPLETED, BookingStatus.CANCELLED],
    [BookingStatus.COMPLETED]: [],
    [BookingStatus.CANCELLED]: [],
    [BookingStatus.REJECTED]: [],
  };
  return statusFlow[currentStatus] || [];
};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-jify-primary-500"></div>
        <p className="mt-4 text-gray-600">Loading booking...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Booking not found</p>
        <Link href="/admin/bookings" className="mt-4 inline-block">
          <Button variant="outline">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Bookings
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/bookings" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Bookings
          </Link>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900">Booking #{booking.bookingId}</h1>
            <Badge variant={
              booking.status === BookingStatus.COMPLETED ? 'success' : 
              [BookingStatus.CANCELLED, BookingStatus.REJECTED].includes(booking.status) ? 'danger' : 
              booking.status === BookingStatus.PENDING ? 'warning' : 'default'
            }>
              {booking.status.replace('_', ' ')}
            </Badge>
          </div>
          <p className="text-gray-600 mt-1">
            Created on {new Date(booking.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Actions */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Booking Status</h2>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                  </div>
                  <div>
                    <p className="font-medium">Current Status: {booking.status.replace('_', ' ')}</p>
                    {booking.completedAt && (
                      <p className="text-sm text-gray-600">
                        Completed: {new Date(booking.completedAt).toLocaleDateString()}
                      </p>
                    )}
                    {booking.cancelledAt && (
                      <p className="text-sm text-gray-600">
                        Cancelled: {new Date(booking.cancelledAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                {getNextStatus(booking.status).length > 0 && (
                  <div className="flex space-x-2">
                    {getNextStatus(booking.status).map(status => (
                      status === BookingStatus.CANCELLED ? (
                        <Button
                          key={status}
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setShowCancelModal(true)}
                          disabled={updating}
                        >
                          Cancel Booking
                        </Button>
                      ) : (
                        <Button
                          key={status}
                          onClick={() => updateBookingStatus(status)}
                          disabled={updating}
                          className="bg-jify-primary-500 hover:bg-jify-primary-600"
                        >
                          Mark as {status.replace('_', ' ')}
                        </Button>
                      )
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Booking Details
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Scheduled Date */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Scheduled Date & Time</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatDate(booking.scheduledDate)}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <CalendarIcon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Services Requested</h3>
                <div className="space-y-3">
                  {booking.services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-jify-primary-100 rounded-lg">
                          <ScissorsIcon className="w-5 h-5 text-jify-primary-500" />
                        </div>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-gray-600">Service #{service.serviceId}</p>
                        </div>
                      </div>
                      <p className="font-bold">{formatPrice(service.price)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Amount */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-2xl font-bold text-jify-primary-500">
                    {formatPrice(booking.totalAmount)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Notes */}
          {booking.notes && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold flex items-center">
                  <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
                  Customer Notes
                </h2>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line">{booking.notes}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Photos */}
          {booking.photos && booking.photos.length > 0 && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold flex items-center">
                  <PhotoIcon className="w-5 h-5 mr-2" />
                  Customer Photos ({booking.photos.length})
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {booking.photos.map((photo, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden border">
                      <img
                        src={photo}
                        alt={`Customer photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <UserIcon className="w-5 h-5 mr-2" />
                Customer Information
              </h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{booking.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{booking.customerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium flex items-center">
                  <PhoneIcon className="w-4 h-4 mr-1" />
                  {booking.customerPhone}
                </p>
              </div>
              {booking.customerId && (
                <div className="pt-3">
                  <Link href={`/admin/customers/${booking.customerId}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      View Customer Profile
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                {booking.deliveryType === 'delivery' ? (
                  <TruckIcon className="w-5 h-5 mr-2" />
                ) : (
                  <MapPinIcon className="w-5 h-5 mr-2" />
                )}
                {booking.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'} Information
              </h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-2 bg-gray-50 rounded-lg text-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  booking.deliveryType === 'delivery' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {booking.deliveryType === 'delivery' ? 'Home Delivery' : 'Store Pickup'}
                </span>
              </div>
              
              {booking.deliveryType === 'delivery' && booking.deliveryAddress && (
                <div>
                  <p className="text-sm text-gray-600">Delivery Address</p>
                  <p className="font-medium">{booking.deliveryAddress}</p>
                </div>
              )}

              {booking.deliveryType === 'pickup' && (
                <div>
                  <p className="text-sm text-gray-600">Pickup Location</p>
                  <p className="font-medium">JifyWigs Showroom</p>
                  <p className="text-sm text-gray-600">16 Lagos Street, Yaba, Lagos</p>
                </div>
              )}
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
                onClick={() => window.open(`mailto:${booking.customerEmail}?subject=Booking%20${booking.bookingId}`, '_blank')}
              >
                <EnvelopeIcon className="w-4 h-4 mr-2" />
                Email Customer
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(`https://wa.me/${booking.customerPhone.replace(/\D/g, '')}`, '_blank')}
              >
                <ChatBubbleLeftIcon className="w-4 h-4 mr-2" />
                WhatsApp Customer
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  const text = `Hi ${booking.customerName}, your booking #${booking.bookingId} is confirmed for ${formatDate(booking.scheduledDate)}.`;
                  window.open(`https://wa.me/${booking.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
                }}
              >
                <ClockIcon className="w-4 h-4 mr-2" />
                Send Reminder
              </Button>
            </CardContent>
          </Card>

          {/* Booking Timeline */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Booking Timeline</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Booking Created</p>
                    <p className="text-xs text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {booking.completedAt && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Service Completed</p>
                      <p className="text-xs text-gray-500">
                        {new Date(booking.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {booking.cancelledAt && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <XCircleIcon className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Booking Cancelled</p>
                      <p className="text-xs text-gray-500">
                        {new Date(booking.cancelledAt).toLocaleDateString()}
                      </p>
                      {booking.cancellationReason && (
                        <p className="text-xs text-gray-600 mt-1">
                          Reason: {booking.cancellationReason}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Cancel Booking</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel booking #{booking.bookingId}?
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancellation Reason (Optional)
              </label>
              <textarea
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                placeholder="Enter reason for cancellation..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCancelModal(false);
                  setCancellationReason('');
                }}
              >
                Go Back
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => updateBookingStatus(BookingStatus.CANCELLED, cancellationReason)}
                disabled={updating}
              >
                {updating ? 'Cancelling...' : 'Cancel Booking'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}