// client/src/components/training/TrainingCard.tsx
'use client';
import { ClockIcon, VideoIcon, UserIcon, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ITraining } from '@jifywigs/shared/types/training';
import { TrainingMode } from '@jifywigs/shared/enums';

const modeIcons = {
  [TrainingMode.ONLINE]: <VideoIcon className="w-4 h-4" />,
  [TrainingMode.PHYSICAL]: <CalendarIcon className="w-4 h-4" />,
  [TrainingMode.HYBRID]: <UserIcon className="w-4 h-4" />,
};

export const TrainingCard = ({ training }: { training: ITraining }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-jify-primary/10 text-jify-primary">
            {modeIcons[training.mode]} {training.mode}
          </span>
          <span className="font-bold text-jify-primary">
            {training.currency === 'NGN' ? '₦' : training.currency} 
            {training.price.toLocaleString()}
          </span>
        </div>
        <h3 className="mt-3 font-semibold text-gray-900 line-clamp-2">{training.title}</h3>
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">{training.description}</p>

        <div className="mt-4 space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-1.5" />
            {training.durationWeeks} weeks
          </div>
          <div className="flex items-center">
            <UserIcon className="w-4 h-4 mr-1.5" />
            {training.enrolledCount}/{training.capacity} enrolled
          </div>
        </div>

        <Button className="w-full mt-5" size="sm">
          Enroll Now
        </Button>
      </div>
    </div>
  );
};