"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";

const damageComponents = [
  {
    id: "hood",
    label: "Hood",
    severity: "Minor",
    color: "#10B981",
    textColor: "#059669",
  },
  {
    id: "headlight",
    label: "HeadLight",
    severity: "Moderate",
    color: "#F59E0B",
    textColor: "#B45309",
  },
  {
    id: "bumper",
    label: "Bumper",
    severity: "Critical",
    color: "#EF4444",
    textColor: "#DC2626",
  },
];

export const StepAnalysis = ({ onNext }: { onNext: () => void }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [showDamaged, setShowDamaged] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    const analyzeTimer = setTimeout(() => {
      setIsAnalyzing(false);
      setShowDamaged(true);
    }, 1500);
    const completeTimer = setTimeout(() => {
      setAnalysisComplete(true);
    }, 2500);
    return () => {
      clearTimeout(analyzeTimer);
      clearTimeout(completeTimer);
    };
  }, [inView]);

  return (
    <div ref={ref} className="flex gap-8">
      {/* Left: Image with ripple transition */}
      <div className="w-1/2 shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 8px 32px rgba(26, 63, 212, 0.15)',
          }}
        >
          <div className="aspect-[4/3] relative">
            {/* Loading image - DAMAGED AREA_20260304_000234_0000.png */}
            <AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <img
                    src="/DAMAGED AREA_20260304_000234_0000.png"
                    alt="Initial damage"
                    className="w-full h-full object-cover"
                  />
                  {/* Scanning overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, rgba(79, 142, 247, 0.4) 50%, transparent)",
                    }}
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  {/* Analyzing badge */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-[#4F8EF7] animate-pulse" />
                    <span className="text-xs font-medium text-white">
                      AI Analyzing...
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Damaged image with ripple - DAMAGED AREA_20260304_002915_0000.png */}
            <AnimatePresence>
              {showDamaged && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <img
                    src="/DAMAGED AREA_20260304_002915_0000.png"
                    alt="Damaged vehicle"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Right: Analysis Results - no costs, just components */}
      <div className="flex-1 min-w-0">
        <div className="mb-4">
          <h4 
            className="text-xl font-bold text-[#0A1628] mb-1"
            style={{ fontFamily: 'var(--font-garamond)' }}
          >
            Damage Analysis
          </h4>
          <p className="text-sm text-[#3D4A6B]">
            AI-identified damage components
          </p>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {analysisComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {damageComponents.map((component, index) => (
                  <motion.div
                    key={component.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(221, 226, 240, 0.5)',
                      boxShadow: '0 4px 12px rgba(10, 22, 40, 0.04)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ 
                          background: component.color,
                          boxShadow: `0 0 8px ${component.color}40`,
                        }}
                      />
                      <div>
                        <p className="text-sm font-bold text-[#0A1628]">
                          {component.label}
                        </p>
                        <p
                          className="text-xs font-medium"
                          style={{ color: component.textColor }}
                        >
                          {component.severity} damage detected
                        </p>
                      </div>
                    </div>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ 
                        background: `${component.color}15`,
                        border: `1px solid ${component.color}30`,
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={component.color}
                        strokeWidth="2"
                        className="w-4 h-4"
                      >
                        <path
                          d="M9 12l2 2 4-4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {analysisComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-4 p-4 rounded-xl text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(79, 142, 247, 0.1) 0%, rgba(26, 63, 212, 0.1) 100%)",
                border: "1px solid rgba(79, 142, 247, 0.2)",
              }}
            >
              <p className="text-sm text-[#3D4A6B]">
                Moving to{" "}
                <span className="font-bold text-[#0A1628]">Market Pricing</span>{" "}
                for cost estimation...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
