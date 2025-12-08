// client/src/components/ui/Badge.tsx
'use client';

import { CheckCircle2Icon, XCircleIcon, ClockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'primary' | 'secondary' | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

export const Badge = ({ children, variant = 'default', className, ...props }: BadgeProps) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 border border-gray-300',
    success: 'bg-green-100 text-green-800 border border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    danger: 'bg-red-100 text-red-800 border border-red-300',
    primary: 'bg-jify-primary/10 text-jify-primary border border-jify-primary/30',
    secondary: 'bg-jify-primary-500/10 text-jify-primary-500 border border-jify-primary-500/30',
    outline: 'bg-transparent border-2 text-gray-700 border-gray-300',
  };

  const icons: Record<BadgeVariant, React.ReactNode | null> = {
    default: null,
    success: <CheckCircle2Icon className="w-3 h-3 mr-1" />,
    warning: <ClockIcon className="w-3 h-3 mr-1" />,
    danger: <XCircleIcon className="w-3 h-3 mr-1" />,
    primary: null,
    secondary: null,
    outline: null,
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icons[variant]}
      {children}
    </span>
  );
};
