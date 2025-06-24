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
  const itemRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const element = itemRef.current;
    if (!element) return;

    // Create staggered animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          // Add subtle shake animation when entering view
          gsap.to(element, {
            rotation: item.position === 'left' ? 1 : -1,
            duration: 0.1,
            yoyo: true,
            repeat: 3,
            ease: 'power2.inOut'
          });
        }
      }
    });

    // Animate based on position with more dramatic effects
    const direction = item.position === 'left' ? -200 : 200;
    const rotationStart = item.position === 'left' ? -15 : 15;
    
    tl.fromTo(element, 
      {
        x: direction,
        y: 100,
        opacity: 0,
        scale: 0.6,
        rotation: rotationStart,
        filter: 'blur(10px)'
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        filter: 'blur(0px)',
        duration: 1.8,
        ease: 'power4.out'
      }
    )
    .fromTo(element.querySelector('.timeline-icon'),
      {
        scale: 0,
        rotation: 360,
        y: -50
      },
      {
        scale: 1,
        rotation: 0,
        y: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.3)'
      }, '-=1.2'
    )
    .fromTo(element.querySelector('.timeline-content'),
      {
        y: 50,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
    .fromTo(element.querySelectorAll('.timeline-detail'),
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.4');

    // Parallax effect on scroll
    gsap.to(element, {
      y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    return () => {
      tl.kill();
    };
  }, [item.position]);
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
      >
        {/* Year floating element with enhanced effects */}
        <motion.div
          className="timeline-year absolute -top-8 left-0 text-6xl md:text-9xl font-black text-white/5 pointer-events-none z-0"
          animate={{
            y: isInView ? [-15, 15, -15] : 0,
            rotate: isInView ? [0, 2, 0, -2, 0] : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 0.3 }
          }}
        >
          {item.year}
        </motion.div>

        {/* Dynamic connection line */}
        <motion.div 
          className={`hidden md:block absolute top-1/2 w-24 h-1 rounded-full ${
            item.position === 'left' 
              ? 'right-0 translate-x-full' 
              : 'left-0 -translate-x-full'
          }`}
          initial={{ 
            background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)' 
          }}
          animate={{ 
            background: isInView 
              ? `linear-gradient(90deg, transparent, ${item.position === 'left' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(147, 51, 234, 0.8)'}, transparent)`
              : 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)'
          }}
          transition={{ duration: 1 }}
        />

        {/* Main content card with enhanced styling */}
        <motion.div 
          className="timeline-content relative z-10 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
          animate={{
            scale: isHovered ? 1.05 : 1,
            y: isHovered ? -10 : 0
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Animated background patterns */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(5)].map((_, i) => (
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
          </div>

          {/* Enhanced glow effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-xl"
            animate={{
              opacity: isHovered ? 0.8 : 0.4,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          />
          
          <div className="relative z-10">
            {/* Enhanced Icon with rotation */}
            <motion.div 
              className="timeline-icon w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-lg"
              animate={{
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ 
                rotate: { duration: 0.6, ease: 'easeInOut' },
                scale: { duration: 0.3 }
              }}
            >
              {item.icon}
            </motion.div>

            {/* Year badge with pulse */}
            <motion.div 
              className="timeline-detail inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold mb-4"
              animate={{
                boxShadow: isInView 
                  ? ['0 0 0 0 rgba(59, 130, 246, 0.4)', '0 0 0 10px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0)']
                  : '0 0 0 0 rgba(59, 130, 246, 0)'
              }}
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
            </p>

            {/* Progress bar */}
            <motion.div 
              className="timeline-detail mt-4 h-1 bg-gray-700 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: isInView ? '100%' : '0%' }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ x: '-100%' }}
                animate={{ x: isInView ? '0%' : '-100%' }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
            </motion.div>
          </div>

          {/* Enhanced decorative elements */}
          <motion.div 
            className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const AnimatedTimeline = () => {
  const containerRef = useRef(null);
  const timelineLineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const springLineHeight = useSpring(lineHeight, { stiffness: 100, damping: 30 });
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Floating particles animation with more variety
    const particles = document.querySelectorAll('.floating-particle');
    particles.forEach((particle, index) => {
      const isLarge = index % 3 === 0;
      gsap.set(particle, {
        scale: isLarge ? 1.5 : 1,
        opacity: isLarge ? 0.8 : 0.4
      });
      
      gsap.to(particle, {
        y: 'random(-150, 150)',
        x: 'random(-80, 80)',
        rotation: 'random(0, 360)',
        scale: isLarge ? 'random(1.2, 2)' : 'random(0.5, 1.2)',
        duration: 'random(4, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.3
      });
    });

    // Enhanced title animation sequence
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true
      }
    });

    titleTl.fromTo('.timeline-title',
      {
        y: 150,
        opacity: 0,
        scale: 0.6,
        rotationX: 45
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 2,
        ease: 'power4.out'
      }
    )
    .fromTo('.timeline-subtitle',
      {
        y: 80,
        opacity: 0,
        filter: 'blur(10px)'
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power3.out'
      }, '-=1.5')
    .fromTo('.timeline-decoration',
      {
        scale: 0,
        rotation: 180
      },
      {
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        stagger: 0.2
      }, '-=1');

    // Parallax background elements
    gsap.to('.bg-element', {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, []);
  return (
    <section ref={containerRef} className="relative min-h-screen bg-black py-20 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        {/* Dynamic floating particles with variety */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`floating-particle absolute rounded-full ${
              i % 4 === 0 ? 'w-2 h-2 bg-purple-400' : 
              i % 3 === 0 ? 'w-1.5 h-1.5 bg-blue-400' :
              'w-1 h-1 bg-cyan-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
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
        </div>        {/* Enhanced Timeline container */}
        <div className="relative mt-16 mr-5">
          {/* Central line with dynamic effects */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-800 h-full rounded-full overflow-hidden" style={{ top: '12px' }}>
            <motion.div 
              ref={timelineLineRef}
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-400 origin-top rounded-full shadow-lg shadow-blue-500/30"
              style={{ height: springLineHeight }}
            />
            
            {/* Animated orbs along the line */}
            <motion.div 
              className="absolute w-3 h-3 bg-white rounded-full shadow-lg left-1/2 transform -translate-x-1/2"
              style={{ 
                top: useTransform(springLineHeight, ['0%', '100%'], ['0%', '90%'])
              }}
            />
          </div>          {/* Enhanced central elements - Starting dot */}
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-lg shadow-blue-500/50 z-20"
            style={{ left: 'calc(50% - 12px)' }}
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                '0 0 0 0 rgba(59, 130, 246, 0.5)',
                '0 0 0 20px rgba(59, 130, 246, 0)',
                '0 0 0 0 rgba(59, 130, 246, 0)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Timeline items */}
          <div className="space-y-24 md:space-y-40">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>

          {/* Enhanced bottom dot */}
          <motion.div 
            className="hidden md:block absolute left-1/2 bottom-0 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg shadow-purple-600/50 z-20"
            style={{ left: 'calc(50% - 12px)', bottom: '12px' }}
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                '0 0 0 0 rgba(147, 51, 234, 0.5)',
                '0 0 0 15px rgba(147, 51, 234, 0)',
                '0 0 0 0 rgba(147, 51, 234, 0)'
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          />
        </div>
      </div>

      {/* Enhanced bottom effects */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[600px] h-96 bg-gradient-radial from-purple-600/20 via-blue-600/10 to-transparent rounded-full blur-3xl"></div>
      <motion.div 
        className="absolute bottom-20 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-32 right-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl"
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
          scale: [1.2, 1, 1.2]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </section>
  );
};

export default AnimatedTimeline;
