'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  useEffect(() => {    // Initialize Lenis with optimized settings for smooth scrolling
    const lenis = new Lenis({
      duration: 1.6, // Longer duration for even smoother feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function for buttery smooth motion
      smooth: true,
      smoothTouch: false, // Disable on touch to prevent conflicts
      touchMultiplier: 2,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      normalizeWheel: true,
      wheelMultiplier: 0.8, // Slightly reduced for more controlled scrolling
      autoResize: true,
      // Enable scroll snapping by integrating with CSS scroll-snap
      lerp: 0.1, // Lower value for smoother transitions between snap points
    });

    // Animation loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);    // Add Lenis class to html for CSS targeting
    document.documentElement.classList.add('lenis');

    // Add support for scroll-snap sections
    const snapSections = document.querySelectorAll('.snap-start, .snap-always');
    
    function isInViewport(element, threshold = 0.5) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      
      const vertInView = (rect.top <= windowHeight * threshold) && 
                         ((rect.top + rect.height) >= windowHeight * (1 - threshold));
      const horInView = (rect.left <= windowWidth * threshold) && 
                        ((rect.left + rect.width) >= windowWidth * (1 - threshold));
                        
      return vertInView && horInView;
    }
      // Handle scroll snapping for specific sections
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
      snapSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isCentered = Math.abs(rect.top) < window.innerHeight * 0.3;
        
        // If section is in center view and scrolling is slow enough
        if (isCentered && Math.abs(velocity) < 0.05) {
          // Temporarily stop scrolling to let animations play
          if (section.id === 'metrics-section' && !section.classList.contains('viewed')) {
            // Smoothly scroll to the section
            lenis.scrollTo(section, {
              offset: 0,
              immediate: false,
              duration: 0.8,
            });
            
            // Mark as viewing to prevent re-triggering
            section.classList.add('viewing');
            
            // After animations complete, mark as viewed
            setTimeout(() => {
              section.classList.add('viewed');
            }, 3500); // Wait for 3.5 seconds for animations to complete
          }
        }
      });
    });

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
