import { Schema, model } from 'mongoose'; // Add model import
import { BookingStatus } from '../enums';

export const BookingSchema = new Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    services: [
      {
        serviceId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
      }
    ],
    totalAmount: { type: Number, required: true },
    scheduledDate: { type: Date, required: true },
    deliveryType: { 
      type: String, 
      enum: ['pickup', 'delivery'],
      default: 'pickup'
    },
    deliveryAddress: String,
    status: { 
      type: String, 
      enum: Object.values(BookingStatus), 
      default: BookingStatus.PENDING 
    },
    notes: String,
    photos: [String],
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    completedAt: Date,
    cancelledAt: Date,
    cancellationReason: String,
  },
  { timestamps: true }
);

export const Booking = model('Booking', BookingSchema); // ADD THIS LINE

export interface IBookingDocument extends Document {
  bookingId: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  services: Array<{
    serviceId: string;
    name: string;
    price: number;
  }>;
  totalAmount: number;
  scheduledDate: Date;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  status: BookingStatus;
  notes?: string;
  photos: string[];
  assignedTo?: string;
  completedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}