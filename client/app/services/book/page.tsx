'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Added import
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon, ArrowLeftIcon, CameraIcon, CalendarIcon, TruckIcon, CreditCardIcon } from '@heroicons/react/24/outline';

export default function BookingPage() {
  const router = useRouter(); // ✅ Initialize router
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [delivery, setDelivery] = useState('pickup');
  const [payment, setPayment] = useState('paystack');

  const services = [
    { id: 'washing', name: 'Wig Washing & Conditioning', price: 3500 },
    { id: 'coloring', name: 'Color Refresh & Dye', price: 8000 },
    { id: 'revamping', name: 'Full Wig Revamp', price: 12000 },
    { id: 'repair', name: 'Lace Ventilation Repair', price: 6000 },
  ];

  const total = selectedServices.reduce((sum, id) => {
    const service = services.find(s => s.id === id);
    return sum + (service ? service.price : 0);
  }, 0);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-jify-primary-600">Step {step} of 6</span>
            <span className="text-sm font-medium text-gray-500">₦{total.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-jify-primary-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(step / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {step === 1 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(service => (
                  <div 
                    key={service.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer ${
                      selectedServices.includes(service.id)
                        ? 'border-jify-primary-500 bg-jify-primary-50'
                        : 'border-gray-200 hover:border-jify-primary-200'
                    }`}
                    onClick={() => setSelectedServices(prev => 
                      prev.includes(service.id)
                        ? prev.filter(id => id !== service.id)
                        : [...prev, service.id]
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <span className="font-bold text-jify-primary-600">₦{service.price.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {service.id === 'washing' && 'Deep clean, detangle & nourish'}
                      {service.id === 'coloring' && 'Revive faded color or complete change'}
                      {service.id === 'revamping' && 'Complete restoration: wash, style, trim'}
                      {service.id === 'repair' && 'Fix torn lace and ventilation issues'}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Button onClick={nextStep} disabled={selectedServices.length === 0}>
                  Continue
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Wig Photos</h2>
              <p className="text-gray-600 mb-6">
                Help us assess your wig's condition. Upload clear photos from multiple angles.
              </p>
              
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-jify-primary-300"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <CameraIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="font-medium text-gray-900 mb-1">Upload Photos</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setPhotos(Array.from(e.target.files));
                    }
                  }}
                  className="hidden"
                />
              </div>
              
              {photos.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Uploaded Photos ({photos.length})</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {photos.map((photo, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={URL.createObjectURL(photo)} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={nextStep}>
                  Continue
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Describe Your Wig</h2>
              <p className="text-gray-600 mb-6">
                Any specific concerns, preferences, or instructions for our specialists?
              </p>
              
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                placeholder="e.g. Lace is slightly torn, color is fading at the roots, prefer loose wave style..."
              ></textarea>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={nextStep}>
                  Continue
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
              <p className="text-gray-600 mb-6">
                Choose when you'd like to drop off your wig or schedule pickup.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                    defaultValue=""
                  >
                    <option value="" disabled>Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={nextStep} disabled={!date}>
                  Continue
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Options</h2>
              
              <div className="space-y-4">
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer ${
                    delivery === 'pickup'
                      ? 'border-jify-primary-500 bg-jify-primary-50'
                      : 'border-gray-200 hover:border-jify-primary-200'
                  }`}
                  onClick={() => setDelivery('pickup')}
                >
                  <div className="flex items-center">
                    <TruckIcon className="w-6 h-6 text-jify-primary-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Pickup at Showroom</h3>
                      <p className="text-sm text-gray-600">Free • 16 Lagos Street, Yaba</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer ${
                    delivery === 'delivery'
                      ? 'border-jify-primary-500 bg-jify-primary-50'
                      : 'border-gray-200 hover:border-jify-primary-200'
                  }`}
                  onClick={() => setDelivery('delivery')}
                >
                  <div className="flex items-center">
                    <TruckIcon className="w-6 h-6 text-jify-primary-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Lagos Delivery</h3>
                      <p className="text-sm text-gray-600">₦2,000 • Next-day delivery</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={nextStep}>
                  Continue
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
              
              <div className="space-y-4 mb-8">
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer ${
                    payment === 'paystack'
                      ? 'border-jify-primary-500 bg-jify-primary-50'
                      : 'border-gray-200 hover:border-jify-primary-200'
                  }`}
                  onClick={() => setPayment('paystack')}
                >
                  <div className="flex items-center">
                    <CreditCardIcon className="w-6 h-6 text-jify-primary-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Paystack (Online)</h3>
                      <p className="text-sm text-gray-600">Visa, Mastercard, Bank Transfer</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer ${
                    payment === 'flutterwave'
                      ? 'border-jify-primary-500 bg-jify-primary-50'
                      : 'border-gray-200 hover:border-jify-primary-200'
                  }`}
                  onClick={() => setPayment('flutterwave')}
                >
                  <div className="flex items-center">
                    <CreditCardIcon className="w-6 h-6 text-jify-primary-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Flutterwave (Online)</h3>
                      <p className="text-sm text-gray-600">Cards, USSD, Bank Transfer</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer ${
                    payment === 'cash'
                      ? 'border-jify-primary-500 bg-jify-primary-50'
                      : 'border-gray-200 hover:border-jify-primary-200'
                  }`}
                  onClick={() => setPayment('cash')}
                >
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-jify-primary-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-900">Cash on Pickup/Delivery</h3>
                      <p className="text-sm text-gray-600">Pay when you receive your wig</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  className="bg-jify-primary-500 hover:bg-jify-primary-600"
                  onClick={() => alert('Booking submitted! Redirecting to payment...')}
                >
                  Confirm & Pay
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Confirmation Screen (when step === 7) */}
        {step === 7 && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your booking reference is <span className="font-mono font-bold">JW-{Date.now().toString().slice(-6)}</span>.<br />
              We've sent confirmation details to your email.
            </p>
            <Button 
              onClick={() => router.push('/dashboard/bookings')} // ✅ Now router is defined
              className="bg-jify-primary-500 hover:bg-jify-primary-600"
            >
              View Booking Details
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}