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
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Header + Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          >
            <h2 className="font-headline text-6xl sm:text-7xl lg:text-8xl font-bold text-[#0A1628] leading-[1.05] mb-4">
              The Stakes
            </h2>
            <p className="text-2xl sm:text-3xl font-medium text-[#3D4A6B] mb-12">
              NIIRA 2025 is live.
            </p>

            {/* NIIRA Compliance Dashboard */}
            <div
              className="w-full rounded-2xl bg-white overflow-hidden"
              style={{
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              }}
            >
              {/* Header */}
              <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #E8EEFF' }}>
                <span className="text-[13px] font-bold text-[#0A1628]">NIIRA Compliance Dashboard</span>
                <span className="text-[9px] font-bold text-[#E2A816] bg-[rgba(226,168,22,0.08)] px-2.5 py-1 rounded-full tracking-wider uppercase">ILLUSTRATIVE DATA</span>
              </div>

              <div className="px-6 py-5">
                {/* Column Headers */}
                <div className="grid grid-cols-3 text-[10px] font-bold text-[#6B7799] uppercase tracking-[0.12em] pb-3 mb-3" style={{ borderBottom: '1px solid #E8EEFF' }}>
                  <span>Claim ID</span>
                  <span>Countdown</span>
                  <span>Status</span>
                </div>

                {/* Claims */}
                <div className="flex flex-col gap-0">
                  {[
                    { id: 'CLM-2026-0041', days: '3 days', status: 'SETTLED', color: '#059669' },
                    { id: 'CLM-2026-0039', days: '12 days', status: 'IN PROGRESS', color: '#1A3FD4' },
                    { id: 'CLM-2026-0037', days: '45 days', status: 'URGENT', color: '#E2A816' },
                    { id: 'CLM-2026-0035', days: '58 days', status: 'CRITICAL', color: '#E25C5C' },
                  ].map((claim, i) => (
                    <div
                      key={claim.id}
                      className="grid grid-cols-3 items-center py-3"
                      style={{ borderBottom: i < 3 ? '1px solid rgba(232,238,255,0.5)' : 'none' }}
                    >
                      <span className="text-[13px] font-semibold text-[#0A1628]">{claim.id}</span>
                      <span className="text-[13px] font-bold" style={{ color: claim.color }}>{claim.days}</span>
                      <span
                        className="text-[9px] font-bold px-2.5 py-1 rounded-full w-fit uppercase tracking-wider"
                        style={{
                          color: claim.color,
                          background: `${claim.color}10`,
                        }}
                      >
                        {claim.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Alert Footer */}
                <div className="flex items-center gap-2 mt-5 pt-4" style={{ borderTop: '1px solid #E8EEFF' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1A3FD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                  </svg>
                  <span className="text-[11px] text-[#6B7799] font-medium">Alerts fire 15 days before deadline</span>
                </div>
              </div>
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
