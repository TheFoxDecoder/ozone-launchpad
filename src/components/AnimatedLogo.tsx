
import { useEffect, useState } from "react";

const AnimatedLogo = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Mystical background glow */}
      <div className="absolute -inset-8 bg-gradient-to-r from-mystical/20 via-brand-purple/20 to-brand-cyan/20 rounded-full blur-2xl animate-mystical-pulse"></div>
      
      {/* Rotating outer ring */}
      <div className="absolute -inset-6 border-2 border-gradient-to-r from-transparent via-mystical/30 to-transparent rounded-full animate-rotate-glow"></div>
      
      {/* Main logo container */}
      <div 
        className={`relative w-32 h-32 rounded-xl glass-mystical shadow-mystical flex items-center justify-center transition-all duration-1000 transform hover-mystical ${
          isVisible ? 'scale-100 opacity-100 animate-slide-in-up' : 'scale-50 opacity-0'
        }`}
      >
        <img 
          src="/lovable-uploads/040f51d9-02c1-410b-b0b7-0ad011dd0a91.png" 
          alt="LEAP Logo" 
          className="w-20 h-20 object-contain animate-pulse-slow"
        />
        
        {/* Floating particles */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-mystical rounded-full animate-float opacity-70"></div>
        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-brand-cyan rounded-full animate-float-reverse opacity-60"></div>
        <div className="absolute top-1/2 -left-4 w-1 h-1 bg-brand-purple rounded-full animate-pulse-glow"></div>
        
        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 rounded-xl animate-shimmer"></div>
      </div>
      
      {/* Secondary glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-brand-cyan/10 via-mystical/10 to-brand-purple/10 rounded-full blur-xl animate-float-reverse opacity-70"></div>
    </div>
  );
};

export default AnimatedLogo;
