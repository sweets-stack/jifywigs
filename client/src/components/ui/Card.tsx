// client/src/components/ui/Card.tsx
'use client';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}
export const CardHeader = ({ children, className = '' }: CardHeaderProps) => (
  <div className={`px-5 py-4 border-b border-gray-100 ${className}`}>{children}</div>
);

interface CardContentProps {
  children: ReactNode;
  className?: string;
}
export const CardContent = ({ children, className = '' }: CardContentProps) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}
export const CardFooter = ({ children, className = '' }: CardFooterProps) => (
  <div className={`px-5 py-4 border-t border-gray-100 bg-gray-50 ${className}`}>{children}</div>
);