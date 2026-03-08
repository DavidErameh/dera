"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const marketCards = [
  {
    label: 'TAM',
    number: '₦1.6T',
    title: 'Total Addressable Market',
    source: 'NAICOM Market Performance Reports, 2026',
    context: 'The total Gross Written Premium of the Nigerian Insurance Industry. Scaled from ₦1T in 2023 following NAICOM rate hikes and the July 2026 recapitalisation deadline.',
  },
  {
    label: 'SAM',
    number: '₦200B – ₦240B',
    title: 'Serviceable Addressable Market',
    source: 'NIA Statistical Digest, 2024/2025',
    context: "Motor Insurance - Dera's initial focus - accounts for 12.5–15% of total industry GWP. This is our operating pond.",
  },
  {
    label: 'SOM',
    number: '₦8B – ₦12B',
    title: 'Serviceable Obtainable Market',
    source: 'Dera internal projection, 24-month horizon',
    context: '10% of motor claims processing volume in Nigeria, captured by partnering with Tier 1 firms: Heirs, Leadway, AIICO.',
  },
];

const MarketCard = ({ card, index }: { card: typeof marketCards[0], index: number }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="relative"
    >
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8EEFF] h-full">
        {/* Arrow connector between cards */}
        {index < marketCards.length - 1 && (
          <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#4F8EF7]">
              <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        
        <div className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full bg-[#4F8EF7]/10 text-[#4F8EF7] text-xs font-bold uppercase tracking-wider">
            {card.label}
          </span>
        </div>
        
        <h3 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-[#4F8EF7] mb-2">
          {card.number}
        </h3>
        
        <p className="font-semibold text-[#0A1628] mb-4">
          {card.title}
        </p>
        
        <p className="text-xs text-[#3D4A6B]/60 mb-3">
          {card.source}
        </p>
        
        <p className="text-sm text-[#3D4A6B] leading-relaxed">
          {card.context}
        </p>
      </div>
    </motion.div>
  );
};

export const MarketSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="market" className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl font-bold text-[#0A1628] leading-[1.05] mb-4">
            The opportunity<br />
            <span className="text-[#4F8EF7]">is already here.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#3D4A6B] max-w-2xl mx-auto">
            Nigeria's insurance market isn't waiting for the right product. It's waiting for the right experience.
          </p>
        </motion.div>

        {/* Prose Block - 9 Million */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative overflow-hidden mb-16"
          style={{
            background: '#0A1628',
            borderRadius: '24px',
            borderLeft: '4px solid #4F8EF7',
          }}
        >
          <div className="px-8 py-10 md:py-12">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-white/60 mb-4">
                12.2 million registered vehicles. 3.4 million genuine policies.
              </p>
              <p className="text-xl md:text-2xl text-white/80 mb-4">
                That gap - 9 million uninsured drivers - isn't a marketing problem.
              </p>
              <p className="text-xl md:text-2xl font-semibold text-white mb-4">
                It's a claims problem.
              </p>
              <p className="text-white/70">
                People stopped trusting insurance because insurance stopped delivering on claims. Dera rebuilds that trust from the inside.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Market Funnel Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {marketCards.map((card, i) => (
            <MarketCard key={card.label} card={card} index={i} />
          ))}
        </motion.div>

        {/* Revenue Logic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-[#E8EEFF] rounded-2xl p-8 md:p-12"
        >
          <h4 className="text-center text-lg font-semibold text-[#0A1628] mb-8">
            How the numbers work
          </h4>
          
          {/* Calculation */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-8">
            <div className="text-center">
              <p className="font-headline text-3xl md:text-4xl font-bold text-[#0A1628]">₦80B</p>
              <p className="text-sm text-[#3D4A6B] mt-1">Annual motor claims<br />repair pool in Nigeria</p>
            </div>
            
            <span className="text-2xl text-[#4F8EF7] font-bold">×</span>
            
            <div className="text-center">
              <p className="font-headline text-3xl md:text-4xl font-bold text-[#0A1628]">12.5%</p>
              <p className="text-sm text-[#3D4A6B] mt-1">Dera efficiency<br />fee per claim</p>
            </div>
            
            <span className="text-2xl text-[#4F8EF7] font-bold">=</span>
            
            <div className="text-center">
              <p className="font-headline text-3xl md:text-4xl font-bold text-[#4F8EF7]">₦10B</p>
              <p className="text-sm text-[#3D4A6B] mt-1">Target annual<br />revenue at 10% share</p>
            </div>
          </div>

          {/* Supporting line */}
          <p className="text-center text-[#3D4A6B] italic">
            We save insurers 20% in fraud leakage and 30% in manual labour costs. We ask for 12.5% of the value we create.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
