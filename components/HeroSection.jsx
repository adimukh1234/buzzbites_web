'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import FuturisticOverlay from './FuturisticOverlay';
import Link from 'next/link';

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
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full text-center pt-16 sm:pt-20 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-black/20 to-black/40 px-4 sm:px-6 lg:px-8">
      {/* Enhanced futuristic background overlays for hero section */}
      <FuturisticOverlay opacity="medium" className="z-0" />
      <div className="relative z-10 flex flex-col items-center gap-4 max-w-7xl mx-auto">        <div className={`flex flex-col items-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="logo-container relative mb-2 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            
              {/* Circular glow */}
            <div className={`absolute inset-0 circular-glow transition-all duration-2000 delay-500 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}></div>
            
           
            {/* Enhanced Logo image with responsive sizing */}            <div className={`relative z-10 p-2 transition-all duration-1500 delay-300 ${loaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-80 rotate-12'}`}>
              <Image 
                src={"/Buzz_logo-01.png"} 
                alt="BuzzBites Logo" 
                width={600} 
                height={600} 
                className="w-full h-auto object-contain drop-shadow-[0.2_0_15px_rgba(0,0,0,0.6)]"
                onLoad={() => setLoaded(true)}
                priority
              />
            </div>
 
            </div>
            
            
          
        </div>
          <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-satoshi font-bold text-white leading-tight drop-shadow-lg max-w-4xl transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} px-4`}>
          Building tech shaping the future of <br className="hidden sm:block" />
          <span className="text-yellow-500 inline-block mt-1 sm:mt-2"> Workforce Intelligence.</span>
        </h1>
        
        <p className={`text-sm xs:text-base sm:text-lg md:text-xl font-satoshi font-regular text-gray-300 max-w-2xl mx-auto mt-3 sm:mt-4 mb-6 sm:mb-8 leading-relaxed transition-all duration-1000 delay-1300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} px-4`}>
           From a bold media-tech vision to a powerful in-house product-<br className="hidden sm:block" />
          <span className="opacity-90">we build tools that transform how teams work.</span>
        </p>          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center transition-all duration-1000 delay-1600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} px-4`}>
        
          
          <Link href="/product">
            <button className="glow text-sm sm:text-base font-satoshi font-bold bg-yellow-500 hover:bg-yellow-600 px-6 py-3 sm:px-8 sm:py-3 text-black rounded-lg transition-colors duration-300">
              Explore Instacon →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}