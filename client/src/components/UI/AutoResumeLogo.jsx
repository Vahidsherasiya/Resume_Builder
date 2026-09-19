import React from 'react';

/**
 * AutoResume Brand Logo Component
 * Highly customizable vector logo with vibrant modern gradients and responsive typography.
 */
export default function AutoResumeLogo({ 
  size = 'md',        // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant = 'full',   // 'full' | 'icon' | 'mark'
  theme = 'dark-text',// 'dark-text' | 'light-text' | 'gradient-text'
  badge = 'A4 Builder',
  className = '',
  onClick
}) {
  // Dimensions map
  const sizeMap = {
    xs: { icon: 'w-6 h-6', text: 'text-sm', badge: 'text-[9px] px-1.5 py-0.2', gap: 'gap-1.5' },
    sm: { icon: 'w-7 h-7', text: 'text-base', badge: 'text-[10px] px-1.5 py-0.5', gap: 'gap-2' },
    md: { icon: 'w-9 h-9', text: 'text-lg', badge: 'text-xs px-2 py-0.5', gap: 'gap-2.5' },
    lg: { icon: 'w-11 h-11', text: 'text-xl', badge: 'text-xs px-2 py-0.5', gap: 'gap-3' },
    xl: { icon: 'w-14 h-14', text: 'text-2xl', badge: 'text-sm px-2.5 py-1', gap: 'gap-3.5' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const isLightText = theme === 'light-text';

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center ${currentSize.gap} select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Dynamic Vector Icon */}
      <div className={`relative ${currentSize.icon} flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#009b77] via-[#00c598] to-[#38bdf8] p-[1.5px] shadow-md shadow-[#00c598]/20 transition-transform duration-200 hover:scale-105`}>
        <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden relative">
          {/* Subtle internal gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00c598]/25 via-transparent to-indigo-500/25 pointer-events-none" />
          
          <svg 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-[72%] h-[72%] relative z-10 drop-shadow-sm"
          >
            {/* Background Document Plate */}
            <rect x="6" y="4" width="20" height="24" rx="3.5" fill="white" fillOpacity="0.08" stroke="url(#ar-border)" strokeWidth="1.2" />
            
            {/* Auto Dynamic Lighting / AR Glyph */}
            <path 
              d="M10 20L15.2 8.5C15.5 7.8 16.5 7.8 16.8 8.5L22 20M11.8 16.2H20.2" 
              stroke="url(#ar-gradient)" 
              strokeWidth="2.4" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* Auto Lightning / Sparkle Accent */}
            <path 
              d="M21 9L23 5L25 9L29 11L25 13L23 17L21 13L17 11L21 9Z" 
              fill="url(#sparkle-grad)" 
              transform="scale(0.35) translate(30, 8)"
            />
            {/* Linear Resume Content lines */}
            <rect x="10" y="23.5" width="12" height="1.8" rx="0.9" fill="#00c598" fillOpacity="0.9" />

            <defs>
              <linearGradient id="ar-gradient" x1="10" y1="8" x2="22" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" />
                <stop offset="0.6" stopColor="#38bdf8" />
                <stop offset="1" stopColor="#00c598" />
              </linearGradient>
              <linearGradient id="ar-border" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00c598" stopOpacity="0.8" />
                <stop offset="1" stopColor="#38bdf8" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="sparkle-grad" x1="17" y1="5" x2="29" y2="17" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fef08a" />
                <stop offset="1" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Typography / Brand Name */}
      {variant !== 'icon' && (
        <div className="flex items-center">
          <div className="flex items-center tracking-tight font-extrabold leading-none">
            <span className={`${currentSize.text} ${isLightText ? 'text-white' : 'text-slate-900'} font-black tracking-tight`}>
              Auto
            </span>
            <span className={`${currentSize.text} bg-gradient-to-r from-[#00c598] to-[#0284c7] bg-clip-text text-transparent font-black ml-0.5`}>
              Resume
            </span>
          </div>

          {badge && (
            <span className={`ml-2 font-bold ${currentSize.badge} rounded-full border transition-all ${
              isLightText
                ? 'bg-[#00c598]/20 text-[#34d399] border-[#00c598]/40'
                : 'bg-emerald-50 text-[#009b77] border-emerald-200/80'
            }`}>
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
