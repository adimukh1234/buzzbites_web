'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxSection({ 
  children, 
  offset = 0.5,  // How much parallax effect to apply (0-1)
  direction = 'up', // up, down, left, right
  className = "",
  ...props 
}) {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] // Start when the section enters viewport, end when it leaves
  });

  // Calculate transform values based on direction
  let transform = {};
  const distance = 100 * offset; // Base distance in pixels

  switch(direction) {
    case 'up':
      transform.y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
      break;
    case 'down':
      transform.y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
      break;
    case 'left':
      transform.x = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
      break;
    case 'right':
      transform.x = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
      break;
    default:
      transform.y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  }

  // Add opacity effect
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        ...transform, 
        opacity,
        willChange: "transform, opacity"
      }}
      className={`parallax-section ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
