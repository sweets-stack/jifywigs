'use client';
// client/src/components/checkout/PaystackButton.tsx
'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    PaystackPop?: any;
  }
}

interface PaystackButtonProps {
  amount: number;
  email: string;
  reference: string;
  onSuccess: () => void;
  onClose: () => void;
}

export const PaystackButton = ({
  amount,
  email,
  reference,
  onSuccess,
  onClose,
}: PaystackButtonProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        email,
        amount: amount * 100, // to kobo
        ref: reference,
        currency: 'NGN',
        onClose,
        onSuccess: (transaction: any) => {
          // In real app: call /api/webhooks/paystack
          fetch('/api/webhooks/paystack', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction),
          });
          onSuccess();
        },
      });
      handler.openIframe();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center"
    >
      <span>Pay â‚¦{amount.toLocaleString()} with Paystack</span>
      <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-1.5-9.5a1 1 0 10-2 0 1 1 0 002 0z" />
      </svg>
    </button>
  );
};
