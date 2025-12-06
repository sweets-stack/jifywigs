import { Schema, model } from 'mongoose'; // Add model import

export const WholesaleSchema = new Schema(
  {
    applicationId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    businessName: { type: String, required: true },
    businessType: { 
      type: String, 
      enum: ['salon', 'store', 'reseller', 'corporate'],
      required: true 
    },
    contactName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    taxId: String,
    businessLicense: String,
    expectedMonthlyVolume: { type: Number, required: true },
    productInterest: [String],
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected', 'on_hold'],
      default: 'pending'
    },
    notes: String,
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: Date,
    discountRate: Number,
    creditLimit: Number,
  },
  { timestamps: true }
);

export const Wholesale = model('Wholesale', WholesaleSchema); // ADD THIS LINE

export interface IWholesaleDocument extends Document {
  applicationId: string;
  userId?: string;
  businessName: string;
  businessType: 'salon' | 'store' | 'reseller' | 'corporate';
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  taxId?: string;
  businessLicense?: string;
  expectedMonthlyVolume: number;
  productInterest: string[];
  status: 'pending' | 'approved' | 'rejected' | 'on_hold';
  notes?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
  discountRate?: number;
  creditLimit?: number;
  createdAt: Date;
  updatedAt: Date;
}