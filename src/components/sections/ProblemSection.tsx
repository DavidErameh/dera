"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const problemCards = [
  {
    title: 'The 60-Day Clock',
    label: 'COMPLIANCE',
    body: 'NIIRA 2025 mandates settlement within 60 days. Every manual handoff is days you cannot get back. Non-compliance triggers NAICOM sanctions - not warnings.',
  },
  {
    title: 'The Visibility Gap',
    label: 'OPERATIONS',
    body: "The second a customer hits submit, they lose visibility. For the next 3 to 10 days, they sit with a frozen Pending status while the insurer and garage operate on separate islands of information. The data dies between handoffs. The customer calls support just to hear \"we're checking.\" It's a week of anxiety and silence - and it's entirely preventable.",
  },
  {
    title: 'Paper-Based Fraud',
    label: 'FRAUD',
    body: 'Without metadata validation at the point of upload, anyone can submit a two-year-old photo. Industry fraud leakage runs at 10 to 20 percent of total claims paid.',
  },
  {
    title: 'The Trust Deficit',
    label: 'GROWTH',
    body: '9 in 10 Nigerians who own a vehicle do not trust the claims process enough to hold genuine insurance. The market does not have a product problem. It has a trust problem.',
  },
  {
    title: 'The Scale Wall',
    label: 'EFFICIENCY',
    body: 'Every new claim is another human task. Hiring more adjusters scales cost, not speed. The only way to grow without growing headcount is to automate.',
  },
  {
    title: 'The Uninsured Market',
    label: 'MARKET',
    stat: '9M',
    statLabel: 'ghost drivers',
    body: "12.2M registered vehicles. Only 3.4M have genuine policies. The gap is not a product problem - it is a claims problem.",
    source: 'NBS · NIID',
  },
];

type CardProps = {
  title: string;
  label: string;
  body: string;
  stat?: string;
  statLabel?: string;
  source?: string;
  index: number;
};

const Card = ({ title, label, body, stat, statLabel, source, index }: CardProps) => {
  const isDarkCard = index === 5;
  const isBlueAccent = index === 1;

  return (
    <div
      className="h-full rounded-2xl p-6 md:p-7 flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{
        background: isDarkCard
          ? 'linear-gradient(to bottom, #2A2A2A 0%, #000000 100%)'
          : isBlueAccent
            ? 'linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)'
            : '#FFFFFF',
        backdropFilter: 'blur(16px)',
        boxShadow: isBlueAccent
          ? '0 12px 32px rgba(26, 63, 212, 0.25)'
          : isDarkCard
            ? '0 12px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)',
      }}
    >
      <span className={`text-[10px] font-bold uppercase tracking-[0.15em] mb-3 ${
        isDarkCard || isBlueAccent ? 'text-white/40' : 'text-[#8B7EDB]'
      }`}>
        {label}
      </span>

      <div className="mb-3">
        {stat ? (
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-5xl md:text-6xl font-bold text-white">
              {stat}
            </span>
            <span className="text-xl md:text-2xl text-[#4F8EF7] font-medium">
              {statLabel}
            </span>
          </div>
        ) : (
          <h3 className={`font-headline text-xl md:text-2xl font-bold leading-tight ${
            isBlueAccent || isDarkCard ? 'text-white' : 'text-[#1A1A1A]'
          }`}>
            {title}
          </h3>
        )}
      </div>

      <p className={`text-sm leading-relaxed ${
        isDarkCard || isBlueAccent ? 'text-white/70' : 'text-[#6B6B6B]'
      }`}>
        {body}
      </p>

      {source && isDarkCard && (
        <div className="mt-auto pt-4">
          <span className="text-[10px] text-white/30 uppercase tracking-wider">
            {source}
          </span>
        </div>
      )}
    </div>
  );
};

export const ProblemSection = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="problem" className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Heading Area */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="mb-16"
        >
          <h2 className="font-headline text-5xl sm:text-6xl md:text-8xl font-bold text-[#0A1628] leading-[1.05] mb-4">
            A System That is Failing <span style={{ fontFamily: "var(--font-garamond)" }}>Everyone</span>
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#3D4A6B]">
            Not one broken thing. Six.
          </p>
        </motion.div>

        {/* Cards Grid - Asymmetric 2-row layout */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-12 gap-5"
        >
          {/* Row 1: 1 Rectangle + 2 Squares */}
          <motion.div variants={fadeInUp} className="col-span-12 md:col-span-5">
            <Card {...problemCards[1]} index={1} />
          </motion.div>
          <motion.div variants={fadeInUp} className="col-span-12 md:col-span-4">
            <Card {...problemCards[0]} index={0} />
          </motion.div>
          <motion.div variants={fadeInUp} className="col-span-12 md:col-span-3">
            <Card {...problemCards[2]} index={2} />
          </motion.div>

          {/* Row 2 */}
          <motion.div variants={fadeInUp} className="col-span-12 md:col-span-4">
            <Card {...problemCards[3]} index={3} />
          </motion.div>
          <motion.div variants={fadeInUp} className="col-span-12 md:col-span-3">
            <Card {...problemCards[4]} index={4} />
          </motion.div>
          <motion.div variants={fadeInUp} className="col-span-12 md:col-span-5">
            <Card {...problemCards[5]} index={5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
