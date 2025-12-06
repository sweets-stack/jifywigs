// client/app/admin/analytics/page.tsx
'use client';

import { useState } from 'react';
import useSWR from 'swr';
import {
  UsersIcon,
  CreditCardIcon,
  AcademicCapIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { StatCard } from '@/components/admin/StatCard';
import { TrainingManager } from '@/components/admin/TrainingManager';

interface AnalyticsData {
  overview: {
    subscribers: { total: number; confirmed: number };
    orders: { totalOrders: number; totalRevenue: number; avgOrderValue: number };
    products: { total: number; lowStock: number; outOfStock: number };
    trainings: { totalEnrollments: number; completed: number; revenue: number };
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AnalyticsPage() {
  const [range, setRange] = useState('month');
  const { data, error, mutate } = useSWR<AnalyticsData>(
    `/api/admin/analytics?range=${range}`,
    fetcher,
    { refreshInterval: 0 }
  );

  const handleExport = (metric: string) => {
    window.location.href = `/api/admin/analytics/export?metric=${metric}&range=${range}`;
  };

  if (error) return <div className="p-6 text-red-600">Failed to load</div>;
  const overview = data?.overview || {
    subscribers: { total: 0, confirmed: 0 },
    orders: { totalOrders: 0, totalRevenue: 0, avgOrderValue: 0 },
    products: { total: 0, lowStock: 0, outOfStock: 0 },
    trainings: { totalEnrollments: 0, completed: 0, revenue: 0 },
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <Select value={range} onChange={(e) => setRange(e.target.value)} className="w-40">
          <option value="month">Last 30 Days</option>
          <option value="week">Last 7 Days</option>
        </Select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Subscribers"
          value={overview.subscribers.total}
          icon={<UsersIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Orders"
          value={overview.orders.totalOrders}
          icon={<CreditCardIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Products"
          value={overview.products.total}
          icon={<CubeIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Training"
          value={overview.trainings.totalEnrollments}
          icon={<AcademicCapIcon className="w-6 h-6" />}
        />
      </div>

      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Product Inventory</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Products</span>
              <span className="font-semibold">{overview.products.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Low Stock (≤5)</span>
              <span className="font-semibold text-yellow-600">{overview.products.lowStock}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Out of Stock</span>
              <span className="font-semibold text-red-600">{overview.products.outOfStock}</span>
            </div>
          </div>
        </div>

        {/* Orders Stats */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Orders Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Orders</span>
              <span className="font-semibold">{overview.orders.totalOrders}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Revenue</span>
              <span className="font-semibold">₦{overview.orders.totalRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Order Value</span>
              <span className="font-semibold">₦{overview.orders.avgOrderValue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Training Stats */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Training Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Enrollments</span>
              <span className="font-semibold">{overview.trainings.totalEnrollments}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completed</span>
              <span className="font-semibold">{overview.trainings.completed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Training Revenue</span>
              <span className="font-semibold">₦{overview.trainings.revenue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div id="training">
        <TrainingManager
          stats={{
            totalEnrollments: overview.trainings.totalEnrollments,
            completed: overview.trainings.completed,
            revenue: overview.trainings.revenue,
          }}
          onExport={() => handleExport('training_enrollments')}
        />
      </div>
    </div>
  );
}