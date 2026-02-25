"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useInView } from 'motion/react';

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
    value: 15,
    suffix: "%",
    label: "Claims lost to fraud industry-wide",
    context: "Forensic validation changes this",
    isRange: true,
  },
  {
    value: 5,
    suffix: " Minutes",
    label: "Dera preliminary approval time",
    context: "vs 24 to 48 hours currently",
  },
];

export const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="insurers" className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Header + Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          >
            <h2 className="font-headline text-6xl sm:text-7xl lg:text-8xl font-bold text-[#0A1628] tracking-tight leading-[1.05] mb-4">
              The Stakes
            </h2>
            <p className="text-2xl sm:text-3xl font-medium text-[#3D4A6B] mb-12">
              NIIRA 2025 is live.
            </p>

            {/* Placeholder Visual */}
            <div
              className="w-full aspect-[4/3] rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(234, 240, 255, 0.5) 0%, rgba(220, 230, 255, 0.25) 100%)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              }}
            >
              <span className="text-sm text-[#6B7799] font-medium">Visual Placeholder</span>
            </div>
          </motion.div>

          {/* Right: Stats List */}
          <div className="flex flex-col gap-0 pt-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] }}
                className={`py-8 ${i !== stats.length - 1 ? 'border-b border-[#E8EEFF]' : ''}`}
              >
                <div className="flex items-baseline gap-5 mb-2">
                  <span className="font-headline text-5xl lg:text-6xl font-bold text-[#1A3FD4] leading-none whitespace-nowrap">
                    {stat.isRange ? (
                      <span className="flex items-baseline">
                        <AnimatedNumber value={10} />
                        <span className="mx-0.5">-</span>
                        <AnimatedNumber value={20} suffix="%" />
                      </span>
                    ) : (
                      <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                    )}
                  </span>
                </div>
                <p className="text-base font-bold text-[#0A1628] mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-[#3D4A6B] opacity-70">
                  {stat.context}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
