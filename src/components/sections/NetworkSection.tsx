"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

const centerX = 200;
const centerY = 180;

const leftNodes = [
  { id: 1, label: 'Logistics', y: 90 },
  { id: 2, label: 'Garages', y: 170 },
  { id: 3, label: 'Market', y: 250 },
];

const rightX = 340;
const topNodeY = 40;

export const NetworkSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="network" className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-3xl sm:text-5xl md:text-7xl font-bold text-[#0A1628] leading-[1.05] mb-4">
            Everything Connected.<br />
            <span className="text-[#4F8EF7]">Nothing Manual.</span>
          </h2>
          <p className="text-base md:text-xl text-[#3D4A6B] max-w-2xl mx-auto">
            Dera sits at the centre of your claims ecosystem, routing data, decisions, and dispatch automatically between every party in the process.
          </p>
        </motion.div>

        {/* Node Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-2xl mx-auto aspect-square md:aspect-[4/3]"
        >
          <svg
            viewBox="0 0 400 320"
            className="w-full h-full"
            style={{ overflow: 'visible' }}
          >
            {/* Connection lines from left nodes to center - Noodle style */}
            {leftNodes.map((node, i) => {
              const controlOffset = (i - 1) * 40;
              return (
                <g key={`line-${node.id}`}>
                  {/* Noodle curve path */}
                  <path
                    d={`M 100 ${node.y} C ${140 + controlOffset} ${node.y}, ${centerX - 80} ${centerY}, ${centerX - 48} ${centerY}`}
                    stroke="rgba(79, 142, 247, 0.3)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Animated pulse */}
                  <motion.circle
                    r="4"
                    fill="#4F8EF7"
                    initial={{ offsetDistance: '0%' }}
                    animate={{ offsetDistance: '100%' }}
                    style={{
                      offsetPath: `path("M 100 ${node.y} C ${140 + controlOffset} ${node.y}, ${centerX - 80} ${centerY}, ${centerX - 48} ${centerY}")`,
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.2,
                    }}
                  />
                </g>
              );
            })}

            {/* Left Nodes - White rectangular cards - stacked vertically */}
            {leftNodes.map((node, i) => (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              >
                {/* Card shadow */}
                <rect
                  x={20}
                  y={node.y - 22}
                  width={80}
                  height={44}
                  rx={10}
                  fill="rgba(0, 0, 0, 0.1)"
                  style={{ filter: 'blur(4px)' }}
                />
                {/* Card body */}
                <rect
                  x={20}
                  y={node.y - 22}
                  width={80}
                  height={44}
                  rx={10}
                  fill="white"
                  stroke="rgba(79, 142, 247, 0.2)"
                  strokeWidth="1"
                />
                {/* Card label */}
                <text
                  x={60}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill="#3D4A6B"
                  fontSize="12"
                  fontWeight="600"
                >
                  {node.label}
                </text>
              </motion.g>
            ))}

            {/* Top node - Insurers */}
            <motion.g
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              {/* Card shadow */}
              <rect
                x={centerX - 40}
                y={topNodeY - 22}
                width={80}
                height={44}
                rx={10}
                fill="rgba(0, 0, 0, 0.1)"
                style={{ filter: 'blur(4px)' }}
              />
              {/* Card body */}
              <rect
                x={centerX - 40}
                y={topNodeY - 22}
                width={80}
                height={44}
                rx={10}
                fill="white"
                stroke="rgba(79, 142, 247, 0.2)"
                strokeWidth="1"
              />
              {/* Card label */}
              <text
                x={centerX}
                y={topNodeY + 5}
                textAnchor="middle"
                fill="#3D4A6B"
                fontSize="12"
                fontWeight="600"
              >
                Insurers
              </text>
            </motion.g>

            {/* Connection line from top Insurers node to center - Noodle style */}
            <path
              d={`M ${centerX} ${topNodeY + 22} C ${centerX} ${topNodeY + 70}, ${centerX} ${
                centerY - 80
              }, ${centerX} ${centerY - 48}`}
              stroke="rgba(79, 142, 247, 0.3)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <motion.circle
              r="4"
              fill="#4F8EF7"
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              style={{
                offsetPath: `path("M ${centerX} ${topNodeY + 22} C ${centerX} ${
                  topNodeY + 70
                }, ${centerX} ${centerY - 80}, ${centerX} ${centerY - 48}")`,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Center Dera - Square icon */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Shadow */}
              <rect
                x={centerX - 48}
                y={centerY - 48}
                width={96}
                height={96}
                rx={16}
                fill="rgba(79, 142, 247, 0.25)"
                style={{ filter: 'blur(12px)' }}
              />
              
              {/* Main square */}
              <rect
                x={centerX - 48}
                y={centerY - 48}
                width={96}
                height={96}
                rx={16}
                fill="url(#deraCircleGradient)"
              />
              
              {/* Top highlight */}
              <rect
                x={centerX - 38}
                y={centerY - 38}
                width={76}
                height={40}
                rx={12}
                fill="url(#squareHighlight)"
              />

              {/* DERA logo */}
              <image
                href="/logos/6458c1a3-4fd2-4902-87ef-8ebf7420c902_removalai_preview.png"
                x={centerX - 24}
                y={centerY - 24}
                width={48}
                height={48}
                preserveAspectRatio="xMidYMid meet"
              />

              <defs>
                <linearGradient id="deraCircleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6BA3FF" />
                  <stop offset="50%" stopColor="#4F8EF7" />
                  <stop offset="100%" stopColor="#2D6BD4" />
                </linearGradient>
                <linearGradient id="squareHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </linearGradient>
              </defs>
            </motion.g>

            {/* Right side - Consumer app card / mobile */}
            <motion.g
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* Phone shadow */}
              <rect
                x={rightX - 24}
                y={centerY - 45}
                width={48}
                height={90}
                rx={8}
                fill="rgba(0, 0, 0, 0.15)"
                style={{ filter: 'blur(6px)' }}
              />
              
              {/* Phone body */}
              <rect
                x={rightX - 26}
                y={centerY - 48}
                width={52}
                height={96}
                rx={10}
                fill="#0A1628"
              />
              
              {/* Screen */}
              <rect
                x={rightX - 22}
                y={centerY - 42}
                width={44}
                height={76}
                rx={4}
                fill="url(#phoneScreen)"
              />
              
              {/* Phone notch */}
              <rect
                x={rightX - 8}
                y={centerY - 44}
                width={16}
                height={4}
                rx={2}
                fill="#0A1628"
              />

              {/* Logo on phone */}
              <image
                href="/logos/6458c1a3-4fd2-4902-87ef-8ebf7420c902_removalai_preview.png"
                x={rightX - 10}
                y={centerY - 10}
                width={20}
                height={20}
                preserveAspectRatio="xMidYMid meet"
                style={{ filter: 'brightness(0) invert(1)' }}
              />

              {/* Consumer app label */}
              <text
                x={rightX}
                y={centerY + 62}
                textAnchor="middle"
                fill="#3D4A6B"
                fontSize="12"
                fontWeight="600"
              >
                Consumer App
              </text>

              <defs>
                <linearGradient id="phoneScreen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1A3FD4" />
                  <stop offset="100%" stopColor="#0A1628" />
                </linearGradient>
              </defs>
            </motion.g>

            {/* Connection line from center to mobile - Noodle style */}
            <path
              d={`M ${centerX + 48} ${centerY} C ${centerX + 90} ${centerY}, ${rightX - 60} ${centerY}, ${rightX - 26} ${centerY}`}
              stroke="rgba(79, 142, 247, 0.3)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <motion.circle
              r="4"
              fill="#4F8EF7"
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              style={{
                offsetPath: `path("M ${centerX + 48} ${centerY} C ${centerX + 90} ${centerY}, ${rightX - 60} ${centerY}, ${rightX - 26} ${centerY}")`,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </svg>
        </motion.div>

        {/* Stat Chips - Glassmorphic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mt-12"
        >
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
            <span className="text-[10px] md:text-xs text-[#3D4A6B] font-medium">API-First Integration</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
            <span className="text-[10px] md:text-xs text-[#3D4A6B] font-medium">Real-Time Webhooks</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
            <span className="text-[10px] md:text-xs text-[#3D4A6B] font-medium">Zero Phone Calls</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
