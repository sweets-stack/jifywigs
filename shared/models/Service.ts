import { Schema, model, Document } from 'mongoose'; // Add model import

export const ServiceSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    basePrice: { type: Number, required: true },
    durationMins: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    features: [String],
    category: { 
      type: String, 
      enum: ['washing', 'coloring', 'repair', 'styling', 'custom'],
      default: 'washing'
    },
    image: String,
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Service = model('Service', ServiceSchema); // ADD THIS LINE

export interface IServiceDocument extends Document {
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  durationMins: number;
  isActive: boolean;
  features: string[];
  category: 'washing' | 'coloring' | 'repair' | 'styling' | 'custom';
  image?: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}