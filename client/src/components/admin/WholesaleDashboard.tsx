'use client';

// client/src/components/admin/WholesaleDashboard.tsx
import { BuildingOffice2Icon, DocumentCheckIcon, ChartBarIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { DataTable } from './DataTable';
import { Button } from '@/components/ui/Button';

interface WholesaleStats {
  pending: number;
  approved: number;
  rejected: number;
  on_hold: number;
}

interface Application {
  id: string;
  business: string;
  type: string;
  status: string;
  submitted: string;
}

export const WholesaleDashboard = ({
  stats,
  applications,
  onExport,
}: {
  stats: WholesaleStats;
  applications: Application[];
  onExport: () => void;
}) => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<BuildingOffice2Icon className="w-6 h-6" />}
          change={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Approved"
          value={stats.approved}
          icon={<DocumentCheckIcon className="w-6 h-6" />}
          change={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="On Hold"
          value={stats.on_hold}
          icon={<ArrowPathIcon className="w-6 h-6" />}
          change={{ value: -3, isPositive: false }}
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={<BuildingOffice2Icon className="w-6 h-6 text-gray-400" />}
        />
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Recent Applications</h3>
          <Button size="sm" onClick={onExport}>
            Export CSV
          </Button>
        </div>
        <DataTable
          columns={[
            { key: 'business', label: 'Business' },
            { key: 'type', label: 'Type' },
            { key: 'status', label: 'Status' },
            { key: 'submitted', label: 'Submitted' },
          ]}
          data={applications}
          renderCell={(row, column) => {
            if (column.key === 'status') {
              const status = row[column.key] as string;
              const color = status === 'approved' ? 'text-green-600' : status === 'pending' ? 'text-yellow-600' : 'text-gray-600';
              return <span className={`font-medium ${color}`}>{status}</span>;
            }
            return row[column.key];
          }}
        />
      </div>
    </div>
  );
};

// Simple StatCard component definition
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  change?: { value: number; isPositive: boolean };
}

const StatCard = ({ title, value, icon, change }: StatCardProps) => (
  <div className="bg-white rounded-xl p-4 flex flex-col items-start border border-gray-100">
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-sm font-medium text-gray-500">{title}</span>
    </div>
    <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
    {change && (
      <div className={`mt-1 text-xs ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change.isPositive ? '+' : ''}
        {change.value}
      </div>
    )}
  </div>
);