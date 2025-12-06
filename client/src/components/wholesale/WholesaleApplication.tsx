// client/src/components/wholesale/WholesaleApplication.tsx
'use client';

import { useState } from 'react';
import { BuildingOfficeIcon, DocumentTextIcon, MapPinIcon, LinkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface WholesaleApplicationProps {
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
}

export const WholesaleApplication = ({ onSubmit, loading = false }: WholesaleApplicationProps) => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'salon' as 'salon' | 'reseller' | 'distributor' | 'other',
    taxId: '',
    address: '',
    website: '',
    annualVolume: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      annualVolume: Number(formData.annualVolume),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
            Business Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
            Business Type *
          </label>
          <Select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            required
          >
            <option value="salon">Beauty Salon/Studio</option>
            <option value="reseller">Online Reseller</option>
            <option value="distributor">Distributor</option>
            <option value="other">Other</option>
          </Select>
        </div>

        <div>
          <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
            Tax ID / RC Number *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DocumentTextIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="taxId"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              required
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label htmlFor="annualVolume" className="block text-sm font-medium text-gray-700 mb-1">
            Est. Annual Volume (Units) *
          </label>
          <Input
            id="annualVolume"
            name="annualVolume"
            type="number"
            value={formData.annualVolume}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Business Address *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPinIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="pl-10"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Website / Social Media
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LinkIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://"
              className="pl-10"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-jify-primary focus:border-jify-primary"
          />
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" disabled={loading} size="lg" className="w-full">
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>
        <p className="mt-3 text-sm text-gray-500 text-center">
          We’ll review your application within 2 business days. ✅
        </p>
      </div>
    </form>
  );
};