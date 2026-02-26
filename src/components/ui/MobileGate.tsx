"use client";

import React from 'react';

export const MobileGate = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center px-8 text-center lg:hidden">
      {/* Logo */}
      <div className="mb-8">
        <img
          src="/logos/fc2cd7c8-3df2-4dff-9558-cecbf5a1abce_removalai_preview.svg"
          alt="Dera"
          className="w-20 h-auto mx-auto"
        />
      </div>

      {/* Icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: 'linear-gradient(135deg, rgba(79, 142, 247, 0.1) 0%, rgba(26, 63, 212, 0.1) 100%)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A3FD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </div>

      {/* Message */}
      <h2 className="font-headline text-2xl font-bold text-[#0A1628] mb-3">
        Desktop Experience Only
      </h2>
      <p className="text-base text-[#3D4A6B] leading-relaxed max-w-sm mb-8">
        This site is optimized for desktop viewing. Please switch to{' '}
        <span className="font-semibold text-[#0A1628]">&quot;Desktop site&quot;</span>{' '}
        in your browser menu, or visit on a laptop or desktop computer.
      </p>

      {/* Visual hint */}
      <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#F8F9FC] border border-[#E8EEFF]">
        <span className="text-sm text-[#3D4A6B]">⋮ →</span>
        <span className="text-sm font-semibold text-[#0A1628]">Desktop site ✓</span>
      </div>
    </div>
  );
};
