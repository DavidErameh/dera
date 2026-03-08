"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";

const MapTilerMap = dynamic(() => import("@/components/ui/MapTilerMap"), {
  ssr: false,
});

const garages = [
  { id: 1, name: "Jide Auto Works", distance: "2.3 km", time: "25 min", rating: 4.8 },
  { id: 2, name: "Lekki Motors", distance: "4.1 km", time: "35 min", rating: 4.5 },
  { id: 3, name: "Victoria Island Garage", distance: "5.8 km", time: "40 min", rating: 4.6 },
];

export const StepDispatch = ({ onNext, triggerAccept }: { onNext: () => void; triggerAccept?: boolean }) => {
  const [showAccept, setShowAccept] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [acceptedGarage, setAcceptedGarage] = useState<typeof garages[0] | null>(null);
  const [showMap, setShowMap] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setShowAccept(true), 500);
    return () => clearTimeout(timer);
  }, [inView]);

  useEffect(() => {
    if (triggerAccept && !isAccepted) {
      setIsAccepted(true);
      setAcceptedGarage(garages[0]);
      setTimeout(() => setShowMap(true), 1000);
    }
  }, [triggerAccept, isAccepted]);

  const handleAccept = () => {
    setIsAccepted(true);
    setAcceptedGarage(garages[0]);
    setTimeout(() => setShowMap(true), 1000);
  };

  return (
    <div ref={ref} className="flex gap-6">
      {/* Left: Job Request Notification */}
      <div className="w-5/12 shrink-0">
        <div className="mb-4">
          <h4 className="font-display text-xl font-bold text-[#0A1628]">
            Partner Dispatch
          </h4>
          <p className="text-sm text-[#3D4A6B]">
            Nearest garages receive the job request
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isAccepted ? (
            <motion.div
              key="notification"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="rounded-2xl p-5 bg-white"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #1A3FD4, #4F8EF7)" }}
                  >
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#0A1628]/40 tracking-wider uppercase">
                      DERA PARTNER
                    </span>
                    <p className="text-[10px] text-[#6B7799]">now</p>
                  </div>
                </div>
                <p className="text-[15px] font-bold text-[#0A1628] leading-snug mb-1">
                  New Job Request
                </p>
                <p className="text-[13px] text-[#3D4A6B] leading-snug mb-4">
                  Benz C300 • Front Bumper • Lekki Phase 1
                </p>

                {showAccept && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleAccept}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-110 flex items-center justify-center gap-2"
                    style={{ background: "black" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Accept Job
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="p-4 rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))",
                border: "1px solid rgba(16, 185, 129, 0.2)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-5 h-5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700">Job Accepted</p>
                  <p className="text-xs text-[#3D4A6B]">{acceptedGarage?.name} • on the way</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: Garage List / Map */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {!showMap ? (
            <motion.div
              key="garages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-xs font-semibold text-[#6B7799] uppercase mb-3">
                Nearby Garages
              </p>
              <div className="space-y-2">
                {garages.map((garage, index) => (
                  <motion.div
                    key={garage.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: index === 0 && isAccepted ? 1 : 0.5, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-xl bg-white ${index === 0 && isAccepted ? 'border-2 border-green-500/30 shadow-md' : 'border border-gray-100'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${index === 0 && isAccepted ? 'bg-green-500' : 'bg-gray-100'}`}>
                          {index === 0 && isAccepted ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#6B7799" strokeWidth="2" className="w-4 h-4">
                              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#0A1628]">{garage.name}</p>
                          <p className="text-xs text-[#6B7799]">{garage.distance} • {garage.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-[#0A1628]">{garage.rating}</p>
                        <p className="text-[10px] text-[#6B7799]">rating</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <p className="text-xs font-semibold text-[#6B7799] uppercase mb-3">
                Live Tracking
              </p>
              <div className="rounded-2xl overflow-hidden" style={{ height: "300px" }}>
                <MapTilerMap 
                  center={[3.3792, 6.5244]} 
                  zoom={13}
                  markers={[
                    { lngLat: [3.3792, 6.5244], color: '#10B981', label: 'Garage' },
                    { lngLat: [3.3892, 6.5344], color: '#1A3FD4', label: 'Customer' },
                  ]}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
