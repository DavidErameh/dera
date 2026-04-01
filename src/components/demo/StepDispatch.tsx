"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";

const garages = [
  {
    id: 1,
    name: "Jide Auto Works",
    distance: "2.3 km",
    time: "25 min",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Lekki Motors",
    distance: "4.1 km",
    time: "35 min",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Victoria Island Garage",
    distance: "5.8 km",
    time: "40 min",
    rating: 4.6,
  },
];

export const StepDispatch = ({
  onNext,
  triggerAccept,
}: {
  onNext: () => void;
  triggerAccept?: boolean;
}) => {
  const [showAccept, setShowAccept] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [acceptedGarage, setAcceptedGarage] = useState<
    (typeof garages)[0] | null
  >(null);
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
      const timer = setTimeout(() => setShowMap(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [triggerAccept, isAccepted]);

  const handleAccept = () => {
    setIsAccepted(true);
    setAcceptedGarage(garages[0]);
    setTimeout(() => setShowMap(true), 1000);
  };

  return (
    <div ref={ref} className="flex flex-col md:flex-row gap-4 md:gap-6">
      {/* Left: Job Request Notification - Order 2 on mobile */}
      <div className="md:w-5/12 shrink-0 order-2 md:order-1">
        <div className="mb-3 md:mb-4">
          <h4
            className="text-base md:text-xl font-bold text-[#0A1628] mb-1"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            Partner Dispatch
          </h4>
          <p className="text-xs md:text-sm text-[#3D4A6B]">
            Nearest garages receive the job
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
                className="rounded-xl md:rounded-2xl p-4 md:p-5"
                style={{
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 4px 16px rgba(10, 22, 40, 0.08)",
                }}
              >
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-6 h-6 md:w-8 md:h-8 overflow-hidden flex items-center justify-center">
                    <img
                      src="/logos/fc2cd7c8-3df2-4dff-9558-cecbf5a1abce_removalai_preview.svg"
                      alt="Dera"
                      className="w-full h-full object-contain"
                      style={{ filter: "brightness(0)" }}
                    />
                  </div>
                  <div>
                    <span className="text-[8px] md:text-[10px] font-bold text-[#0A1628]/50 tracking-wider uppercase">
                      DERA PARTNER
                    </span>
                    <p className="text-[8px] md:text-[10px] text-[#6B7799]">
                      now
                    </p>
                  </div>
                </div>
                <p className="text-sm md:text-[15px] font-bold text-[#0A1628] leading-snug mb-1">
                  New Job Request
                </p>
                <p className="text-xs md:text-[13px] text-[#3D4A6B] leading-snug mb-3 md:mb-4">
                  Benz C300 • Front Bumper • Lekki Phase 1
                </p>

                {showAccept && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleAccept}
                    className="w-full py-2.5 md:py-3.5 rounded-lg font-semibold text-xs md:text-sm text-white transition-all hover:brightness-125 flex items-center justify-center gap-2"
                    style={{
                      background:
                        "linear-gradient(to bottom, #2A2A2A 0%, #000000 100%)",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-3 h-3 md:w-4 md:h-4"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
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
              className="p-3 md:p-4 rounded-lg md:rounded-xl"
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
              }}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    className="w-3 h-3 md:w-4 md:h-4"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-bold text-[#059669]">
                    Job Accepted
                  </p>
                  <p className="text-[10px] md:text-xs text-[#3D4A6B]">
                    {acceptedGarage?.name} • on the way
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: Garage List / Map - Order 1 on mobile */}
      <div className="flex-1 order-1 md:order-2">
        <AnimatePresence mode="wait">
          {!showMap ? (
            <motion.div
              key="garages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p
                className="text-[10px] md:text-xs font-semibold text-[#6B7799] uppercase mb-2 md:mb-3"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                Nearby Garages
              </p>
              <div className="space-y-2 md:space-y-3">
                {garages.map((garage, index) => (
                  <motion.div
                    key={garage.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: index === 0 && isAccepted ? 1 : 0.6,
                      y: 0,
                    }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 md:p-4 rounded-lg md:rounded-xl"
                    style={{
                      background: "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(12px)",
                      border:
                        index === 0 && isAccepted
                          ? "1.5px solid rgba(16, 185, 129, 0.3)"
                          : "1px solid rgba(221, 226, 240, 0.5)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center"
                          style={{
                            background:
                              index === 0 && isAccepted
                                ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                                : "linear-gradient(135deg, #F0F3FF 0%, #E8EEFF 100%)",
                          }}
                        >
                          {index === 0 && isAccepted ? (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                              className="w-3 h-3 md:w-4 md:h-4"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#6B7799"
                              strokeWidth="2"
                              className="w-3 h-3 md:w-4 md:h-4"
                            >
                              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-xs md:text-sm font-bold text-[#0A1628]">
                            {garage.name}
                          </p>
                          <p className="text-[10px] md:text-xs text-[#6B7799]">
                            {garage.distance} • {garage.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs md:text-sm font-bold text-[#0A1628]">
                          {garage.rating}
                        </p>
                        <p className="text-[8px] md:text-[10px] text-[#6B7799]">
                          rating
                        </p>
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
              <p
                className="text-[10px] md:text-xs font-semibold text-[#6B7799] uppercase mb-2 md:mb-3"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                Live Tracking
              </p>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl md:rounded-2xl overflow-hidden flex items-center justify-center"
                style={{
                  height: "200px md:300px",
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 4px 16px rgba(26, 63, 212, 0.15)",
                }}
              >
                <div className="text-center px-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                    className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-xl md:rounded-2xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      className="w-6 h-6 md:w-8 md:h-8"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </motion.div>
                  <p className="text-sm md:text-base font-bold text-[#0A1628] mb-1">
                    Live Tracking
                  </p>
                  <p className="text-xs md:text-sm text-[#3D4A6B]">
                    Lekki Phase 1 → Jide Auto Works
                  </p>
                  <p className="text-[10px] md:text-xs text-[#6B7799] mt-1 md:mt-2">
                    ETA: 25 minutes
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
