"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Iphone17Pro } from '@/components/ui/iphone-17-pro';

const MapTilerMap = dynamic(() => import('@/components/ui/MapTilerMap'), { ssr: false });

const workflowSteps = [
  {
    number: '01',
    title: 'Forensic Intake',
    body: 'Customer uploads photos. Before analysing damage, Dera verifies that the GPS coordinates in the image metadata match the reported accident location and that the photo was taken within the last hour.',
  },
  {
    number: '02',
    title: 'Computer Vision Analysis',
    body: 'YOLOv11 identifies the vehicle make and model, labels each damaged component individually — Front Bumper, Right Headlight, Hood — and assigns a severity classification.',
    image: '/Wrecked bumper.jpg',
  },
  {
    number: '03',
    title: 'Nigerian Market Costing',
    body: 'Dera cross-references the damage report against a live parts price database calibrated to the Nigerian market: Ladipo rates, authorized dealer pricing, current labor costs.',
  },
  {
    number: '04',
    title: 'The Confidence Decision',
    body: 'If the AI confidence score is above 85 percent and the estimate is below ₦250,000, the claim is auto-approved. If not, Dera escalates to a human adjuster with a case file.',
  },
  {
    number: '05',
    title: 'Partner Dispatch',
    body: 'The three closest authorized garages receive a job request via the Partner API. The first to accept gets the assignment. Your customer knows their garage within seconds.',
  },
  {
    number: '06',
    title: 'Logistics Trigger',
    body: 'If the vehicle cannot be driven, Dera fires a webhook to a towing partner automatically. If it can, the customer receives a Google Maps pin and a drive-in time window.',
  },
];

const StepSubSection = ({ step, index }: { step: typeof workflowSteps[0]; index: number }) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const isEven = index % 2 === 0;
  const [shuffleIndex, setShuffleIndex] = React.useState(0);

  // Step 03 Special Visual: Nigerian Market Costing
  const renderStep03Visual = () => {
    // ... (previous implementation remains same, just ensuring it's available in this scope)
    const suppliers = [
      { name: 'AutoSource Ladipo', status: 'Syncing...', y: 28 },
      { name: 'West-End Spares', status: 'Live Rates', y: 42 },
      { name: 'Gozie Auto', status: 'Verifying...', y: 56 },
      { name: 'Eagle Parts', status: 'Connected', y: 70 },
    ];

    return (
      <div className="relative w-full aspect-square flex items-center justify-start pointer-events-none overflow-visible">
        {/* Central Dera Card (Liquid Glass) - Positioned Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0, 0, 0.2, 1] }}
          className="relative z-10 w-[24%] aspect-square ml-[4%] rounded-[1.75rem] p-6 flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(79, 142, 247, 0.9) 0%, rgba(26, 63, 212, 0.9) 100%)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 20px 50px rgba(26, 63, 212, 0.3), inset 0 0 25px rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
          <img
            src="/logos/5df41fcf-d4aa-42a4-96e6-be3903722568_removalai_preview.svg"
            alt="Dera"
            className="w-full h-auto object-contain brightness-0 invert opacity-90 scale-105"
          />
        </motion.div>

        {/* Connection Lines (SVG) - Originating from Middle-Right */}
        <svg className="absolute inset-0 w-full h-full z-0 overflow-visible" viewBox="0 0 100 100">
          {suppliers.map((supplier, i) => {
            const path = `M 28 50 C 42 50, 46 ${supplier.y}, 63.5 ${supplier.y}`;
            return (
              <React.Fragment key={`line-group-${i}`}>
                <motion.path
                  d={path}
                  stroke="rgba(0, 0, 0, 0.12)"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ delay: 1 + i * 0.15, duration: 0.8 }}
                />
                <motion.path
                  d={path}
                  stroke="#93C5FD"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0.15, pathOffset: 0, opacity: 0 }}
                  animate={inView ? { 
                    pathOffset: [0, 0.85, 0],
                    opacity: [0, 0.8, 0.8, 0]
                  } : {}}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    delay: 2 + i * 0.4,
                    ease: "easeInOut"
                  }}
                  style={{ filter: 'drop-shadow(0 0 3px rgba(147, 197, 253, 0.6))' }}
                />
              </React.Fragment>
            );
          })}
        </svg>

        {/* Supplier Notification Cards - Vertically Stacked on the Right */}
        <div className="absolute top-0 bottom-0 right-0 left-[60%] flex flex-col justify-center gap-6">
          {suppliers.map((supplier, i) => (
            <motion.div
              key={supplier.name}
              initial={{ opacity: 0, x: 15 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.2 + i * 0.15, duration: 0.5, ease: [0, 0, 0.2, 1] }}
            >
              <div
                className="rounded-2xl px-6 py-5 bg-white border border-[#E8EEFF] shadow-lg min-w-[240px]"
                style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <div>
                    <p className="text-sm font-bold text-[#0A1628] leading-none mb-1.5">{supplier.name}</p>
                    <p className="text-xs text-[#3D4A6B] font-medium leading-none opacity-70">{supplier.status}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Step 04 Special Visual: The Confidence Decision (Shuffle Cards)
  const renderStep04Visual = () => {
    const cards = [
      {
        id: 'auto-approved',
        title: 'Auto-Approved',
        badge: 'INSTANT DECISION',
        badgeColor: '#10B981',
        stats: [
          { label: 'Confidence', value: '94.2%' },
          { label: 'Estimate', value: '₦184,500' },
        ],
        description: 'Meets threshold. Claim set to final payment.',
        style: {
          background: 'linear-gradient(to bottom, #2A2A2A 0%, #000000 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      },
      {
        id: 'escalated',
        title: 'Escalated for Review',
        badge: 'HUMAN ADJUSTER',
        badgeColor: '#F59E0B',
        stats: [
          { label: 'Confidence', value: '72.1%' },
          { label: 'Estimate', value: '₦820,000' },
        ],
        description: 'Complex damage. Assigned to Folake A.',
        style: {
          background: 'white',
          border: '1px solid rgba(0, 0, 0, 0.08)',
        }
      }
    ];

    const toggleShuffle = () => setShuffleIndex(prev => (prev + 1) % 2);

    return (
      <div className="relative w-full aspect-[4/3] flex items-center justify-center">
        <div className="relative w-full max-w-sm aspect-[4/5] cursor-pointer group" onClick={toggleShuffle}>
          {cards.map((card, i) => {
            const isTop = i === shuffleIndex % 2;
            const isBlack = card.id === 'auto-approved';
            
            return (
              <motion.div
                key={card.id}
                className="absolute inset-0 rounded-[2.5rem] p-10 flex flex-col shadow-2xl overflow-hidden"
                style={{
                  ...card.style,
                  zIndex: isTop ? 20 : 10,
                  boxShadow: isTop 
                    ? isBlack ? '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 30px 60px rgba(0,0,0,0.12)' 
                    : '0 10px 30px rgba(0,0,0,0.06)',
                }}
                initial={false}
                animate={{
                  scale: isTop ? 1 : 0.92,
                  y: isTop ? 0 : -40,
                  x: isTop ? 0 : 40,
                  rotate: isTop ? 0 : 6,
                  opacity: isTop ? 1 : 0.6,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
              >
                {/* Visual accents for Case A */}
                {card.id === 'auto-approved' && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full" />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div 
                    className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-wider mb-6 w-fit"
                    style={{ backgroundColor: isBlack ? 'rgba(255,255,255,0.1)' : `${card.badgeColor}20`, color: isBlack ? 'white' : card.badgeColor }}
                  >
                    {card.badge}
                  </div>
                  
                  <h4 className={`text-3xl font-bold leading-tight mb-8 ${isBlack ? 'text-white' : 'text-[#0A1628]'}`}>
                    {card.title}
                  </h4>

                  <div className="grid grid-cols-2 gap-8 mb-auto">
                    {card.stats.map(stat => (
                      <div key={stat.label}>
                        <p className={`text-xs font-medium mb-1 ${isBlack ? 'text-white/40' : 'text-[#3D4A6B] opacity-50'}`}>{stat.label}</p>
                        <p className={`text-2xl font-bold ${isBlack ? 'text-white' : card.id === 'auto-approved' && stat.label === 'Confidence' ? 'text-emerald-600' : 'text-[#0A1628]'}`}>
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className={`pt-8 border-t ${isBlack ? 'border-white/10' : 'border-black/5'}`}>
                    <p className={`text-sm leading-relaxed ${isBlack ? 'text-white/70' : 'text-[#3D4A6B]'}`}>
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Click Hint (only on top card) */}
                {isTop && (
                  <div className="absolute bottom-6 right-8 flex items-center gap-2 opacity-0 group-hover:opacity-40 transition-opacity">
                    <span className={`text-[10px] font-bold tracking-widest ${isBlack ? 'text-white' : 'text-[#3D4A6B]'}`}>SHUFFLE</span>
                    <div className={`w-1 h-1 rounded-full ${isBlack ? 'bg-white' : 'bg-[#3D4A6B]'}`} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  // Step 05 Special Visual: Partner Dispatch (iPhone 17 Pro + Real Map)
  const renderStep05Visual = () => {
    return (
      <div className="relative w-full flex items-start justify-center overflow-hidden" style={{ height: '480px' }}>
        {/* iPhone 17 Pro — only top half visible */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0, 0, 0.2, 1] }}
          className="relative z-10"
        >
          <Iphone17Pro width={433} height={866} className="text-black">
            {/* Map fills the screen */}
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <MapTilerMap
                center={[3.42, 6.45]}
                zoom={13}
                markers={[
                  { lngLat: [3.435, 6.455], color: '#1A3FD4', label: 'Garage' },
                  { lngLat: [3.41, 6.443], color: '#EF4444', label: 'Accident' },
                ]}
                route={{
                  coordinates: [
                    [3.435, 6.455],
                    [3.43, 6.452],
                    [3.425, 6.45],
                    [3.42, 6.447],
                    [3.415, 6.445],
                    [3.41, 6.443],
                  ],
                  color: '#1A3FD4',
                  width: 3,
                }}
              />
            </div>
          </Iphone17Pro>
        </motion.div>

        {/* Bottom gradient fade to white */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
          style={{
            height: '200px',
            background: 'linear-gradient(to bottom, transparent 0%, white 80%)',
          }}
        />

        {/* iOS Notification — floats above the phone */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
          className="absolute z-30"
          style={{ top: '70px', left: '50%', transform: 'translateX(-50%)', width: '300px' }}
        >
          <div className="p-4 rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-black/5">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-5 h-5 rounded-lg bg-[#1A3FD4] flex items-center justify-center shrink-0">
                <span className="text-[9px] text-white font-bold">D</span>
              </div>
              <span className="text-[10px] font-bold text-[#0A1628]/50 tracking-wide">DERA PARTNER</span>
            </div>
            <p className="text-[13px] font-bold text-[#0A1628] leading-snug mb-0.5">New Job Request</p>
            <p className="text-[11px] text-[#3D4A6B] leading-snug mb-3">Benz C300 • Lekki Phase 1</p>
            <div className="flex gap-2">
              <div className="flex-1 py-1.5 rounded-lg text-center" style={{ background: 'linear-gradient(to bottom, #2A2A2A, #000)' }}>
                <span className="text-[10px] text-white font-bold">Accept</span>
              </div>
              <div className="flex-1 py-1.5 rounded-lg bg-[#F0F1F5] text-center">
                <span className="text-[10px] text-[#0A1628] font-bold">Details</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // Step 06 Special Visual: Logistics Trigger (Map Window)
  const renderStep06Visual = () => {
    return (
      <div className="relative w-full aspect-[4/3] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
          className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
          style={{
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
          }}
        >
          {/* Real MapTiler Map */}
          <div className="absolute inset-0">
            <MapTilerMap
              center={[3.38, 6.52]}
              zoom={12}
              markers={[
                { lngLat: [3.37, 6.53], color: '#F59E0B', label: 'Tow Pickup' },
                { lngLat: [3.40, 6.51], color: '#10B981', label: 'Garage' },
              ]}
              route={{
                coordinates: [
                  [3.37, 6.53],
                  [3.375, 6.525],
                  [3.38, 6.522],
                  [3.385, 6.518],
                  [3.39, 6.515],
                  [3.395, 6.512],
                  [3.40, 6.51],
                ],
                color: '#F59E0B',
                width: 3,
              }}
              className="rounded-2xl"
            />
          </div>

          {/* Floating Tow Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 1, duration: 0.6, type: "spring" }}
            className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-white/20 z-10"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-[#F59E0B] flex items-center justify-center">
                  <span className="text-[9px] text-white font-bold">🚛</span>
                </div>
                <span className="text-[11px] font-bold text-[#0A1628]">Tow Truck Dispatched</span>
              </div>
              <span className="text-[9px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">LIVE</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[9px] text-[#3D4A6B] opacity-80">ETA: 12 mins • 3.2 km away</p>
              <p className="text-[9px] text-[#3D4A6B] opacity-60">Ikeja → VI</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0, 0, 0.2, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center py-16 lg:py-24 ${
        index !== 0 ? 'border-t border-[#E8EEFF]' : ''
      }`}
    >
      {/* Content side: number + title + description */}
      <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
        <div className="flex items-baseline gap-4 mb-4">
          <span className="font-headline text-6xl lg:text-8xl font-bold text-[#E8EEFF] select-none leading-none">
            {step.number}
          </span>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-[#1230AA]/20 to-transparent" />
        </div>
        <h3 className="font-headline text-3xl lg:text-4xl font-bold text-[#0A1628] tracking-tight mb-5">
          {step.title}
        </h3>
        <p className="text-lg lg:text-xl text-[#3D4A6B] leading-relaxed">
          {step.body}
        </p>
      </div>

      {/* Visual side */}
      <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
        {step.number === '03' ? (
          <div className="max-w-2xl mx-auto w-full">
            {renderStep03Visual()}
          </div>
        ) : step.number === '04' ? (
          <div className="max-w-xl mx-auto w-full">
            {renderStep04Visual()}
          </div>
        ) : step.number === '05' ? (
          <div className="max-w-xl mx-auto w-full">
            {renderStep05Visual()}
          </div>
        ) : step.number === '06' ? (
          <div className="max-w-xl mx-auto w-full">
            {renderStep06Visual()}
          </div>
        ) : step.image ? (
          <div className="max-w-lg mx-auto w-full aspect-[3/4] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] relative overflow-visible">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover"
              />
              {/* White grid overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />
              {/* Scan glow — top to bottom */}
              <motion.div
                className="absolute left-0 w-full pointer-events-none"
                style={{
                  height: '120px',
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.08) 80%, transparent 100%)',
                  boxShadow: '0 0 60px 20px rgba(255,255,255,0.15)',
                }}
                animate={{ top: ['-120px', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              {/* Scan glow — bottom to top (staggered) */}
              <motion.div
                className="absolute left-0 w-full pointer-events-none"
                style={{
                  height: '120px',
                  background: 'linear-gradient(to top, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.06) 80%, transparent 100%)',
                  boxShadow: '0 0 40px 10px rgba(255,255,255,0.1)',
                }}
                animate={{ top: ['100%', '-120px'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1.5 }}
              />
            </div>

            {/* ─── Analysis card (floating outside top-left) ─── */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ left: '-40%', top: '15%', zIndex: 20 }}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 2, duration: 0.6, ease: [0, 0, 0.2, 1] }}
            >
              <div
                className="rounded-2xl px-10 py-8 text-left min-w-[320px]"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                }}
              >
                <p className="text-xl font-bold text-[#0A1628] mb-4">Benz C300</p>
                <div className="text-lg text-[#3D4A6B] leading-loose space-y-1">
                  <p><span className="font-semibold text-[#0A1628]">Component:</span> Front Bumper</p>
                  <p><span className="font-semibold text-[#0A1628]">Severity:</span> Moderate</p>
                  <p><span className="font-semibold text-[#0A1628]">Confidence:</span> 94.2%</p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-[#DDE2F0] bg-[#F8F9FC] flex items-center justify-center">
            <span className="text-sm text-[#6B7799] font-medium">Visual — Step {step.number}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const WorkflowSection = () => {
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="workflow" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="mb-8"
        >
          <h2 className="font-headline text-6xl sm:text-7xl lg:text-8xl font-bold text-[#0A1628] tracking-tight leading-[1.05] mb-4">
            The Workflow
          </h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#3D4A6B]">
            Six Steps. Zero Phone Calls.
          </p>
        </motion.div>

        {/* Step Sub-Sections */}
        <div>
          {workflowSteps.map((step, i) => (
            <StepSubSection key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
