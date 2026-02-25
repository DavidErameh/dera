import React from 'react';
import { cn } from '@/lib/utils';

interface SectionLabelProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionLabel = ({
  children,
  theme = 'light',
  className,
}: SectionLabelProps) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'h-[1px] w-6',
          theme === 'light' ? 'bg-blue-700' : 'bg-blue-400'
        )}
      />
      <span
        className={cn(
          'text-xs font-bold uppercase tracking-[0.2em]',
          theme === 'light' ? 'text-blue-700' : 'text-blue-400'
        )}
      >
        {children}
      </span>
    </div>
  );
};
