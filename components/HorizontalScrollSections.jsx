'use client';

import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
  // Configure ScrollTrigger defaults
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
  });
}

// Create a context for sharing scroll and animation state
const ScrollContext = createContext({
  isReady: false,
  registerSection: () => {},
  refreshScrollTrigger: () => {},
});

// Hook for components to access the scroll context
const useScrollContext = () => useContext(ScrollContext);

// Heavy Typography Animation Component
const AnimatedText = ({ text, className, delay = 0, stagger = 0.1 }) => {
  const words = text.split(' ');
  
  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2 md:mr-4"
          initial={{ 
            y: 100, 
            opacity: 0, 
            rotateX: -90,
            filter: 'blur(10px)'
          }}
          whileInView={{ 
            y: 0, 
            opacity: 1, 
            rotateX: 0,
            filter: 'blur(0px)'
          }}          transition={{
            duration: 0.4, // Faster animation
            delay: delay + (index * stagger * 0.5), // Reduce stagger delay multiplication
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 150 // Higher stiffness for faster spring
          }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

// Character-by-character animation for emphasis
const CharacterAnimation = ({ text, className, delay = 0 }) => {
  const chars = text.split('');
  
  return (
    <div className={className}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ 
            y: 200, 
            opacity: 0, 
            scale: 0.3,
            rotateY: 180
          }}
          whileInView={{ 
            y: 0, 
            opacity: 1, 
            scale: 1,
            rotateY: 0
          }}          transition={{
            duration: 0.3, // Faster animation
            delay: delay + (index * 0.015), // Cut stagger delay in half
            ease: "back.out(1.7)",
            type: "spring",
            stiffness: 300 // Higher stiffness for faster spring
          }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

// What Drives Us Section
const WhatDrivesUsSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;
    
    // Enhanced scroll-synced animations with faster timing
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom-=15%',
        end: 'bottom top+=15%',
        scrub: 0.5, // Faster scrubbing for quicker scroll synchronization
        markers: false, // Set to true for debugging
        toggleActions: 'play none none reverse',
        invalidateOnRefresh: true, // More reliable on resize
        anticipatePin: 1 // Small performance enhancement
      }
    });
    
    // More advanced scroll-synchronized animations with reduced durations
    scrollTl
      // Background animations - faster
      .fromTo('.grid-background', 
        { opacity: 0.05, scale: 1.1, filter: 'blur(3px)' },
        { opacity: 0.15, scale: 1, filter: 'blur(0px)', duration: 0.7 }, 0)
      // Title container animations with faster timing
      .fromTo('.drives-title-container', 
        { y: 80, opacity: 0.5 }, 
        { y: 0, opacity: 1, duration: 0.6 }, 0.1)
      // Gradient animations - faster
      .fromTo('.section-title-gradient', 
        { backgroundPosition: '0% 50%' },
        { backgroundPosition: '100% 50%', duration: 1.2 }, 0)
      // Value icons animation with faster staggered timing
      .fromTo('.value-icon', 
        { y: 50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.1 }, 0.2);    // More dynamic floating elements animation with faster randomization
    gsap.to('.floating-element', {
      y: 'random(-70, 70)',
      x: 'random(-50, 50)',
      rotation: 'random(-20, 20)',
      duration: 'random(2.5, 4.5)', // Cut duration in half
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.15, // Faster stagger
      force3D: true // GPU acceleration
    });

    return () => {
      scrollTl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isMounted]);  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden py-16"
    >      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10 grid-background">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {[...Array(96)].map((_, i) => (
              <motion.div
                key={i}
                className="border border-blue-500/20"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating elements */}
        {isMounted && [...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`floating-element absolute w-2 h-2 bg-gradient-to-r ${
              i % 3 === 0 ? 'from-blue-400 to-cyan-400' :
              i % 2 === 0 ? 'from-purple-400 to-pink-400' :
              'from-green-400 to-blue-400'
            } rounded-full blur-sm`}
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}

        {/* Gradient overlays */}        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10 section-title-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />
      </div>      {/* Content Container */}      <div 
        ref={containerRef}
        className="relative z-10 min-h-screen flex items-center drives-title-container"
      >
        <div className="w-full px-8 md:px-16 lg:px-24 py-24">
          {/* Section Label */}          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse" />
              <span className="text-blue-300 font-medium text-sm md:text-base tracking-wider uppercase">
                What Drives Us
              </span>
            </div>
          </motion.div>

          {/* Main Title with Heavy Animation */}
          <div className="mb-12">
            <CharacterAnimation
              text="Built with"
              className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-4 leading-none"
              delay={0.5}
            />            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <CharacterAnimation
                text="Belief."
                className="text-4xl md:text-6xl lg:text-8xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 leading-none"
                delay={1.8}
              />
              {/* Animated underline */}                <motion.div
                  className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.7, delay: 1.2 }}
                  viewport={{ once: false, amount: 0.3 }}
              />
            </motion.div>
            <CharacterAnimation
              text="Backed by"
              className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-4 leading-none"
              delay={2.8}
            />
            <CharacterAnimation
              text="Experience."
              className="text-4xl md:text-6xl lg:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent leading-none"
              delay={3.5}
            />
          </div>

          {/* Description */}
          <div className="max-w-2xl">
            <AnimatedText
              text="Our founders bring over a decade of experience in building media-tech platforms and scalable digital ecosystems."
              className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6"
              delay={4.5}
              stagger={0.08}
            />
            <AnimatedText
              text="Buzzbites is driven by simplicity, impact, and people-first innovation."
              className="text-xl md:text-2xl text-blue-200 leading-relaxed font-medium"
              delay={5.5}
              stagger={0.08}
            />
          </div>

          {/* Decorative elements */}          <motion.div
            className="mt-16 flex space-x-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 3 }} 
            viewport={{ once: false, amount: 0.3 }}
          >
            {['Simplicity', 'Impact', 'Innovation'].map((value, index) => (
              <motion.div
                key={value}
                className="text-center value-icon"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <div className="w-8 h-8 bg-white rounded-full opacity-80" />
                </div>
                <p className="text-gray-400 text-sm font-medium">{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Let's Talk Section
const LetsTalkSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;
      // Enhanced scroll-synced animations with advanced parallax - faster timing
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom-=15%', // Start slightly earlier
        end: 'center top', // End at a more natural position
        scrub: 0.5, // Faster scrubbing for quicker animation
        markers: false, // Set to true for debugging
        toggleActions: 'play none none reverse',
        invalidateOnRefresh: true,
        onEnter: () => console.log("Let's Talk section entered view")
      }
    });
    
    // Add more sophisticated scroll-synchronized animations with faster timing
    scrollTl
      // Enhanced background animations with perspective - faster
      .fromTo('.contact-section-bg', 
        { opacity: 0.2, scale: 1.15, filter: 'blur(4px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1 }, 0)
      
      // Gradient overlay animation - faster
      .fromTo('.contact-gradient-overlay',
        { opacity: 0.1, backgroundPosition: '0% 0%' },
        { opacity: 0.4, backgroundPosition: '100% 100%', duration: 1.5 }, 0)
      
      // Title container with faster entrance
      .fromTo('.contact-title-container', 
        { y: 60, opacity: 0.5, rotateX: 5 }, 
        { y: 0, opacity: 1, rotateX: 0, duration: 0.7 }, 0.1)
      
      // Staggered particle entrance - faster
      .fromTo('.contact-particle', 
        { opacity: 0.2, scale: 0.4 }, 
        { 
          opacity: 0.8, 
          scale: 1, 
          stagger: {
            each: 0.04, // Faster stagger
            from: "random",
            grid: "auto"
          }, 
          duration: 0.5 
        }, 0.2)
      
      // Contact methods animation - faster
      .fromTo('.contact-method', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, 0.3)
      
      // CTA button entrance - faster
      .fromTo('.contact-cta', 
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 }, 0.4);    // More dynamic particle system with faster flow and randomization
    gsap.to('.contact-particle', {
      y: 'random(-120, 120)',
      x: 'random(-100, 100)',
      rotation: 'random(0, 360)',
      scale: 'random(0.6, 2)',
      duration: 'random(2.5, 6)', // Cut duration in half
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.08, // Faster stagger
        from: "random",
        grid: "auto"
      },
      force3D: true // GPU acceleration
    });

    return () => {
      scrollTl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isMounted]);

  const handleContactClick = () => {
    // Add your contact logic here
    console.log('Contact button clicked');
  };  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-l from-black via-purple-900/20 to-black overflow-hidden py-16"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30 contact-section-bg">
          <div 
            className="w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)
              `
            }}
          />
        </div>

        {/* Contact particles */}
        {isMounted && [...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`contact-particle absolute rounded-full ${
              i % 4 === 0 ? 'w-3 h-3 bg-purple-400' :
              i % 3 === 0 ? 'w-2 h-2 bg-pink-400' :
              i % 2 === 0 ? 'w-4 h-4 bg-blue-400' :
              'w-1 h-1 bg-cyan-400'
            } blur-sm`}
            style={{
              left: `${5 + (i * 8)}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
          />
        ))}        {/* Dynamic gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 contact-gradient-overlay"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>      {/* Content Container */}      <div 
        ref={containerRef}
        className="relative z-10 min-h-screen flex items-center justify-end contact-title-container"
      >
        <div className="w-full px-8 md:px-16 lg:px-24 py-24 text-right">
          {/* Section Label */}          <motion.div
            className="mb-8 flex justify-end"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
              <span className="text-purple-300 font-medium text-sm md:text-base tracking-wider uppercase mr-3">
                Let's Talk
              </span>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            </div>
          </motion.div>

          {/* Main Title with Heavy Animation */}
          <div className="mb-12">
            <CharacterAnimation
              text="Connect"
              className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-4 leading-none"
              delay={0.5}
            />            <motion.div
              className="relative flex justify-end"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div>
                <CharacterAnimation
                  text="With Us"
                  className="text-4xl md:text-6xl lg:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-none"
                  delay={1.8}
                />
                {/* Animated underline */}                <motion.div
                  className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.7, delay: 1.2 }}
                  viewport={{ once: false, amount: 0.3 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <div className="max-w-2xl ml-auto mb-12">
            <AnimatedText
              text="Whether you're curious about our story, want to partner, or just say hello — we'd love to hear from you."
              className="text-xl md:text-2xl text-gray-300 leading-relaxed"
              delay={3.5}
              stagger={0.08}
            />
          </div>

          {/* CTA Button */}          <motion.div
            className="flex justify-end contact-cta"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.button
              className="group relative overflow-hidden px-12 py-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-2xl border-2 border-white/10 backdrop-blur-sm"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleContactClick}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-pink-500/30 to-purple-400/30"
                animate={{
                  x: isHovered ? ['100%', '-100%'] : '100%'
                }}              transition={{
                  x: {
                    duration: 0.8,
                    repeat: isHovered ? Infinity : 0,
                    ease: 'linear'
                  }
                }}
              />

              {/* Particle burst on hover */}
              {isHovered && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      initial={{ scale: 0, x: '-50%', y: '-50%' }}
                      animate={{
                        scale: [0, 1, 0],
                        x: `${-50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                        y: `${-50 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
                      }}                      transition={{
                        duration: 0.3,
                        repeat: Infinity,
                        delay: i * 0.05
                      }}
                    />
                  ))}
                </>
              )}

              {/* Button content */}
              <span className="relative z-10 flex items-center">
                <span className="mr-3">🔘</span>
                <span>Contact Us</span>
                <motion.div
                  className="ml-3"
                  animate={{
                    x: isHovered ? [0, 5, 0] : 0
                  }}                  transition={{
                    duration: 0.3,
                    repeat: isHovered ? Infinity : 0
                  }}
                >
                  →
                </motion.div>
              </span>

              {/* Ripple effect on click */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 0, opacity: 0.5 }}
                whileTap={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ background: 'rgba(255, 255, 255, 0.3)' }}
              />
            </motion.button>
          </motion.div>

          {/* Contact methods */}          <motion.div
            className="mt-12 flex justify-end space-x-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {[
              { icon: '📧', label: 'Email' },
              { icon: '📱', label: 'Phone' },
              { icon: '💬', label: 'Chat' }
            ].map((method, index) => (                <motion.div
                key={method.label}
                className="text-center cursor-pointer contact-method"
                whileHover={{ scale: 1.1, y: -3 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <span className="text-xl">{method.icon}</span>
                </div>
                <p className="text-gray-400 text-xs font-medium">{method.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Debug Panel Component (only visible in development)
const DebugPanel = ({ isVisible = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({
    triggers: 0,
    markers: false,
    animations: 0
  });
  
  useEffect(() => {
    if (isVisible && typeof window !== 'undefined') {
      const interval = setInterval(() => {
        const triggers = ScrollTrigger.getAll().length;
        const markers = ScrollTrigger.defaults().markers;
        const animations = gsap.globalTimeline.getChildren().length;
        
        setStats({
          triggers,
          markers,
          animations
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  if (!isVisible || typeof window === 'undefined' || process.env.NODE_ENV === 'production') {
    return null;
  }

  const toggleScrollTriggerMarkers = () => {
    ScrollTrigger.defaults({ markers: !ScrollTrigger.defaults().markers });
    ScrollTrigger.refresh(true);
  };

  const refreshScrollTrigger = () => {
    ScrollTrigger.refresh(true);
  };
  
  const killAllAnimations = () => {
    ScrollTrigger.getAll().forEach(st => st.kill());
    gsap.globalTimeline.clear();
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };
  
  const adjustScrubValue = (value) => {
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.scrub) {
        st.vars.scrub = value;
        st.refresh();
      }
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-red-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
      >
        🔧
      </button>
      
      {isOpen && (
        <div className="bg-black/80 backdrop-blur-md border border-red-500/30 p-4 rounded-lg mt-2 w-72">
          <h3 className="text-white text-sm font-bold mb-2">Scroll Animations Debug</h3>
          
          <div className="mb-4 text-xs text-gray-400">
            <div className="flex justify-between mb-1">
              <span>Active Triggers:</span>
              <span className={stats.triggers > 10 ? 'text-red-400' : 'text-green-400'}>
                {stats.triggers}
              </span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Markers:</span>
              <span className={stats.markers ? 'text-yellow-400' : 'text-gray-400'}>
                {stats.markers ? 'ON' : 'OFF'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Active Animations:</span>
              <span className={stats.animations > 20 ? 'text-red-400' : 'text-green-400'}>
                {stats.animations}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={toggleScrollTriggerMarkers} 
              className="bg-yellow-700 hover:bg-yellow-600 text-white text-xs p-2 rounded w-full"
            >
              Toggle Markers {stats.markers ? '(ON)' : '(OFF)'}
            </button>
            <button 
              onClick={refreshScrollTrigger} 
              className="bg-blue-700 hover:bg-blue-600 text-white text-xs p-2 rounded w-full"
            >
              Refresh ScrollTrigger
            </button>
            
            <div className="pt-2 pb-1">
              <p className="text-xs text-gray-400 mb-1">Adjust Animation Smoothness:</p>
              <div className="flex space-x-2">                <button 
                  onClick={() => adjustScrubValue(0.2)} 
                  className="bg-purple-800 hover:bg-purple-700 text-white text-xs py-1 px-2 rounded flex-1"
                >
                  Faster
                </button>
                <button 
                  onClick={() => adjustScrubValue(0.5)} 
                  className="bg-purple-800 hover:bg-purple-700 text-white text-xs py-1 px-2 rounded flex-1"
                >
                  Normal
                </button>
                <button 
                  onClick={() => adjustScrubValue(1)} 
                  className="bg-purple-800 hover:bg-purple-700 text-white text-xs py-1 px-2 rounded flex-1"
                >
                  Slower
                </button>
              </div>
            </div>
            
            <button 
              onClick={killAllAnimations} 
              className="bg-red-700 hover:bg-red-600 text-white text-xs p-2 rounded w-full mt-4"
            >
              Kill All & Reload
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Component - converted to vertical scrolling
const HorizontalScrollSections = () => {
  const [showDebug] = useState(false); // Change to true for debugging
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Initialize GSAP properly on component mount
    if (typeof window !== 'undefined') {
      // Wait for component to fully render before initializing ScrollTrigger
      const readyTimer = setTimeout(() => {
        setIsReady(true);
        console.log("Vertical scroll sections initialized");
        
        // Force ScrollTrigger to refresh with appropriate timing
        setTimeout(() => {
          ScrollTrigger.refresh(true);
            // Configure default scrub value for faster animations
          ScrollTrigger.defaults({ 
            scrub: 0.5, // Faster scrub for quicker response
            anticipatePin: 1
          });
        }, 300);
      }, 100);
      
      // Cleanup on component unmount
      return () => {
        clearTimeout(readyTimer);
        
        // More comprehensive cleanup to prevent memory leaks
        ScrollTrigger.getAll().forEach(st => {
          st.kill();
          st.scroll(0);
        });
        
        // Remove any listeners and clear timelines
        ScrollTrigger.clearMatchMedia();
        ScrollTrigger.clearScrollMemory();
        gsap.killTweensOf("*");
        
        console.log("Vertical scroll sections cleaned up");
      };
    }
  }, []);
  
  // Handle window resize to refresh ScrollTrigger
  useEffect(() => {
    if (typeof window !== 'undefined' && isReady) {
      const handleResize = () => {
        // Debounce resize events
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
          console.log("Window resized, refreshing ScrollTrigger");
          ScrollTrigger.refresh(true);
        }, 250);
      };

      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(window.resizeTimer);
      };
    }
  }, [isReady]);
  
  return (
    <div className="relative w-full">
      <WhatDrivesUsSection />
      <LetsTalkSection />
      <DebugPanel isVisible={showDebug} />
    </div>
  );
};

export default HorizontalScrollSections;
