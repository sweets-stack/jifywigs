// shared/types/wholesale.ts
export interface IWholesaleApplication {
  _id?: string;
  userId: string;
  businessName: string;
  businessType: 'salon' | 'reseller' | 'distributor' | 'other';
  taxId: string;
  address: string;
  website?: string;
  annualVolume: number; // est. units/year
  status: 'pending' | 'approved' | 'rejected' | 'on_hold';
  notes?: string;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface IWholesalePricingTier {
  minQuantity: number;
  maxQuantity: number;
  discountPercent: number;
  customPricing?: Record<string, number>; // productId → wholesalePrice
}