// client/src/types/booking.ts
import { BookingStatus } from '@jifywigs/shared/enums';

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
  updatedAt?: Date;
}