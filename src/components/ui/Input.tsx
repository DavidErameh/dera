import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const Input = ({
  label,
  error,
  required,
  className,
  id,
  ...props
}: InputProps) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col w-full gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-blue-900"
        >
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full px-4 py-3 text-base bg-white border rounded-[8px] transition-all duration-200 outline-none',
          'border-border hover:border-border-strong',
          'focus:border-blue-700 focus:ring-2 focus:ring-blue-50',
          error && 'border-error text-error focus:border-error focus:ring-red-50',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs font-medium text-error">{error}</p>
      )}
    </div>
  );
};
