'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Initialize Lenis with optimized settings for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2, // Animation duration for buttery smooth feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      smooth: true,
      smoothTouch: false, // Disable on touch to prevent conflicts
      touchMultiplier: 2,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      normalizeWheel: true,
      wheelMultiplier: 1,
      autoResize: true,
    });

    // Animation loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Add Lenis class to html for CSS targeting
    document.documentElement.classList.add('lenis');

    // Integration with framer-motion and other scroll-based animations
    lenis.on('scroll', (e) => {
      // Dispatch custom event for scroll-based animations
      window.dispatchEvent(new CustomEvent('lenisScroll', { 
        detail: { 
          scroll: e.scroll, 
          velocity: e.velocity,
          direction: e.direction,
          progress: e.progress
        } 
      }));
    });

    // Prevent default scroll behavior on specific elements if needed
    const preventElements = document.querySelectorAll('[data-lenis-prevent]');
    preventElements.forEach(el => {
      el.addEventListener('wheel', (e) => e.stopPropagation());
    });

    // Cleanup function
    return () => {
      document.documentElement.classList.remove('lenis');
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
