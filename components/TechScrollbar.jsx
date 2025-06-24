'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TechScrollbar = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const scrollbarRef = useRef(null);
  const thumbRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
    // Use framer-motion's useScroll hook to track scroll progress
  const { scrollYProgress } = useScroll();
  
  // Convert scroll progress to a simple percentage value (0-100)
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  // Update scroll percentage when scrollYProgress changes
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollPercentage(latest * 100);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set timeout to hide scrollbar after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
  
  // Handle drag functionality
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setIsScrolling(true);
    
    const rect = scrollbarRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const targetScrollY = clickPosition * (document.documentElement.scrollHeight - window.innerHeight);
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging || !scrollbarRef.current) return;
    
    const rect = scrollbarRef.current.getBoundingClientRect();
    const dragPosition = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetScrollY = dragPosition * (document.documentElement.scrollHeight - window.innerHeight);
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'auto'
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Hide scrollbar after dragging stops
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };
  
  // Global mouse events for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);    return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-auto px-4 pt-2"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isScrolling || isDragging ? 1 : 0
      }}
      transition={{ 
        duration: 0.2,
        ease: "easeInOut"
      }}
    >
      {/* Main scrollbar container */}
      <div
        ref={scrollbarRef}
        className="relative w-full h-1 bg-white/5 rounded-full cursor-pointer overflow-hidden"
        onMouseDown={handleMouseDown}
      >
        {/* Progress track */}
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${scrollPercentage}%`,
            background: 'linear-gradient(90deg, #EABA08 0%, #4ade80 50%, #3b82f6 100%)',
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        
        {/* Scrollbar thumb */}
        <motion.div
          ref={thumbRef}
          className="absolute top-1/2 w-3 h-3 rounded-full cursor-grab active:cursor-grabbing"
          style={{
            left: `${scrollPercentage}%`,
            background: '#EABA08',
            transform: 'translateX(-50%) translateY(-50%)',
            boxShadow: '0 0 8px rgba(234, 179, 8, 0.4)'
          }}
          whileHover={{ 
            scale: 1.3,
            boxShadow: '0 0 12px rgba(234, 179, 8, 0.6)'
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            scale: isDragging ? 1.2 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
        
        {/* Progress percentage indicator */}
        <motion.div
          className="absolute -top-6 px-1.5 py-0.5 bg-black/80 backdrop-blur-sm rounded text-xs font-satoshi font-medium text-white/90"
          style={{
            left: `${scrollPercentage}%`,
            transform: 'translateX(-50%)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: (isScrolling || isDragging) ? 1 : 0,
            scale: (isScrolling || isDragging) ? 1 : 0.8
          }}
          transition={{ duration: 0.15 }}
        >
          {Math.round(scrollPercentage)}%
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TechScrollbar;
