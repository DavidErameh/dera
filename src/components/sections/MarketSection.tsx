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
            Nigeria&apos;s insurance market isn&apos;t waiting for the right product. It&apos;s waiting for the right experience.
          </p>
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
      </div>
    </section>
  );
};
