// client/src/components/admin/StatCard.tsx
'use client';

import { ReactNode } from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: { value: number; isPositive: boolean };
  icon: ReactNode;
  subtitle?: string;
  link?: string; // Add this
}

export const StatCard = ({ title, value, change, icon, subtitle, link }: StatCardProps) => {
  const content = (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 bg-jify-primary/10 rounded-lg text-jify-primary">
          {icon}
        </div>
      </div>

      {change && (
        <div className="mt-3 flex items-center">
          {change.isPositive ? (
            <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <ArrowTrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change.isPositive ? '+' : ''}{change.value}%
          </span>
        </div>
      )}

      {link && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-jify-primary hover:text-jify-primary/80 font-medium">
            View details →
          </span>
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block">
        {content}
      </Link>
    );
  }

  return content;
};