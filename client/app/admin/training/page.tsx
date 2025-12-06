// client/app/admin/training/page.tsx
'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const courses = [
  {
    id: 'TC-001',
    title: 'Wig Mastery Certification',
    enrollments: 24,
    completed: 18,
    revenue: 1440000,
  },
  {
    id: 'TC-002',
    title: 'Glueless Installation Pro',
    enrollments: 15,
    completed: 12,
    revenue: 525000,
  },
];

export default function AdminTrainingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Training Programs</h1>
        <p className="text-gray-600 mt-1">Manage courses and student enrollments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <h3 className="font-semibold">{course.title}</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Enrollments</span>
                  <span>{course.enrollments}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed</span>
                  <span>{course.completed}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Revenue</span>
                  <span>₦{(course.revenue / 1000).toFixed(1)}k</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm">View Details</Button>
                <Button size="sm" variant="outline">
                  Issue Certificates
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Actions</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full">+ Add New Course</Button>
            <Button variant="outline" className="w-full">Upload Materials</Button>
            <Button variant="outline" className="w-full">Generate Reports</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}