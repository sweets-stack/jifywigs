// app/admin/services/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface IService {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  inStock: boolean;
  requiresAppointment: boolean;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default function ServicesPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Form state for create/edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    description: '',
    price: 0,
    duration: '',
    category: '',
    inStock: true,
    requiresAppointment: true,
    images: [] as string[],
  });

  const initialFormData = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    duration: '',
    category: '',
    inStock: true,
    requiresAppointment: true,
    images: [] as string[],
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        // Fallback to sample data
        setServices([
          {
            _id: '1',
            name: 'Wig Installation & Styling',
            description: 'Professional wig installation with custom styling',
            price: 15000,
            duration: '2-3 hours',
            category: 'installation',
            inStock: true,
            requiresAppointment: true,
            images: ['/images/service-1.jpg'],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            _id: '2',
            name: 'Wig Customization',
            description: 'Custom cutting, coloring, and styling',
            price: 10000,
            duration: '1-2 hours',
            category: 'customization',
            inStock: true,
            requiresAppointment: true,
            images: ['/images/service-2.jpg'],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            _id: '3',
            name: 'Wig Maintenance',
            description: 'Deep cleaning, conditioning, and repair',
            price: 8000,
            duration: '1 hour',
            category: 'maintenance',
            inStock: true,
            requiresAppointment: true,
            images: ['/images/service-3.jpg'],
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setServices(services.filter(s => s._id !== id));
      alert('Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error deleting service. Please try again.');
    }
  };

  const handleEdit = (service: IService) => {
    setFormData({
      _id: service._id,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      category: service.category,
      inStock: service.inStock,
      requiresAppointment: service.requiresAppointment,
      images: service.images,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsModalOpen(false);
      setFormData(initialFormData);
      
      // Update services list
      if (formData._id) {
        setServices(prev => prev.map(s => 
          s._id === formData._id ? { 
            ...s, 
            ...formData,
            updatedAt: new Date()
          } : s
        ));
        alert('Service updated successfully!');
      } else {
        const newService: IService = {
          ...formData,
          _id: `mock-${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setServices(prev => [newService, ...prev]);
        alert('Service created successfully!');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error saving service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'available' && service.inStock) ||
                         (statusFilter === 'unavailable' && !service.inStock);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['installation', 'customization', 'maintenance', 'consultation', 'training'];
  const serviceTypes = ['available', 'unavailable'];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('NGN', '₦');
  };

  // Quick create modal
  const renderQuickCreateModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {formData._id ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setFormData(initialFormData);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Name *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₦) *
                  </label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration *
                  </label>
                  <Input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    required
                    placeholder="e.g., 2 hours"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                    className="h-4 w-4 text-jify-primary-500 focus:ring-jify-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Available</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.requiresAppointment}
                    onChange={(e) => setFormData({...formData, requiresAppointment: e.target.checked})}
                    className="h-4 w-4 text-jify-primary-500 focus:ring-jify-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Requires Appointment</span>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData(initialFormData);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-jify-primary-500 hover:bg-jify-primary-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {formData._id ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    formData._id ? 'Update Service' : 'Create Service'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-1">
            Manage your wig care and styling services
          </p>
        </div>
        <Button 
          onClick={() => {
            setFormData(initialFormData);
            setIsModalOpen(true);
          }}
          className="bg-jify-primary-500 hover:bg-jify-primary-600"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-jify-primary-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading services...</p>
            </div>
          ) : filteredServices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
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
                  {filteredServices.map((service) => (
                    <tr key={service._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {service.images[0] ? (
                              <img
                                src={service.images[0]}
                                alt={service.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{service.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{service.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary">
                          {service.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(service.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {service.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {service.inStock ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircleIcon className="w-3 h-3 mr-1" />
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <XCircleIcon className="w-3 h-3 mr-1" />
                            Unavailable
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            title="Edit Service"
                            onClick={() => handleEdit(service)}
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(service._id)}
                            title="Delete Service"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
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
              <h3 className="mt-4 text-lg font-medium text-gray-900">No services found</h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your filters or add a new service.
              </p>
              <div className="mt-4">
                <Button 
                  onClick={() => {
                    setFormData(initialFormData);
                    setIsModalOpen(true);
                  }}
                  className="bg-jify-primary-500 hover:bg-jify-primary-600"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add Service
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Services</p>
                  <p className="text-2xl font-bold text-gray-900">{services.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {services.filter(s => s.inStock).length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Requires Appointment</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {services.filter(s => s.requiresAppointment).length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <CalendarIcon className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Create/Edit Modal */}
      {renderQuickCreateModal()}
    </div>
  );
}