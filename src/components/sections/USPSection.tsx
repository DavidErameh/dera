"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';

const faqs = [
  {
    question: 'What exactly is Dera?',
    answer: 'Dera is an AI assistant for insurance claims that checks damage, spots fraud, and keeps customers updated in real time, making the whole process fast, simple, and trustworthy. It is an AI-powered system that sits between insurers, garages, and loss adjusters to automate claims. Once a claim is filed, it tracks the car, verifies damage from photos, spots potential fraud, and updates the customer in real time. In short, it makes claims fast, transparent, and completely stress-free.',
  },
  {
    question: 'What problem is Dera solving?',
    answer: 'Once someone files a claim, all communication between the garage, the loss adjuster, and the insurer is manual. It\'s slow, messy, and full of mistakes. Customers are left in the dark, insurers struggle with delays, fraud, and poor documentation. This problem is becoming even more serious because regulators are now pushing the industry toward digitization and transparency, especially with reforms under Nigeria\'s insurance modernization efforts. At the same time, insurers are required to settle claims within 60 days, and manual processes make this very difficult to achieve consistently. Dera automates all of that — it tracks the car, checks the damage, flags potential fraud, and keeps the customer updated in real time.',
  },
  {
    question: 'What innovation is Dera bringing?',
    answer: 'Dera\'s innovation is turning a slow, manual claims process into an automated, AI-driven workflow. It\'s the first system in Nigeria that tracks every step from the garage to the adjuster, checks damage with computer vision, spots fraud instantly, and keeps the customer updated in real time. Key innovations include:\n\n• Automation of the last mile — Dera replaces slow, manual communication between garages, adjusters, and insurers.\n• AI damage verification and fraud detection — Photos are analyzed instantly to flag inconsistencies and reduce mistakes or fraud.\n• Real-time transparency for customers — Every step is tracked and shown, turning a frustrating process into a fast, stress-free experience.',
  },
  {
    question: 'What is the business impact of Dera?',
    answer: '• Revenue Growth — Dera makes insurance more trustworthy and fast, which keeps customers happy and encourages them to renew or buy more policies. Faster claims and better transparency can also attract new customers away from competitors, directly boosting revenue.\n• Cost Savings — By automating simple claims and spotting fraud early, insurers can save millions every year. Fewer human adjusters are needed for routine cases, and expensive mistakes or inflated invoices are prevented.\n• Time and Process Improvement — What used to take weeks or days — checking garages, verifying damage, updating customers — now happens in minutes. Insurers can process more claims with the same team, reduce bottlenecks, and stay fully compliant.',
  },
  {
    question: 'How does Dera work?',
    answer: 'Dera works by sitting in the middle of the insurance process, between the insurer, garages, and adjusters. When a customer files a claim, it guides them to take photos of the damage, then uses AI to check exactly what\'s broken and how bad it is. It instantly flags anything that looks suspicious, like reused photos or mismatched locations, and decides whether the claim can be auto-approved or sent to a human for review. At the same time, it updates the customer in real time, showing every step from garage pickup to repair progress. Everything happens automatically, so the insurer saves time, reduces fraud, and the customer stays informed and confident.',
  },
  {
    question: 'What is the customer experience like with Dera?',
    answer: 'When a customer files a claim, Dera guides them step by step through the process. They take photos of the damage, and Dera instantly checks them for accuracy, flags issues, and updates them at every stage — from the garage picking up the car to repair progress. Customers no longer sit in the dark wondering what\'s happening.\n\n• Accessibility — Even people who aren\'t tech-savvy or familiar with insurance can use Dera because it relies on simple photos and step-by-step guidance, not long forms or complicated jargon.\n• Convenience — Customers don\'t have to visit the insurer\'s office or wait days for updates. Everything happens in their pocket, on the app.\n• Attractiveness — By making the process fast, transparent, and reliable, Dera turns a usually stressful experience into a positive one. People feel confident their claim will be handled properly, which makes insurance feel worth buying.',
  },
  {
    question: 'Why does Dera matter?',
    answer: 'Dera fixes the part of insurance everyone hates — the slow, confusing, and manual claims process. For customers, it turns stress and uncertainty into confidence and clarity, showing exactly what\'s happening at every step. For insurers, it cuts costs, stops fraud, speeds up operations, and makes scaling easy without adding headcount. Simply put, Dera makes insurance faster, fairer, and more trustworthy for everyone.',
  },
  {
    question: 'What do the numbers look like?',
    answer: 'TAM: ₦1.6 Trillion — Total Gross Written Premium (GWP) of the Nigerian insurance industry as of early 2026. Following the NAICOM 2024 Premium Rate Hikes and the July 2026 Recapitalization Deadline, the industry has scaled from ₦1T in 2023 to ₦1.6T.\n\nPAM: ₦650 Billion+ — Value of the "Uninsured Gap." Data from the National Bureau of Statistics (NBS) shows 12.2 million registered vehicles, but the Nigerian Insurance Industry Database (NIID) confirms only 3.4 million have genuine policies. By making claims instant and trustworthy, Dera converts this ₦650B hidden market into active revenue.\n\nSAM: ₦200 Billion – ₦240 Billion — Dera currently focuses on Motor Insurance, which consistently accounts for 12.5% to 15% of the total industry GWP.\n\nSOM: ₦8 Billion – ₦12 Billion — The goal is to capture 10% of the motor claims processing volume in Nigeria over the next 24 months. Dera saves insurers 20% in fraud costs and 30% in manual labour, while only charging 12.5% of that saved value.',
  },
];

const FAQItem = ({ faq, index, isOpen, onToggle }: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const isNumbersQuestion = faq.question === 'What do the numbers look like?';
  
  const formatAnswer = (answer: string) => {
    if (isNumbersQuestion) {
      const sections = answer.split('\n\n');
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {sections.map((section, i) => {
            const [label, ...rest] = section.split(' — ');
            const content = rest.join(' — ');
            return (
              <div key={i} className="bg-[#F8F9FC] rounded-xl p-4 border border-[#E8EEFF]">
                <span className="font-headline font-bold text-lg text-[#4F8EF7]">{label}</span>
                <p className="text-sm md:text-base text-[#3D4A6B] mt-1 leading-relaxed">{content}</p>
              </div>
            );
          })}
        </div>
      );
    }

    const parts = answer.split('\n\n');
    return parts.map((part, i) => {
      if (part.includes('•')) {
        const lines = part.split('\n').filter(l => l.trim());
        return (
          <ul key={i} className="mt-4 space-y-3">
            {lines.map((line, j) => (
              <li key={j} className="flex items-start gap-3 text-[#3D4A6B] text-base md:text-lg leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-[#4F8EF7] mt-2.5 shrink-0" />
                <span>{line.replace('• ', '')}</span>
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="text-[#3D4A6B] text-base md:text-lg leading-relaxed">
          {part}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="border-b border-[#E8EEFF] last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group hover:bg-[#F8F9FC] -mx-4 px-4 rounded-xl transition-colors"
      >
        <span className="font-headline text-lg md:text-xl font-medium text-[#2A313C] pr-4 leading-snug">
          {faq.question}
        </span>
        <div className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-[#4F8EF7] rotate-90' : 'bg-[#E8EEFF]'}`}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={isOpen ? 'text-white' : 'text-[#0A1628]'}
          >
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
            className="overflow-hidden pb-6"
          >
            <div className="font-headline text-base md:text-lg text-[#3D4A6B] leading-7 pl-0">
              {formatAnswer(faq.answer)}
            </div>
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
        <div className="max-w-4xl mt-12 bg-white rounded-2xl border border-[#E8EEFF] p-2 md:p-4">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
