"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
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
      setDispatchAccepted(false);
      return () => clearTimeout(timer);
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
            style={{ height: "750px", maxHeight: "90vh" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8EEFF]">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0A1628]">
                    Interactive Demo
                  </h3>
                  <p className="text-xs text-[#6B7799]">
                    AI Claims Processing in Seconds
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-[#F2F4F8] flex items-center justify-center hover:bg-[#E8EEFF] transition-colors"
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
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 px-6 py-4 bg-[#F8F9FC]">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      index === currentStep
                        ? "bg-white shadow-md"
                        : index < currentStep
                          ? "bg-transparent"
                          : "bg-transparent opacity-50"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                        index === currentStep
                          ? "text-white"
                          : index < currentStep
                            ? "bg-black text-white"
                            : "bg-[#DDE2F0] text-[#6B7799]"
                      }`}
                      style={
                        index === currentStep
                          ? {
                              background: "black",
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
                          className="w-4 h-4"
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
                    <span
                      className={`text-sm font-medium hidden md:inline ${
                        index === currentStep
                          ? "text-[#0A1628]"
                          : "text-[#6B7799]"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-10 h-0.5 ${index < currentStep ? "bg-black" : "bg-[#DDE2F0]"}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step Content */}
            <div
              className="p-6 overflow-y-auto scrollbar-hide"
              style={{ height: "540px" }}
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

            {/* Footer Navigation */}
            {currentStep < 5 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-[#E8EEFF] bg-[#F8F9FC]">
                <div></div>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-110"
                  style={{
                    background: "black",
                  }}
                >
                  {currentStep === 4 ? (dispatchAccepted ? "Finish" : "Accept & Continue") : "Continue"}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
