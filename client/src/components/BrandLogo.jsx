import React from 'react';

/**
 * BrandLogo: Represents AH LEAK x ការ៉ា (KARA STUDIO WEAR)
 * Designed with a bespoke luxury apparel aesthetic:
 * - Geometric coat-hanger & crown silhouette representing boutique studio wear
 * - Authentic Khmer typography for ការ៉ា
 * - Bold architectural typography for AH LEAK
 */
export default function BrandLogo({ variant = 'header', className = '', size = 'md' }) {
  
  // Standalone Icon Emblem (Used in favicon, checkout badge, drawer)
  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg 
          viewBox="0 0 100 100" 
          className={size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10'}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1F1F1F" />
              <stop offset="100%" stop-color="#0A0A0A" />
            </linearGradient>
            <linearGradient id="accentOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF6B35" />
              <stop offset="100%" stop-color="#E8590C" />
            </linearGradient>
            <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FCD206" />
              <stop offset="100%" stop-color="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Squircle frame */}
          <rect x="4" y="4" width="92" height="92" rx="24" fill="url(#brandGrad)" stroke="url(#accentOrange)" strokeWidth="2.5" />

          {/* Boutique Coat Hanger / Studio Crest */}
          <path d="M 50 18 C 50 13 55 13 55 16 C 55 20 47 21 47 25 L 47 28 L 53 28" fill="none" stroke="url(#goldAccent)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 26 38 L 50 28 L 74 38" fill="none" stroke="url(#accentOrange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Monogram A + K */}
          <path d="M 30 72 L 40 42 L 50 72" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 33 62 L 47 62" fill="none" stroke="url(#accentOrange)" strokeWidth="2.5" strokeLinecap="round" />

          <path d="M 55 42 L 55 72" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 70 44 L 56 57 L 72 72" fill="none" stroke="url(#accentOrange)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Bottom Accent */}
          <circle cx="50" cy="83" r="2" fill="url(#goldAccent)" />
        </svg>
      </div>
    );
  }

  // The Kara Emblem Badge next to AH LEAK X
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-gradient-to-br from-[#1E1E1E] to-[#0A0A0A] border-2 border-[#E8590C] rounded-xl px-2.5 py-1 shadow-xs hover:border-[#FF6B35] transition-all ${className}`}>
        {/* Mini Hanger Icon */}
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#FCD206] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2" />
          <path d="M 12 7 L 12 9" />
          <path d="M 4 15 L 12 10 L 20 15 Z" fill="currentColor" fillOpacity="0.15" />
        </svg>
        
        <div className="flex flex-col -space-y-1">
          <span className="font-khmer font-bold text-[#FF6B35] text-lg leading-tight tracking-wide">
            ការ៉ា
          </span>
          <span className="text-[7.5px] font-mono tracking-widest text-gray-300 font-bold uppercase">
            KARA STUDIO
          </span>
        </div>
      </div>
    );
  }

  // Default: Complete Header Brand Lockup matching Image 1
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <div className="flex items-center gap-2 sm:gap-2.5">
        
        {/* Iconic Store Crest */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#050505] border border-[#E8590C]/60 flex items-center justify-center shadow-xs p-1">
          <svg viewBox="0 0 60 60" className="w-full h-full" fill="none">
            {/* Hanger hook */}
            <path d="M 30 11 C 30 7 34 7 34 9.5 C 34 12 28 13 28 15.5 L 32 15.5" stroke="#FCD206" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 14 22 L 30 16 L 46 22" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Letter A */}
            <path d="M 18 44 L 24 26 L 30 44" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 20 38 L 28 38" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" />
            {/* Letter K */}
            <path d="M 34 26 L 34 44" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 44 28 L 35 36 L 45 44" stroke="#FF6B35" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* AH LEAK Name */}
        <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-black">
          AH LEAK
        </span>

        {/* Multiplication Symbol */}
        <span className="text-gray-300 font-light text-lg sm:text-xl">
          ×
        </span>

        {/* KARA Brand Badge */}
        <div className="flex items-center gap-1.5 bg-gradient-to-br from-[#141414] to-[#000000] border-1.5 border-[#E8590C] rounded-lg px-2 sm:px-2.5 py-0.5 sm:py-1 shadow-xs">
          <div className="flex flex-col -space-y-0.5">
            <span className="font-khmer font-black text-[#FF6B35] text-base sm:text-lg lg:text-xl leading-tight">
              ការ៉ា
            </span>
            <span className="text-[6.5px] sm:text-[7.5px] font-mono tracking-widest text-amber-200/90 font-bold uppercase">
              STUDIO WEAR
            </span>
          </div>
        </div>

      </div>

      {/* Baseline Tagline */}
      <div className="flex items-center gap-2 mt-0.5">
        <span className="h-[1px] w-3 bg-gray-200" />
        <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.28em] text-gray-400 font-bold uppercase">
          KARA STUDIO WEAR • EST. 2026
        </span>
        <span className="h-[1px] w-3 bg-gray-200" />
      </div>
    </div>
  );
}
