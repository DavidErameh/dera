"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { ForensicsTimeline } from "@/components/demo/ForensicsTimeline";

const MapTilerMap = dynamic(() => import("@/components/ui/MapTilerMap"), {
  ssr: false,
});

const workflowSteps = [
  {
    number: "01",
    title: "Forensic Intake",
    body: "Every photo is validated before analysis. Dera runs automated forensic checks to confirm registered property, verify GPS and timestamp metadata against the incident report, and detect AI-generated or manipulated images.",
  },
  {
    number: "02",
    title: "Computer Vision Analysis",
    body: "YOLOv11 identifies the vehicle make and model, labels each damaged component individually, Front Bumper, Right Headlight, Hood, and assigns a severity classification.",
    image: "/DAMAGED AREA_20260304_004634_0000.png",
  },
  {
    number: "03",
    title: "Nigerian Market Costing",
    body: "Dera cross-references the damage report against a live parts price database calibrated to the Nigerian market: Ladipo rates, authorized dealer pricing, current labor costs.",
  },
  {
    number: "04",
    title: "The Confidence Decision",
    body: "If the AI confidence score is above 85 percent and the estimate is below ₦250,000, the claim is auto-approved. If not, Dera escalates to a human adjuster with a case file.",
  },
  {
    number: "05",
    title: "Partner Dispatch",
    body: "The three closest authorized garages receive a job request via the Partner API. The first to accept gets the assignment. Your customer knows their garage within seconds.",
  },
];

const StepSubSection = ({
  step,
  index,
}: {
  step: (typeof workflowSteps)[0];
  index: number;
}) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const isEven = index % 2 === 0;

  // Step 02 Special Visual: Computer Vision Analysis
  const renderStep02Visual = () => {
    // Damage zone polygon (calibrated to the dent around the fog light area)
    const damageZonePath =
      "M 48,30 C 55,26 72,25 82,33 C 88,40 85,56 80,66 C 74,74 58,77 50,70 C 43,63 42,40 48,30 Z";

    // Grid lines — horizontal lines that curve inward near the damage zone
    const horizontalLines = [
      // y=15 — above damage, straight
      "M 0,15 L 100,15",
      "M 0,25 L 100,25",
      "M 0,35 L 100,35",
      "M 0,45 L 100,45",
      "M 0,55 L 100,55",
      "M 0,65 L 100,65",
      "M 0,75 L 100,75",
      // y=85 — below damage, straight
      "M 0,85 L 100,85",
    ];

    // Vertical lines that curve near the damage zone
    const verticalLines = [
      "M 10,0 L 10,100",
      "M 20,0 L 20,100",
      "M 30,0 L 30,100",
      "M 40,0 L 40,100",
      "M 50,0 L 50,100",
      "M 60,0 L 60,100",
      "M 70,0 L 70,100",
      "M 80,0 L 80,100",
      "M 90,0 L 90,100",
    ];

    return (
      <div className="relative w-full aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-visible">
        {/* Base image */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
          <img
            src="/DAMAGED AREA_20260304_004634_0000.png"
            alt="Wrecked front bumper"
            className="w-full h-full object-cover"
          />

          {/* Curved Grid Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Horizontal curved lines */}
            {horizontalLines.map((d, i) => (
              <motion.path
                key={`h-${i}`}
                d={d}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.06, duration: 0.6 }}
              />
            ))}
            {/* Vertical curved lines */}
            {verticalLines.map((d, i) => (
              <motion.path
                key={`v-${i}`}
                d={d}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.06, duration: 0.6 }}
              />
            ))}
          </svg>

          {/* Smooth Blue Scanning Reflection (Optimized) */}
          <motion.div
            className="absolute left-0 right-0 pointer-events-none z-10"
            style={{
              height: "180px",
              top: "-180px", // Start above the container
              background:
                "linear-gradient(to bottom, transparent, rgba(147, 197, 253, 0.4) 50%, transparent)",
              willChange: "transform",
            }}
            animate={{ y: ["0%", "350%"] }} // Translate relative to its own height
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Damage Label */}
          <motion.div
            className="absolute pointer-events-none z-10"
            style={{ top: "38%", left: "42%" }}
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.2, duration: 0.4 }}
          >
            <div
              className="px-2.5 py-1 rounded-md text-[9px] font-bold text-white whitespace-nowrap"
              style={{
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
              }}
            >
              Front Bumper — Moderate
            </div>
          </motion.div>

          {/* Pulsing Camera Button — bottom center */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1, duration: 0.5, type: "spring" }}
          >
            {/* Expanding pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "rgba(26, 63, 212, 0.2)" }}
              animate={{ scale: [1, 1.6, 1.6], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            {/* Button */}
            <div
              className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
              style={{
                background: "linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* iPhone style shutter button icon */}
                <div className="w-12 h-12 rounded-full border-[3px] border-white flex items-center justify-center bg-transparent">
                  <div className="w-9 h-9 bg-white rounded-full"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Floating Analysis Card (glassmorphic notification, centered near top) */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ left: "50%", top: "12%", zIndex: 20 }}
          initial={{ opacity: 0, x: "-50%", y: "-60%", scale: 0.95 }}
          animate={inView ? { opacity: 1, x: "-50%", y: "0%", scale: 1 } : {}}
          transition={{ delay: 2.5, duration: 0.7, ease: [0, 0, 0.2, 1] }}
        >
          <div
            className="rounded-2xl px-6 py-6 text-left w-[290px] md:min-w-[320px]"
            style={{
              background: "rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              boxShadow:
                "0 16px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 overflow-hidden flex items-center justify-center">
                <img
                  src="/logos/6458c1a3-4fd2-4902-87ef-8ebf7420c902_removalai_preview.png"
                  alt="Dera"
                  className="w-full h-full object-contain"
                  style={{ filter: "brightness(0)" }}
                />
              </div>
              <p className="text-[17px] font-semibold text-[#0A1628] leading-none mt-0.5">
                Benz C300
              </p>
            </div>

            <div className="text-[15px] text-[#3D4A6B] leading-relaxed space-y-1.5 ml-11">
              <p>
                <span className="font-medium text-[#0A1628]">Component:</span>{" "}
                Front Bumper
              </p>
              <p>
                <span className="font-medium text-[#0A1628]">Severity:</span>{" "}
                <span className="text-amber-500 font-bold tracking-wide">
                  Moderate
                </span>
              </p>
              <p>
                <span className="font-medium text-[#0A1628]">Confidence:</span>{" "}
                <span className="text-emerald-500 font-bold tracking-wide">
                  94.2%
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // Step 03 Special Visual: Nigerian Market Costing
  const renderStep03Visual = () => {
    const suppliers = [
      {
        name: "AutofactorNG",
        rating: 4.4,
        reviews: 59,
        isOpen: true,
        price: "₦145,000",
        isBest: false,
      },
      {
        name: "Ladipo Auto Market",
        rating: 4.1,
        reviews: 539,
        isOpen: true,
        price: "₦152,000",
        isBest: false,
      },
      {
        name: "Partste",
        rating: 5.0,
        reviews: 72,
        isOpen: true,
        price: "₦128,500",
        isBest: true,
      },
      {
        name: "Ugo Mech Auto Spare Parts Nig.",
        rating: 3.9,
        reviews: 28,
        isOpen: true,
        price: "₦141,500",
        isBest: false,
      },
      {
        name: "MyParts Nigeria",
        rating: 4.2,
        reviews: 41,
        isOpen: true,
        price: "₦138,000",
        isBest: false,
      },
    ];

    // Render golden stars for a rating value
    const renderStars = (rating: number) => {
      const fullStars = Math.floor(rating);
      const hasHalf = rating % 1 >= 0.3;
      return (
        <span className="flex items-center gap-[1px]">
          {Array.from({ length: 5 }, (_, i) => (
            <svg key={i} viewBox="0 0 20 20" className="w-[14px] h-[14px]">
              <path
                d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.27 5.06 16.7 6 11.21l-4-3.9 5.53-.8L10 1.5z"
                fill={
                  i < fullStars
                    ? "#F59E0B"
                    : i === fullStars && hasHalf
                      ? "url(#halfGold)"
                      : "#DDE2F0"
                }
                stroke="none"
              />
              {i === fullStars && hasHalf && (
                <defs>
                  <linearGradient id="halfGold">
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#DDE2F0" />
                  </linearGradient>
                </defs>
              )}
            </svg>
          ))}
        </span>
      );
    };

    // Supplier card component
    const SupplierCard = ({
      supplier,
      delay,
    }: {
      supplier: (typeof suppliers)[0];
      delay: number;
    }) => (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: supplier.isBest ? 1 : 0.5, y: 0 } : {}}
        transition={{ delay, duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className={supplier.isBest ? "transform scale-[1.03]" : ""}
      >
        <div
          className="rounded-2xl bg-white overflow-hidden"
          style={{
            border: supplier.isBest
              ? "1.5px solid rgba(79, 142, 247, 0.4)"
              : "1px solid rgba(0, 0, 0, 0.06)",
            boxShadow: supplier.isBest
              ? "0 20px 50px rgba(26, 63, 212, 0.2), 0 8px 16px rgba(26, 63, 212, 0.12), inset 0 0 0 1px rgba(79, 142, 247, 0.1)"
              : "0 4px 16px rgba(0, 0, 0, 0.04)",
          }}
        >
          {/* Blue accent bar for best deal */}
          {supplier.isBest && (
            <div
              className="h-[3px] w-full"
              style={{
                background: "linear-gradient(90deg, #4F8EF7 0%, #1A3FD4 100%)",
              }}
            />
          )}

          <div className="px-6 py-5">
            {/* Row 1: Name + Open/Closed + Best Deal Badge */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <p className="text-[15px] font-bold text-[#0A1628] leading-none">
                  {supplier.name}
                </p>
                {/* Blue verification checkmark */}
                <div
                  className="w-[14px] h-[14px] rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(79, 142, 247, 0.95) 0%, rgba(26, 63, 212, 0.95) 100%)",
                    boxShadow: "0 1px 4px rgba(26, 63, 212, 0.25)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-[8px] h-[8px]"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-[3px] rounded-full leading-none"
                  style={{
                    background: supplier.isOpen
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(239, 68, 68, 0.08)",
                    color: supplier.isOpen ? "#059669" : "#DC2626",
                  }}
                >
                  {supplier.isOpen ? "Open" : "Closed"}
                </span>
              </div>
              {supplier.isBest && (
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.08em] px-2.5 py-[3px] rounded-full leading-none"
                  style={{
                    background:
                      "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    color: "white",
                  }}
                >
                  BEST DEAL
                </span>
              )}
            </div>

            {/* Row 2: Star Rating */}
            <div className="flex items-center gap-2 mb-3">
              {renderStars(supplier.rating)}
              <span className="text-[13px] font-semibold text-[#0A1628]">
                {supplier.rating.toFixed(1)}
              </span>
              <span className="text-[11px] text-[#6B7799]">
                ({supplier.reviews})
              </span>
            </div>

            {/* Row 3: Price */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-medium text-[#6B7799] mb-1">
                  Front Bumper — C300
                </p>
                <p
                  className={`text-xl font-bold leading-none ${supplier.isBest ? "text-[#1A3FD4]" : "text-[#0A1628]"}`}
                >
                  {supplier.price}
                </p>
              </div>
              {supplier.isBest && (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(26, 63, 212, 0.08)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1A3FD4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );

    // Layout: 2 top, 1 center (best deal), 2 bottom
    const topRow = [suppliers[0], suppliers[1]];
    const bestDeal = suppliers[2];
    const bottomRow = [suppliers[3], suppliers[4]];

    return (
      <div className="w-full flex flex-col items-center gap-4">
        {/* Top row: 2 darkened cards */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
          {topRow.map((s, i) => (
            <SupplierCard key={s.name} supplier={s} delay={0.8 + i * 0.12} />
          ))}
        </div>

        {/* Center row: Best deal card */}
        <div className="w-full max-w-sm">
          <SupplierCard supplier={bestDeal} delay={1.1} />
        </div>

        {/* Bottom row: 2 darkened cards */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
          {bottomRow.map((s, i) => (
            <SupplierCard key={s.name} supplier={s} delay={1.3 + i * 0.12} />
          ))}
        </div>
      </div>
    );
  };

  // Step 04 Special Visual: The Confidence Decision (Two Assessment Cards)
  const renderStep04Visual = () => {
    const claims = [
      {
        vehicle: "Benz C300",
        component: "Front Bumper",
        severity: "Moderate",
        confidence: 94.2,
        estimate: "₦184,500",
        outcome: "Auto-Approved",
        outcomeDesc: "Meets threshold. Settlement queued.",
        isApproved: true,
      },
      {
        vehicle: "Mack Delivery Truck",
        component: "Full Chassis",
        severity: "Critical",
        confidence: 68.4,
        estimate: "₦1,250,000",
        outcome: "Escalated",
        outcomeDesc: "Assigned to adjuster Folake A.",
        isApproved: false,
      },
    ];

    return (
      <div className="w-full flex flex-col items-center gap-5 max-w-2xl mx-auto">
        {claims.map((claim, i) => (
          <motion.div
            key={claim.vehicle}
            initial={{ opacity: 0, y: 16 }}
            animate={
              inView ? { opacity: claim.isApproved ? 1 : 0.7, y: 0 } : {}
            }
            transition={{
              delay: 0.6 + i * 0.2,
              duration: 0.5,
              ease: [0, 0, 0.2, 1],
            }}
            className="w-full"
          >
            <div
              className="rounded-2xl bg-white overflow-hidden"
              style={{
                border: claim.isApproved
                  ? "1.5px solid rgba(79, 142, 247, 0.35)"
                  : "1px solid rgba(0, 0, 0, 0.06)",
                boxShadow: claim.isApproved
                  ? "0 12px 32px rgba(26, 63, 212, 0.12), 0 4px 12px rgba(26, 63, 212, 0.08)"
                  : "0 4px 16px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="px-7 py-6">
                {/* Row 1: Vehicle + Outcome Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <p className="text-[16px] font-bold text-[#0A1628] leading-none">
                      {claim.vehicle}
                    </p>
                    <span className="text-[11px] text-[#6B7799] font-medium">
                      {claim.component}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-[7px] h-[7px] rounded-full"
                      style={{
                        background: claim.isApproved ? "#10B981" : "#F59E0B",
                      }}
                    />
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{
                        color: claim.isApproved ? "#059669" : "#D97706",
                      }}
                    >
                      {claim.outcome}
                    </span>
                  </div>
                </div>

                {/* Row 2: Stats row */}
                <div className="flex items-center gap-8 mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-medium text-[#6B7799] mb-1">
                      Confidence
                    </p>
                    <p className="text-[20px] font-bold text-[#0A1628] leading-none">
                      {claim.confidence}%
                    </p>
                  </div>
                  <div className="w-[1px] h-8 bg-[#E8EEFF]" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-medium text-[#6B7799] mb-1">
                      Estimate
                    </p>
                    <p className="text-[20px] font-bold text-[#0A1628] leading-none">
                      {claim.estimate}
                    </p>
                  </div>
                  <div className="w-[1px] h-8 bg-[#E8EEFF]" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-medium text-[#6B7799] mb-1">
                      Severity
                    </p>
                    <p
                      className={`text-[20px] font-bold leading-none ${claim.severity === "Moderate" ? "text-[#E2A816]" : "text-[#E25C5C]"}`}
                    >
                      {claim.severity}
                    </p>
                  </div>
                </div>

                {/* Row 3: Outcome description */}
                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-xl"
                  style={{ background: "#F8F9FC" }}
                >
                  {claim.isApproved ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 shrink-0"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#D97706"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 shrink-0"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                  <p className="text-[13px] text-[#2D3A5C] font-semibold">
                    {claim.outcomeDesc}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Step 05 Special Visual: Partner Dispatch (Stacked iOS Notification Style)
  const renderStep05Visual = () => {
    return (
      <div className="w-full flex flex-col items-center gap-4 max-w-md mx-auto">
        {/* iOS Notification Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
          className="w-full"
        >
          <div
            className="p-5 rounded-[20px] bg-white"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden"
              >
                <img
                  src="/logos/6458c1a3-4fd2-4902-87ef-8ebf7420c902_removalai_preview.png"
                  alt="Dera"
                  className="w-full h-full object-contain"
                  style={{ filter: "brightness(0)" }}
                />
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
            <p className="text-[13px] text-[#3D4A6B] leading-snug">
              Benz C300 • Front Bumper • Lekki Phase 1
            </p>
          </div>
        </motion.div>

        {/* Job Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5, ease: [0, 0, 0.2, 1] }}
          className="w-full"
        >
          <div
            className="rounded-[20px] bg-white overflow-hidden"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-5">
                <p className="text-[18px] font-bold text-[#0A1628]">
                  Benz C300
                </p>
                <span className="text-[10px] font-bold text-[#059669] bg-[rgba(16,185,129,0.1)] px-3 py-1 rounded-full tracking-wider">
                  APPROVED
                </span>
              </div>
              <div className="flex items-center gap-8 mb-5">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-medium text-[#6B7799] mb-1">
                    Component
                  </p>
                  <p className="text-[16px] font-bold text-[#0A1628]">
                    Front Bumper
                  </p>
                </div>
                <div className="w-[1px] h-8 bg-[#E8EEFF]" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-medium text-[#6B7799] mb-1">
                    Location
                  </p>
                  <p className="text-[16px] font-bold text-[#0A1628]">
                    Lekki Phase 1
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-8 pt-5"
                style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-medium text-[#6B7799] mb-1">
                    Payout
                  </p>
                  <p className="text-[22px] font-bold text-[#0A1628]">
                    ₦184,500
                  </p>
                </div>
                <div className="w-[1px] h-8 bg-[#E8EEFF]" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-medium text-[#6B7799] mb-1">
                    ETA
                  </p>
                  <p className="text-[22px] font-bold text-[#0A1628]">25 min</p>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <div
                className="flex-1 py-3.5 rounded-xl text-center"
                style={{
                  background: "linear-gradient(to bottom, #2A2A2A, #000)",
                }}
              >
                <span className="text-[13px] text-white font-bold">
                  Accept Job
                </span>
              </div>
              <div className="flex-1 py-3.5 rounded-xl bg-[#F0F1F5] text-center">
                <span className="text-[13px] text-[#0A1628] font-bold">
                  Decline
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* iOS stack shadow layers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="w-[92%] h-3 rounded-b-2xl mx-auto -mt-5"
          style={{
            background: "rgba(0, 0, 0, 0.03)",
            border: "1px solid rgba(0, 0, 0, 0.03)",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="w-[84%] h-2 rounded-b-2xl mx-auto -mt-4"
          style={{ background: "rgba(0, 0, 0, 0.015)" }}
        />
      </div>
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0, 0, 0.2, 1] }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center py-12 md:py-16 ${
        index !== 0 ? "border-t border-[#E8EEFF]" : ""
      }`}
    >
      {/* Content side: number + title + description */}
      <div className={isEven ? "md:order-1" : "md:order-2"}>
        <div className="flex items-baseline gap-4 mb-4">
          <span className="font-headline text-6xl md:text-8xl font-bold text-blue-400/50 drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)] select-none leading-none">
            {step.number}
          </span>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-400/30 via-blue-400/15 to-transparent backdrop-blur-sm" />
        </div>
        <h3 className="font-headline text-3xl md:text-4xl font-bold text-[#0A1628] mb-5">
          {step.title}
        </h3>
        <p className="text-lg md:text-xl text-[#3D4A6B] leading-relaxed">
          {step.body}
        </p>
      </div>

      <div className={isEven ? "md:order-2" : "md:order-1"}>
        {step.number === "01" ? (
          <div className="max-w-lg mx-auto w-full">
            <ForensicsTimeline activeNodeCount={3} inView={inView} />
          </div>
        ) : step.number === "02" ? (
          <div className="max-w-lg mx-auto w-full">{renderStep02Visual()}</div>
        ) : step.number === "03" ? (
          <div className="max-w-2xl mx-auto w-full">{renderStep03Visual()}</div>
        ) : step.number === "04" ? (
          <div className="max-w-xl mx-auto w-full">{renderStep04Visual()}</div>
        ) : step.number === "05" ? (
          <div className="max-w-xl mx-auto w-full">{renderStep05Visual()}</div>
        ) : step.image ? (
          <div className="max-w-lg mx-auto w-full aspect-[3/4] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] relative overflow-visible">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover"
              />
              {/* White grid overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Scan glow — top to bottom */}
              <motion.div
                className="absolute left-0 w-full pointer-events-none"
                style={{
                  height: "120px",
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.08) 80%, transparent 100%)",
                  boxShadow: "0 0 60px 20px rgba(255,255,255,0.15)",
                }}
                animate={{ top: ["-120px", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              {/* Scan glow — bottom to top (staggered) */}
              <motion.div
                className="absolute left-0 w-full pointer-events-none"
                style={{
                  height: "120px",
                  background:
                    "linear-gradient(to top, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.06) 80%, transparent 100%)",
                  boxShadow: "0 0 40px 10px rgba(255,255,255,0.1)",
                }}
                animate={{ top: ["100%", "-120px"] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.5,
                }}
              />
            </div>

            {/* ─── Analysis card (floating outside top-left) ─── */}
            <motion.div
              className="absolute pointer-events-none -left-4 md:-left-12 lg:-left-[40%]"
              style={{ top: "8%", zIndex: 20 }}
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 2, duration: 0.7, ease: [0, 0, 0.2, 1] }}
            >
              <div
                className="rounded-2xl px-6 py-6 text-left w-[290px] md:min-w-[320px]"
                style={{
                  background: "rgba(255, 255, 255, 0.75)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  boxShadow:
                    "0 16px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-lg shadow-[#10B981]/30">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="text-[17px] font-semibold text-[#0A1628] leading-none mt-0.5">
                    Benz C300 Analysis
                  </p>
                </div>

                <div className="text-[15px] text-[#3D4A6B] leading-relaxed space-y-1.5 ml-11">
                  <p>
                    <span className="font-medium text-[#0A1628]">
                      Component:
                    </span>{" "}
                    Front Bumper
                  </p>
                  <p>
                    <span className="font-medium text-[#0A1628]">
                      Severity:
                    </span>{" "}
                    Moderate
                  </p>
                  <p>
                    <span className="font-medium text-[#0A1628]">
                      Confidence:
                    </span>{" "}
                    94.2%
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-[#DDE2F0] bg-[#F8F9FC] flex items-center justify-center">
            <span className="text-sm text-[#6B7799] font-medium">
              Visual — Step {step.number}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const WorkflowSection = () => {
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section
      id="workflow"
      className="relative py-16 md:py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="mb-8"
        >
          <h2 className="font-headline text-6xl sm:text-7xl md:text-8xl font-bold text-[#0A1628] leading-[1.05] mb-4">
            <span style={{ fontFamily: "var(--font-garamond)", fontSize: "1.2em" }} className="text-[#4F8EF7]">The</span><span className="mr-[-12px]"> </span>Workflow
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-[#3D4A6B]">
            Six Steps. Zero Phone Calls.
          </p>
        </motion.div>

        {/* Step Sub-Sections */}
        <div>
          {workflowSteps.map((step, i) => (
            <StepSubSection key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
