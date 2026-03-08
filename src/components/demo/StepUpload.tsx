"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";

const validationChecks = [
  { id: "upload", label: "Uploading Image" },
  { id: "property", label: "Confirming Registered Property" },
  { id: "gps", label: "Validating GPS & Timestamp" },
  { id: "ai", label: "AI Forgery Detection" },
  { id: "cleared", label: "Forensics Cleared" },
] as const;

const UPLOAD_DURATION_MS = 1000;
const FORENSICS_DURATION_MS = 1500;

export const StepUpload = ({ onNext }: { onNext: () => void }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeNodeCount, setActiveNodeCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showPropertyCard, setShowPropertyCard] = useState(false);
  const [phase, setPhase] = useState<"idle" | "upload" | "forensics" | "done">(
    "idle",
  );
  const { ref, inView } = useInView({ threshold: 0.3 });

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || phase !== "idle") {
      return;
    }

    setPhase("upload");
  }, [inView, phase]);

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        onNext();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, onNext]);

  useEffect(() => {
    if (!inView || phase !== "upload") {
      return;
    }

    const step = (timestamp: number) => {
      if (startTimeRef.current == null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = Math.min(
        timestamp - startTimeRef.current,
        UPLOAD_DURATION_MS,
      );
      const progress = (elapsed / UPLOAD_DURATION_MS) * 100;

      setUploadProgress(progress);

      if (elapsed >= UPLOAD_DURATION_MS) {
        setUploadProgress(100);
        setActiveNodeCount(1);
        setPhase("forensics");
        animationFrameRef.current = null;
        return;
      }

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current != null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      startTimeRef.current = null;
    };
  }, [inView, phase]);

  useEffect(() => {
    if (!inView || phase !== "forensics") {
      return;
    }

    const timeouts: number[] = [];

    const propertyTimeout = window.setTimeout(() => {
      setActiveNodeCount(2);
      setShowPropertyCard(true);
    }, 300);
    timeouts.push(propertyTimeout);

    const gpsTimeout = window.setTimeout(() => {
      setActiveNodeCount(3);
    }, 600);
    timeouts.push(gpsTimeout);

    const aiTimeout = window.setTimeout(() => {
      setActiveNodeCount(4);
    }, 900);
    timeouts.push(aiTimeout);

    const clearedTimeout = window.setTimeout(() => {
      setActiveNodeCount(5);
      setIsComplete(true);
      setPhase("done");
    }, 1200);
    timeouts.push(clearedTimeout);

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [inView, phase]);

  const roundedProgress = Math.round(uploadProgress);

  return (
    <div ref={ref} className="flex flex-col lg:flex-row gap-8">
      {/* Left: Car Image */}
      <div className="lg:w-1/2 shrink-0">
        <div className="mb-4">
          <h4 className="font-display text-xl font-bold text-[#0A1628]">
            Forensic Validation
          </h4>
          <p className="text-sm text-[#3D4A6B]">
            Every photo is validated before analysis
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #F0F3FF 0%, #E8EEFF 100%)",
            border: "1px solid rgba(79, 142, 247, 0.2)",
            boxShadow: "0 8px 32px rgba(26, 63, 212, 0.1)",
          }}
        >
          <div className="aspect-4/3 relative">
            <img
              src="/rip-2011-c300-v0-ghi5rkw83qva1.jpg"
              alt="Mercedes C300"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            <AnimatePresence>
              {phase === "upload" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 relative">
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
                          stroke="url(#uploadGradient)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 - (251.2 * roundedProgress) / 100}
                          transform="rotate(-90 50 50)"
                        />
                        <defs>
                          <linearGradient id="uploadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4F8EF7" />
                            <stop offset="100%" stopColor="#1A3FD4" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#0A1628]">
                        {roundedProgress}%
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#0A1628]">
                      Uploading...
                    </p>
                  </div>
                </motion.div>
              )}

              {showPropertyCard && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <div className="p-3 rounded-xl bg-white/95 backdrop-blur-sm border border-[#10B981]/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          className="w-3 h-3"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-[#10B981]">
                        Registered with Insurance
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="/rip-2011-c300-v0-ghi5rkw83qva1.jpg"
                        alt="Mercedes C300"
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-bold text-[#0A1628]">
                          Mercedes-Benz C300
                        </p>
                        <p className="text-xs text-[#6B7799]">
                          Lagos, Nigeria • 2023
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right: Progress Tracker */}
      <div className="flex-1 min-w-0">
        <div className="space-y-3 mt-12">
          {validationChecks.map((check, index) => {
            const position = index + 1;
            const isActive = position === activeNodeCount;
            const isCompleteItem = position < activeNodeCount;
            const isLoading = isActive && index === 0 && phase === "upload";

            return (
              <div
                key={check.id}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-[#E8EEFF]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: isCompleteItem
                        ? "#10B981"
                        : isActive
                          ? "#4F8EF7"
                          : "#E8EEFF",
                    }}
                  >
                    {isCompleteItem ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        className="w-4 h-4"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : isLoading ? (
                      <svg
                        className="w-4 h-4 text-white animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                    ) : (
                      <span
                        className={`text-xs font-bold ${
                          isActive ? "text-white" : "text-[#8C98B2]"
                        }`}
                      >
                        {position}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      isActive || isCompleteItem
                        ? "text-[#0A1628]"
                        : "text-[#8C98B2]"
                    }`}
                  >
                    {check.label}
                  </span>
                </div>
                <span className="text-xs text-[#6B7799]">
                  {isCompleteItem ? "Completed" : isActive ? "In Progress" : "Pending"}
                </span>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 p-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 text-center"
            >
              <p className="text-sm font-bold text-[#059669]">
                All validations passed. Moving to analysis...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
