// app/wholesale/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon, BuildingOfficeIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: '',
    monthlyVolume: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({
        businessName: '',
        contactPerson: '',
        email: '',
        phone: '',
        businessType: '',
        monthlyVolume: '',
        message: '',
      });
    } catch (error) {
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <BuildingOfficeIcon className="w-16 h-16 text-jify-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wholesale Partnership</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our network of retailers and offer premium JifyWigs products to your customers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Benefits */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Partner With Us?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Competitive wholesale pricing with generous margins</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Priority access to new collections and best sellers</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Marketing support and promotional materials</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Minimum order requirements tailored to your business</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Dedicated wholesale account manager</span>
              </li>
            </ul>
          </div>

          {/* Right: Application Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for Wholesale Account</h2>
            
            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you for your interest in becoming a JifyWigs wholesale partner.
                  Our team will review your application and contact you within 2 business days.
                </p>
                <Button 
                  onClick={() => setSubmitSuccess(false)}
                  variant="outline"
                  className="border-jify-primary-500 text-jify-primary-500 hover:bg-jify-primary-50/10"
                >
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                    placeholder="Your business or store name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Type *
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                    >
                      <option value="">Select type</option>
                      <option value="boutique">Beauty Boutique</option>
                      <option value="salon">Hair Salon</option>
                      <option value="retailer">Retail Store</option>
                      <option value="online">Online Store</option>
                      <option value="distributor">Distributor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                      placeholder="business@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                      placeholder="+234 000 000 0000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="monthlyVolume" className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Monthly Order Volume *
                  </label>
                  <select
                    id="monthlyVolume"
                    name="monthlyVolume"
                    value={formData.monthlyVolume}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                  >
                    <option value="">Select volume</option>
                    <option value="under_10">Under ₦100,000</option>
                    <option value="10_50">₦100,000 - ₦500,000</option>
                    <option value="50_200">₦500,000 - ₦2,000,000</option>
                    <option value="over_200">Over ₦2,000,000</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                    placeholder="Tell us about your business and how you plan to sell our products..."
                  ></textarea>
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-jify-primary-500 hover:bg-jify-primary-600 py-4 font-semibold"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Have Questions?</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
              <div className="flex items-center">
                <PhoneIcon className="w-6 h-6 text-jify-primary-600 mr-3" />
                <div className="text-left">
                  <p className="text-sm text-gray-500">Call us</p>
                  <p className="font-medium">+234 904 935 5400</p>
                </div>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="w-6 h-6 text-jify-primary-600 mr-3" />
                <div className="text-left">
                  <p className="text-sm text-gray-500">Email us</p>
                  <p className="font-medium">wholesale@shopjifywigs.com.ng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}