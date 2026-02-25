"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { staggerContainer, scaleIn } from '@/lib/animations';

const uspCards = [
  {
    badge: '2 SECONDS',
    title: 'From uploaded to validated. Not 24 hours. Two seconds.',
    body: 'Dera uses YOLOv11 Computer Vision to move the progress bar from Submitted to Validated the moment the upload completes. The cost of the staff sitting behind a screen reviewing photos manually is removed entirely.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    badge: 'FRAUD SHIELD',
    title: 'Every photo is a potential fraud attempt until proven otherwise.',
    body: 'EXIF Data Triangulation cross-references the photo\'s embedded GPS coordinates and timestamp against the claim. If the image was taken three weeks ago in Abuja and the accident allegedly happened today in Lagos, the claim does not advance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    badge: 'LIVE TRACKING',
    title: 'The insurer\'s job does not end when the car reaches the garage.',
    body: 'Dera gives authorized mechanics a lightweight update interface. When they tap "Bumper Spraying in Progress," that milestone updates your customer\'s app in real time. The information gap is solved at the infrastructure level.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M9 19l-5-2V4l5 2 6-2 5 2v13l-5-2-6 2z" />
        <path d="M9 6v13M15 4v13" />
      </svg>
    ),
  },
];

export const USPSection = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="features" className="relative py-24 lg:py-32 bg-[#0D2149] overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
          <SectionLabel theme="dark" className="justify-center mb-6">WHY DERA IS DIFFERENT</SectionLabel>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Three problems nobody <br />
            else solved for Nigeria.
          </h2>
        </div>

        {/* Cards Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {uspCards.map((card, i) => (
            <motion.div key={i} variants={scaleIn}>
              <Card 
                variant="elevated" 
                padding="lg" 
                className="h-full bg-white hover:-translate-y-4 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="bg-blue-50 text-blue-700 w-12 h-12 rounded-[12px] flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      {card.icon}
                    </div>
                    <Badge variant="blue" size="md">{card.badge}</Badge>
                  </div>

                  <h3 className="font-display text-xl lg:text-2xl font-bold text-blue-900 mb-4 leading-tight">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
