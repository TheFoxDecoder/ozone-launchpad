
import { useEffect, useState } from "react";

const AnimatedLogo = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative">
      <div 
        className={`w-32 h-32 rounded-2xl glass gradient-border flex items-center justify-center transition-all duration-1000 transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <div className="relative">
          <span className="text-6xl font-bold gradient-text animate-pulse-slow">
            O³
          </span>
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-cyan/20 via-brand-blue/20 to-brand-purple/20 rounded-full blur-xl animate-float"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
