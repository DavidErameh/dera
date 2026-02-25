"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const navLinks = [
  { name: 'How It Works', href: '#workflow' },
  { name: 'Features', href: '#features' },
  { name: 'For Insurers', href: '#insurers' },
  { name: 'For Investors', href: '#investors' },
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
        className="relative w-full max-w-[1440px] rounded-3xl overflow-hidden"
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
        <div className="relative flex items-center px-6 md:px-10 lg:px-16 pt-6 pb-4" style={{ zIndex: 10 }}>
          {/* Logo */}
          <a href="/" className="flex items-center h-10 overflow-hidden">
            <img
              src="/logos/fc2cd7c8-3df2-4dff-9558-cecbf5a1abce_removalai_preview.svg"
              alt="Dera"
              className="h-30 w-auto"
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 ml-16">
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
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6 md:px-10 lg:px-16" style={{ zIndex: 10, minHeight: 'calc(min(92vh, 900px) - 100px)' }}>
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
              className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0A1628] leading-[1.1] tracking-wide mb-6"
            >
              Settle Claims in{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)' }}
              >
                60 Seconds
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
              className="text-base md:text-lg text-[#3D4A6B] leading-relaxed max-w-xl mb-10"
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

          {/* Right Column: Stacked Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0, 0, 0.2, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-[3/4]">
              {/* Back card (behind, offset up-right, Problem Section style) */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(234, 240, 255, 0.5) 0%, rgba(220, 230, 255, 0.25) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: '20px 20px 60px rgba(26, 63, 212, 0.3), 8px 8px 24px rgba(26, 63, 212, 0.2)',
                  transform: 'translate(20px, -24px)',
                }}
              />
              {/* Blue gradient card (front) */}
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)',
                  boxShadow: '20px 20px 60px rgba(26, 63, 212, 0.3), 8px 8px 24px rgba(26, 63, 212, 0.2)',
                }}
              >
                {/* Black gradient at bottom */}
                <div
                  className="absolute bottom-0 left-0 w-full h-1/2"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0.9) 100%)',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
