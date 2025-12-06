// server/src/routes/webhook.routes.ts
import { Router } from 'express';
import { handlePaystackWebhook, handleStripeWebhook } from '../controllers/webhook.controller';

const router = Router();

// No auth — public endpoints
router.post('/paystack', handlePaystackWebhook);
router.post('/stripe', 
  express.raw({ type: 'application/json' }), // Stripe requires raw body
  handleStripeWebhook
);

export default router;