'use client';

// client/src/components/checkout/PaymentMethod.tsx

import { useState } from 'react';
import { CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/Badge';
import { PaystackButton } from './PaystackButton';

interface PaymentMethodProps {
  amount: number;
  email: string;
  onBankTransfer: () => void;
}

export const PaymentMethod = ({ amount, email, onBankTransfer }: PaymentMethodProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'paystack' | 'bank'>('paystack');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Payment Method</h2>
        <p className="text-gray-600 mt-1">Choose how you'd like to pay.</p>
      </div>

      {/* Paystack */}
      <div
        className={`border rounded-xl p-4 cursor-pointer ${
          selectedMethod === 'paystack' ? 'border-jify-primary bg-jify-primary/5' : 'border-gray-200'
        }`}
        onClick={() => setSelectedMethod('paystack')}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <CreditCardIcon className="w-6 h-6 text-jify-primary" />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Pay with Paystack</h3>
              {selectedMethod === 'paystack' && (
                <Badge variant="secondary">Selected</Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Visa, Mastercard, Verve, Bank Transfer (NGN)
            </p>
          </div>
        </div>
      </div>

      {/* Bank Transfer */}
      <div
        className={`border rounded-xl p-4 cursor-pointer ${
          selectedMethod === 'bank' ? 'border-jify-primary bg-jify-primary/5' : 'border-gray-200'
        }`}
        onClick={() => setSelectedMethod('bank')}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <BanknotesIcon className="w-6 h-6 text-gray-600" />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Manual Bank Transfer</h3>
              {selectedMethod === 'bank' && (
                <Badge variant="secondary">Selected</Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Transfer to our account and upload proof
            </p>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="pt-4">
        {selectedMethod === 'paystack' ? (
          <PaystackButton
            amount={amount}
            email={email}
            reference={`JW_${Date.now()}`}
            onSuccess={() => console.log('Payment successful')}
            onClose={() => console.log('Payment closed')}
          />
        ) : (
          <button
            onClick={onBankTransfer}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center"
          >
            <BanknotesIcon className="w-5 h-5 mr-2" />
            Proceed to Bank Transfer
          </button>
        )}
      </div>
    </div>
  );
};