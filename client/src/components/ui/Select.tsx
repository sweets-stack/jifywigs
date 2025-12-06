'use client';

import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-9 text-sm px-3',
      md: 'h-11 px-4',
      lg: 'h-13 px-5 text-lg',
    };

    return (
      <select
        className={cn(
          'w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 transition-colors',
          'focus:border-jify-primary-500 focus:ring-2 focus:ring-jify-primary-500/20 focus:outline-none',
          'hover:border-gray-400',
          'disabled:cursor-not-allowed disabled:opacity-50',
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Select.displayName = 'Select';

export { Select };