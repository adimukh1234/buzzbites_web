'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
  // Make GSAP available globally for the debug panel
  window.gsap = gsap;
  
  // Configure ScrollTrigger defaults
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
  });
}

// Create the context
const ScrollContext = createContext();

// ScrollProvider component
export function ScrollProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [scrollEvents, setScrollEvents] = useState([]);

  // Initialize GSAP when component mounts
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize ScrollTrigger
    ScrollTrigger.defaults({ 
      scrub: 0.5, // Faster scrub for quicker response
      anticipatePin: 1
    });
    
    // Force ScrollTrigger to refresh with appropriate timing
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
      console.log("ScrollTrigger initialized");
      
      // Force ScrollTrigger to refresh
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 300);
    }, 100);

    // Handle window resize to refresh ScrollTrigger
    const handleResize = () => {
      // Debounce resize events
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(() => {
        console.log("Window resized, refreshing ScrollTrigger");
        ScrollTrigger.refresh(true);
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    // Clean up on unmount
    return () => {
      clearTimeout(initTimer);
      clearTimeout(window.resizeTimer);
      window.removeEventListener('resize', handleResize);
      
      // More comprehensive cleanup to prevent memory leaks
      ScrollTrigger.getAll().forEach(st => {
        st.kill();
        st.scroll(0);
      });
      
      // Remove any listeners and clear timelines
      ScrollTrigger.clearMatchMedia();
      ScrollTrigger.clearScrollMemory();
      gsap.killTweensOf("*");
      
      console.log("ScrollTrigger cleaned up");
    };
  }, []);

  // Register a scroll event
  const registerScrollEvent = (name, callback) => {
    setScrollEvents(prev => [...prev, { name, callback }]);
    return () => {
      setScrollEvents(prev => prev.filter(event => event.name !== name));
    };
  };

  // Refresh ScrollTrigger
  const refreshScrollTriggers = () => {
    if (typeof window !== 'undefined') {
      ScrollTrigger.refresh(true);
    }
  };

  const value = {
    isInitialized,
    registerScrollEvent,
    refreshScrollTriggers,
    scrollEvents,
    toggleMarkers: () => {
      ScrollTrigger.defaults({ markers: !ScrollTrigger.defaults().markers });
      ScrollTrigger.refresh(true);
    },
    adjustScrubValue: (value) => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.scrub) {
          st.vars.scrub = value;
          st.refresh();
        }
      });
    }
  };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
}

// Custom hook to use the scroll context
export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
}

export default ScrollContext;
