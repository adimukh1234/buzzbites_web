'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollContext } from './ScrollContext';
import gsap from 'gsap';

export default function LetsTalkSection() {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const particlesRef = useRef([]);
  const timelineRef = useRef(null);
  const [particles, setParticles] = useState([]);
  
  const { isInitialized } = useScrollContext();

  // Generate particles on client side only
  useEffect(() => {
    const generatedParticles = [];
    const colors = ['white', 'gray-200', 'gray-300', 'gray-400', 'gray-100'];
    const shapes = ['rounded-full', 'rounded-md', 'rounded-sm', 'rounded-full', 'rounded-xl'];
    
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 15 + 3;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.1;
      const colorIndex = Math.floor(Math.random() * colors.length);
      const shapeIndex = Math.floor(Math.random() * shapes.length);
      
      generatedParticles.push({ 
        size, 
        x, 
        y, 
        opacity, 
        color: colors[colorIndex], 
        shape: shapes[shapeIndex],
        blur: Math.random() > 0.5,
        rotation: Math.random() * 180
      });
    }
    
    setParticles(generatedParticles);
  }, []);
  
  // Form animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Faster duration
        ease: "easeOut"
      }
    }
  };
    
  // Set up ScrollTrigger animations
  useEffect(() => {
    if (!isInitialized || !sectionRef.current) return;
    
    // Create a timeline for this section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.5, // Faster scrubbing for quicker response
        markers: false,
        id: "lets-talk"
      }
    });
      // Animate background with enhanced visibility
    tl.fromTo(
      backgroundRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5 }, // Faster duration
      0
    );
    
    // Animate individual background layers for more dramatic effect
    const bgElements = backgroundRef.current.querySelectorAll('div');
    if (bgElements.length > 0) {
      // Base gradient
      tl.fromTo(
        bgElements[0],
        { opacity: 0 },
        { opacity: 0.8, duration: 0.4 },
        0
      );
      
      // Secondary gradient
      tl.fromTo(
        bgElements[1],
        { opacity: 0 },
        { opacity: 0.7, duration: 0.4 },
        0.05
      );
      
      // Radial gradients
      tl.fromTo(
        [bgElements[2], bgElements[3]],
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
        0.1
      );
      
      // Central glow
      tl.fromTo(
        bgElements[4],
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.7 },
        0.2
      );
      
      // Diagonal lines, color wash, and blur
      tl.fromTo(
        [bgElements[5], bgElements[6], bgElements[7]],
        { opacity: 0 },
        { opacity: [0.2, 1, 0.2], duration: 0.5, stagger: 0.1 },
        0.3
      );
    }
      // Animate title using SplitText-like approach with individual spans and enhanced effects
    if (titleRef.current) {
      const titleElements = titleRef.current.querySelectorAll('.title-char');
      
      // No glow effect for title
      /*
      tl.fromTo(
        titleRef.current,
        { 
          textShadow: "0px 0px 0px rgba(168, 85, 247, 0)",
        },
        { 
          textShadow: "0px 0px 30px rgba(168, 85, 247, 0.5)",
          duration: 0.4
        }, 
        0
      );
      */
      
      // Animate each character with a more dramatic effect, but without blur
      tl.fromTo(
        titleElements,
        { 
          opacity: 0, 
          y: 40, 
          rotateX: -60,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          scale: 1,
          stagger: 0.015, // Faster stagger
          duration: 0.3, // Faster duration
          ease: "back.out(1.7)"
        }, 
        0.1
      );
      
      // Animate the underline after the characters appear
      const underline = titleRef.current.querySelector('div');
      if (underline) {
        tl.fromTo(
          underline,
          { width: 0, opacity: 0 },
          { width: '40px', opacity: 1, duration: 0.3, ease: "power2.out" },
          0.3
        );
      }
    }
    
    // Animate particles
    particlesRef.current.forEach((particle, index) => {
      if (!particle) return;
      
      const delay = index * 0.02; // Faster delay between particles
      const direction = index % 2 === 0 ? 1 : -1;
      const distance = Math.random() * 80 + 40;
      
      tl.fromTo(
        particle,
        { 
          opacity: 0, 
          scale: 0.3,
          x: 0,
          y: 0 
        },
        { 
          opacity: particle.dataset.opacity, 
          scale: 1,
          x: `+=${direction * distance}`,
          y: `+=${direction * distance * 0.6}`,
          duration: 0.4, // Faster duration
        },
        delay
      );
    });
    
    // Animate form
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('.form-element');
      tl.fromTo(
        formElements,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.05, // Faster stagger
          duration: 0.3 // Faster duration
        }, 
        0.25
      );
    }
    
    timelineRef.current = tl;
    
    return () => {
      // Clean up ScrollTrigger
      if (timelineRef.current) {
        timelineRef.current.kill();
        const st = timelineRef.current.scrollTrigger;
        if (st) st.kill();
      }
    };
  }, [isInitialized]);
  
  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-24 overflow-hidden"
      style={{ zIndex: 3 }}
    >      {/* Enhanced background with multiple gradients and animated effects */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
      >
        {/* Base gradient - dark theme */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-zinc-900/70 opacity-95"></div>
        
        {/* Secondary gradient layer for depth */}
        <div className="absolute inset-0 bg-gradient-to-bl from-zinc-800/30 to-gray-900/40 opacity-70"></div>
        
        {/* Radial gradients for subtle highlights */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05),transparent_70%)]"></div>
        
        {/* Central glow - subtle white */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-white/5 rounded-full blur-[150px] animate-pulse"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-15 overflow-hidden">
          {/* <div className="absolute -inset-x-full -inset-y-full bg-[linear-gradient(45deg,rgba(255,255,255,0.07)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.07)_50%,rgba(255,255,255,0.07)_75%,transparent_75%,transparent)] bg-[length:60px_60px]"></div> */}
        </div>
        
        {/* Subtle dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40"></div>
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30"></div>
      </div>
        {/* Enhanced particles with different shapes and glows */}
      <div className="absolute inset-0 z-0">
        {particles.map((particle, i) => (
          <div
            key={`particle-${i}`}
            ref={el => particlesRef.current[i] = el}
            className={`absolute bg-${particle.color} ${particle.shape} ${
              particle.blur ? 'backdrop-blur-sm' : ''
            } ${i % 5 === 0 ? 'animate-pulse' : ''}`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0,
              filter: 'none',
              transform: `rotate(${particle.rotation}deg)`
            }}
            data-opacity={particle.opacity}
          ></div>
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto">
        {/* Enhanced title with high-tech animation and subtle shadow */}        <motion.h2 
          ref={titleRef} 
          className="text-5xl md:text-7xl lg:text-9xl font-bold mb-16 text-center relative overflow-hidden text-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
        >
          {/* Tech grid background - optimized */}
          <motion.div
            className="absolute inset-0 opacity-15"
            initial={{ scale: 0.8, rotate: 35 }}
            animate={{
              scale: 1,
              rotate: 0,
              transition: { duration: 1.2, ease: "easeOut" }
            }}
            style={{
              
              backgroundSize: '30px 30px',
              backgroundPosition: 'center center'
            }}
          />

          {["Let's", "Talk"].map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              className="inline-block relative mr-4"
              initial={{ opacity: 0, rotateX: -90, z: -100 }}
              animate={{
                opacity: 1,
                rotateX: 0,
                z: 0,
                transition: {
                  delay: wordIndex * 0.2,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              {/* Scanning line effect - optimized */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                initial={{ x: "-120%", opacity: 0 }}
                animate={{
                  x: "120%",
                  opacity: [0, 1, 0],
                  transition: {
                    delay: wordIndex * 0.15 + 0.3, // Faster timing
                    duration: 0.6, // Faster duration
                    ease: "easeInOut",
                    repeat: 1, // Add a second scan
                    repeatDelay: 1
                  }
                }}
                style={{ mixBlendMode: "overlay", width: "40%" }}
              />

              {/* Digital glitch effect on letters with subtle shadow - optimized */}
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  className="inline-block relative"
                  initial={{ 
                    opacity: 0, 
                    y: 50,
                    scale: 1.2,
                    rotateX: -20,
                    filter: "blur(8px)"
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    filter: "blur(0px)",
                    transition: {
                      delay: wordIndex * 0.15 + letterIndex * 0.03, // Faster timing
                      duration: 0.5,
                      ease: "easeOut"
                    }
                  }}
                  style={{
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                  }}
                >
                  {letter}
                  
                  {/* Enhanced holographic effect */}
                  <motion.span
                    className="absolute inset-0 text-blue-100 opacity-30 mix-blend-screen"
                    initial={{ x: 0, y: 0 }}
                    animate={{
                      x: [0, 2, -1, 0],
                      y: [0, -1, 1, 0],
                      transition: {
                        delay: wordIndex * 0.15 + letterIndex * 0.03 + 0.6,
                        duration: 0.3,
                        repeat: 2,
                        repeatType: "mirror"
                      }
                    }}
                  >
                    {letter}
                  </motion.span>
                </motion.span>
              ))}

              {/* Circuit board connecting line - optimized */}
              {wordIndex < 1 && (
                <motion.div
                  className="absolute top-1/2 -right-4 w-6 h-[2px]" // Thinner, longer line
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: 1,
                    opacity: [0, 0.8, 1, 0.8], // Pulsing effect
                    transition: {
                      delay: wordIndex * 0.15 + 0.8,
                      duration: 0.4,
                      ease: "easeInOut",
                      opacity: {
                        repeat: 3,
                        repeatType: "reverse",
                        duration: 1.2
                      }
                    }
                  }}
                  style={{
                    background: "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.2))",
                    boxShadow: "0 0 8px rgba(255,255,255,0.6)",
                    transformOrigin: "left"
                  }}
                />
              )}
            </motion.span>
          ))}

          {/* Tech corner decorations - optimized */}
          <motion.div
            className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-white"
            initial={{ opacity: 0, scale: 0, x: -5, y: -5 }}
            animate={{
              opacity: 0.8,
              scale: 1,
              x: 0,
              y: 0,
              transition: { 
                delay: 1.5, 
                duration: 0.4,
                type: "spring",
                stiffness: 200
              }
            }}
          />
          <motion.div
            className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 border-white"
            initial={{ opacity: 0, scale: 0, x: 5, y: -5 }}
            animate={{
              opacity: 0.8,
              scale: 1,
              x: 0,
              y: 0,
              transition: { 
                delay: 1.6, 
                duration: 0.4,
                type: "spring",
                stiffness: 200
              }
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2 border-white"
            initial={{ opacity: 0, scale: 0, x: -5, y: 5 }}
            animate={{
              opacity: 0.8,
              scale: 1,
              x: 0,
              y: 0,
              transition: { 
                delay: 1.7, 
                duration: 0.4,
                type: "spring",
                stiffness: 200
              }
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-white"
            initial={{ opacity: 0, scale: 0, x: 5, y: 5 }}
            animate={{
              opacity: 0.8,
              scale: 1,
              x: 0,
              y: 0,
              transition: { 
                delay: 1.8, 
                duration: 0.4,
                type: "spring",
                stiffness: 200
              }
            }}
          />
        </motion.h2>
        
        {/* Subtext and Contact Us Button */}
        <div 
          ref={formRef} 
          className="max-w-4xl mx-auto relative" /* Increased max width from 3xl to 4xl */
        >
          {/* Container with enhanced glass morphism and decorative elements */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-gray-700/30 to-zinc-800/30 rounded-2xl blur-md"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-white/5 to-gray-500/5 rounded-2xl"></div>
          
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-14 h-14 border-t-2 border-l-2 border-white/30 rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-14 h-14 border-t-2 border-r-2 border-white/30 rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-14 h-14 border-b-2 border-l-2 border-white/30 rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-14 h-14 border-b-2 border-r-2 border-white/30 rounded-br-xl"></div>
          
          {/* Decorative dot patterns */}
          <div className="absolute top-8 right-12 w-28 h-28 opacity-20">
            <div className="grid grid-cols-6 gap-2">
              {Array(36).fill().map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-8 left-12 w-28 h-28 opacity-20">
            <div className="grid grid-cols-6 gap-2">
              {Array(36).fill().map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              ))}
            </div>
          </div>
          
          {/* Main container */}
          <div className="relative bg-black/40 backdrop-blur-xl p-10 md:p-14 rounded-xl border border-white/10 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={formVariants}
            >
              {/* Subtext with futuristic styling */}
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-10 max-w-3xl mx-auto tracking-wide relative">
                <span className="absolute -left-4 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-white/60 to-transparent"></span>
                <span className="absolute -right-4 bottom-0 w-0.5 h-full bg-gradient-to-t from-transparent via-white/60 to-transparent"></span>
                Whether you're curious about our story, want to partner, or just say hello — we'd love to hear from you.
                <span className="block w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mt-4"></span>
              </p>
              
              {/* Contact Us Button with advanced effects */}
              <div className="relative pt-4">
                {/* Advanced decorative elements for the button */}
                <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-gray-700/30 via-white/10 to-gray-700/30 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                <div className="absolute -right-10 -top-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
                
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.8 }}
                  variants={formVariants}
                  className="relative"
                >
                  <button 
                    className="px-12 py-5 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white text-lg font-medium rounded-lg border border-white/20 hover:bg-gray-800 transition duration-300 flex items-center justify-center gap-3 group relative overflow-hidden mx-auto"
                  >
                    {/* Animated hover effect */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-800 via-white/10 to-gray-800 opacity-0 group-hover:opacity-50 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
                    
                    {/* Button shine effect */}
                    <span className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[45deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out"></span>
                    
                    <span className="relative z-10 font-bold tracking-wide text-xl">Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
