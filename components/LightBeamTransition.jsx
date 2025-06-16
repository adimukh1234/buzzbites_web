'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Particle = ({ delay, duration, startX, endX }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-red-400 rounded-full opacity-60"
      initial={{
        x: startX,
        y: 0,
        opacity: 0,
        scale: 0
      }}
      animate={{
        x: endX,
        y: [-20, -40, -60, -80, -100],
        opacity: [0, 1, 1, 1, 0],
        scale: [0, 1, 1.2, 1, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        filter: 'drop-shadow(0 0 4px rgba(255, 0, 0, 0.6))'
      }}
    />
  );
};

const LightBeam = ({ direction = 'up' }) => {
  const beamVariants = {
    hidden: {
      scaleY: 0,
      opacity: 0,
    },
    visible: {
      scaleY: 1,
      opacity: [0, 0.8, 0.6, 0.8, 0.4],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={`absolute ${direction === 'up' ? 'bottom-0' : 'top-0'} left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-${direction === 'up' ? 't' : 'b'} from-transparent via-red-500 to-transparent`}
      style={{
        height: '100px',
        filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.8))'
      }}
      variants={beamVariants}
      initial="hidden"
      animate="visible"
    />
  );
};

export default function LightBeamTransition() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [animationKey, setAnimationKey] = useState(0);

  // Restart animation when component comes into view
  useEffect(() => {
    if (isInView) {
      setAnimationKey(prev => prev + 1);
    }
  }, [isInView]);

  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: i * 0.3,
      duration: 5 + Math.random() * 3,
      startX: -400 + Math.random() * 800,
      endX: -400 + Math.random() * 800,
      amplitude: 20 + Math.random() * 40
    }));
  }, [animationKey]);

  return (
    <div ref={ref} className="relative w-full h-48 bg-transparent overflow-hidden">
      {/* Background gradient transition */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-red-900/10 to-black/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      >
        {/* Main central light beam */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-red-500/80 via-red-400/60 to-transparent"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ 
            scaleY: isInView ? 1 : 0, 
            opacity: isInView ? [0, 1, 0.8, 1, 0.6] : 0 
          }}
          transition={{
            scaleY: { duration: 2, ease: "easeOut" },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            filter: 'drop-shadow(0 0 12px rgba(255, 0, 0, 0.8))',
            transformOrigin: 'top'
          }}
        />
      </motion.div>

      {/* Animated particles flowing upward */}
      <div className="absolute inset-0">
        {isInView && particles.map((particle) => (
          <motion.div
            key={`${particle.id}-${animationKey}`}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,100,100,0.4) 70%, transparent 100%)',
              filter: 'drop-shadow(0 0 6px rgba(255, 0, 0, 0.6))'
            }}
            initial={{
              x: particle.startX,
              y: 200,
              opacity: 0,
              scale: 0
            }}
            animate={{
              x: [
                particle.startX,
                particle.startX + Math.sin(particle.delay) * particle.amplitude,
                particle.endX
              ],
              y: [200, 100, 0, -50],
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1.5, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Horizontal light streaks at different heights */}
      {[0.3, 0.5, 0.7].map((position, index) => (
        <motion.div
          key={index}
          className="absolute left-0 w-full h-px"
          style={{ 
            top: `${position * 100}%`,
            background: 'linear-gradient(to right, transparent, rgba(255,0,0,0.6), transparent)',
            filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))'
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ 
            opacity: isInView ? [0.3, 0.8, 0.3] : 0,
            scaleX: isInView ? [0.3, 1, 0.3] : 0
          }}
          transition={{
            duration: 3 + index * 0.5,
            delay: index * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating energy orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`orb-${i}-${animationKey}`}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            background: 'radial-gradient(circle, rgba(255,0,0,0.9) 0%, rgba(255,100,100,0.3) 70%, transparent 100%)',
            filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.8))'
          }}
          initial={{
            y: 200,
            opacity: 0,
            scale: 0
          }}
          animate={isInView ? {
            y: [-20, -180],
            opacity: [0, 1, 1, 0],
            scale: [0.3, 1, 1.2, 0],
            rotate: [0, 180, 360]
          } : {}}
          transition={{
            duration: 4 + i * 0.3,
            delay: i * 0.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Central pulse effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(255,0,0,0.5) 50%, transparent 100%)',
          filter: 'drop-shadow(0 0 16px rgba(255, 0, 0, 1))'
        }}
        animate={isInView ? {
          scale: [1, 2, 1],
          opacity: [0.8, 0.3, 0.8]
        } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Ambient background glow */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,0,0,0.15) 0%, rgba(255,0,0,0.05) 50%, transparent 100%)'
        }}
        animate={isInView ? {
          opacity: [0.3, 0.6, 0.3]
        } : { opacity: 0 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
