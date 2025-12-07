// server/src/services/PaymentService.ts
import Stripe from 'stripe';
import { PaymentMethod } from '@jifywigs/shared';

// Use correct Stripe API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { 
  apiVersion: '2023-10-16' // Updated to correct version
});

export class PaymentService {
  static async createPaymentIntent({
    amount,
    currency,
    metadata,
    method,
  }: {
    amount: number;
    currency: string;
    metadata: Record<string, string>;
    method: PaymentMethod;
  }) {
    if (method === PaymentMethod.STRIPE) {
      return await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // cents
        currency,
        metadata,
      });
    }
    // For Paystack/Bank, return custom intent
    return {
      id: `pi_${Date.now()}`,
      amount,
      currency,
      status: 'created',
      method,
      metadata,
      createdAt: new Date(),
    };
  }
}