// client/src/components/checkout/AddressForm.tsx
'use client';
import { useState } from 'react';
import { MapPinIcon, UserIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface AddressFormProps {
  onSubmit: ( arg0: any) => void;
}

export const AddressForm = ({ onSubmit }: AddressFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    saveAddress: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
            First Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-1">
            Last Name *
          </label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="pl-10"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Address *
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
        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-1">
            City *
          </label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium mb-1">
            State *
          </label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
            Postal Code
          </label>
          <Input
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="saveAddress"
          name="saveAddress"
          type="checkbox"
          checked={formData.saveAddress}
          onChange={handleChange}
          className="h-4 w-4 text-jify-primary rounded"
        />
        <label htmlFor="saveAddress" className="ml-2 block text-sm text-gray-700">
          Save this address for next time
        </label>
      </div>

      <Button type="submit" size="lg" className="w-full">
        Continue to Payment
      </Button>
    </form>
  );
};