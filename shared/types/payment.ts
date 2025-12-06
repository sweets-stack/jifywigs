// client/src/lib/payment.ts
//import { PaymentMethod } from '@jifywigs/shared/enums';

interface InitiatePaymentParams {
  amount: number;
  email: string;
  reference: string;
  metadata: Record<string, string>;
  //method: PaymentMethod;
  currency?: 'NGN' | 'USD' | 'GBP' | 'EUR';
}

export const initiatePayment = async (params: InitiatePaymentParams) => {
  const res = await fetch('/api/payment/initiate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return res.json();
};