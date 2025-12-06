// server/src/schemas/Booking.ts
import { Schema, model } from 'mongoose';
import { BookingStatus } from '@jifywigs/shared';

const BookingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    services: [
      {
        serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
        notes: { type: String },
      },
    ],
    wigPhotos: [{ type: String, required: true }], // Cloudinary URLs
    description: { type: String },
    appointmentDate: { type: Date, required: true },
    pickupOption: { type: String, enum: ['pickup', 'dropoff'], required: true },
    status: { type: String, enum: Object.values(BookingStatus), default: BookingStatus.PENDING },
    trackingNumber: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Auto-generate tracking number on save
BookingSchema.pre('save', function (next) {
  if (this.isNew && !this.trackingNumber) {
    this.trackingNumber = 'JW' + Date.now().toString(36).toUpperCase();
  }
  next();
});

export const Booking = model('Booking', BookingSchema);