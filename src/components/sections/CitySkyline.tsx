"use client";

import React, { useEffect, useState } from "react";

export const CitySkyline = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      {/* Subtle atmospheric haze */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "45%",
          background:
            "linear-gradient(to top, rgba(79, 142, 247, 0.15) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <svg
        viewBox="0 0 720 640"
        width="100%"
        height="auto"
        style={{
          display: "block",
          transition: "opacity 0.8s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Building shadow overlay */}
          <linearGradient id="shadowLeft" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="shadowRight" x1="1" x2="0" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(0,0,0,0.25)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="towerGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="skyGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4F8EF7" />
            <stop offset="100%" stopColor="#1A3FD4" />
          </linearGradient>
        </defs>

        {/* ─── FAR LEFT CLUSTER ─── */}
        {/* Stacked small tower - far left */}
        <rect x="18" y="490" width="52" height="150" rx="2" fill="#3B82F6" />
        <rect x="24" y="470" width="40" height="30" rx="1" fill="#60A5FA" />
        <rect x="30" y="452" width="28" height="25" rx="1" fill="#93C5FD" />
        <rect x="36" y="438" width="16" height="20" rx="1" fill="#BFDBFE" />
        {/* Horizontal stripes on stacked tower */}
        {[495, 510, 525, 540, 555, 570, 585, 600].map((y, i) => (
          <rect key={i} x="22" y={y} width="44" height="3" rx="1" fill="rgba(255,255,255,0.25)" />
        ))}

        {/* ─── LEFT MID BUILDINGS ─── */}
        {/* Wide low building */}
        <rect x="72" y="530" width="90" height="110" rx="2" fill="#2563EB" />
        {/* Windows rows */}
        {[540, 558, 576, 594, 612].map((y, ri) =>
          [82, 100, 118, 136, 148].map((x, ci) => (
            <rect key={`wl-${ri}-${ci}`} x={x} y={y} width="10" height="10" rx="1" fill="rgba(255,255,255,0.35)" />
          ))
        )}

        {/* Taller building behind */}
        <rect x="100" y="478" width="60" height="162" rx="2" fill="#1D4ED8" />
        {[490, 508, 526, 544, 562, 580, 598, 616].map((y, ri) =>
          [108, 124, 140].map((x, ci) => (
            <rect key={`wlb-${ri}-${ci}`} x={x} y={y} width="10" height="12" rx="1" fill="rgba(255,255,255,0.3)" />
          ))
        )}

        {/* Medium building left of center */}
        <rect x="160" y="510" width="48" height="130" rx="2" fill="#3B82F6" />
        {[520, 538, 556, 574, 592, 610].map((y, ri) =>
          [168, 182, 196].map((x, ci) => (
            <rect key={`wm-${ri}-${ci}`} x={x} y={y} width="8" height="10" rx="1" fill="rgba(255,255,255,0.3)" />
          ))
        )}

        {/* ─── CENTER: WHITE BASE BUILDING ─── */}
        <rect x="205" y="505" width="58" height="135" rx="2" fill="#BFDBFE" />
        {/* White building windows - double columns */}
        {[515, 535, 555, 575, 595, 615].map((y, ri) =>
          [215, 228, 241, 252].map((x, ci) => (
            <rect key={`wcb-${ri}-${ci}`} x={x} y={y} width="8" height="14" rx="1" fill="#60A5FA" />
          ))
        )}
        {/* Slight shadow side */}
        <rect x="245" y="505" width="18" height="135" rx="0" fill="rgba(0,0,0,0.2)" />

        {/* ─── MAIN TOWER (CENTER HERO) ─── */}
        {/* Base */}
        <rect x="242" y="500" width="70" height="30" rx="1" fill="#1E3A8A" />
        {/* Dark cap at top */}
        <rect x="255" y="365" width="46" height="28" rx="2" fill="#172554" />
        {/* Main tower shaft */}
        <rect x="248" y="390" width="58" height="115" rx="1" fill="url(#towerGrad)" />
        {/* Vertical stripe panels */}
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={`vs-${i}`}
            x={251 + i * 6}
            y={390}
            width="4"
            height="115"
            rx="1"
            fill={i % 2 === 0 ? "rgba(255,255,255,0.15)" : "rgba(0,0,30,0.2)"}
          />
        ))}
        {/* Horizontal floor lines */}
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={`hf-${i}`} x={248} y={390 + i * 9} width="58" height="1" fill="rgba(255,255,255,0.15)" />
        ))}
        {/* Tower cap details */}
        <rect x="262" y="360" width="32" height="8" rx="1" fill="#172554" />
        <rect x="268" y="352" width="20" height="12" rx="1" fill="#1E3A8A" />
        <rect x="274" y="346" width="8" height="8" rx="1" fill="#1D4ED8" />

        {/* ─── RIGHT OF CENTER: TALL WHITE SLAB ─── */}
        <rect x="312" y="395" width="78" height="245" rx="2" fill="#93C5FD" />
        {/* Shadow side */}
        <rect x="370" y="395" width="20" height="245" rx="0" fill="rgba(0,0,0,0.2)" />
        {/* Windows - horizontal bands */}
        {[410, 432, 454, 476, 498, 520, 542, 564, 586, 608].map((y, ri) => (
          <rect key={`wrw-${ri}`} x={322} y={y} width="52" height="14" rx="1" fill="rgba(255,255,255,0.4)" />
        ))}

        {/* ─── RIGHT MID BUILDINGS ─── */}
        {/* Small house-like with peak */}
        <polygon points="400,490 430,490 430,640 400,640" fill="#60A5FA" />
        <polygon points="398,492 416,470 432,492" fill="#93C5FD" />
        {/* Door */}
        <rect x="408" y="610" width="14" height="30" rx="1" fill="#3B82F6" />

        {/* Medium building right */}
        <rect x="432" y="510" width="54" height="130" rx="2" fill="#3B82F6" />
        {[520, 538, 556, 574, 592, 610].map((y, ri) =>
          [440, 456, 470].map((x, ci) => (
            <rect key={`wrm-${ri}-${ci}`} x={x} y={y} width="8" height="10" rx="1" fill="rgba(255,255,255,0.35)" />
          ))
        )}

        {/* Right cluster - small building */}
        <rect x="488" y="540" width="36" height="100" rx="2" fill="#60A5FA" />
        {[548, 564, 580].map((y, ri) => (
          <rect key={`wrs-${ri}`} x={494} y={y} width="24" height="8" rx="1" fill="rgba(255,255,255,0.3)" />
        ))}

        {/* ─── FAR RIGHT BUILDINGS ─── */}
        {/* Tall grid building */}
        <rect x="524" y="485" width="72" height="155" rx="2" fill="#93C5FD" />
        {/* Grid windows */}
        {[495, 512, 529, 546, 563, 580, 597, 614].map((y, ri) =>
          [532, 548, 564, 578].map((x, ci) => (
            <rect key={`wfr-${ri}-${ci}`} x={x} y={y} width="10" height="10" rx="1" fill="rgba(255,255,255,0.4)" />
          ))
        )}
        {/* Shadow */}
        <rect x="574" y="485" width="22" height="155" fill="rgba(0,0,0,0.15)" />

        {/* Low wide building far right */}
        <rect x="596" y="555" width="124" height="85" rx="2" fill="#BFDBFE" />
        {/* Windows strip */}
        {[565, 585, 605].map((y, ri) =>
          [604, 626, 648, 670, 692, 710].map((x, ci) => (
            <rect key={`wlr-${ri}-${ci}`} x={x} y={y} width="14" height="10" rx="1" fill="rgba(255,255,255,0.35)" />
          ))
        )}

        {/* Accent small building far right */}
        <rect x="672" y="530" width="48" height="110" rx="2" fill="#60A5FA" />
        {[540, 558, 576, 594, 612].map((y, ri) =>
          [680, 696, 710].map((x, ci) => (
            <rect key={`war-${ri}-${ci}`} x={x} y={y} width="8" height="10" rx="1" fill="rgba(255,255,255,0.3)" />
          ))
        )}

        {/* ─── GROUND FILL ─── */}
        <rect x="0" y="635" width="720" height="10" fill="#1E40AF" />
      </svg>

      {/* Animated floating particles (subtle atmosphere) */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            left: `${12 + i * 15}%`,
            top: `${10 + (i % 4) * 12}%`,
            animation: `float-${i % 3} ${5 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
    </div>
  );
};

export default CitySkyline;
