import { BookingStatus } from '@jifywigs/shared/enums';

export interface IService {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  durationMins: number;
  isActive: boolean;
}

export interface IBooking {
  _id?: string;
  userId: string;
  services: { serviceId: string; notes?: string }[];
  wigPhotos: string[];
  description?: string;
  appointmentDate: Date;
  pickupOption: 'pickup' | 'dropoff';
  status: BookingStatus;
  trackingNumber: string;
  createdAt?: Date;
}
