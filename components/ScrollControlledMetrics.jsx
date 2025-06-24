'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MetricCards from './MetricCards';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollControlledMetrics = () => {
  const sectionRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isInSection, setIsInSection] = useState(false);
  const totalCards = 4;
  const scrollTimeoutRef = useRef(null);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e) => {
      if (hasCompleted) return;

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;
      
      // Throttle scroll events
      if (timeSinceLastScroll < 200) return;
      lastScrollTime.current = now;

      const rect = section.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4;

      if (isVisible && !hasCompleted) {
        e.preventDefault();
        e.stopPropagation();
        setIsScrollLocked(true);
        setIsInSection(true);

        const deltaY = e.deltaY;
        const scrollingDown = deltaY > 0;

        if (scrollingDown && currentCardIndex < totalCards - 1) {
          // Scroll down - next card
          setCurrentCardIndex(prev => prev + 1);
        } else if (!scrollingDown && currentCardIndex > 0) {
          // Scroll up - previous card
          setCurrentCardIndex(prev => prev - 1);
        } else if (scrollingDown && currentCardIndex === totalCards - 1) {
          // Completed viewing all cards
          setHasCompleted(true);
          setIsScrollLocked(false);
          
          // Allow natural scroll to continue
          setTimeout(() => {
            window.scrollBy({ top: window.innerHeight * 0.5, behavior: 'smooth' });
          }, 300);
        }
      } else {
        setIsScrollLocked(false);
        setIsInSection(false);
      }
    };

    const handleKeyDown = (e) => {
      if (!isInSection || hasCompleted) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          if (currentCardIndex < totalCards - 1) {
            setCurrentCardIndex(prev => prev + 1);
          } else {
            setHasCompleted(true);
            setIsScrollLocked(false);
          }
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (currentCardIndex > 0) {
            setCurrentCardIndex(prev => prev - 1);
          }
          break;
        case 'Escape':
          setHasCompleted(true);
          setIsScrollLocked(false);
          break;
      }
    };

    // Touch support for mobile
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!isInSection || hasCompleted) return;

      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > 50) {
        e.preventDefault();
        
        if (diff > 0 && currentCardIndex < totalCards - 1) {
          setCurrentCardIndex(prev => prev + 1);
        } else if (diff < 0 && currentCardIndex > 0) {
          setCurrentCardIndex(prev => prev - 1);
        } else if (diff > 0 && currentCardIndex === totalCards - 1) {
          setHasCompleted(true);
          setIsScrollLocked(false);
        }
        
        touchStartY = touchEndY;
      }
    };

    // Create scroll trigger for section detection
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      end: 'bottom 30%',
      onEnter: () => setIsInSection(true),
      onLeave: () => {
        setIsInSection(false);
        setIsScrollLocked(false);
      },
      onEnterBack: () => setIsInSection(true),
      onLeaveBack: () => {
        setIsInSection(false);
        setIsScrollLocked(false);
      }
    });

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      scrollTrigger.kill();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentCardIndex, totalCards, hasCompleted, isInSection]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-black/90"
      style={{ willChange: 'transform' }}
    >
      {/* Progress indicator */}
      <motion.div 
        className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrollLocked && isInSection ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col space-y-3">
          {Array.from({ length: totalCards }, (_, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full border-2 ${
                i === currentCardIndex 
                  ? 'bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/50' 
                  : i < currentCardIndex
                  ? 'bg-green-500 border-green-500'
                  : 'bg-transparent border-gray-500'
              }`}
              animate={{
                scale: i === currentCardIndex ? 1.3 : 1,
                opacity: i <= currentCardIndex ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-4 text-white text-sm font-medium text-center"
          animate={{ opacity: isScrollLocked ? 1 : 0 }}
        >
          {currentCardIndex + 1} / {totalCards}
        </motion.div>

        {hasCompleted && (
          <motion.div
            className="mt-2 text-green-400 text-xs text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ✓ Complete
          </motion.div>
        )}
      </motion.div>

      {/* Instructions overlay */}
      <motion.div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isScrollLocked && !hasCompleted ? 1 : 0,
          y: isScrollLocked && !hasCompleted ? 0 : 20 
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-black/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
          <p className="text-white text-sm">
            {currentCardIndex < totalCards - 1 
              ? 'Scroll to view each metric' 
              : 'Scroll down to continue'
            }
          </p>
        </div>
      </motion.div>

      {/* Status indicator */}
      {isScrollLocked && !hasCompleted && (
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30">
            <p className="text-blue-200 text-xs font-medium">
              Exploring metrics - {currentCardIndex + 1}/{totalCards}
            </p>
          </div>
        </motion.div>
      )}

      {/* Metrics Cards Component */}
      <div className="flex items-center justify-center min-h-screen">
        <MetricCards 
          currentCard={currentCardIndex}
          isScrollLocked={isScrollLocked}
        />
      </div>
    </section>
  );
};

export default ScrollControlledMetrics;
