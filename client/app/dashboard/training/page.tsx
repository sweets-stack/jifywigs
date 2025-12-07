// client/app/dashboard/training/page.tsx
'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { CertificateBadge } from '@/components/training/CertificateBadge';
import { TrainingStatus, CertificateStatus } from '@jifywigs/shared/enums';

interface TrainingEnrollment {
  id: string;
  courseTitle: string;
  instructor: string;
  enrollmentDate: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: TrainingStatus;
  certificateStatus?: CertificateStatus;
  mode: 'online' | 'in-person' | 'hybrid';
  nextSession?: string;
  assignmentsCompleted: number;
  totalAssignments: number;
}

const mockTrainings: TrainingEnrollment[] = [
  {
    id: 'TR-2023-001',
    courseTitle: 'Professional Wig Styling Masterclass',
    instructor: 'Jane Doe',
    enrollmentDate: 'Dec 1, 2025',
    startDate: 'Dec 5, 2025',
    endDate: 'Dec 20, 2025',
    progress: 65,
    status: TrainingStatus.ONGOING,
    certificateStatus: CertificateStatus.PENDING,
    mode: 'hybrid',
    nextSession: 'Dec 15, 2025 - 2:00 PM',
    assignmentsCompleted: 13,
    totalAssignments: 20,
  },
  {
    id: 'TR-2023-045',
    courseTitle: 'Wig Maintenance & Care Fundamentals',
    instructor: 'John Smith',
    enrollmentDate: 'Nov 10, 2025',
    startDate: 'Nov 15, 2025',
    endDate: 'Nov 30, 2025',
    progress: 100,
    status: TrainingStatus.COMPLETED,
    certificateStatus: CertificateStatus.ISSUED,
    mode: 'online',
    assignmentsCompleted: 15,
    totalAssignments: 15,
  },
  {
    id: 'TR-2024-003',
    courseTitle: 'Advanced Coloring Techniques',
    instructor: 'Sarah Johnson',
    enrollmentDate: 'Jan 5, 2026',
    startDate: 'Jan 10, 2026',
    endDate: 'Jan 25, 2026',
    progress: 0,
    status: TrainingStatus.UPCOMING,
    mode: 'in-person',
    nextSession: 'Jan 10, 2026 - 10:00 AM',
    assignmentsCompleted: 0,
    totalAssignments: 18,
  },
];

export default function TrainingPage() {
  const getStatusColor = (status: TrainingStatus): 'success' | 'primary' | 'secondary' | 'danger' => {
    switch (status) {
      case TrainingStatus.COMPLETED:
        return 'success';
      case TrainingStatus.ONGOING:
        return 'primary';
      case TrainingStatus.UPCOMING:
        return 'secondary';
      case TrainingStatus.CANCELLED:
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getModeBadge = (mode: string) => {
    switch (mode) {
      case 'online':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Online</Badge>;
      case 'in-person':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">In-Person</Badge>;
      case 'hybrid':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Hybrid</Badge>;
      default:
        return <Badge variant="outline">{mode}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Training & Courses</h1>
          <p className="text-gray-600 mt-1">Track your learning progress and access course materials.</p>
        </div>
        <Button>Browse More Courses</Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Courses in Progress</p>
                <p className="text-2xl font-bold mt-1">1</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Courses</p>
                <p className="text-2xl font-bold mt-1">1</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Progress</p>
                <p className="text-2xl font-bold mt-1">55%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training List */}
      <div className="space-y-6">
        {mockTrainings.map((training) => (
          <Card key={training.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{training.courseTitle}</h3>
                    {getModeBadge(training.mode)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {training.instructor}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {training.startDate} - {training.endDate}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={getStatusColor(training.status)}>
                    {training.status.replace('_', ' ')}
                  </Badge>
                  {training.certificateStatus && (
                    <CertificateBadge status={training.certificateStatus} />
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Course Progress</span>
                  <span className="font-medium">{training.progress}%</span>
                </div>
                <Progress value={training.progress} className="h-2" />
                <div className="text-xs text-gray-500 mt-1">
                  {training.assignmentsCompleted} of {training.totalAssignments} assignments completed
                </div>
              </div>

              {/* Next Session & Actions */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="space-y-2">
                  {training.nextSession && (
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Next Session:</span>
                      <span className="text-gray-600">{training.nextSession}</span>
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    Enrolled on {training.enrollmentDate}
                  </div>
                </div>

                <div className="flex gap-2">
                  {training.status === TrainingStatus.ONGOING && (
                    <>
                      <Button size="sm" variant="outline">Course Materials</Button>
                      <Button size="sm">Continue Learning</Button>
                    </>
                  )}
                  {training.status === TrainingStatus.UPCOMING && (
                    <Button size="sm" variant="outline">View Schedule</Button>
                  )}
                  {training.status === TrainingStatus.COMPLETED && (
                    <>
                      <Button size="sm" variant="outline">View Certificate</Button>
                      <Button size="sm">Leave Review</Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (for when no trainings) */}
      {mockTrainings.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No training enrollments yet</h3>
            <p className="text-gray-600 mb-6">Browse our courses and start your learning journey today.</p>
            <Button>Explore Courses</Button>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Courses Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recommended Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">Beginner</Badge>
                <span className="text-sm font-medium text-green-600">₦25,000</span>
              </div>
              <h4 className="font-semibold mb-2">Wig Care Basics</h4>
              <p className="text-sm text-gray-600 mb-4">Learn essential wig maintenance techniques for beginners.</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>4 weeks</span>
                <span>Starts Jan 15</span>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="bg-purple-50 text-purple-700">Intermediate</Badge>
                <span className="text-sm font-medium text-green-600">₦45,000</span>
              </div>
              <h4 className="font-semibold mb-2">Advanced Styling</h4>
              <p className="text-sm text-gray-600 mb-4">Master professional styling techniques and trends.</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>6 weeks</span>
                <span>Starts Feb 1</span>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="bg-red-50 text-red-700">Advanced</Badge>
                <span className="text-sm font-medium text-green-600">₦65,000</span>
              </div>
              <h4 className="font-semibold mb-2">Business of Wigs</h4>
              <p className="text-sm text-gray-600 mb-4">Learn to start and grow your wig business.</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>8 weeks</span>
                <span>Starts Mar 1</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}