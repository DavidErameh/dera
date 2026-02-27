"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const problemCards = [
  {
    title: 'The 60-Day Clock',
    body: 'NIIRA 2025 mandates settlement within 60 days. Every manual handoff is days you cannot get back. Non-compliance triggers NAICOM sanctions — not warnings.',
  },
  {
    title: 'Paper-Based Fraud',
    body: 'Without metadata validation at the point of upload, anyone can submit a two-year-old photo. Industry fraud leakage runs at 10 to 20 percent of total claims paid.',
  },
  {
    title: 'The Visibility Gap',
    body: 'Once a vehicle reaches a garage, your data stops. Customers cannot track the repair. Your team cannot either. The most complained-about moment in insurance is an information gap you can close.',
  },
];

export const ProblemSection = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="problem" className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Heading Area — full width, no diagram */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="mb-16"
        >
          <h2 className="font-headline text-6xl sm:text-7xl md:text-8xl font-bold text-[#0A1628] leading-[1.05] mb-4">
            The Problem
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#3D4A6B]">
            A Broken Insurance System
          </p>
        </motion.div>

        {/* Glassmorphic Problem Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {problemCards.map((card, i) => {
            const isMiddle = i === 1;
            
            return (
              <motion.div key={i} variants={fadeInUp}>
                <div
                  className="rounded-2xl p-8 md:p-10 flex flex-col justify-between"
                  style={{
                    minHeight: '420px',
                    background: isMiddle 
                      ? 'linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)'
                      : 'linear-gradient(135deg, rgba(234, 240, 255, 0.5) 0%, rgba(220, 230, 255, 0.25) 100%)',
                    backdropFilter: isMiddle ? 'none' : 'blur(16px)',
                    WebkitBackdropFilter: isMiddle ? 'none' : 'blur(16px)',
                    border: isMiddle ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
                    boxShadow: isMiddle
                      ? '0 12px 32px rgba(26, 63, 212, 0.25)'
                      : [
                          '0 0 0 1px rgba(0, 0, 0, 0.03)',
                          '0 1px 2px rgba(0, 0, 0, 0.04)',
                          '0 4px 8px rgba(0, 0, 0, 0.04)',
                          '0 12px 24px rgba(0, 0, 0, 0.06)',
                          '0 24px 48px rgba(0, 0, 0, 0.04)',
                        ].join(', '),
                  }}
                >
                  <div>
                    <h3 className={`font-headline text-2xl md:text-3xl font-bold mb-5 ${isMiddle ? 'text-white' : 'text-[#0A1628]'}`}>
                      {card.title}
                    </h3>
                    <p className={`text-base md:text-lg leading-relaxed ${isMiddle ? 'text-white/90' : 'text-[#3D4A6B]'}`}>
                      {card.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
