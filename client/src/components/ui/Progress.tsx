// client/src/components/ui/Progress.tsx
'use client';

import { cn } from '../../../lib/utils';

interface ProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

export function Progress({ 
  value, 
  className = '', 
  indicatorClassName = '' 
}: ProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value));
  
  return (
    <div className={cn(
      'w-full bg-gray-200 rounded-full h-2 overflow-hidden',
      className
    )}>
      <div
        className={cn(
          'bg-jify-primary h-full rounded-full transition-all duration-300',
          indicatorClassName
        )}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}