'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import FuturisticOverlay from './FuturisticOverlay';
import ScrambleButton from './ScrambleButton';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);  return (    
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full text-center pt-20 pb-20 overflow-hidden bg-gradient-to-b from-black/20 to-black/40">
      {/* Enhanced futuristic background overlays for hero section */}
      <FuturisticOverlay opacity="medium" className="z-0" />
      <div className="relative z-10 flex flex-col items-center gap-4">        <div className={`flex flex-col items-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="logo-container relative mb-2">
            
              {/* Circular glow */}
            <div className={`absolute inset-0 circular-glow transition-all duration-2000 delay-500 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}></div>
            
           
            {/* Enhanced Logo image with bigger size and stronger effects */}            <div className={`relative z-10 p-2 transition-all duration-1500 delay-300 ${loaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-80 rotate-12'}`}>
              <Image 
                src={"/Buzz_logo-01.png"} 
                alt="BuzzBites Logo" 
                width={600} 
                height={600} 
                className="w-full h-auto max-w-none object-contain drop-shadow-[0.2_0_15px_rgba(0,0,0,0.6)]"
                onLoad={() => setLoaded(true)}
              />
            </div>
 
            </div>
            
            
          
        </div>
          <h1 className={`text-4xl md:text-6xl font-satoshi font-bold text-white leading-tight drop-shadow-lg max-w-4xl transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Building tech shaping the future of <br />
          <span className="text-yellow-500 inline-block mt-2"> Workforce Intelligence.</span>
        </h1>
        
        <p className={`text-lg md:text-xl font-satoshi font-regular text-gray-300 max-w-2xl mx-auto mt-4 mb-8 leading-relaxed transition-all duration-1000 delay-1300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
           From a bold media-tech vision to a powerful in-house product-<br />
          <span className="opacity-90">we build tools that transform how teams work.</span>
        </p>          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-1600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
          <ScrambleButton 
            text="Explore Instacon →" 
            className="glow text-base font-satoshi font-bold bg-yellow-500 hover:bg-yellow-600"
          />
        </div>
      </div>
    </section>
  );
}