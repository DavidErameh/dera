"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";

export const StepStatus = ({ onClose }: { onClose: () => void }) => {
  const [showClaimApproved, setShowClaimApproved] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setShowClaimApproved(true), 800);
    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center py-4 md:py-8 px-3 md:px-4"
    >
      <AnimatePresence mode="wait">
        {!showClaimApproved ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 relative">
              <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#E8EEFF"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#statusGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={188.4}
                  strokeDashoffset={188.4}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  transform="rotate(-90 50 50)"
                />
                <defs>
                  <linearGradient
                    id="statusGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#4F8EF7" />
                    <stop offset="100%" stopColor="#1A3FD4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="text-xs md:text-sm text-[#6B7799]">
              Processing claim...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="approved"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center w-full max-w-sm md:max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg"
              style={{
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                className="w-8 h-8 md:w-10 md:h-10"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display text-xl md:text-3xl font-bold text-[#0A1628] mb-1 md:mb-2"
            >
              Claim Approved
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xs md:text-sm text-[#6B7799] mb-4 md:mb-6"
            >
              Settlement in progress
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-3 md:p-5 rounded-xl md:rounded-2xl mb-4 md:mb-6 text-left"
              style={{
                background: "linear-gradient(135deg, #0A1628 0%, #1A3FD4 100%)",
              }}
            >
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <div>
                  <p className="text-[10px] md:text-xs text-white/50 mb-1">
                    Claim ID
                  </p>
                  <p className="text-xs md:text-sm font-bold text-white">
                    CLM-2026-0042
                  </p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-white/50 mb-1">
                    Vehicle
                  </p>
                  <p className="text-xs md:text-sm font-bold text-white">
                    Mercedes C300
                  </p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-white/50 mb-1">
                    Amount
                  </p>
                  <p className="text-xs md:text-sm font-bold text-white">
                    ₦318,500
                  </p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-white/50 mb-1">
                    Time
                  </p>
                  <p className="text-xs md:text-sm font-bold text-white">
                    58 seconds
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col md:flex-row gap-2 md:gap-3"
            >
              <button
                onClick={onClose}
                className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-lg font-semibold text-xs md:text-sm text-white transition-all hover:brightness-125"
                style={{
                  background:
                    "linear-gradient(to bottom, #2A2A2A 0%, #000000 100%)",
                }}
              >
                Request your own Demo
              </button>
              <a
                href="mailto:mcdaveltd@gmail.com"
                className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-lg font-semibold text-xs md:text-sm text-[#0A1628] bg-white border border-[#E8EEFF] hover:bg-[#F8F9FC] flex items-center justify-center"
              >
                Talk to Sales
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
