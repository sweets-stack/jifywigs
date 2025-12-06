// client/app/admin/orders/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { OrderStatus } from '@jifywigs/shared/enums';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  ShoppingBagIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PrinterIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shipping: {
    address: string;
    city: string;
    state: string;
    phone: string;
  };
  payment: {
    method: string;
    transactionId?: string;
    status: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/orders/${id}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        throw new Error('Order not found');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      alert('Order not found');
      router.push('/admin/orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus: OrderStatus) => {
    if (!order) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrder({ ...order, status: newStatus });
        alert('Order status updated successfully!');
      } else {
        throw new Error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case OrderStatus.CONFIRMED:
        return 'bg-blue-100 text-blue-800';
      case OrderStatus.PROCESSING:
        return 'bg-purple-100 text-purple-800';
      case OrderStatus.SHIPPED:
        return 'bg-indigo-100 text-indigo-800';
      case OrderStatus.DELIVERED:
        return 'bg-green-100 text-green-800';
      case OrderStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return <ClockIcon className="w-5 h-5" />;
      case OrderStatus.CONFIRMED:
        return <CheckCircleIcon className="w-5 h-5" />;
      case OrderStatus.PROCESSING:
        return <ClockIcon className="w-5 h-5" />;
      case OrderStatus.SHIPPED:
        return <TruckIcon className="w-5 h-5" />;
      case OrderStatus.DELIVERED:
        return <CheckCircleIcon className="w-5 h-5" />;
      case OrderStatus.CANCELLED:
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

  const printInvoice = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-jify-primary-500"></div>
        <p className="mt-4 text-gray-600">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Order not found</p>
        <Link href="/admin/orders" className="mt-4 inline-block">
          <Button variant="outline">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
      </div>
    );
  }

  const canUpdateToNextStatus = () => {
    const statusFlow: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
      [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
      [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
      [OrderStatus.DELIVERED]: [],
      [OrderStatus.CANCELLED]: [],
      [OrderStatus.REFUNDED]: [],
    };
    return statusFlow[order.status];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/orders" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Orders
          </Link>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
            <Badge variant={order.status === OrderStatus.DELIVERED ? 'success' : 
                          order.status === OrderStatus.CANCELLED ? 'danger' : 
                          order.status === OrderStatus.PENDING ? 'warning' : 'default'}>
              {order.status}
            </Badge>
          </div>
          <p className="text-gray-600 mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={printInvoice}>
            <PrinterIcon className="w-4 h-4 mr-2" />
            Print Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Actions */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Order Status</h2>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <p className="font-medium">Current Status: {order.status}</p>
                    <p className="text-sm text-gray-600">
                      Last updated: {new Date(order.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {canUpdateToNextStatus().length > 0 && (
                  <div className="flex space-x-2">
                    <select
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          updateOrderStatus(e.target.value as OrderStatus);
                        }
                      }}
                      disabled={updating}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                    >
                      <option value="">Update Status</option>
                      {canUpdateToNextStatus().map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Order Items</h2>
              <p className="text-sm text-gray-600">{order.items.length} items</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                          <ShoppingBagIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                      <p className="text-sm text-gray-600">{formatPrice(item.price)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>₦2,000</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>{formatPrice(order.total + 2000)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Notes */}
          {order.notes && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold flex items-center">
                  <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
                  Customer Notes
                </h2>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{order.notes}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Customer & Shipping Info */}
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
                <p className="font-medium">{order.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{order.customer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium flex items-center">
                  <PhoneIcon className="w-4 h-4 mr-1" />
                  {order.customer.phone}
                </p>
              </div>
              <div className="pt-3">
                <Link href={`/admin/customers/${order.userId}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    View Customer Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <MapPinIcon className="w-5 h-5 mr-2" />
                Shipping Information
              </h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{order.shipping.address}</p>
              </div>
              <div className="flex space-x-4">
                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="font-medium">{order.shipping.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">State</p>
                  <p className="font-medium">{order.shipping.state}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{order.shipping.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Payment Information</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Method</p>
                <p className="font-medium capitalize">{order.payment.method.replace('_', ' ')}</p>
              </div>
              {order.payment.transactionId && (
                <div>
                  <p className="text-sm text-gray-600">Transaction ID</p>
                  <p className="font-medium text-sm">{order.payment.transactionId}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge variant={order.payment.status === 'success' ? 'success' : 'warning'}>
                  {order.payment.status}
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
                onClick={() => window.open(`mailto:${order.customer.email}?subject=Order%20${order.orderNumber}`, '_blank')}
              >
                Email Customer
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(`https://wa.me/${order.customer.phone.replace(/\D/g, '')}`, '_blank')}
              >
                WhatsApp Customer
              </Button>
              {order.status === OrderStatus.SHIPPED && (
                <Button
                  onClick={() => updateOrderStatus(OrderStatus.DELIVERED)}
                  disabled={updating}
                  className="w-full bg-jify-primary-500 hover:bg-jify-primary-600"
                >
                  Mark as Delivered
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}