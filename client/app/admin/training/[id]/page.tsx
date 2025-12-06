// client/app/admin/training/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { TrainingMode } from '@jifywigs/shared/enums';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ChatBubbleLeftIcon,
  PaperClipIcon
} from '@heroicons/react/24/outline';

interface Training {
  _id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseName: string;
  courseSlug: string;
  mode: TrainingMode;
  amountPaid: number;
  totalAmount: number;
  startDate: string;
  endDate?: string;
  status: 'enrolled' | 'in_progress' | 'completed' | 'cancelled';
  certificateIssued: boolean;
  certificateUrl?: string;
  notes?: string;
  assignedInstructor?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export default function TrainingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [training, setTraining] = useState<Training | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [certificateNotes, setCertificateNotes] = useState('');

  useEffect(() => {
    fetchTrainingData();
  }, [id]);

  const fetchTrainingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/training/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTraining(data.training);
        setStudent(data.student);
      } else {
        throw new Error('Training not found');
      }
    } catch (error) {
      console.error('Error fetching training:', error);
      alert('Training not found');
      router.push('/admin/training');
    } finally {
      setLoading(false);
    }
  };

  const updateTrainingStatus = async (newStatus: Training['status']) => {
    if (!training) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/training/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setTraining(updatedData);
        alert('Training status updated successfully!');
      } else {
        throw new Error('Failed to update training status');
      }
    } catch (error) {
      console.error('Error updating training status:', error);
      alert('Failed to update training status');
    } finally {
      setUpdating(false);
    }
  };

  const issueCertificate = async () => {
    if (!training) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/training/${id}/certificate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          certificateIssued: true,
          certificateUrl: `https://jifywigs.com/certificates/${training._id}`,
          notes: certificateNotes
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setTraining(updatedData);
        setShowCertificateModal(false);
        setCertificateNotes('');
        alert('Certificate issued successfully!');
      } else {
        throw new Error('Failed to issue certificate');
      }
    } catch (error) {
      console.error('Error issuing certificate:', error);
      alert('Failed to issue certificate');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: Training['status']) => {
    switch (status) {
      case 'enrolled':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Training['status']) => {
    switch (status) {
      case 'enrolled':
        return <ClockIcon className="w-5 h-5" />;
      case 'in_progress':
        return <ClockIcon className="w-5 h-5" />;
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5" />;
      case 'cancelled':
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

  const getNextStatus = (currentStatus: Training['status']): Training['status'][] => {
    const statusFlow: Record<Training['status'], Training['status'][]> = {
      enrolled: ['in_progress', 'cancelled'],
      in_progress: ['completed', 'cancelled'],
      completed: [],
      cancelled: [],
    };
    return statusFlow[currentStatus] || [];
  };

  const calculateBalance = () => {
    if (!training) return 0;
    return training.totalAmount - training.amountPaid;
  };

  const getProgressPercentage = () => {
    if (!training) return 0;
    
    const statusProgress = {
      enrolled: 25,
      in_progress: 50,
      completed: 100,
      cancelled: 0,
    };
    
    return statusProgress[training.status] || 0;
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-jify-primary-500"></div>
        <p className="mt-4 text-gray-600">Loading training details...</p>
      </div>
    );
  }

  if (!training || !student) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Training not found</p>
        <Link href="/admin/training" className="mt-4 inline-block">
          <Button variant="outline">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Training
          </Button>
        </Link>
      </div>
    );
  }

  const balance = calculateBalance();
  const progress = getProgressPercentage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/training" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Training
          </Link>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900">{training.courseName}</h1>
            <Badge variant={
              training.status === 'completed' ? 'success' : 
              training.status === 'cancelled' ? 'danger' : 
              training.status === 'in_progress' ? 'warning' : 'default'
            }>
              {training.status.replace('_', ' ')}
            </Badge>
            {training.certificateIssued && (
              <Badge variant="primary">
                Certificate Issued
              </Badge>
            )}
          </div>
          <p className="text-gray-600 mt-1">
            Enrollment ID: {training._id.slice(-8).toUpperCase()}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Training Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-jify-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Enrolled</span>
              <span>In Progress</span>
              <span>Completed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Actions */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Training Status</h2>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${getStatusColor(training.status)}`}>
                    {getStatusIcon(training.status)}
                  </div>
                  <div>
                    <p className="font-medium">Current Status: {training.status.replace('_', ' ')}</p>
                    {training.completedAt && (
                      <p className="text-sm text-gray-600">
                        Completed: {new Date(training.completedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                {getNextStatus(training.status).length > 0 && (
                  <div className="flex space-x-2">
                    {getNextStatus(training.status).map(status => (
                      <Button
                        key={status}
                        onClick={() => updateTrainingStatus(status)}
                        disabled={updating}
                        className={`${
                          status === 'completed' 
                            ? 'bg-jify-primary-500 hover:bg-jify-primary-600' 
                            : status === 'cancelled'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                      >
                        Mark as {status.replace('_', ' ')}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Training Details */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <AcademicCapIcon className="w-5 h-5 mr-2" />
                Training Details
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Course Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Course Name</p>
                  <p className="font-bold text-lg">{training.courseName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Training Mode</p>
                  <Badge variant="secondary" className="capitalize">
                    {training.mode.replace('_', ' ')}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-medium">
                    {new Date(training.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">End Date</p>
                  <p className="font-medium">
                    {training.endDate 
                      ? new Date(training.endDate).toLocaleDateString()
                      : 'Not set'}
                  </p>
                </div>
              </div>

              {/* Financial Details */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Financial Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Course Fee</span>
                    <span className="font-bold">{formatPrice(training.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid</span>
                    <span className="font-bold text-green-600">
                      {formatPrice(training.amountPaid)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="font-medium">Balance Due</span>
                    <span className={`font-bold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {formatPrice(balance)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Certificate Section */}
              {training.status === 'completed' && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Certificate</h3>
                  {training.certificateIssued ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-green-800">Certificate Issued</p>
                          <p className="text-sm text-green-600">
                            {training.certificateUrl ? (
                              <a 
                                href={training.certificateUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="underline hover:text-green-800"
                              >
                                View Certificate
                              </a>
                            ) : 'Certificate available for download'}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <PaperClipIcon className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowCertificateModal(true)}
                          >
                            Re-issue
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-yellow-800">Certificate Not Issued</p>
                          <p className="text-sm text-yellow-600">
                            Issue certificate to complete the training process
                          </p>
                        </div>
                        <Button 
                          onClick={() => setShowCertificateModal(true)}
                          className="bg-jify-primary-500 hover:bg-jify-primary-600"
                        >
                          Issue Certificate
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Notes */}
              {training.notes && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Notes</h3>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-line">{training.notes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Student Information */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <UserIcon className="w-5 h-5 mr-2" />
                Student Information
              </h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Student Name</p>
                <p className="font-medium">{student.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="font-medium flex items-center">
                  <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400" />
                  {student.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="font-medium flex items-center">
                  <PhoneIcon className="w-4 h-4 mr-2 text-gray-400" />
                  {student.phone}
                </p>
              </div>
              <div className="pt-3">
                <Link href={`/admin/customers/${student._id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    View Student Profile
                  </Button>
                </Link>
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
                onClick={() => window.open(`mailto:${student.email}?subject=Training: ${training.courseName}`, '_blank')}
              >
                <EnvelopeIcon className="w-4 h-4 mr-2" />
                Email Student
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(`https://wa.me/${student.phone.replace(/\D/g, '')}`, '_blank')}
              >
                <ChatBubbleLeftIcon className="w-4 h-4 mr-2" />
                WhatsApp Student
              </Button>
              {balance > 0 && (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    // Implement payment reminder
                    alert('Payment reminder sent to student');
                  }}
                >
                  <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                  Send Payment Reminder
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  // Implement attendance tracking
                  alert('Attendance marked for today');
                }}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Mark Attendance
              </Button>
            </CardContent>
          </Card>

          {/* Training Timeline */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Training Timeline</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <CalendarIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Enrollment</p>
                    <p className="text-xs text-gray-500">
                      {new Date(training.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Training Started</p>
                    <p className="text-xs text-gray-500">
                      {new Date(training.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {training.completedAt && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <AcademicCapIcon className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Training Completed</p>
                      <p className="text-xs text-gray-500">
                        {new Date(training.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {training.certificateIssued && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <DocumentTextIcon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Certificate Issued</p>
                      <p className="text-xs text-gray-500">
                        {training.certificateUrl ? 'Available' : 'Pending'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Instructor Assignment */}
          {training.assignedInstructor ? (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Assigned Instructor</h2>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-jify-primary-100 flex items-center justify-center">
                    <span className="text-jify-primary-500 font-bold">
                      {training.assignedInstructor.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">Instructor Name</p>
                    <p className="text-sm text-gray-600">Senior Wig Specialist</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Assign Instructor</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="">Select Instructor</option>
                    <option value="1">Sarah Johnson</option>
                    <option value="2">Michael Chen</option>
                    <option value="3">Amina Bello</option>
                  </select>
                  <Button className="w-full bg-jify-primary-500 hover:bg-jify-primary-600">
                    Assign Instructor
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {training.certificateIssued ? 'Re-issue Certificate' : 'Issue Certificate'}
            </h3>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                Certificate for: <span className="font-medium">{student.name}</span>
              </p>
              <p className="text-gray-600">
                Course: <span className="font-medium">{training.courseName}</span>
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate Notes (Optional)
              </label>
              <textarea
                value={certificateNotes}
                onChange={(e) => setCertificateNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                placeholder="Add any notes about this certificate..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCertificateModal(false);
                  setCertificateNotes('');
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-jify-primary-500 hover:bg-jify-primary-600"
                onClick={issueCertificate}
                disabled={updating}
              >
                {updating ? 'Issuing...' : training.certificateIssued ? 'Re-issue Certificate' : 'Issue Certificate'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}