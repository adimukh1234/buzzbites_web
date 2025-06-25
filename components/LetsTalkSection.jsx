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
  
  const { isInitialized } = useScrollContext();
  
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
    // Create enhanced particles with different shapes and colors
  const particles = [];
  const colors = ['purple-500', 'indigo-400', 'blue-500', 'violet-400', 'fuchsia-500'];
  const shapes = ['rounded-full', 'rounded-md', 'rounded-sm', 'rounded-full', 'rounded-xl'];
  
  for (let i = 0; i < 20; i++) { // More particles
    const size = Math.random() * 15 + 3; // More varied sizes
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const opacity = Math.random() * 0.5 + 0.1;
    const colorIndex = Math.floor(Math.random() * colors.length);
    const shapeIndex = Math.floor(Math.random() * shapes.length);
    
    particles.push({ 
      size, 
      x, 
      y, 
      opacity, 
      color: colors[colorIndex], 
      shape: shapes[shapeIndex],
      blur: Math.random() > 0.5
    });
  }
  
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
      
      // Create a glow effect before showing the characters
      tl.fromTo(
        titleRef.current,
        { 
          textShadow: "0px 0px 0px rgba(168, 85, 247, 0)",
        },
        { 
          textShadow: "0px 0px 30px rgba(168, 85, 247, 0.5)",
          duration: 0.4 // Faster duration
        }, 
        0
      );
      
      // Animate each character with a more dramatic effect
      tl.fromTo(
        titleElements,
        { 
          opacity: 0, 
          y: 40, 
          rotateX: -60,
          scale: 0.8,
          filter: 'blur(8px)'
        },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
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
        {/* Base gradient - more visible */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/50 to-indigo-900/50 opacity-80"></div>
        
        {/* Secondary gradient layer for richness */}
        <div className="absolute inset-0 bg-gradient-to-bl from-fuchsia-800/40 to-blue-900/40 opacity-70"></div>
        
        {/* Radial gradients for depth - more intense */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(121,74,255,0.25),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(29,78,216,0.25),transparent_60%)]"></div>
        
        {/* Central glow - more prominent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-purple-600/15 rounded-full blur-[120px] animate-pulse"></div>
        
        {/* Cool diagonal lines - more visible */}
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute -inset-x-full -inset-y-full bg-[linear-gradient(45deg,rgba(168,85,247,0.15)_25%,transparent_25%,transparent_50%,rgba(168,85,247,0.15)_50%,rgba(168,85,247,0.15)_75%,transparent_75%,transparent)] bg-[length:60px_60px]"></div>
        </div>
        
        {/* Additional color wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/30 via-transparent to-indigo-950/30"></div>
        
        {/* Blur effect overlay - reduced to show more gradient */}
        <div className="absolute inset-0 backdrop-blur-[80px] opacity-20"></div>
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
              filter: particle.size > 10 ? `drop-shadow(0 0 ${particle.size / 2}px #a855f7)` : 'none',
              transform: `rotate(${Math.random() * 180}deg)`
            }}
            data-opacity={particle.opacity}
          ></div>
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto">
        {/* Enhanced title with individual characters for animation */}        <h2 
          ref={titleRef} 
          className="text-5xl md:text-7xl lg:text-9xl font-bold mb-16 text-center relative"
        >
          {/* Background glow effect */}
          <div className="absolute -inset-x-10 -inset-y-6 bg-gradient-to-r from-purple-600/15 via-fuchsia-600/10 to-blue-600/15 blur-3xl rounded-full"></div>
          <div className="absolute -inset-x-20 -inset-y-10 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.1),transparent_70%)] animate-pulse duration-5000"></div>
          
          {/* Title content with enhanced styling */}
          <div className="relative">
            {"Let's Talk".split("").map((char, i) => (
              <span 
                key={i} 
                className="inline-block title-char"
                style={{ 
                  perspective: '1000px',
                  textShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
                  WebkitBackgroundClip: 'text',
                  margin: '0 -0.02em', // Tighter character spacing
                  display: 'inline-block'
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            
            {/* Animated underline with enhanced styling */}
            <div className="relative h-1.5 w-40 mx-auto mt-6">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md"></div>
              
              {/* Main line */}
              <div className="relative h-1.5 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-blue-500 rounded-full"></div>
              
              {/* Animated dot */}
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse"></div>
            </div>
          </div>
        </h2>
        
        {/* Contact form */}        <div 
          ref={formRef} 
          className="max-w-3xl mx-auto relative"
        >
          {/* Form container with enhanced glass morphism and decorative elements */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl blur-md"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl"></div>
          
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-purple-500/40 rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-blue-500/40 rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-purple-500/40 rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-500/40 rounded-br-xl"></div>
          
          {/* Decorative dot patterns */}
          <div className="absolute top-6 right-10 w-20 h-20 opacity-20">
            <div className="grid grid-cols-5 gap-2">
              {Array(25).fill().map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-purple-400"></div>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-6 left-10 w-20 h-20 opacity-20">
            <div className="grid grid-cols-5 gap-2">
              {Array(25).fill().map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-blue-400"></div>
              ))}
            </div>
          </div>
          
          {/* Main form container */}
          <div className="relative bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-xl border border-white/10 shadow-2xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-element space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-purple-100">Name</label>                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div><input
                      type="text"
                      id="name"
                      className="w-full bg-white/5 border border-purple-500/30 rounded-lg pl-10 px-4 py-3.5 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-300 shadow-sm hover:bg-white/10 backdrop-blur-sm"
                      placeholder="Your name"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center rounded-full"></div>
                  </div>
                </div>
                <div className="form-element space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-purple-100">Email</label>                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div><input
                      type="email"
                      id="email"
                      className="w-full bg-white/5 border border-purple-500/30 rounded-lg pl-10 px-4 py-3.5 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-300 shadow-sm hover:bg-white/10 backdrop-blur-sm"
                      placeholder="your@email.com"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="form-element space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium mb-1 text-purple-100">Subject</label>                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
                    </svg>
                  </div><input
                    type="text"
                    id="subject"
                    className="w-full bg-white/5 border border-purple-500/30 rounded-lg pl-10 px-4 py-3.5 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-300 shadow-sm hover:bg-white/10 backdrop-blur-sm"
                    placeholder="What's this about?"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center rounded-full"></div>
                </div>
              </div>
              
              <div className="form-element space-y-2">
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-purple-100">Message</label>                <div className="relative group">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 group-focus-within:text-purple-300 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                    </svg>
                  </div><textarea
                    id="message"
                    rows="5"
                    className="w-full bg-white/5 border border-purple-500/30 rounded-lg pl-10 px-4 py-3.5 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-300 shadow-sm hover:bg-white/10 backdrop-blur-sm resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center rounded-full"></div>
                </div>
              </div>
                <div className="form-element pt-4 relative">
                {/* Advanced decorative elements for the button */}
                <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-purple-600/20 via-fuchsia-500/10 to-blue-600/20 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                <div className="absolute -right-10 -top-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
                
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.8 }}
                  variants={formVariants}
                  className="relative"
                >
                  <button 
                    type="submit"
                    className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-blue-600 text-white font-medium rounded-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                  >
                    {/* Animated hover effect */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-blue-600 opacity-0 group-hover:opacity-50 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
                    
                    {/* Button shine effect */}
                    <span className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[45deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out"></span>
                    
                    <span className="relative z-10 font-bold tracking-wide">Send Message</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
