// client/src/components/admin/BookingTimeline.tsx
'use client';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface BookingTimelineProps {
  status: string;
}

export const BookingTimeline = ({ status }: BookingTimelineProps) => {
  const steps = [
    { id: 'pending', name: 'Submitted' },
    { id: 'confirmed', name: 'Confirmed' },
    { id: 'received', name: 'Received' },
    { id: 'in_progress', name: 'In Progress' },
    { id: 'completed', name: 'Completed' },
  ];

  const currentIndex = steps.findIndex((step) => step.id === status);

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.id} className="flex items-start">
            <div className="flex-shrink-0">
              {isCompleted ? (
                <div className="w-8 h-8 rounded-full bg-jify-primary flex items-center justify-center text-white">
                  <CheckCircleIcon className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  {isCurrent ? (
                    <ClockIcon className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
              )}
            </div>
            <div className="ml-4">
              <p
                className={`font-medium ${
                  isCompleted ? 'text-gray-900' : isCurrent ? 'text-jify-primary' : 'text-gray-500'
                }`}
              >
                {step.name}
              </p>
              {isCurrent && (
                <p className="text-sm text-jify-primary mt-1">Current step</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};