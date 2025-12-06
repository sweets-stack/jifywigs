// server/src/schemas/Subscriber.ts
import { Schema, model } from 'mongoose';

const SubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    firstName: { type: String },
    lastName: { type: String },
    subscribedAt: { type: Date, default: Date.now },
    confirmedAt: { type: Date },
    isConfirmed: { type: Boolean, default: false },
    tags: [{ type: String }],
    source: { type: String, enum: ['footer', 'homepage', 'popup'], default: 'footer' },
  },
  { timestamps: true }
);

export const Subscriber = model('Subscriber', SubscriberSchema);