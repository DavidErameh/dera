"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Iphone17Pro } from '@/components/ui/iphone-17-pro';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const navLinks = [
  { name: 'Problem', href: '#problem' },
  { name: 'Solution', href: '#workflow' },
  { name: 'FAQs', href: '#features' },
  { name: 'Why now?', href: '#insurers' },
];

/* ─── Pixelated Aurora Dot Wave (black dots on white) ─── */
function useAuroraDots(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animFrameRef = useRef<number>(0);

  const draw = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const dotSize = 2;
    const gap = 14;
    const cols = Math.ceil(w / gap);
    const rows = Math.ceil(h / gap);
    const time = performance.now() * 0.0004;

    ctx.clearRect(0, 0, w, h);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * gap;
        const y = r * gap;

        const nx = x / w;
        const ny = y / h;

        const centerDistY = Math.abs(ny - 0.5) * 2;
        const wavePhase = nx * 6 + time;
        const wave1 = Math.sin(wavePhase) * 0.5 + 0.5;
        const wave2 = Math.sin(wavePhase * 1.7 + 1.3) * 0.5 + 0.5;
        const wave3 = Math.cos(wavePhase * 0.6 + ny * 4) * 0.5 + 0.5;

        const envelope = Math.pow(centerDistY, 0.8);
        const combined = (wave1 * 0.4 + wave2 * 0.35 + wave3 * 0.25) * envelope;

        const opacity = combined * 0.18;
        if (opacity < 0.02) continue;

        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(x, y, dotSize, dotSize);
      }
    }

    animFrameRef.current = requestAnimationFrame(() => draw(canvas));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    draw(canvas);

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(animFrameRef.current);
      draw(canvas);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
    };
  }, [canvasRef, draw]);
}

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useAuroraDots(canvasRef);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 40,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center p-4 md:p-6"
      style={{ background: 'linear-gradient(to bottom, #E8EEFF 0%, #FFFFFF 100%)' }}
    >
      {/* ─── White Card ─── */}
      <div
        className="relative w-full max-w-7xl rounded-3xl overflow-hidden mx-auto"
        style={{
          background: '#FFFFFF',
          minHeight: 'min(92vh, 900px)',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: [
            'inset 0 1px 0 rgba(255,255,255,0.8)',
            '0 20px 60px rgba(0,0,0,0.08)',
            '0 8px 24px rgba(0,0,0,0.04)',
          ].join(', '),
        }}
      >
        {/* ─── Aurora Dot Canvas (black dots) ─── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* ─── Header Nav Bar ─── */}
        <div className="relative flex items-center px-6 md:px-10 lg:px-12 pt-6 pb-4" style={{ zIndex: 10 }}>
          {/* Logo */}
          <a href="/" className="flex items-center justify-center overflow-hidden" style={{ height: '56px', width: '180px', marginTop: '8px' }}>
            <img
              src="/logos/fc2cd7c8-3df2-4dff-9558-cecbf5a1abce_removalai_preview.svg"
              alt="Dera"
              style={{ minWidth: '180px', minHeight: '180px', objectFit: 'cover', objectPosition: 'center 45%' }}
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 ml-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium text-[#0A1628]/50 hover:text-[#0A1628] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* ─── Hero Content (two-column: text left, blue card right) ─── */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-12" style={{ zIndex: 10, minHeight: 'calc(min(92vh, 900px) - 100px)' }}>
          {/* Left Column: Text */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-start text-left"
          >
            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="font-headline text-5xl sm:text-6xl md:text-[80px] font-bold text-[#0A1628] leading-[1.05] mb-6"
            >
              Settle Claims in <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)' }}
              >
                60 Minutes
              </span>
              <br />
              not{' '}
              <span className="relative inline-block text-[#0A1628]">
                6 weeks
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[4px] bg-[#0A1628]/70" />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl text-[#3D4A6B] leading-relaxed max-w-xl mb-10"
            >
              Built For Tier 1 African Insurers, Designed For NIIRA Compliance &amp; Regulations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4"
            >
              <Button variant="primary" size="lg">
                Request Early Access
              </Button>
              <Button variant="ghost" size="lg">
                How it works
              </Button>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-3 mt-8 text-sm text-[#0A1628]/30"
            >
              <span>NIIRA 2025 Ready</span>
              <span className="w-1 h-1 rounded-full bg-[#0A1628]/20" />
              <span>60s Average Settlement</span>
              <span className="w-1 h-1 rounded-full bg-[#0A1628]/20" />
              <span>Enterprise Grade</span>
            </motion.div>
          </motion.div>

          {/* Right Column: iPhone 17 Pro — Claim Approved */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0, 0, 0.2, 1] }}
            className="flex items-start justify-center ml-2 md:ml-4"
          >
            <div style={{ perspective: '1200px' }}>
            <div style={{ transform: 'scale(2.5) rotateY(-8deg) translateX(-12px)', transformOrigin: 'top left', marginTop: '20px', filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))' }}>
            <Iphone17Pro width={380} height={760} frameColor="#80828A" className="text-white">
              <div style={{ width: '100%', height: '100%', background: 'white', padding: '0 24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', marginTop: '72px' }}>
                  {/* Green Checkmark - Simplified Look */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      boxShadow: '0 12px 24px rgba(16, 185, 129, 0.35)',
                      marginBottom: '4px'
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px' }}>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>

                  <h3 className="font-headline" style={{ fontSize: '24px', fontWeight: 800, color: '#0A1628', marginBottom: '16px', letterSpacing: '0.02em', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    Claim Approved
                  </h3>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%', marginTop: '4px' }}>
                    <button style={{
                      flex: 1,
                      height: '32px',
                      background: '#F1F3F9',
                      color: '#4B5563',
                      fontSize: '9px',
                      fontWeight: 700,
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      transition: 'all 0.2s',
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px' }}>
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                        <polyline points="16 6 12 2 8 6"/>
                        <line x1="12" y1="2" x2="12" y2="15"/>
                      </svg>
                      <span>Share</span>
                    </button>
                    
                    <button style={{
                      flex: 1,
                      height: '32px',
                      background: '#F1F3F9',
                      color: '#4B5563',
                      fontSize: '9px',
                      fontWeight: 700,
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      transition: 'all 0.2s',
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px' }}>
                        <line x1="8" y1="6" x2="21" y2="6"/>
                        <line x1="8" y1="12" x2="21" y2="12"/>
                        <line x1="8" y1="18" x2="21" y2="18"/>
                        <line x1="3" y1="6" x2="3.01" y2="6"/>
                        <line x1="3" y1="12" x2="3.01" y2="12"/>
                        <line x1="3" y1="18" x2="3.01" y2="18"/>
                      </svg>
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </div>
            </Iphone17Pro>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
