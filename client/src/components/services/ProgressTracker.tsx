// client/src/components/services/ProgressTracker.tsx
'use client';
import {
  CheckCircleIcon,
  CircleIcon,
  ClockIcon,
  TruckIcon,
  SparklesIcon,
  PackageIcon,
} from 'lucide-react';
import { BookingStatus } from '@jifywigs/shared/enums';

interface ProgressStep {
  id: BookingStatus;
  label: string;
  icon: JSX.Element;
}

const steps: ProgressStep[] = [
  { id: BookingStatus.PENDING, label: 'Booked', icon: <ClockIcon className="w-5 h-5" /> },
  { id: BookingStatus.CONFIRMED, label: 'Confirmed', icon: <CheckCircleIcon className="w-5 h-5" /> },
  { id: BookingStatus.RECEIVED, label: 'Received', icon: <PackageIcon className="w-5 h-5" /> },
  { id: BookingStatus.IN_PROGRESS, label: 'In Progress', icon: <SparklesIcon className="w-5 h-5" /> },
  { id: BookingStatus.AWAITING_APPROVAL, label: 'Ready', icon: <TruckIcon className="w-5 h-5" /> },
  { id: BookingStatus.COMPLETED, label: 'Completed', icon: <CheckCircleIcon className="w-5 h-5 text-green-500" /> },
];

interface ProgressTrackerProps {
  currentStatus: BookingStatus;
}

export const ProgressTracker = ({ currentStatus }: ProgressTrackerProps) => {
  const currentIndex = steps.findIndex(step => step.id === currentStatus);

  return (
    <div className="flex items-center justify-between w-full max-w-4xl">
      {steps.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isActive = index === currentIndex;

        return (
          <div key={step.id} className="flex flex-col items-center flex-1">
            <div className="relative">
              {isCompleted ? (
                <div className="w-10 h-10 rounded-full bg-jify-primary flex items-center justify-center text-white">
                  {step.icon}
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <CircleIcon className="w-5 h-5" />
                </div>
              )}
              {isActive && (
                <div className="absolute -inset-1 rounded-full bg-jify-primary/20 animate-pulse"></div>
              )}
            </div>
            <span
              className={`mt-2 text-xs font-medium ${
                isCompleted ? 'text-jify-primary' : 'text-gray-500'
              }`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-full mt-5 ${
                  isCompleted ? 'bg-jify-primary' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};