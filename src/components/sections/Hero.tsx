"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Iphone17Pro } from "@/components/ui/iphone-17-pro";
import { Logo } from "@/components/ui/Logo";
import { IMessageBubble } from "@/components/ui/IMessageBubble";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ─── Thin Navigation Bar ─── */}
      <div className="w-full h-14 md:h-16 border-b border-white/30 flex items-center px-6 md:px-12 relative z-20">
        <div className="h-20 md:h-24 w-auto overflow-hidden flex items-center">
          <img
            src="/logos/fc2cd7c8-3df2-4dff-9558-cecbf5a1abce_removalai_preview.svg"
            alt="Dera"
            className="h-full w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        
        <div className="hidden md:flex items-center gap-8 ml-12">
          <a href="#problem" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Problem</a>
          <a href="#workflow" className="text-sm font-medium text-white/80 hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Features</a>
          <a href="#insurers" className="text-sm font-medium text-white/80 hover:text-white transition-colors">For Insurers</a>
        </div>
      </div>

      {/* ─── Background Gradient with Semi-Circle ─── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4F8EF7] to-white z-0" />
      
      {/* Upside Down Semi-Circle with Faded Edges */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 w-[200%] max-w-[1200px] aspect-[2/1] pointer-events-none z-0"
        style={{
          top: 0,
          background: 'radial-gradient(ellipse at center top, rgba(79,142,247,0.9) 0%, rgba(79,142,247,0.5) 40%, transparent 70%)',
        }}
      />

      {/* ─── Content Container ─── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ─── Main Content (Centered) ─── */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 pb-20 pt-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="w-full max-w-4xl flex flex-col items-center"
          >
            {/* Headline - Centered */}
            <motion.h1
              variants={fadeInUp}
              className="text-center text-[28px] sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-white leading-tight mb-4 capitalize"
              style={{ fontFamily: "var(--font-garamond)", textShadow: '0 2px 20px rgba(0,0,0,0.15)' }}
            >
              The Claims Infrastructure Nigerian Insurance Was Built Without
            </motion.h1>

            {/* Subheadline - Centered */}
            <motion.p
              variants={fadeInUp}
              className="text-center text-sm md:text-base lg:text-lg text-white/90 leading-relaxed max-w-2xl mb-10"
            >
              One API. Every claim tracked from submission to settlement.
            </motion.p>

            {/* CTA Buttons - Side by Side */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-row flex-wrap items-center justify-center gap-4 mb-12"
            >
              <Button
                variant="primary"
                className="!rounded-lg text-sm md:text-base px-6 md:px-8 py-3 cursor-pointer"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openRequestDemo"))
                }
              >
                Request Demo
              </Button>
              <Button
                variant="inverse"
                className="!rounded-lg text-sm md:text-base px-6 md:px-8 py-3 cursor-pointer bg-white/20 backdrop-blur-md border border-white/30 shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:bg-white/30"
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
              className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs md:text-sm text-white"
            >
              <span>NIIRA 2025 Ready</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.6),0_0_16px_rgba(52,211,153,0.3)] animate-pulse" />
              <span>Faster Settlements</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.6),0_0_16px_rgba(52,211,153,0.3)] animate-pulse" />
              <span>Enterprise Grade</span>
            </motion.div>

            {/* iPhone Mockup - Centered Below Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="flex justify-center relative pb-0"
              style={{ marginTop: '1rem', marginBottom: '-12rem', willChange: 'transform, opacity' }}
            >
              {/* Subtle glow / shadow behind the iPhone for depth */}
              <div 
                className="absolute inset-0 bg-blue-400/20 blur-[100px] rounded-full"
                style={{ transform: "scale(0.6)" }}
              />

              <div className="relative z-10 w-[280px] sm:w-[340px] md:w-[400px] lg:w-[480px]">

                <Iphone17Pro className="w-full h-auto drop-shadow-2xl">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};
