'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function MouseParallax({ 
  children, 
  strength = 0.05, 
  className = "", 
  tiltEnabled = true,
  followMouse = true,
  ...props 
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [containerPosition, setContainerPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      // Get container position and dimensions
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
      setContainerPosition({ x: left, y: top });
      
      // Only update mouse position if inside container or within 500px range
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const inRange = 
        mouseX > left - 500 && 
        mouseX < left + width + 500 && 
        mouseY > top - 500 && 
        mouseY < top + height + 500;
        
      if (inRange) {
        setMousePosition({ x: mouseX, y: mouseY });
      }
    };
    
    if (followMouse) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [followMouse]);
  
  // Calculate relative mouse position
  const relativeX = mousePosition.x - containerPosition.x - containerSize.width / 2;
  const relativeY = mousePosition.y - containerPosition.y - containerSize.height / 2;
  
  // Apply strength factor to create subtle movement
  const moveX = relativeX * strength;
  const moveY = relativeY * strength;
  
  // Calculate tilt effect (subtle 3D rotation)
  const tiltX = tiltEnabled ? (relativeY / containerSize.height) * 5 : 0;
  const tiltY = tiltEnabled ? (relativeX / containerSize.width) * -5 : 0;
  
  return (
    <motion.div
      ref={containerRef}
      className={`mouse-parallax ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      <motion.div
        animate={{
          x: followMouse ? moveX : 0,
          y: followMouse ? moveY : 0,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
          mass: 0.8
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
