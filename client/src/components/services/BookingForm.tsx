// client/src/components/services/BookingForm.tsx
'use client';

import { useState } from 'react';
import { CalendarIcon, UploadIcon, MapPinIcon } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@/components/ui/Button';

interface ServiceOption {
  _id: string;
  name: string;
  basePrice: number;
}

export const BookingForm = ({ services }: { services: ServiceOption[] }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [appointmentDate, setAppointmentDate] = useState<Date>(new Date());
  const [pickupOption, setPickupOption] = useState<'pickup' | 'dropoff'>('pickup');
  const [photos, setPhotos] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In real app: upload photos to Cloudinary first
      const photoUrls = photos.map(() => 'https://placehold.co/400x400?text=Uploaded');

      const bookingData = {
        services: selectedServices.map((id) => ({
          serviceId: id,
          notes: notes[id] || '',
        })),
        wigPhotos: photoUrls,
        description,
        appointmentDate: appointmentDate.toISOString(),
        pickupOption,
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        alert('Booking submitted! Check email for confirmation.');
        // Redirect to tracking page
      }
    } catch (error) {
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Services */}
      <div>
        <h3 className="text-lg font-medium mb-3">Select Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((service) => (
            <label key={service._id} className="flex items-start border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selectedServices.includes(service._id)}
                onChange={() => toggleService(service._id)}
                className="mt-1 mr-3 h-4 w-4 text-jify-primary rounded"
              />
              <div>
                <div className="font-medium">{service.name}</div>
                <div className="text-sm text-gray-600">₦{service.basePrice.toLocaleString()}</div>
                {selectedServices.includes(service._id) && (
                  <input
                    type="text"
                    placeholder="Special instructions (optional)"
                    value={notes[service._id] || ''}
                    onChange={(e) => setNotes({ ...notes, [service._id]: e.target.value })}
                    className="mt-2 w-full px-2 py-1 border rounded text-sm"
                  />
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Photos */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Upload Wig Photos <span className="text-gray-500">(min. 2)</span>
        </label>
        <div className="flex items-center">
          <UploadIcon className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-jify-primary file:text-white hover:file:bg-jify-primary/90"
          />
        </div>
        {photos.length > 0 && (
          <div className="mt-2 text-sm">
            {photos.length} file(s) selected
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Describe Wig Condition (Optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-jify-primary focus:border-jify-primary"
          placeholder="e.g., Frayed lace, needs color touch-up..."
        />
      </div>

      {/* Appointment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Date</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <DatePicker
              selected={appointmentDate}
              onChange={(date: Date | null) => date && setAppointmentDate(date)}
              minDate={new Date()}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-jify-primary focus:border-jify-primary"
              dateFormat="MMMM d, yyyy"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Pickup/Drop-off</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="pickup"
                checked={pickupOption === 'pickup'}
                onChange={() => setPickupOption('pickup')}
                className="h-4 w-4 text-jify-primary"
              />
              <span className="ml-2">I'll drop off</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="pickup"
                checked={pickupOption === 'dropoff'}
                onChange={() => setPickupOption('dropoff')}
                className="h-4 w-4 text-jify-primary"
              />
              <span className="ml-2">Pick up from me</span>
            </label>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={selectedServices.length === 0 || loading} size="lg" className="w-full">
        {loading ? 'Booking...' : 'Confirm Booking'}
      </Button>
    </form>
  );
};