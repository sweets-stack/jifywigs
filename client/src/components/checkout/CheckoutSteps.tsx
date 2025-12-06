// client/src/components/checkout/CheckoutSteps.tsx
'use client';
import { CheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

type Step = 'cart' | 'info' | 'payment' | 'success';

interface CheckoutStepsProps {
  currentStep: Step;
}

const steps: { id: Step; name: string }[] = [
  { id: 'cart', name: 'Cart' },
  { id: 'info', name: 'Information' },
  { id: 'payment', name: 'Payment' },
  { id: 'success', name: 'Confirmation' },
];

export const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="relative">
                {isCompleted ? (
                  <div className="w-10 h-10 rounded-full bg-jify-primary flex items-center justify-center text-white">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-10 h-10 rounded-full bg-jify-primary flex items-center justify-center text-white border-4 border-white">
                    {index + 1}
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-4 border-white">
                    {index + 1}
                  </div>
                )}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-1/2 left-10 w-1/2 h-0.5 transform -translate-y-1/2 ${
                      isCompleted ? 'bg-jify-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCompleted || isCurrent ? 'text-jify-primary' : 'text-gray-500'
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};