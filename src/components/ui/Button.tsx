"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: [
      'text-white',
      'shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]',
      'hover:shadow-[0_12px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]',
      'hover:brightness-125',
    ].join(' '),
    secondary: 'border border-blue-700 text-blue-700 hover:bg-blue-50',
    ghost: 'text-blue-700 hover:bg-blue-50',
    inverse: [
      'text-[#1A1A1A]',
      'shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_-2px_4px_rgba(0,0,0,0.08)_inset,0_4px_12px_rgba(0,0,0,0.2),0_1px_3px_rgba(0,0,0,0.1)]',
      'hover:shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_-2px_4px_rgba(0,0,0,0.1)_inset,0_8px_20px_rgba(0,0,0,0.25),0_2px_4px_rgba(0,0,0,0.12)]',
      'hover:brightness-95',
      'border border-white/20',
    ].join(' '),
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-9 py-4.5 text-lg',
  };

  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] rounded-xl disabled:opacity-70 disabled:pointer-events-none whitespace-nowrap';

  const gradientStyle = variant === 'primary' 
    ? { background: 'linear-gradient(to bottom, #2A2A2A 0%, #000000 100%)' } 
    : variant === 'inverse'
    ? { background: 'linear-gradient(to bottom, #FFFFFF 0%, #E8E8E8 100%)' }
    : undefined;

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      style={gradientStyle}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};
