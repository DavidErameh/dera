"use client";

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface CardProps {
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({
  variant = 'default',
  padding = 'md',
  children,
  className,
  hover = true,
}: CardProps) => {
  const variants = {
    default: 'bg-white border border-border',
    elevated: 'bg-white shadow-md',
    bordered: 'bg-white border-2 border-blue-100',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const Component = hover ? motion.div : 'div';

  return (
    <Component
      className={cn(
        'rounded-[16px] overflow-hidden transition-shadow duration-200',
        variants[variant],
        paddings[padding],
        className
      )}
      whileHover={hover ? {
        y: -4,
        boxShadow: 'var(--shadow-lg)',
      } : undefined}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  );
};
