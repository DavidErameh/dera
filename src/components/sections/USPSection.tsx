"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';

const faqs = [
  {
    question: 'How fast does Dera process a claim?',
    answer: 'From photo upload to validated damage report in under two seconds. Dera uses YOLOv11 Computer Vision to move the progress bar from Submitted to Validated the moment the upload completes. The cost of staff sitting behind a screen reviewing photos manually is removed entirely.',
  },
  {
    question: 'How does Dera detect fraudulent claims?',
    answer: 'Every photo is a potential fraud attempt until proven otherwise. EXIF Data Triangulation cross-references the photo\'s embedded GPS coordinates and timestamp against the claim. If the image was taken three weeks ago in Abuja and the accident allegedly happened today in Lagos, the claim does not advance.',
  },
  {
    question: 'Can insurers track repairs in real time?',
    answer: 'Dera gives authorized mechanics a lightweight update interface. When they tap "Bumper Spraying in Progress," that milestone updates your customer\'s app in real time. The information gap is solved at the infrastructure level.',
  },
  {
    question: 'Is Dera compliant with NIIRA 2025?',
    answer: 'Yes. Dera is built for NIIRA 2025 compliance from the ground up. The platform automates the 60-day settlement mandate through real-time claim processing, reducing manual handoffs that create compliance risk.',
  },
  {
    question: 'How does Dera connect insurers with garages?',
    answer: 'The three closest authorized garages receive a job request via the Partner API. The first to accept gets the assignment. Your customer knows their assigned garage within seconds — no phone calls, no back-and-forth.',
  },
];

const FAQItem = ({ faq, index, isOpen, onToggle }: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between py-6 text-left group"
      >
        <span className="font-headline text-2xl md:text-3xl font-normal text-[#2A313C] pr-8 leading-snug transition-colors">
          {faq.question}
        </span>
        <div className="shrink-0 w-8 h-8 flex items-center justify-center mt-0.5">
          <svg
            width="20"
            height="20"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            <path d="M7 1v12M1 7h12" stroke="#0A1628" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="font-headline text-xl md:text-2xl font-medium text-[#2A313C] leading-relaxed pb-8 pr-16">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const USPSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="features" className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="mb-4"
        >
          <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl font-bold text-[#0A1628] leading-[1.05] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#3D4A6B]">
            Everything You Need to Know.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mt-12">
          {faqs.map((faq, i) => (
            <div key={i} className={i !== faqs.length - 1 ? 'border-b border-[#E8EEFF]' : ''}>
              <FAQItem
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
