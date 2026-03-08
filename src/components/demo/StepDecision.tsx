"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";

export const StepDecision = ({ onNext }: { onNext: () => void }) => {
  const [step, setStep] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    const timers = [
      setTimeout(() => setStep(1), 250),
      setTimeout(() => setStep(2), 750),
      setTimeout(() => setIsApproved(true), 1200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref} className="flex gap-6">
      {/* Left: Score Visualization */}
      <div className="w-1/2 shrink-0">
        <div className="mb-3">
          <h4 className="font-display text-lg font-bold text-[#0A1628]">
            Decision Engine
          </h4>
          <p className="text-xs text-[#3D4A6B]">AI confidence scoring</p>
        </div>
        <div className="p-5 rounded-xl bg-white border border-[#E8EEFF] text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E8EEFF"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={283}
                initial={{ strokeDashoffset: 283 }}
                animate={{
                  strokeDashoffset: step >= 1 ? 283 - 283 * 0.942 : 283,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <p className="text-3xl font-bold text-[#0A1628]">94.2%</p>
                <p className="text-[9px] text-[#6B7799]">Confidence</p>
              </div>
            </div>
          </div>
          <div className="relative h-3 bg-[#E8EEFF] rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full rounded-full absolute left-0 top-0"
              style={{
                background: "linear-gradient(90deg, #10B981 0%, #059669 100%)",
              }}
              initial={{ width: 0 }}
              animate={{ width: step >= 1 ? "94.2%" : "0%" }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute right-[15%] top-0 bottom-0 w-0.5 bg-[#E2A816]" />
          </div>
          <div className="flex justify-between text-[9px] text-[#6B7799]">
            <span>0%</span>
            <span className="text-[#B45309]">85% threshold</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Right: Decision & Criteria */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-[#6B7799] uppercase mb-2">
          Decision Criteria
        </p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-3 rounded-lg bg-[#F8F9FC]">
            <div
              className={`w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center ${step >= 1 ? "bg-[#10B981]" : "bg-[#DDE2F0]"}`}
            >
              {step >= 1 && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  className="w-3 h-3"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </div>
            <p className="text-[9px] text-[#6B7799]">Confidence</p>
            <p className="text-xs font-bold text-[#0A1628]">
              {step >= 1 ? "94.2%" : "—"}
            </p>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#F8F9FC]">
            <div
              className={`w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center ${step >= 2 ? "bg-[#10B981]" : "bg-[#DDE2F0]"}`}
            >
              {step >= 2 && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  className="w-3 h-3"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </div>
            <p className="text-[9px] text-[#6B7799]">Estimate</p>
            <p className="text-xs font-bold text-[#0A1628]">
              {step >= 2 ? "₦184K" : "—"}
            </p>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#F8F9FC]">
            <div
              className={`w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center ${isApproved ? "bg-[#10B981]" : "bg-[#DDE2F0]"}`}
            >
              {isApproved && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  className="w-3 h-3"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </div>
            <p className="text-[9px] text-[#6B7799]">Decision</p>
            <p
              className={`text-xs font-bold ${isApproved ? "text-[#10B981]" : "text-[#6B7799]"}`}
            >
              {isApproved ? "Approved" : "—"}
            </p>
          </div>
        </div>
        <AnimatePresence>
          {isApproved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="p-5 rounded-xl text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)",
                border: "2px solid rgba(16, 185, 129, 0.3)",
                boxShadow: "0 0 24px rgba(16, 185, 129, 0.2)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  boxShadow: "0 4px 16px rgba(16, 185, 129, 0.4)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  className="w-8 h-8"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    d="M20 6L9 17l-5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <h5 className="text-base font-bold text-[#059669] mb-1">
                Claim Auto-Approved
              </h5>
              <p className="text-xs text-[#3D4A6B]">Processed in 1.2 seconds</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
