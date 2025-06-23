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

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + Math.floor(Math.random() * 10);
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);

    // Start hiding the preloader when window is fully loaded
    const handleLoad = () => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        preloaderState.setLoaded(); // Mark as loaded for future navigation
      }, 500); // Add a small delay after reaching 100%
    };

    // If already loaded when component mounts
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback timer in case the load event doesn't fire
      const timer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
          preloaderState.setLoaded(); // Mark as loaded for future navigation
        }, 500);
      }, 3000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
        window.removeEventListener('load', handleLoad);
      };
    }
  }, []);  // Don't render anything if we've already loaded once
  if (!loading && preloaderState.hasInitiallyLoaded) {
    return null;
  }

  return (
    <div
      id="pre-load"
      className={`loader ${!loading ? 'opacity-0 pointer-events-none' : ''}`}
      style={{
        transition: 'opacity 0.7s ease-in-out',
      }}
    >
      <div className="loader-inner">
        <div className="loader-logo">
          <div className="flex items-center justify-center">
            <Image 
              src="/Logo.png" 
              alt="BuzzBites Logo" 
              width={60} 
              height={60} 
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        
        {/* Loading progress indicator */}
        <div className="absolute bottom-[-40px] left-0 right-0 flex flex-col items-center justify-center gap-2">
          <div className="w-[120px] h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-500" 
              style={{
                width: `${progress}%`,
                transition: 'width 0.3s ease-out',
                boxShadow: '0 0 10px rgba(255, 255, 0, 0.5)'
              }}
            />
          </div>
          <div className="text-white font-satoshi font-medium text-sm tracking-widest">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
