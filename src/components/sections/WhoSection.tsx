"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui/Button';

const stakeholders = [
  {
    id: 'insurers',
    tag: 'PRIMARY CUSTOMER',
    title: 'Insurance Companies',
    body: 'Dera plugs into your existing claims system via a single API endpoint. From the moment a claim is submitted, every step is automated - intake, forensics, damage assessment, triage, dispatch, and compliance tracking. Your team focuses on the decisions that need humans. Everything else runs.',
    bullets: [
      'NIIRA 2025 compliance tracked automatically on every claim',
      'Fraud flagged at intake - before it reaches an adjuster',
      '70% of eligible claims auto-approved with no human intervention',
      'Real-time dashboard for your operations team',
      '90-day Shadow Mode before full switch-over - zero risk',
    ],
    cta: 'Request a pilot',
  },
  {
    id: 'garages',
    tag: 'PARTNER NETWORK',
    title: 'Garages & Repair Partners',
    body: "Stop waiting for job assignments by phone. Dera dispatches jobs directly to your dashboard the moment a claim is approved. Accept, decline, and push repair milestone updates - all from one place. Your utilisation improves. Your payment timeline shortens.",
    bullets: [
      'Job dispatch arrives instantly when a claim is auto-approved',
      'Accept or decline in one tap - first to accept wins the assignment',
      'Push milestone updates (vehicle received, parts ordered, repair done) directly',
      'Payment triggered on milestone completion - not on month-end manual reconciliation',
      "No integration required to get started - Dera notifies via webhook or SMS",
    ],
    cta: 'Join the partner network',
  },
  {
    id: 'customers',
    tag: 'THE END EXPERIENCE',
    title: 'Insurance Customers',
    body: 'You file a claim. You take photos. That\'s it. Dera verifies everything, tells the nearest garage you\'re coming, and keeps you updated at every step — from garage pickup to repair completion. No phone calls to chase. No forms to re-fill. No wondering what\'s happening.',
    bullets: [
      'Claim decision in minutes, not days',
      "Know your garage before you end the call",
      'Real-time repair status — no chasing',
      'Recovery vehicle requested in one tap if your car can\'t drive',
      'The experience that makes people actually trust insurance',
    ],
    cta: null,
  },
];

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
  </svg>
);

const WrenchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
  </svg>
);

const icons = [BuildingIcon, WrenchIcon, UserIcon];

const StakeholderCard = ({ 
  stakeholder, 
  index, 
  icon: Icon 
}: { 
  stakeholder: typeof stakeholders[0]; 
  index: number;
  icon: () => React.JSX.Element;
}) => {
  const scrollToInvestors = () => {
    const element = document.getElementById('investors');
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="group"
    >
      <div className="h-full bg-white rounded-2xl p-6 md:p-8 border border-[#E8EEFF] hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
        {/* Icon block */}
        <div className="w-14 h-14 rounded-xl bg-[#4F8EF7]/10 flex items-center justify-center mb-6 text-[#4F8EF7]">
          <Icon />
        </div>

        {/* Tag */}
        <span className="inline-block px-3 py-1 rounded-full bg-[#E8EEFF] text-[#4F8EF7] text-xs font-bold uppercase tracking-wider mb-4">
          {stakeholder.tag}
        </span>

        {/* Title */}
        <h3 className="font-headline text-2xl font-bold text-[#0A1628] mb-4">
          {stakeholder.title}
        </h3>

        {/* Body */}
        <p className="text-[#3D4A6B] leading-relaxed mb-6">
          {stakeholder.body}
        </p>

        {/* Bullets */}
        <ul className="space-y-3 mb-8">
          {stakeholder.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#3D4A6B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F8EF7] mt-2 shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {stakeholder.cta && (
          <button
            onClick={scrollToInvestors}
            className="text-[#4F8EF7] font-semibold text-sm hover:underline underline-offset-4"
          >
            {stakeholder.cta} →
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const WhoSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="who" className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold text-[#0A1628] leading-[1.05] mb-4">
            <span className="text-3xl sm:text-4xl md:text-6xl">Built for every party</span><br />
            <span className="text-[#4F8EF7]">in the claims chain.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#3D4A6B]">
            One integration. Three experiences transformed.
          </p>
        </motion.div>

        {/* Three Columns */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {stakeholders.map((stakeholder, i) => (
            <StakeholderCard
              key={stakeholder.id}
              stakeholder={stakeholder}
              index={i}
              icon={icons[i]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
