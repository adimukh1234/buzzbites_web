'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollProvider } from './ScrollContext';
import WhatDrivesUsSection from './WhatDrivesUsSection';
import LetsTalkSection from './LetsTalkSection';

export default function ScrollSections() {
  const containerRef = useRef(null);
  const [showDebug, setShowDebug] = useState(false);
  const [scrubValue, setScrubValue] = useState(0.5);
  
  // Toggle debug panel with Alt+D
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === 'd') {
        setShowDebug(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <ScrollProvider>
      <div ref={containerRef} className="relative w-full overflow-hidden">
        {/* First section */}
        <WhatDrivesUsSection />
        
        {/* Second section */}
        <LetsTalkSection />
        
        {/* Debug panel */}
        {showDebug && (
          <div className="fixed bottom-4 right-4 p-4 bg-black/70 backdrop-blur-md rounded-lg z-50">
            <h3 className="text-white text-lg font-bold mb-2">Debug Controls</h3>
            <div className="flex flex-col gap-2">              <button 
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gsap && window.gsap.ScrollTrigger) {
                    const currentMarkers = window.gsap.ScrollTrigger.defaults().markers;
                    window.gsap.ScrollTrigger.defaults({ markers: !currentMarkers });
                    window.gsap.ScrollTrigger.refresh(true);
                  }
                }}
              >
                Toggle Markers
              </button>
              
              <button 
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gsap && window.gsap.ScrollTrigger) {
                    window.gsap.ScrollTrigger.refresh(true);
                  }
                }}
              >
                Refresh Triggers
              </button>
              
              <div>
                <label className="text-white text-sm block mb-1">
                  Scrub Value: {scrubValue}
                </label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="2" 
                  step="0.1" 
                  value={scrubValue}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setScrubValue(value);
                    if (typeof window !== 'undefined' && window.gsap && window.gsap.ScrollTrigger) {
                      window.gsap.ScrollTrigger.getAll().forEach(st => {
                        if (st.vars.scrub) {
                          st.vars.scrub = value;
                          st.refresh();
                        }
                      });
                    }
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollProvider>
  );
}
