// server/src/controllers/webhook.controller.ts
import { Request, Response } from 'express';
import Stripe from 'stripe'; // ADD THIS IMPORT
import { Order } from '../models';
import { PaymentService } from '../services/PaymentService';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { 
  apiVersion: '2023-10-16' as any 
});

// Paystack webhook
export const handlePaystackWebhook = async (req: Request, res: Response) => {
  const hash = req.headers['x-paystack-signature'] as string;
  const secret = process.env.PAYSTACK_SECRET_KEY!;

  // Verify signature (use crypto.createHmac)
  // const expectedHash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
  // if (hash !== expectedHash) return res.status(400).send();

  const { event, data } = req.body;

  if (event === 'charge.success') {
    const { reference, metadata } = data;
    const orderId = metadata.orderId || metadata.trainingId;

    if (orderId) {
      await Order.findOneAndUpdate(
        { 'payment.reference': reference },
        {
          'payment.status': 'succeeded',
          'payment.confirmedAt': new Date(),
          status: 'confirmed',
        }
      );
    }
  }

  res.json({ received: true });
};

// Stripe webhook
export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object;
    const orderId = intent.metadata.orderId;

    if (orderId) {
      await Order.findByIdAndUpdate(orderId, {
        'payment.status': 'succeeded',
        'payment.confirmedAt': new Date(),
        status: 'confirmed',
      });
    }
  }

  res.json({ received: true });
};