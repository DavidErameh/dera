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
        className="text-center max-w-lg w-full"
      >
        <h3 
          className="text-3xl font-bold text-[#0A1628] mb-4"
          style={{ fontFamily: 'var(--font-garamond)' }}
        >
          Your Custom Demo
        </h3>
        
        <p className="text-base text-[#3D4A6B] leading-relaxed mb-8">
          We build a demo specifically for you. Once you submit your details and qualify, 
          our team customizes a demo based on your claims data and workflows.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-2xl p-6 mb-6"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 8px 32px rgba(10, 22, 40, 0.08)',
          }}
        >
          <div className="space-y-5">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)',
                  boxShadow: '0 4px 12px rgba(26, 63, 212, 0.3)',
                }}
              >
                <span className="text-sm font-bold text-white">1</span>
              </div>
              <p className="text-base font-semibold text-[#0A1628]">
                Submit your details via Request Demo
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)',
                  boxShadow: '0 4px 12px rgba(26, 63, 212, 0.3)',
                }}
              >
                <span className="text-sm font-bold text-white">2</span>
              </div>
              <p className="text-base font-semibold text-[#0A1628]">
                We build your custom demo within 72 hours
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)',
                  boxShadow: '0 4px 12px rgba(26, 63, 212, 0.3)',
                }}
              >
                <span className="text-sm font-bold text-white">3</span>
              </div>
              <p className="text-base font-semibold text-[#0A1628]">
                Walk through a real claim in 60 minutes
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-[#6B7799]"
        >
          Click <span className="font-semibold text-[#0A1628]">Continue</span> to see the demo in action
        </motion.p>
      </motion.div>
    </div>
  );
};
