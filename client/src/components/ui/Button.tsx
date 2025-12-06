'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-jify-primary-500 to-jify-primary-600 text-white hover:from-jify-primary-600 hover:to-jify-primary-700 shadow-md hover:shadow-lg focus:ring-jify-primary-500/30',
        secondary: 'bg-white text-jify-primary-500 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300',
        outline: 'border-2 border-jify-primary-500 text-jify-primary-600 hover:bg-jify-primary-50 focus:ring-jify-primary-500/20',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
        link: 'text-jify-primary-600 underline-offset-4 hover:underline',
        destructive: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-400 shadow-md',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5',
        lg: 'px-7 py-3.5 text-lg',
        xl: 'px-8 py-4 text-xl',
        icon: 'p-2.5',
        'icon-sm': 'p-1.5',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      {
        variant: ['primary', 'destructive'],
        size: ['lg', 'xl'],
        className: 'shadow-lg',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    leftIcon, 
    rightIcon, 
    children, 
    loading,
    disabled,
    fullWidth,
    ...props 
  }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, fullWidth, className })}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-2 h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {children}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };