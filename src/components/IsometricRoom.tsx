import React from 'react';
import { cn } from "@/lib/utils";

const IsometricRoom = () => {
  return (
    <div className="relative w-[600px] h-[400px] transform rotate-45 mx-auto">
      {/* Room container with isometric perspective */}
      <div className="absolute inset-0 bg-cabin-floor transform-gpu -rotate-45 scale-y-50">
        {/* Left wall */}
        <div className="absolute left-0 top-0 w-full h-full bg-cabin-wood transform origin-left -skew-y-45" />
        
        {/* Right wall */}
        <div className="absolute right-0 top-0 w-full h-full bg-cabin-light transform origin-right skew-y-45" />
        
        {/* Floor */}
        <div className="absolute inset-0 bg-cabin-floor" />
        
        {/* Fireplace */}
        <div className="absolute bottom-10 right-20 w-32 h-40 bg-cabin-dark">
          <div className="absolute bottom-0 w-full h-24 bg-fireplace-ember animate-fire-glow" />
        </div>
        
        {/* Christmas Tree */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[100px] border-christmas-green" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-4 h-4 bg-christmas-gold rounded-full animate-pulse" />
        </div>
        
        {/* Windows */}
        <div className="absolute top-10 left-10 w-20 h-30 bg-window rounded-t-lg" />
        <div className="absolute top-10 right-10 w-20 h-30 bg-window rounded-t-lg" />
        
        {/* Decorations */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-16 h-16 border-4 border-christmas-red rounded-full">
          <div className="absolute bottom-0 w-8 h-16 bg-christmas-green" />
        </div>
        
        {/* Snow effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-snow rounded-full animate-snow-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IsometricRoom;