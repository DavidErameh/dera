"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";

const parts = [
  { id: "bumper", name: "Front Bumper", price: 145000 },
  { id: "headlight", name: "HeadLight", price: 85000 },
  { id: "hood", name: "Hood Panel", price: 105000 },
];

const labourCost = 45000;
const selectedSupplier = "AutoFactorNG";

export const StepPricing = ({ onNext }: { onNext: () => void }) => {
  const [visibleParts, setVisibleParts] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    
    const timers = parts.map((_, index) =>
      setTimeout(
        () => setVisibleParts(index + 1),
        (index + 1) * 400,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const partsTotal = parts.reduce((sum, part) => sum + part.price, 0);
  const totalCost = partsTotal + labourCost;

  return (
    <div ref={ref} className="flex gap-8">
      {/* Left: Supplier Cards stacked vertically */}
      <div className="w-5/12 shrink-0 space-y-3">
        <h4 
          className="text-lg font-bold text-[#0A1628] mb-4"
          style={{ fontFamily: 'var(--font-garamond)' }}
        >
          Market Suppliers
        </h4>
        
        {[
          { name: "AutoFactorNG", price: 145000, rating: 4.4, reviews: 59, best: true },
          { name: "Ladipo Auto Market", price: 152000, rating: 4.1, reviews: 539, best: false },
          { name: "Partste", price: 128500, rating: 5.0, reviews: 72, best: false },
        ].map((supplier, index) => (
          <motion.div
            key={supplier.name}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: index < visibleParts ? 1 : 0.5, y: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.15, duration: 0.4 }}
            className="rounded-xl overflow-hidden"
            style={{
              background: supplier.best ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(12px)',
              border: supplier.best ? '1.5px solid rgba(79, 142, 247, 0.3)' : '1px solid rgba(221, 226, 240, 0.5)',
              boxShadow: supplier.best ? '0 8px 24px rgba(26, 63, 212, 0.15)' : '0 2px 8px rgba(10, 22, 40, 0.04)',
            }}
          >
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#0A1628]">{supplier.name}</p>
                  {supplier.best && (
                    <div 
                      className="w-4 h-4 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)',
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-2 h-2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                  )}
                </div>
                {supplier.best && (
                  <span 
                    className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    BEST
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" className="w-3 h-3">
                      <path
                        d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.27 5.06 16.7 6 11.21l-4-3.9 5.53-.8L10 1.5z"
                        fill={i < Math.floor(supplier.rating) ? "#F59E0B" : "#DDE2F0"}
                      />
                    </svg>
                  ))}
                  <span className="text-xs text-[#6B7799] ml-1">({supplier.reviews})</span>
                </div>
                <p 
                  className={`text-base font-bold ${supplier.best ? "text-transparent bg-clip-text" : "text-[#0A1628]"}`}
                  style={supplier.best ? {
                    backgroundImage: 'linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)',
                  } : {}}
                >
                  ₦{supplier.price.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right: Cost Breakdown */}
      <div className="flex-1">
        <h4 
          className="text-lg font-bold text-[#0A1628] mb-4"
          style={{ fontFamily: 'var(--font-garamond)' }}
        >
          Repair Cost Breakdown
        </h4>

        <div className="space-y-3 mb-6">
          {parts.map((part, index) => (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: index < visibleParts ? 1 : 0, x: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(221, 226, 240, 0.5)',
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3 h-3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[#0A1628]">{part.name}</span>
              </div>
              <span className="text-sm font-bold text-[#0A1628]">₦{part.price.toLocaleString()}</span>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="flex items-center justify-between p-3 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(221, 226, 240, 0.5)',
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #6B7799 0%, #3D4A6B 100%)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-3 h-3">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#0A1628]">Labour Cost</span>
            </div>
            <span className="text-sm font-bold text-[#0A1628]">₦{labourCost.toLocaleString()}</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.3 }}
          className="p-4 rounded-xl mb-4"
          style={{
            background: 'linear-gradient(135deg, #0A1628 0%, #1A3FD4 100%)',
            boxShadow: '0 4px 16px rgba(26, 63, 212, 0.2)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-white/60">Supplier</p>
            <p className="text-xs text-white/60">Best Price</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-white/60">{selectedSupplier}</p>
            <p className="text-xs text-green-400">Save ₦26,500 vs dealership</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.3 }}
          className="p-5 rounded-xl"
          style={{ 
            background: 'linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)',
            boxShadow: '0 8px 24px rgba(26, 63, 212, 0.3)',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/70">Total Repair Cost</p>
              <p className="text-2xl font-bold text-white">₦{totalCost.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/70">{parts.length} parts + labour</p>
              <p className="text-xs text-white/70">Instant quote</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
