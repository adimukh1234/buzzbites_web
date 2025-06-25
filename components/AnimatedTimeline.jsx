'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const timelineData = [
  {
    year: '2018',
    title: 'Buzzbites founded in Kolkata',
    description: 'Our journey began in the vibrant city of Kolkata, where we planted the seeds of innovation and creativity.',
    icon: '🌱',
    position: 'left'
  },
  {
    year: '2019',
    title: 'Launched OTT & video-on-demand platforms',
    description: 'We expanded into the entertainment industry, creating cutting-edge streaming solutions that captivated audiences.',
    icon: '📺',
    position: 'right'
  },
  {
    year: '2021',
    title: 'Pivoted from service to product company',
    description: 'A strategic transformation that marked our evolution from service provider to product innovator.',
    icon: '🔄',
    position: 'left'
  },
  {
    year: '2022',
    title: 'Instacon goes live',
    description: 'Our flagship product launched, revolutionizing how businesses connect and engage with their audiences.',
    icon: '🚀',
    position: 'right'
  },
  {
    year: '2024',
    title: 'Over 5k+ active users, growing adoption across India',
    description: 'Achieved remarkable growth with thousands of active users and expanding reach across the Indian market.',
    icon: '📈',
    position: 'left'
  }
];

const TimelineItem = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const itemRef = useRef(null);  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;

    const element = itemRef.current;
    if (!element) return;

    // Improved scroll-triggered animation with better synchronization
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none reverse',
        scrub: 0.5, // Smooth scrubbing for better scroll sync
        onUpdate: (self) => {
          // Continuous animation based on scroll progress
          const progress = self.progress;
          gsap.to(element, {
            scale: 1 + (progress * 0.05),
            duration: 0.1,
            ease: 'none'
          });
        }
      }
    });

    // Smoother entrance animation with better timing
    const direction = item.position === 'left' ? -150 : 150;
    const rotationStart = item.position === 'left' ? -8 : 8;
    
    tl.fromTo(element, 
      {
        x: direction,
        y: 80,
        opacity: 0,
        scale: 0.8,
        rotation: rotationStart,
        filter: 'blur(8px)'
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power3.out'
      }
    )
    .fromTo(element.querySelector('.timeline-icon'),
      {
        scale: 0,
        rotation: 180,
        y: -30
      },
      {
        scale: 1,
        rotation: 0,
        y: 0,
        duration: 1,
        ease: 'back.out(1.2)'
      }, '-=1'
    )
    .fromTo(element.querySelector('.timeline-content'),
      {
        y: 30,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.8')
    .fromTo(element.querySelectorAll('.timeline-detail'),
      {
        y: 15,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power1.out'
      }, '-=0.5');

    // Improved parallax with smoother scrolling
    gsap.to(element, {
      y: index * -20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5, // Smoother scrubbing
      }
    });

    // Add subtle float animation
    gsap.to(element, {
      y: "+=10",
      duration: 3 + (index * 0.5),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [item.position, index]);
  return (
    <motion.div
      ref={ref}
      className={`timeline-item flex items-center justify-center relative ${
        item.position === 'left' ? 'md:justify-start' : 'md:justify-end'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div
        ref={itemRef}
        data-speed={index * 0.1}
        className={`relative max-w-lg mx-4 ${
          item.position === 'left' ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >        {/* Year floating element with enhanced effects */}
        <motion.div
          className="timeline-year absolute -top-8 left-0 text-6xl md:text-9xl font-black text-white/5 pointer-events-none z-0"
          animate={isMounted ? {
            y: isInView ? [-8, 8, -8] : 0,
            rotate: isInView ? [0, 1, 0, -1, 0] : 0,
            scale: isHovered ? 1.05 : 1
          } : {}}
          transition={{
            y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 0.3, ease: 'easeOut' }
          }}
        >
          {item.year}
        </motion.div>        {/* Dynamic connection line */}
        <motion.div 
          className={`hidden md:block absolute top-1/2 w-24 h-1 rounded-full ${
            item.position === 'left' 
              ? 'right-0 translate-x-full' 
              : 'left-0 -translate-x-full'
          }`}
          initial={{ 
            background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)' 
          }}
          animate={isMounted ? { 
            background: isInView 
              ? `linear-gradient(90deg, transparent, ${item.position === 'left' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(147, 51, 234, 0.8)'}, transparent)`
              : 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)'
          } : {}}
          transition={{ duration: 1 }}
        />        {/* Main content card with enhanced styling */}
        <motion.div 
          className="timeline-content relative z-10 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
          animate={isMounted ? {
            scale: isHovered ? 1.02 : 1,
            y: isHovered ? -5 : 0
          } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >{/* Animated background patterns */}
          <div className="absolute inset-0 opacity-20">
            {isMounted && [...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 10}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 2 + i,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>          {/* Enhanced glow effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-xl"
            animate={isMounted ? {
              opacity: isHovered ? 0.8 : 0.4,
              scale: isHovered ? 1.1 : 1
            } : {}}
            transition={{ duration: 0.3 }}
          />
          
          <div className="relative z-10">            {/* Enhanced Icon with rotation */}
            <motion.div 
              className="timeline-icon w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-lg"
              animate={isMounted ? {
                rotate: isHovered ? 180 : 0,
                scale: isHovered ? 1.05 : 1
              } : {}}
              transition={{ 
                rotate: { duration: 0.8, ease: 'easeInOut' },
                scale: { duration: 0.3, ease: 'easeOut' }
              }}
            >
              {item.icon}
            </motion.div>            {/* Year badge with pulse */}
            <motion.div 
              className="timeline-detail inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold mb-4"
              animate={isMounted ? {
                boxShadow: isInView 
                  ? ['0 0 0 0 rgba(59, 130, 246, 0.4)', '0 0 0 10px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0)']
                  : '0 0 0 0 rgba(59, 130, 246, 0)'
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {item.year}
            </motion.div>

            {/* Enhanced Title */}
            <h3 className="timeline-detail text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
              {item.title}
            </h3>

            {/* Enhanced Description */}
            <p className="timeline-detail text-gray-300 text-sm md:text-base leading-relaxed">
              {item.description}
            </p>            {/* Progress bar */}
            <motion.div 
              className="timeline-detail mt-4 h-1 bg-gray-700 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={isMounted ? { width: isInView ? '100%' : '0%' } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ x: '-100%' }}
                animate={isMounted ? { x: isInView ? '0%' : '-100%' } : {}}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
            </motion.div>
          </div>          {/* Enhanced decorative elements */}
          <motion.div 
            className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full"
            animate={isMounted ? {
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full"
            animate={isMounted ? {
              scale: [1, 1.8, 1],
              opacity: [0.4, 1, 0.4]
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const AnimatedTimeline = () => {
  const containerRef = useRef(null);  const timelineLineRef = useRef(null);
  const timelineContentRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState([]);  // Create a more aggressive scroll monitoring for the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%']  // Start earlier and end later for full line coverage
  });

  // Make the line move AHEAD of the scroll - critical change to ensure line reaches end before final content
  const lineHeight = useTransform(scrollYProgress, [0, 0.7], ['0%', '100%']);  const springLineHeight = useSpring(lineHeight, { 
    stiffness: 40,  // Very low stiffness for super smooth motion
    damping: 10,    // Lower damping for quicker response
    mass: 0.5,      // Lighter mass for faster response
    restDelta: 0.0001 // More precise resting position
  });

  // Generate deterministic particles on mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    
    // Generate particles with deterministic positions using index
    const generatedParticles = Array.from({ length: 25 }, (_, i) => {
      // Use index to create predictable but varied positions
      const seed = i * 137.508; // Golden angle for better distribution
      return {
        id: i,
        left: (seed % 100),
        top: ((seed * 1.618) % 100),
        type: i % 4 === 0 ? 'purple' : i % 3 === 0 ? 'blue' : 'cyan',
        size: i % 4 === 0 ? 'w-2 h-2' : i % 3 === 0 ? 'w-1.5 h-1.5' : 'w-1 h-1'
      };
    });
    
    setParticles(generatedParticles);
  }, []);  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;

    // Improved floating particles animation with better performance
    const particles = document.querySelectorAll('.floating-particle');
    particles.forEach((particle, index) => {
      const isLarge = index % 3 === 0;
      gsap.set(particle, {
        scale: isLarge ? 1.2 : 0.8,
        opacity: isLarge ? 0.6 : 0.3
      });
      
      gsap.to(particle, {
        y: 'random(-100, 100)',
        x: 'random(-60, 60)',
        rotation: 'random(0, 180)',
        scale: isLarge ? 'random(1, 1.5)' : 'random(0.6, 1)',
        duration: 'random(6, 12)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2
      });
    });

    // Smoother title animation sequence with better scroll sync
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'top 50%',
        scrub: 1,
        once: false
      }
    });

    titleTl.fromTo('.timeline-title',
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationX: 20
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.5,
        ease: 'power2.out'
      }
    )
    .fromTo('.timeline-subtitle',
      {
        y: 50,
        opacity: 0,
        filter: 'blur(5px)'
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out'
      }, '-=1')
    .fromTo('.timeline-decoration',
      {
        scale: 0,
        rotation: 90
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(1.2)',
        stagger: 0.15
      }, '-=0.8');    // Smoother parallax background elements
    gsap.to('.bg-element', {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2
      }    
    });    // Create a direct GSAP animation for the timeline line that finishes BEFORE the last item is reached
    // Critical fix to ensure timeline completes before we reach final content
    gsap.to(timelineLineRef.current, {
      height: "100%",
      ease: "power1.inOut", // Smoothed ease function to accelerate properly 
      scrollTrigger: {
        trigger: timelineContentRef.current,
        start: "top 80%", 
        end: "80% center", // End much earlier than content bottom to complete line first
        scrub: 0.3, // Faster scrub for quicker response
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          // Force full height at 70% progress - this ensures line completion before final card
          if (self.progress > 0.7) {
            gsap.set(timelineLineRef.current, { height: "100%" });
          }
        }
      }
    });

  }, [isMounted]);

  // Extra guarantee that the timeline will completely fill when scrolled to bottom  // This useEffect ensures that when the second-to-last timeline item becomes visible,
  // the timeline line reaches 100% immediately
  useEffect(() => {
    if (!timelineLineRef.current || !isMounted) return;
    
    // Create a more aggressive observer for second-to-last item visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // When second-to-last item is even partially in view, force timeline to 100%
          if (entry.isIntersecting) {
            gsap.to(timelineLineRef.current, { 
              height: '100%', 
              duration: 0.3, // Faster animation for immediate feedback
              ease: 'power2.out', // Stronger easing
              overwrite: 'auto'
            });
          }
        });
      },
      { threshold: 0.2 } // Lower threshold so it triggers earlier
    );
    
    // Find the second-to-last timeline item
    const allItems = document.querySelectorAll('.timeline-item');
    if (allItems.length >= 2) {
      const secondToLastItem = allItems[allItems.length - 2]; 
      observer.observe(secondToLastItem);
    }
    
    // Also observe the bottom dot as a fallback
    const bottomDot = document.querySelector('.timeline-bottom-dot');
    if (bottomDot) {
      observer.observe(bottomDot);
    }
    
    return () => {
      if (allItems.length >= 2) {
        const secondToLastItem = allItems[allItems.length - 2];
        observer.unobserve(secondToLastItem);
      }
      
      if (bottomDot) {
        observer.unobserve(bottomDot);
      }
    };
  }, [isMounted]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black py-20 pb-56 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">        {/* Dynamic floating particles with variety */}
        {isMounted && particles.map((particle) => (
          <div
            key={particle.id}
            className={`floating-particle absolute rounded-full ${particle.size} ${
              particle.type === 'purple' ? 'bg-purple-400' : 
              particle.type === 'blue' ? 'bg-blue-400' :
              'bg-cyan-400'
            }`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          ></div>
        ))}
        
        {/* Animated background shapes */}
        <div className="bg-element absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="bg-element absolute bottom-40 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="bg-element absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full"></div>
          {/* Enhanced gradient backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-purple-950/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-24">
          <motion.div
            className="timeline-decoration w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            viewport={{ once: true }}
          />
          
          <motion.h2 
            className="timeline-title text-4xl md:text-6xl lg:text-8xl font-black text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            Our Journey
          </motion.h2>
          
          <motion.p 
            className="timeline-subtitle text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            From Media to Product
          </motion.p>
          
          <motion.div
            className="timeline-decoration w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
            viewport={{ once: true }}
          />
        </div>        {/* Enhanced Timeline container with extra bottom padding to ensure full timeline visibility */}
        <div className="relative mt-16 mb-36 md:mb-40">{/* Central line with dynamic effects - Modified to finish faster than content */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-800/60 rounded-full overflow-hidden" 
               style={{ top: '0px', height: '100%', paddingBottom: '12px' }}>
            <motion.div 
              ref={timelineLineRef}
              className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-400 origin-top rounded-full shadow-lg shadow-blue-500/20"
              style={{ 
                height: springLineHeight, 
                top: 0, 
                transformOrigin: 'top',
                willChange: 'height' // Performance optimization
              }}
            />
            
            {/* Animated orbs along the line */}            <motion.div 
              className="absolute w-2 h-2 bg-white rounded-full shadow-md left-1/2 transform -translate-x-1/2"
              style={{ 
                top: useTransform(springLineHeight, ['0%', '100%'], ['0%', '99%'])
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 1, 0.8],
                boxShadow: [
                  '0 0 0px rgba(255, 255, 255, 0.5)',
                  '0 0 8px rgba(255, 255, 255, 0.8)',
                  '0 0 0px rgba(255, 255, 255, 0.5)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </div>{/* Enhanced central elements - Starting dot */}
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-lg shadow-blue-500/40 z-20"
            style={{ left: 'calc(50% - 10px)' }}
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                '0 0 0 0 rgba(59, 130, 246, 0.4)',
                '0 0 0 15px rgba(59, 130, 246, 0)',
                '0 0 0 0 rgba(59, 130, 246, 0)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}          />          {/* Timeline items - Reduced spacing for better timeline completion */}          <div ref={timelineContentRef} className="space-y-20 md:space-y-28">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>{/* Enhanced bottom dot positioned at the absolute bottom */}
          <motion.div 
            className="hidden md:block timeline-bottom-dot absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg shadow-purple-600/40 z-20"
            style={{ left: 'calc(50% - 10px)', bottom: '0px' }}
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                '0 0 0 0 rgba(147, 51, 234, 0.4)',
                '0 0 0 12px rgba(147, 51, 234, 0)',
                '0 0 0 0 rgba(147, 51, 234, 0)'
              ]
            }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
          />
        </div>
      </div>      {/* Enhanced bottom effects */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[500px] h-80 bg-gradient-radial from-purple-600/15 via-blue-600/8 to-transparent rounded-full blur-3xl"></div>
      <motion.div 
        className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-400/8 rounded-full blur-2xl"
        animate={{
          y: [-15, 15, -15],
          x: [-8, 8, -8],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-32 right-1/4 w-20 h-20 bg-purple-400/8 rounded-full blur-2xl"
        animate={{
          y: [15, -15, 15],
          x: [8, -8, 8],
          scale: [1.1, 1, 1.1]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </section>
  );
};

export default AnimatedTimeline;
