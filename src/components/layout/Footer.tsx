import React from 'react';
import { cn } from '@/lib/utils';

const LogoWhite = () => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className="relative w-7 h-7 flex items-center justify-center">
      <img src="/image.svg" alt="Dera Logo" className="w-full h-full object-contain brightness-0 invert" />
    </div>
    <span className="font-display font-bold text-lg text-white tracking-tight">Dera</span>
  </div>
);

export const Footer = () => {
  return (
    <footer className="bg-[#0A1628] pt-16 pb-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
          {/* Column 1: Brand */}
          <div className="flex flex-col items-start">
            <LogoWhite />
            <p className="text-sm text-white/60 mt-4 leading-relaxed max-w-[260px]">
              Cognitive Claims Middleware for Nigerian Insurance.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6 block">Product</span>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-4">
              {['How It Works', 'Features', 'For Insurers', 'For Garages'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6 block">Contact</span>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-white/70">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white/40">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                hello@derainsure.com
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white/40">
                  <path d="M12 21s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Lagos, Nigeria
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © 2026 Dera. Built for NIIRA 2025 compliance.
          </p>
          <div className="flex gap-6 text-xs text-white/30 font-medium">
            <span>Registration Pending</span>
            <span>NAICOM Registry</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
