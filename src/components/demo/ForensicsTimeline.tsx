/* Reusable forensic intake timeline used in Workflow 01 and Try now Step 1 */
"use client";

import React from "react";
import { motion } from "motion/react";

type IconComponentProps = {
  className?: string;
  strokeWidth?: number;
};

const UploadCloudIcon = ({ className, strokeWidth = 2.5 }: IconComponentProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
    <path d="M12 12v9"></path>
    <path d="m16 16-4-4-4 4"></path>
  </svg>
);

const FileCheckIcon = ({ className, strokeWidth = 2.5 }: IconComponentProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <path d="m9 15 2 2 4-4"></path>
  </svg>
);

const MapPinIcon = ({ className, strokeWidth = 2.5 }: IconComponentProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const BotIcon = ({ className, strokeWidth = 2.5 }: IconComponentProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 8V4H8"></path>
    <rect width="16" height="12" x="4" y="8" rx="2"></rect>
    <path d="M2 14h2"></path>
    <path d="M20 14h2"></path>
    <path d="M15 13v2"></path>
    <path d="M9 13v2"></path>
  </svg>
);

const ShieldCheckIcon = ({ className, strokeWidth = 2.5 }: IconComponentProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.89 0 5.25 1 7 2a1 1 0 0 1 1 1v7z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

const checks = [
  {
    id: "upload",
    label: "Image Uploaded",
    icon: UploadCloudIcon,
  },
  {
    id: "property",
    label: "Confirming Registered Property",
    icon: FileCheckIcon,
  },
  {
    id: "gps",
    label: "Validating GPS & Timestamp",
    icon: MapPinIcon,
  },
  {
    id: "ai",
    label: "Running AI Forgery Detection",
    icon: BotIcon,
  },
  {
    id: "cleared",
    label: "Forensics Cleared",
    icon: ShieldCheckIcon,
  },
] as const;

type ForensicsTimelineProps = {
  /** How many nodes should be in the “active” state (0–5). */
  activeNodeCount: number;
  /** Whether animations should play (typically tied to useInView). */
  inView?: boolean;
  /** Duration for the vertical line animation in milliseconds. */
  animationDurationMs?: number;
  className?: string;
};

export const ForensicsTimeline: React.FC<ForensicsTimelineProps> = ({
  activeNodeCount,
  inView = true,
  animationDurationMs = 2000,
  className = "",
}) => {
  const totalNodes = checks.length;
  const clampedActive = Math.max(0, Math.min(activeNodeCount, totalNodes));

  // Map active nodes to a 0–1 progress for the vertical line, matching the original
  // behavior where 3 active nodes on 5 total gave 0.5.
  const stopProgress =
    clampedActive <= 0 ? 0 : (clampedActive - 1) / Math.max(1, totalNodes - 1);

  return (
    <div
      className={`relative w-full max-w-[700px] mx-auto bg-[#F8F9FC] border border-[#E8EEFF] rounded-2xl flex items-center p-8 px-12 overflow-hidden shadow-sm ${className}`}
    >
      {/* Container for the timeline */}
      <div className="relative w-full ml-4 flex flex-col gap-8">
        {/* Static background line */}
        <div className="absolute left-[15px] top-[18px] bottom-[18px] w-1.5 bg-[#DDE2F0] rounded-full" />

        {/* Animated liquid glass blue line */}
        <motion.div
          className="absolute left-[15px] top-[18px] bottom-[18px] w-1.5 rounded-full origin-top z-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(79, 142, 247, 0.95) 0%, rgba(26, 63, 212, 0.95) 100%)",
            backdropFilter: "blur(12px)",
            boxShadow: "inset 0 0 8px rgba(255, 255, 255, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: stopProgress } : { scaleY: 0 }}
          transition={{ duration: animationDurationMs / 1000, ease: "easeOut" }}
        />

        {/* Nodes and labels */}
        {checks.map((check, index) => {
          const targetLineProgress = index / Math.max(1, totalNodes - 1);
          const willAnimate = targetLineProgress <= stopProgress && clampedActive > 0;

          // Preserve the original feel: distribute delays along the line progress.
          const delaySeconds =
            stopProgress > 0 && willAnimate
              ? (targetLineProgress / stopProgress) * (animationDurationMs / 1000)
              : 0;

          const IconComponent = check.icon;

          return (
            <div
              key={check.id}
              className="relative flex items-center gap-6 z-10 w-full"
            >
              {/* Base node */}
              <div className="relative flex items-center justify-center w-9 h-9 shrink-0">
                <div className="absolute w-7 h-7 rounded-full bg-white border-[2.5px] border-[#DDE2F0] flex items-center justify-center shadow-sm">
                  <IconComponent
                    className="w-3.5 h-3.5 text-[#8C98B2]"
                    strokeWidth={2.5}
                  />
                </div>

                {/* Active “liquid glass” node */}
                {willAnimate && (
                  <motion.div
                    className="absolute w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(79, 142, 247, 0.95) 0%, rgba(26, 63, 212, 0.95) 100%)",
                      backdropFilter: "blur(12px)",
                      boxShadow:
                        "0 8px 16px rgba(26, 63, 212, 0.25), inset 0 0 10px rgba(255, 255, 255, 0.4)",
                      border: "1px solid rgba(255, 255, 255, 0.4)",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{
                      delay: delaySeconds,
                      duration: 0.4,
                      type: "spring",
                    }}
                  >
                    <IconComponent
                      className="w-5 h-5 text-white"
                      strokeWidth={2.5}
                    />
                  </motion.div>
                )}
              </div>

              {/* Label */}
              <div className="flex-1">
                <motion.p
                  className="text-[14px] font-semibold tracking-wide leading-tight"
                  initial={{ color: "#8C98B2" }}
                  animate={
                    inView && willAnimate ? { color: "#0A1628" } : { color: "#8C98B2" }
                  }
                  transition={{ delay: delaySeconds, duration: 0.3 }}
                >
                  {check.label}
                </motion.p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

