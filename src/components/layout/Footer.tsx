import React from 'react';
import { cn } from '@/lib/utils';

const LogoWhite = () => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className="relative flex items-center justify-center overflow-hidden" style={{ width: '235px', height: '73px' }}>
      <img 
        src="/logos/fc2cd7c8-3df2-4dff-9558-cecbf5a1abce_removalai_preview.svg" 
        alt="Dera Logo" 
        style={{ minWidth: '235px', minHeight: '235px', objectFit: 'cover', objectPosition: 'center 45%', filter: 'brightness(0) invert(1)' }}
      />
    </div>
  </div>
);

export const Footer = () => {
  return (
    <footer 
      className="text-white pt-16 pb-8 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #2A2A2A 0%, #000000 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
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
              {[
                { name: 'Problem', href: '#problem' },
                { name: 'Solution', href: '#workflow' },
                { name: 'FAQs', href: '#features' },
                { name: 'Why now?', href: '#insurers' },
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6 block">Contact</span>
            <div className="space-y-4">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=mcdaveltd@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white/60">
                  <path
                    d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 7l8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>mcdaveltd@gmail.com</span>
              </a>
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
