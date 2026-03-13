"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const stakeholders = [
  {
    id: 'insurers',
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
    title: 'Insurance Customers',
    body: "You file a claim. You take photos. That's it. Dera verifies everything, tells the nearest garage you're coming, and keeps you updated at every step — from garage pickup to repair completion. No phone calls to chase. No forms to re-fill. No wondering what's happening.",
    bullets: [
      'Claim decision in minutes, not days',
      "Know your garage before you end the call",
      'Real-time repair status — no chasing',
      "Recovery vehicle requested in one tap if your car can't drive",
      'The experience that makes people actually trust insurance',
    ],
    cta: null,
  },
];

export const WhoSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const scrollToInvestors = () => {
    const element = document.getElementById('investors');
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

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
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-[#0A1628] leading-[1.05] mb-4">
            <span className="text-3xl sm:text-4xl md:text-6xl capitalize">Built For Every Party</span><br />
            <span style={{ fontFamily: "var(--font-garamond)" }} className="text-[#4F8EF7]">In The Claims Chain.</span>
          </h2>
          <p className="font-headline text-lg md:text-xl text-[#3D4A6B]">
            One integration. Three experiences transformed.
          </p>
        </motion.div>

        {/* Table-style layout */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          className="border-t-2 border-[#0A1628]/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            {stakeholders.map((stakeholder, i) => (
              <motion.div
                key={stakeholder.id}
                variants={fadeInUp}
                className={`p-6 md:p-8 ${i < 2 ? 'border-b md:border-b-0 md:border-r-2 border-[#0A1628]/10' : 'border-b-2 md:border-b-0 border-[#0A1628]/10'}`}
              >
                {/* Title */}
                <h3 style={{ fontFamily: "var(--font-garamond)" }} className="font-headline text-2xl md:text-3xl font-bold text-[#0A1628] mb-4">
                  {stakeholder.title}
                </h3>

                {/* Body */}
                <p className="text-lg md:text-xl text-[#3D4A6B] leading-relaxed mb-6">
                  {stakeholder.body}
                </p>

                {/* Bullets */}
                <ul className="space-y-3 mb-6">
                  {stakeholder.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2 text-base md:text-lg text-[#3D4A6B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4F8EF7] mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {stakeholder.cta && (
                  <button
                    onClick={scrollToInvestors}
                    className={i === 0 
                      ? "px-7 py-3.5 rounded-lg text-base md:text-lg font-medium text-white bg-black hover:bg-gray-800 transition-all cursor-pointer"
                      : "px-6 py-3 rounded-lg text-base md:text-lg font-medium text-[#0A1628] bg-white/20 backdrop-blur-md border border-white/30 shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:bg-white/30 transition-all"
                    }
                  >
                    {stakeholder.cta} →
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
