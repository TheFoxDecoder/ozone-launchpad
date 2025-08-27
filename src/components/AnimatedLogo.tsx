
import { useEffect, useState } from "react";

const AnimatedLogo = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative">
      <div 
        className={`w-32 h-32 rounded-xl bg-white shadow-professional flex items-center justify-center transition-all duration-1000 transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <img 
          src="/lovable-uploads/040f51d9-02c1-410b-b0b7-0ad011dd0a91.png" 
          alt="LEAP Logo" 
          className="w-20 h-20 object-contain"
        />
        <div className="absolute -inset-4 bg-gradient-to-r from-brand-cyan/20 via-brand-blue/20 to-brand-purple/20 rounded-full blur-xl animate-float"></div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
