'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollContext } from './ScrollContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WhatDrivesUsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const backgroundRef = useRef(null);
  const textSectionRef = useRef(null);
  const particlesRef = useRef([]);
  const timelineRef = useRef(null);
  const [particles, setParticles] = useState([]);
  
  const { isInitialized, refreshScrollTriggers } = useScrollContext();

  // Generate particles on client side only
  useEffect(() => {
    const generatedParticles = [];
    const colors = ['blue-500', 'indigo-400', 'purple-500', 'cyan-400', 'sky-500'];
    const shapes = ['rounded-full', 'rounded-md', 'rounded-sm', 'rounded-full', 'rounded-xl'];
    
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 15 + 3;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.2;
      const colorIndex = Math.floor(Math.random() * colors.length);
      const shapeIndex = Math.floor(Math.random() * shapes.length);
      const blur = Math.random() > 0.7;
      const glow = Math.random() > 0.8;
      
      generatedParticles.push({ 
        size, 
        x, 
        y, 
        opacity, 
        color: colors[colorIndex], 
        shape: shapes[shapeIndex],
        blur,
        glow,
        rotation: Math.random() * 360
      });
    }
    
    setParticles(generatedParticles);
  }, []);
  
  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25, // Faster animation
        ease: "easeOut"
      }
    }
  };
  
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05, // Faster stagger
        duration: 0.25, // Faster animation
        ease: "easeOut"
      }
    })
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
        pin: false,
        id: "what-drives-us"
      }
    });    // Enhanced background animation with blurred elements
    tl.fromTo(
      backgroundRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5 }, // Faster duration
      0
    );
    
    // Animate the grid pattern and gradients separately
    const bgElements = backgroundRef.current.querySelectorAll('div');
    if (bgElements.length > 0) {
      tl.fromTo(
        bgElements[0], // Base gradient
        { opacity: 0 },
        { opacity: 0.85, duration: 0.4 },
        0
      );
      
      tl.fromTo(
        bgElements[1], // Secondary gradient
        { opacity: 0 },
        { opacity: 0.75, duration: 0.4 },
        0.05
      );
      
      // Animate the radial gradients
      tl.fromTo(
        [bgElements[2], bgElements[3]],
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
        0.1
      );
      
      // Animate the central glow
      tl.fromTo(
        bgElements[4],
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.7 },
        0.2
      );
      
      // Animate grid, additional wash, and noise
      tl.fromTo(
        [bgElements[5], bgElements[6], bgElements[7]],
        { opacity: 0 },
        { opacity: [0.15, 1, 0.25], duration: 0.5, stagger: 0.1 },
        0.3
      );
    }
    
    // Enhanced title animation with glow effects
    if (titleRef.current) {
      // Animate the background glow first
      const titleContainer = titleRef.current.parentElement;
      const glowElements = titleContainer.querySelectorAll('div');
      
      tl.fromTo(
        glowElements,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
        0.1
      );
      
      // Then animate the title words with a more dramatic effect
      const titleElements = titleRef.current.querySelectorAll('.title-word');
      tl.fromTo(
        titleElements,
        { 
          opacity: 0, 
          y: 40, 
          rotateX: -30,
          filter: 'blur(8px)'
        },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          filter: 'blur(0px)',
          stagger: 0.05, // Faster stagger
          duration: 0.3, // Faster duration
          ease: "back.out(1.5)"
        }, 
        0.2
      );
      
      // Animate the decorative underline
      const underline = titleRef.current.querySelector('span:last-child');
      if (underline) {
        tl.fromTo(
          underline,
          { width: 0, opacity: 0 },
          { width: '40px', opacity: 1, duration: 0.4, ease: "power2.out" },
          0.4
        );
      }
    }
    
    // Animate particles
    particlesRef.current.forEach((particle, index) => {
      if (!particle) return;
      
      const delay = index * 0.025; // Faster delay between particles
      const direction = index % 2 === 0 ? 1 : -1;
      const distance = Math.random() * 100 + 50;
      
      tl.fromTo(
        particle,
        { 
          opacity: 0, 
          scale: 0.3,
          x: `+=${direction * Math.random() * 50}`,
          y: `+=${direction * Math.random() * 50}` 
        },
        { 
          opacity: particle.dataset.opacity, 
          scale: 1,
          x: `+=${direction * distance}`,
          y: `+=${direction * distance * 0.5}`,
          duration: 0.5, // Faster duration
        },
        delay
      );
    });
    
    // Animate text section
    if (textSectionRef.current) {
      tl.fromTo(
        textSectionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 }, // Faster duration
        0.2
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
      style={{ zIndex: 2 }}
    >      {/* Enhanced background with multiple layers */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
      >
        {/* Base gradient - more visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/45 to-purple-900/45 opacity-85"></div>
        
        {/* Secondary gradient layer for depth */}
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-800/35 to-indigo-900/35 opacity-75"></div>
        
        {/* Radial gradients for depth - more intense */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(56,189,248,0.25),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(124,58,237,0.25),transparent_60%)]"></div>
        
        {/* Central glow - more prominent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-blue-600/12 rounded-full blur-[120px] animate-pulse"></div>
        
        {/* Grid pattern overlay - more visible */}
        <div className="absolute inset-0 opacity-15 overflow-hidden">
          <div className="absolute -inset-full bg-[linear-gradient(to_right,rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        
        {/* Additional blue wash for consistency */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/25 via-transparent to-purple-950/25"></div>
        
        {/* Subtle noise texture - more visible */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-25"></div>
      </div>
        {/* Enhanced particles with different shapes, colors and effects */}
      <div className="absolute inset-0 z-0">
        {particles.map((particle, i) => (
          <div
            key={`particle-${i}`}
            ref={el => particlesRef.current[i] = el}
            className={`absolute bg-${particle.color} ${particle.shape} ${
              particle.blur ? 'backdrop-blur-sm' : ''
            } ${i % 7 === 0 ? 'animate-pulse' : ''}`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0,
              filter: particle.glow ? `drop-shadow(0 0 ${particle.size / 2}px #3b82f6)` : 'none',
              transform: `rotate(${particle.rotation}deg)`
            }}
            data-opacity={particle.opacity}
          ></div>
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-8">        {/* Enhanced title with high-tech animation like "Instacon by the Numbers" */}
        <div className="relative mb-16">
          {/* Simple shadow instead of glow effect */}
          
          <motion.h2 
            ref={titleRef} 
            className="relative text-5xl md:text-6xl lg:text-8xl font-satoshi font-black text-white text-center overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            style={{ textShadow: "0 4px 6px rgba(0,0,0,0.4)" }}
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
              // style={{
              //   backgroundImage: `
              //     linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px),
              //     linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)
              //   `,
              //   backgroundSize: '25px 25px',
              //   backgroundPosition: 'center center'
              // }}
            />

            {["What", "Drives", "Us"].map((word, wordIndex) => (
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
                  className="absolute inset-0 bg-gradient-to-r from-transparent /70 via-whiteto-transparent"
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

                {/* Digital glitch effect on letters - optimized */}
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    key={letterIndex}
                    className="inline-block relative"
                    initial={{ 
                      opacity: 0, 
                      y: 50,
                      scale: 1.2,
                      filter: "blur(10px)"
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                      transition: {
                        delay: wordIndex * 0.15 + letterIndex * 0.03, // Faster timing
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    }}
                  >
                    {letter}
                    
                    {/* Removed holographic effect */}
                  </motion.span>
                ))}

                {/* Circuit board connecting lines - optimized */}
                {wordIndex < 2 && (
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
        </div>
        
        {/* Content */}
        <div 
          ref={textSectionRef} 
          className="max-w-4xl mx-auto text-center"
        >          <div className="relative max-w-3xl mx-auto">
            {/* Subtle highlight behind the text */}
            <div className="absolute -inset-x-10 -inset-y-6 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-2xl blur-lg"></div>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 relative leading-relaxed font-light text-blue-50"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={textVariants}
            >
              We&apos;re passionate about creating <span className="text-blue-400 font-medium">digital experiences</span> that push boundaries and <span className="text-indigo-400 font-medium">redefine what&apos;s possible</span> on the web.
            </motion.p>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {[
              {
                title: "Innovation",
                description: "We embrace cutting-edge technologies and creative solutions to solve complex problems.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                ),
                gradient: "from-blue-600/20 to-cyan-600/20",
                border: "border-blue-500/20",
                glow: "#3b82f6"
              },
              {
                title: "Excellence",
                description: "We strive for perfection in every pixel, animation, and interaction.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ),
                gradient: "from-purple-600/20 to-indigo-600/20",
                border: "border-purple-500/20",
                glow: "#8b5cf6"
              },
              {
                title: "Impact",
                description: "We create experiences that leave a lasting impression and drive real business results.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3.707 2.293a1 1 0 00-1.414 1.414l6.921 6.922c.05.062.105.118.168.167l6.91 6.911a1 1 0 001.415-1.414l-.675-.675a9.001 9.001 0 00-.668-11.982A1 1 0 1014.95 5.05a7.002 7.002 0 01.657 9.143l-1.435-1.435a5.002 5.002 0 00-.636-6.294A1 1 0 0012.12 7.88c.924.923 1.12 2.3.587 3.415l-1.992-1.992a.922.922 0 00-.018-.018l-6.99-6.991zM3.238 8.187a1 1 0 00-1.933.516c-.004.067-.003.135 0 .203a7 7 0 007.843 6.996 1 1 0 00.277-1.98 5.001 5.001 0 01-5.596-5.023 1 1 0 00-.59-.712z" />
                  </svg>
                ),
                gradient: "from-indigo-600/20 to-blue-600/20",
                border: "border-indigo-500/20",
                glow: "#6366f1"
              },
              {
                title: "Collaboration",
                description: "We believe the best work comes from diverse teams working together toward a shared vision.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                ),
                gradient: "from-sky-600/20 to-cyan-600/20",
                border: "border-sky-500/20",
                glow: "#0ea5e9"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`relative bg-black/20 backdrop-blur-md p-7 rounded-xl border ${item.border} group hover:bg-black/30 transition-all duration-300`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                custom={index * 0.1} // Stagger the cards
                variants={wordVariants}
                style={{
                  boxShadow: `0 0 30px 5px ${item.glow}05`
                }}
              >
                {/* Card background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-30 rounded-xl group-hover:opacity-40 transition-opacity duration-300`}></div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r rounded-tr-xl opacity-30 border-white/10"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l rounded-bl-xl opacity-30 border-white/10"></div>
                
                <div className="relative">
                  {/* Icon with glow effect */}
                  <div className="inline-flex items-center justify-center p-2 mb-4 rounded-lg bg-white/5 border border-white/10">
                    {item.icon}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      style={{
                        background: `radial-gradient(circle, ${item.glow}20 0%, transparent 70%)`,
                        filter: 'blur(10px)'
                      }}
                    ></div>
                  </div>
                  
                  <h3 className="text-2xl text-white font-bold mb-3 group-hover:text-blue-100 transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
