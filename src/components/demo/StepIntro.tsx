"use client";

import React from "react";
import { motion } from "motion/react";

export const StepIntro = ({ onNext }: { onNext: () => void }) => {
  const steps = [
    "Submit your details via Request Demo",
    "We build your custom demo within 72 hours",
    "Walk through a real claim in 60 minutes",
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center w-full"
      >
        <h3 
          className="text-4xl font-extrabold text-[#0A1628] mb-10"
          style={{ fontFamily: 'var(--font-garamond)' }}
        >
          Your Custom Demo
        </h3>
        
        <div className="space-y-8 mb-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center justify-center gap-4"
            >
              <span className="text-3xl font-extrabold text-[#4F8EF7]">{index + 1}.</span>
              <span className="text-xl text-[#3D4A6B]">{step}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base text-[#6B7799]"
        >
          Click <span className="font-semibold text-[#0A1628]">Continue</span> to see the demo in action
        </motion.p>
      </motion.div>
    </div>
  );
};
