"use client";

import React from "react";
import { motion } from "motion/react";

export const StepIntro = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <h3 className="font-display text-3xl font-bold text-[#0A1628] mb-6">
          Your Custom Demo
        </h3>
        
        <p className="text-base text-[#0A1628] leading-relaxed mb-8 font-medium">
          We build a demo specifically for you. Once you submit your details and qualify, 
          our team customizes a demo based on your claims data and workflows.
        </p>

        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-white">1</span>
              </div>
              <p className="text-base font-semibold text-[#0A1628]">
                Submit your details via Request Demo
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-white">2</span>
              </div>
              <p className="text-base font-semibold text-[#0A1628]">
                We build your custom demo within 72 hours
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-white">3</span>
              </div>
              <p className="text-base font-semibold text-[#0A1628]">
                Walk through a real claim in 60 minutes
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
