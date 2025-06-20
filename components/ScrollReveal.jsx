'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  duration = 0.6,
  threshold = 0.1,
  effect = 'fade-up', // Options: fade-up, fade-down, fade-left, fade-right, zoom-in, zoom-out
  once = true,
  className = "",
  ...props 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  // Set up initial and animate states based on the desired effect
  let initial = {};
  
  switch(effect) {
    case 'fade-up':
      initial = { opacity: 0, y: 30 };
      break;
    case 'fade-down':
      initial = { opacity: 0, y: -30 };
      break;
    case 'fade-left':
      initial = { opacity: 0, x: -30 };
      break;
    case 'fade-right':
      initial = { opacity: 0, x: 30 };
      break;
    case 'zoom-in':
      initial = { opacity: 0, scale: 0.95 };
      break;
    case 'zoom-out':
      initial = { opacity: 0, scale: 1.05 };
      break;
    default:
      initial = { opacity: 0, y: 30 };
  }
  
  // Animate to normal position when in view
  const animate = isInView ? { 
    opacity: 1, 
    y: 0, 
    x: 0, 
    scale: 1, 
    transition: { 
      duration, 
      delay,
      ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smooth easing
    }
  } : initial;
  
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      className={`scroll-reveal ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
