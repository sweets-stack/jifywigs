// server/src/schemas/Service.ts
import { Schema, model } from 'mongoose';

const ServiceSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    basePrice: { type: Number, required: true, min: 0 },
    durationMins: { type: Number, required: true, min: 1 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Service = model('Service', ServiceSchema);