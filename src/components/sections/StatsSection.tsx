"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useInView } from 'motion/react';
import { cn } from '@/lib/utils';
import { SectionLabel } from '@/components/ui/SectionLabel';

const AnimatedNumber = ({ value, suffix = "", prefix = "" }: { value: number, suffix?: string, prefix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (current) => `${prefix}${current.toFixed(current % 1 === 0 ? 0 : 2)}${suffix}`);

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, value, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const stats = [
  {
    value: 60,
    suffix: " Days",
    label: "NIIRA 2025 settlement mandate",
    context: "Violate it and face NAICOM sanctions",
  },
  {
    value: 1.56,
    prefix: "₦",
    suffix: "T",
    label: "Nigerian industry GWP in 2024",
    context: "56 percent growth year on year",
  },
  {
    value: 15, // Mid-point of 10-20%
    suffix: "%",
    label: "Claims lost to fraud industry-wide",
    context: "Forensic validation changes this",
  },
  {
    value: 5,
    suffix: " Minutes",
    label: "Dera preliminary approval time",
    context: "vs 24 to 48 hours currently",
  },
];

export const StatsSection = () => {
  return (
    <section id="insurers" className="bg-white py-24 lg:py-32 overflow-hidden border-t border-blue-50">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="text-center mb-16 lg:mb-20">
          <SectionLabel className="justify-center mb-6">THE STAKES</SectionLabel>
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            <span className="text-blue-700">NIIRA 2025</span> is live. <br />
            The window to act is now.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={cn(
                "flex flex-col items-center text-center px-8",
                i !== stats.length - 1 && "lg:border-r lg:border-blue-100"
              )}
            >
              <div className="font-display text-5xl lg:text-6xl font-bold text-blue-700 mb-4 h-[1.2em]">
                {i === 2 ? (
                  <span className="flex items-center">
                    <AnimatedNumber value={10} />-<AnimatedNumber value={20} suffix="%" />
                  </span>
                ) : (
                  <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                )}
              </div>
              <p className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-2">
                {stat.label}
              </p>
              <p className="text-xs text-text-muted font-medium">
                {stat.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
