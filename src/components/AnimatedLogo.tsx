
import React from 'react';

const AnimatedLogo = () => {
  return (
    <div className="relative group">
      {/* Main logo container with glass effect */}
      <div className="relative w-20 h-20 glass-apple rounded-2xl flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 via-mystical/30 to-brand-purple/20 rounded-2xl blur-xl animate-quantum-float opacity-60"></div>
        
        {/* Neural network pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 80 80" className="animate-data-flow">
            <defs>
              <pattern id="neuralPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="url(#neuralGradient)" opacity="0.6"/>
                <line x1="5" y1="5" x2="15" y2="15" stroke="url(#neuralGradient)" strokeWidth="0.5" opacity="0.4"/>
              </pattern>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--brand-cyan))" />
                <stop offset="50%" stopColor="hsl(var(--mystical))" />
                <stop offset="100%" stopColor="hsl(var(--brand-purple))" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#neuralPattern)" />
          </svg>
        </div>
        
        {/* Main logo text */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="text-2xl font-black gradient-neural text-neural-glow leading-none mb-0.5">
            LEAP
          </div>
          <div className="text-[8px] font-medium tracking-wider gradient-mystical opacity-80">
            O³ TECH
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-brand-cyan to-mystical rounded-full animate-quantum-float opacity-70"></div>
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-r from-mystical to-brand-purple rounded-full animate-quantum-float opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 -right-2 w-1 h-1 bg-brand-cyan rounded-full animate-quantum-float opacity-50" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Outer ring with pulsing effect */}
      <div className="absolute inset-0 w-20 h-20 rounded-2xl border border-mystical/20 animate-neural-pulse"></div>
      
      {/* Data streams */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-30">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-cyan to-transparent animate-data-flow"></div>
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-mystical to-transparent animate-data-flow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-brand-purple to-transparent animate-data-flow" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
