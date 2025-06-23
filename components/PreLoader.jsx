'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { preloaderState } from '../utils/preloaderState';

export default function PreLoader() {
  // Start with not loading if we've already loaded once before
  const [loading, setLoading] = useState(!preloaderState.hasInitiallyLoaded);
  const [progress, setProgress] = useState(preloaderState.hasInitiallyLoaded ? 100 : 0);
  useEffect(() => {
    // If we've already loaded once before, don't show preloader again
    if (preloaderState.hasInitiallyLoaded) {
      return;
    }

    // Minimum time to display the preloader animation (in milliseconds)
    const minimumPreloaderTime = 4000; // 4 seconds
    const startTime = Date.now();

    // Control the loading progress at a steady pace
    const interval = setInterval(() => {
      // Calculate how far along we are in the minimum preloader time
      const elapsedTime = Date.now() - startTime;
      const timeProgress = Math.min(elapsedTime / minimumPreloaderTime, 1);
      
      // Ensure progress follows a smooth curve that reaches 100% exactly when minimum time elapses
      // We'll make it slightly non-linear to look more realistic
      const calculatedProgress = Math.floor(Math.pow(timeProgress, 0.8) * 100);
      
      setProgress(calculatedProgress);
      
      // When we reach 100%, stop the interval
      if (calculatedProgress >= 100) {
        clearInterval(interval);
      }
    }, 50);

    // Function to hide the loader when both conditions are met:
    // 1. Minimum display time has passed
    // 2. Content is actually loaded
    const hideLoader = () => {
      const elapsedTime = Date.now() - startTime;
      
      if (elapsedTime >= minimumPreloaderTime) {
        // If minimum time has passed, hide immediately
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
          preloaderState.setLoaded();
        }, 800); // Slightly longer transition after reaching 100%
      } else {
        // Otherwise, wait until minimum time has passed
        const remainingTime = minimumPreloaderTime - elapsedTime;
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => {
            setLoading(false);
            preloaderState.setLoaded();
          }, 800);
        }, remainingTime);
      }
    };

    // Handle page load completion
    const handleLoad = () => {
      // When the page loads, don't immediately hide the loader
      // Instead, check if minimum time has elapsed
      hideLoader();
    };

    // If already loaded when component mounts
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      
      // Fallback timer in case the load event doesn't fire
      const timer = setTimeout(() => {
        hideLoader();
      }, minimumPreloaderTime + 1000); // Add a buffer to ensure it completes
      
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
        window.removeEventListener('load', handleLoad);
      };
    }
  }, []);// Don't render anything if we've already loaded once
  if (!loading && preloaderState.hasInitiallyLoaded) {
    return null;
  }  // No loading messages

  return (
    <div
      id="pre-load"
      className={`loader ${!loading ? 'opacity-0 pointer-events-none' : ''}`}
      style={{
        transition: 'opacity 0.9s ease-in-out',
      }}
    >
      <div className="loader-inner">
        {/* Ripple background effect */}
        <div 
          className="absolute inset-0 bg-yellow-500/5 rounded-full"
          style={{
            animation: 'pulseGlow 3s infinite ease-in-out',
          }}
        ></div>
        
        <div className="loader-logo">
          <div className="flex items-center justify-center">            <Image 
              src="/Logo.png" 
              alt="BuzzBites Logo" 
              width={70} 
              height={70} 
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 0.5))'
              }}
              priority
            />
          </div>
        </div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>        {/* Loading progress indicator - moved further down */}
        <div className="absolute bottom-[-60px] left-0 right-0 flex flex-col items-center justify-center gap-3">
            <div className="w-[180px] h-3 bg-gray-800/70 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/50">
            <div 
              className="h-full bg-gradient-to-r from-yellow-500/80 to-yellow-300/90" 
              style={{
                width: `${progress}%`,
                transition: 'width 0.3s ease-out',
                boxShadow: '0 0 15px rgba(255, 255, 0, 0.4)'
              }}
            />
          </div>
          
          <div className="text-white font-satoshi font-medium text-sm tracking-widest bg-black/50 px-2 py-0.5 rounded">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
