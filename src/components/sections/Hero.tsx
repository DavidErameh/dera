"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Iphone17Pro } from "@/components/ui/iphone-17-pro";

const navLinks = [
  { name: "Problem", href: "#problem" },
  { name: "Solution", href: "#workflow" },
  { name: "FAQs", href: "#features" },
  { name: "Why now?", href: "#insurers" },
];

/* ─── Pixelated Aurora Dot Wave (black dots on white) ─── */
function useAuroraDots(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animFrameRef = useRef<number>(0);

  const draw = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
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

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 40,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center p-4 md:p-6"
      style={{
        background: "linear-gradient(to bottom, #E8EEFF 0%, #FFFFFF 100%)",
      }}
    >
      {/* ─── White Card ─── */}
      <div
        className="relative w-full max-w-7xl rounded-3xl overflow-hidden mx-auto"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,0.8)",
            "0 20px 60px rgba(0,0,0,0.08)",
            "0 8px 24px rgba(0,0,0,0.04)",
          ].join(", "),
        }}
      >
        {/* ─── Aurora Dot Canvas (black dots) ─── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* ─── Header Nav Bar ─── */}
        <div
          className="relative flex items-center px-6 md:px-10 lg:px-12 pt-8 pb-0"
          style={{ zIndex: 10 }}
        >
          {/* Logo */}
          <a
            href="/"
            className="flex items-center justify-center overflow-hidden h-[37px] w-[120px] md:h-[56px] md:w-[180px]"
            style={{ marginTop: "8px" }}
          >
            <img
              src="/logos/fc2cd7c8-3df2-4dff-9558-cecbf5a1abce_removalai_preview.svg"
              alt="Dera"
              className="min-w-[120px] min-h-[120px] md:min-w-[180px] md:min-h-[180px] object-cover"
              style={{ objectPosition: "center 45%" }}
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

        {/* ─── Hero Content ─── */}
        <div
          className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 md:px-12 pt-8 md:pt-0 pb-0 md:-mt-8 max-w-7xl mx-auto"
          style={{ zIndex: 10 }}
        >
          {/* Left Column: Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center md:items-start justify-center text-center md:text-left h-full"
          >
            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="font-headline text-[26px] sm:text-4xl md:text-6xl lg:text-[72px] font-bold text-[#0A1628] leading-[1.05] mb-4"
            >
              <span className="md:hidden whitespace-nowrap">
                Settle Claims in{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)",
                  }}
                >
                  60 Minutes
                </span>
              </span>
              <span className="hidden md:inline">
                Settle Claims in <br />
                <span
                  className="text-[1.12em] text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)",
                  }}
                >
                  60 Minutes
                </span>
              </span>
              <br />
              not{" "}
              <span className="relative inline-block text-[#0A1628]">
                6 weeks
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[3px] md:h-[4px] bg-[#0A1628]/70" />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-xs sm:text-base md:text-lg lg:text-xl text-[#3D4A6B] leading-relaxed max-w-xl mb-6 md:mb-8"
            >
              Built For Tier 1 African Insurers, Designed For NIIRA Compliance
              &amp; Regulations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-row flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Button
                variant="primary"
                className="!rounded-lg w-auto h-auto text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8 py-2 md:py-3 cursor-pointer relative z-20"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openRequestDemo"))
                }
              >
                Request Demo
              </Button>
              <Button
                variant="ghost"
                className="!rounded-lg w-auto h-auto text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8 py-2 md:py-3 cursor-pointer relative z-20"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openDemo"))
                }
              >
                See How It Works
              </Button>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3 mt-8 text-xs md:text-sm text-[#0A1628]/50"
            >
              <span>NIIRA 2025 Ready</span>
              <span className="w-1 h-1 rounded-full bg-[#0A1628]/20" />
              <span>Faster Settlements</span>
              <span className="w-1 h-1 rounded-full bg-[#0A1628]/20" />
              <span>Enterprise Grade</span>
            </motion.div>
          </motion.div>

          {/* Right Column: iPhone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex justify-center lg:justify-end items-end relative w-full h-full lg:mt-0"
          >
            {/* Subtle glow / shadow behind the iPhone for depth */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full scale-75" />

            <div
              className="relative z-10 w-[260px] sm:w-[320px] md:w-[360px] lg:w-[420px]"
              style={{
                marginTop: "10%", // Pushes the iPhone DOWN to hide its bottom
                marginBottom: "-40%", // Pulls the bottom edge way out of the bottom bounds of the card to hide it
              }}
            >
              <Iphone17Pro className="w-full h-auto drop-shadow-2xl -translate-y-4">
                {/* Claim Approved Screen UI */}
                <div className="flex flex-col items-center pt-14 px-4 w-full h-full pb-6">
                  {/* Green Checkmark Icon with Glow */}
                  <div className="relative flex items-center justify-center w-[60px] h-[60px] rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4),0_0_30px_rgba(34,197,94,0.2)] mb-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-7 h-7 text-white"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  {/* Heading Text */}
                  <h3 className="text-[18px] font-bold text-slate-900 tracking-tight mb-1">
                    Claim Approved
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Settlement in progress
                  </p>

                  {/* Claim Details Card */}
                  <div className="w-full bg-[#f8f9fa] rounded-[10px] p-3 mt-4 space-y-2.5 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium text-[10px]">
                        Claim ID:
                      </span>
                      <span className="text-slate-900 font-semibold text-[10px]">
                        CLM-89742
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium text-[10px]">
                        Amount:
                      </span>
                      <span className="text-slate-900 font-semibold text-[10px]">
                        ₦450,000
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium text-[10px]">
                        Time:
                      </span>
                      <span
                        className="font-semibold text-[10px] text-transparent bg-clip-text"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)",
                        }}
                      >
                        58 seconds
                      </span>
                    </div>
                  </div>
                </div>
              </Iphone17Pro>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
