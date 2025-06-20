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
  }, []);
  return (    
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] w-full text-center pt-20 pb-16 overflow-hidden bg-gradient-to-b from-black/20 to-black/40">
      {/* Enhanced futuristic background overlays for hero section */}
      <FuturisticOverlay opacity="medium" className="z-0" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className={`flex flex-col items-center mb-8 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="logo-container relative mb-6">
            {/* Hexagonal frame */}
            <div className={`absolute inset-0 hexagon-container transition-all duration-1500 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <div className="hexagon"></div>
              <div className="hexagon-border"></div>
            </div>
              {/* Circular glow */}
            <div className={`absolute inset-0 circular-glow transition-all duration-2000 delay-500 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}></div>
            
            {/* Tech scanline */}
            <div className={`absolute inset-0 z-5 tech-scanline transition-all duration-1000 delay-800 ${loaded ? 'opacity-40' : 'opacity-0'}`}></div>
            
            {/* Logo image */}
            <div className={`relative z-10 p-8 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-12'}`}>
              <Image 
                src={"/Logo.png"} 
                alt="BuzzBites Logo" 
                width={200} 
                height={200} 
                className="w-36 h-36 md:w-48 md:h-48 object-contain drop-shadow-[0_0_15px_rgba(255,255,0,0.6)]" 
                onLoad={() => setLoaded(true)}
              />
              
              {/* High-tech corner accents */}
              <div className={`absolute top-0 left-0 w-12 h-12 tech-corner-lt transition-all duration-700 delay-1200 ${loaded ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className={`absolute top-0 right-0 w-12 h-12 tech-corner-rt transition-all duration-700 delay-1400 ${loaded ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className={`absolute bottom-0 left-0 w-12 h-12 tech-corner-lb transition-all duration-700 delay-1600 ${loaded ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className={`absolute bottom-0 right-0 w-12 h-12 tech-corner-rb transition-all duration-700 delay-1800 ${loaded ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>
            
            {/* Tech circuit lines */}
            <div className={`circuit-lines absolute inset-0 transition-all duration-2500 ${loaded ? 'opacity-70' : 'opacity-0'}`}></div>
          </div>          <div className={`tech-title-container text-3xl font-satoshi font-black tracking-wider transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="tech-title-background"></div>
            <span className="text-white relative z-10">BUZZ</span>
            <span className="text-yellow-400 relative z-10">
              BITES
              <span className="absolute -top-1 -right-3 text-yellow-400 text-sm pulse-dot">●</span>
            </span>
            <div className="tech-title-line"></div>
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