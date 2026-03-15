"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { StepIntro } from "./StepIntro";
import { StepUpload } from "./StepUpload";
import { StepAnalysis } from "./StepAnalysis";
import { StepPricing } from "./StepPricing";
import { StepDispatch } from "./StepDispatch";
import { StepStatus } from "./StepStatus";

const steps = [
  { id: 0, title: "Welcome" },
  { id: 1, title: "Upload" },
  { id: 2, title: "Analysis" },
  { id: 3, title: "Pricing" },
  { id: 4, title: "Dispatch" },
  { id: 5, title: "Status" },
];

export const DemoModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [dispatchAccepted, setDispatchAccepted] = useState(false);

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleOpenDemo = () => {
      setCurrentStep(0);
    };
    window.addEventListener("openDemo", handleOpenDemo);
    return () => window.removeEventListener("openDemo", handleOpenDemo);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setCurrentStep(0), 400);
      return () => {
        clearTimeout(timer);
        setDispatchAccepted(false);
      };
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep === 4 && !dispatchAccepted) {
      setDispatchAccepted(true);
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isClient) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
            className="relative w-full max-w-5xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ height: "680px" }}
          >
            {/* Close Button - Top Right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0A1628"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Minimal Progress Indicator */}
            <div className="flex items-center justify-center gap-2 px-6 py-4 bg-[#F8F9FC] border-b border-[#E8EEFF]">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => setCurrentStep(index)}
                    className="flex items-center justify-center"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                        index === currentStep
                          ? "text-white"
                          : index < currentStep
                            ? "bg-black text-white"
                            : "bg-[#DDE2F0] text-[#6B7799]"
                      }`}
                      style={
                        index === currentStep
                          ? {
                              background: '#4F8EF7',
                            }
                          : index < currentStep
                          ? {
                              background: '#1A3FD4',
                            }
                          : {}
                      }
                    >
                      {index < currentStep ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="w-3 h-3"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-6 h-0.5 ${index < currentStep ? "" : ""}`}
                      style={{
                        background: index < currentStep 
                          ? 'linear-gradient(90deg, #4F8EF7 0%, #1A3FD4 100%)' 
                          : 'linear-gradient(90deg, #DDE2F0 0%, #E8EEFF 100%)',
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step Content */}
            <div
              className="p-6 overflow-y-auto scrollbar-hide bg-white"
              style={{ height: "520px" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
                >
                  {currentStep === 0 && <StepIntro onNext={handleNext} />}
                  {currentStep === 1 && <StepUpload onNext={handleNext} />}
                  {currentStep === 2 && <StepAnalysis onNext={handleNext} />}
                  {currentStep === 3 && <StepPricing onNext={handleNext} />}
                  {currentStep === 4 && <StepDispatch onNext={handleNext} triggerAccept={dispatchAccepted} />}
                  {currentStep === 5 && <StepStatus onClose={onClose} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Navigation - Integrated into card */}
            {currentStep < 5 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-[#E8EEFF] bg-white rounded-b-3xl">
                <button
                  onClick={handlePrev}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                    currentStep === 0 
                      ? "text-[#DDE2F0] cursor-not-allowed" 
                      : "text-[#6B7799] hover:text-[#0A1628]"
                  }`}
                  disabled={currentStep === 0}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <path
                      d="M19 12H5M12 19l-7-7 7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all hover:brightness-125"
                  style={{
                    background: 'linear-gradient(to bottom, #2A2A2A 0%, #000000 100%)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                >
                  {currentStep === 0 ? "Continue" : currentStep === 4 ? (dispatchAccepted ? "Finish" : "Accept & Continue") : "Next"}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
