'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollLightBeam() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to light beam animations
  const beamProgress = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const particleOffset = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[200px] bg-black overflow-hidden flex items-center justify-center"
      style={{ margin: 0, padding: 0 }}
    >
      {/* Main Vertical Light Beam - Diamond/Hourglass Shape */}
      <motion.div
        className="absolute left-1/2 top-0 w-[4px] h-full transform -translate-x-1/2"
        style={{
          background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.9) 0%, rgba(139, 92, 246, 0.7) 50%, rgba(59, 130, 246, 0.9) 100%)',
          opacity: beamProgress,
          clipPath: 'polygon(40% 0%, 60% 0%, 80% 30%, 80% 70%, 60% 100%, 40% 100%, 20% 70%, 20% 30%)',
          boxShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.6)',
          filter: 'blur(1px)',
        }}
      />

      {/* Wider Outer Glow - More spread at top and bottom */}
      <motion.div
        className="absolute left-1/2 top-0 w-[20px] h-full transform -translate-x-1/2"
        style={{
          background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.4) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(59, 130, 246, 0.4) 100%)',
          opacity: glowIntensity,
          clipPath: 'polygon(30% 0%, 70% 0%, 90% 25%, 90% 75%, 70% 100%, 30% 100%, 10% 75%, 10% 25%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Even Wider Ambient Glow */}
      <motion.div
        className="absolute left-1/2 top-0 w-[40px] h-full transform -translate-x-1/2"
        style={{
          background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(59, 130, 246, 0.2) 100%)',
          opacity: glowIntensity,
          clipPath: 'polygon(20% 0%, 80% 0%, 95% 20%, 95% 80%, 80% 100%, 20% 100%, 5% 80%, 5% 20%)',
          filter: 'blur(15px)',
        }}
      />

      {/* Animated Particles flowing vertically */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${48 + Math.sin(i) * 4}%`,
            top: `${10 + i * 6}%`,
            opacity: glowIntensity,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          }}
          animate={{
            y: [0, 300],
            scale: [0.5, 1.2, 0.5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            y: { duration: 3 + i * 0.2, ease: "linear", repeat: Infinity },
            scale: { duration: 2 + i * 0.1, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            delay: i * 0.1,
          }}
        />
      ))}

      {/* Flowing Energy Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`energy-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `radial-gradient(circle, 
              ${i % 2 === 0 ? 'rgba(59, 130, 246, 0.8)' : 'rgba(139, 92, 246, 0.8)'} 0%, 
              transparent 70%
            )`,
            left: `${46 + i * 1}%`,
            top: `${5 + i * 10}%`,
            opacity: beamProgress,
            boxShadow: `0 0 15px ${i % 2 === 0 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(139, 92, 246, 0.6)'}`,
          }}
          animate={{
            y: [0, 250],
            x: [0, Math.sin(i) * 10, 0],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            y: { duration: 4 + i * 0.3, ease: "linear", repeat: Infinity },
            x: { duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 1.5 + i * 0.2, repeat: Infinity, ease: "easeInOut" },
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Vertical light streaks */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          className="absolute w-px bg-gradient-to-b from-blue-400 via-purple-400 to-transparent"
          style={{
            left: `${48 + i * 1}%`,
            top: `${Math.random() * 20}%`,
            height: `${60 + Math.random() * 40}%`,
            opacity: 0.6,
          }}
          animate={{
            y: [0, 200],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            y: { duration: 2 + Math.random() * 2, ease: "linear", repeat: Infinity },
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Top expansion glow */}
      <motion.div
        className="absolute top-0 left-1/2 w-[100px] h-[50px] transform -translate-x-1/2"
        style={{
          background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 80%)',
          opacity: glowIntensity,
        }}
      />

      {/* Bottom expansion glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-[100px] h-[50px] transform -translate-x-1/2"
        style={{
          background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 80%)',
          opacity: glowIntensity,
        }}
      />

      {/* Additional small particles for depth */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`small-${i}`}
          className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full"
          style={{
            left: `${40 + Math.random() * 20}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.4,
          }}
          animate={{
            y: [0, 150],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            y: { duration: 5 + Math.random() * 3, ease: "linear", repeat: Infinity },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Sparkle effects at connection points */}
      <motion.div
        className="absolute top-2 left-1/2 w-6 h-6 bg-blue-400/40 rounded-full transform -translate-x-1/2"
        style={{
          opacity: beamProgress,
          filter: 'blur(2px)'
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-2 left-1/2 w-6 h-6 bg-blue-400/40 rounded-full transform -translate-x-1/2"
        style={{
          opacity: beamProgress,
          filter: 'blur(2px)'
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 1.5,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
