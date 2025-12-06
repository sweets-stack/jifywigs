// client/src/components/admin/TrainingManager.tsx
'use client';

import { useState } from 'react';
import { AcademicCapIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { StatCard } from './StatCard';

interface TrainingStats {
  totalEnrollments: number;
  completed: number;
  revenue: number;
}

interface TrainingCourse {
  id: string;
  title: string;
  enrolled: number;
  completed: number;
  revenue: number;
}

export const TrainingManager = ({
  stats,
  onExport,
}: {
  stats: TrainingStats;
  onExport: () => void;
}) => {
  const [courses] = useState<TrainingCourse[]>([
    { id: '1', title: 'Wig Mastery Certification', enrolled: 84, completed: 62, revenue: 504000 },
    { id: '2', title: 'Glueless Installation Pro', enrolled: 47, completed: 31, revenue: 235000 },
    { id: '3', title: 'Wig Business Bootcamp', enrolled: 29, completed: 18, revenue: 435000 },
  ]);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Enrollments"
          value={stats.totalEnrollments}
          icon={<AcademicCapIcon className="w-6 h-6" />}
          subtitle={`${stats.completed} completed`}
        />
        <StatCard
          title="Revenue"
          value={`₦${(stats.revenue / 1000).toFixed(1)}k`}
          icon={<AcademicCapIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Avg. Completion"
          value={`${Math.round((stats.completed / stats.totalEnrollments) * 100)}%`}
          icon={<AcademicCapIcon className="w-6 h-6" />}
        />
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Top Courses</h3>
          <Button size="sm" onClick={onExport}>
            <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.enrolled}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.completed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₦{course.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};