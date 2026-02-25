"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const DashboardMockup = () => {
  const claims = [
    { id: 'CLM-2026-0041', days: '58 DAYS', status: 'IN PROGRESS', variant: 'success' },
    { id: 'CLM-2026-0039', days: '31 DAYS', status: 'AWAITING ADJUSTER', variant: 'warning' },
    { id: 'CLM-2026-0037', days: '12 DAYS', status: 'URGENT', variant: 'error' }, // Error corresponds to red/orange
    { id: 'CLM-2026-0035', days: '3 DAYS', status: 'CRITICAL', variant: 'error' },
  ];

  return (
    <Card variant="elevated" padding="none" className="max-w-[480px] w-full bg-white shadow-2xl border border-blue-100 overflow-hidden">
      <div className="bg-blue-50/50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
        <span className="text-sm font-bold text-blue-900 tracking-tight">NIIRA Compliance Dashboard</span>
        <Badge variant="warning" size="sm" className="text-[10px]">ILLUSTRATIVE DATA ONLY</Badge>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-3 text-[10px] font-bold text-text-muted uppercase tracking-wider pb-2 border-b border-blue-50">
            <span>Claim ID</span>
            <span>Countdown</span>
            <span>Status</span>
          </div>
          {claims.map((claim, i) => (
            <div key={i} className="grid grid-cols-3 items-center py-2 text-sm font-medium border-b border-blue-50/50 last:border-0">
              <span className="text-blue-900">{claim.id}</span>
              <span className={cn(
                "font-bold",
                claim.variant === 'success' && "text-green-600",
                claim.variant === 'warning' && "text-amber-600",
                claim.variant === 'error' && "text-red-600"
              )}>
                {claim.days}
              </span>
              <Badge variant={claim.variant as any} size="sm" className="w-fit">{claim.status}</Badge>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-4 border-t border-blue-50 flex items-center gap-2 text-[11px] text-text-muted font-medium">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-blue-500">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          Alerts fire 15 days before deadline
        </div>
      </div>
    </Card>
  );
};

export const ComplianceSection = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="compliance" className="bg-[#F8F9FC] py-24 lg:py-32 overflow-hidden border-b border-blue-50">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center lg:justify-start"
          >
            <DashboardMockup />
          </motion.div>

          {/* Right Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <SectionLabel className="mb-6">REGULATORY COMPLIANCE</SectionLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-blue-900 tracking-tight leading-tight mb-8">
              A built-in countdown <br />
              for every open claim.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl mb-10">
              The NIIRA Compliance Dashboard assigns a 60-day countdown to every 
              claim from the moment it is filed. Escalation alerts fire automatically 
              before a deadline is breached. Your compliance team has one view 
              of the full portfolio. No spreadsheet. No manual audit. No missed deadline.
            </p>
            <Badge variant="blue" size="md" className="py-2 px-5 text-sm font-bold tracking-[0.1em]">
              NIIRA 2025 READY
            </Badge>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
