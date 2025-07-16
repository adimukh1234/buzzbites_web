"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import FuturisticOverlay from './FuturisticOverlay';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const containerRef = useRef(null);
  const fixedMenuRef = useRef(null);
  
  // Style for default cursor
  const navbarStyle = {
    cursor: 'default',
    position: 'relative',
    zIndex: 50 // Ensure Navbar is above all page sections
  };

  useEffect(() => {
    // Register GSAP plugins on client side only
    gsap.registerPlugin(ScrollTrigger);

    // Page load animation
    if (fixedMenuRef.current) {
      gsap.fromTo(
        fixedMenuRef.current,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.1 }
      );
    }
  }, []); // Remove isMenuOpen dependency to prevent re-registering GSAP

  useEffect(() => {
    // ESC key listener
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.classList.add("menu-open");
  };

  const closeMenu = () => {
    setTimeout(() => {
      setIsMenuOpen(false);
      document.body.classList.remove("menu-open");
    }, 300);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  return (
    <div style={navbarStyle}>
      {/* Desktop/Tablet Navbar - Hidden on mobile */}
      <div 
        ref={fixedMenuRef} 
        className="hidden md:flex fixed top-0 left-0 w-20 lg:w-24 h-screen z-50 flex-col justify-between items-center py-6 lg:py-8 backdrop-blur-md border-r border-white/10 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.98), rgba(13, 13, 13, 0.98))',
          containerType: 'inline-size',
          cursor: 'default'
        }}
      >
        <FuturisticOverlay opacity="low" className="opacity-40" />
        
        {/* Desktop Menu Button */}
        <div className="w-full flex justify-center">
          <button
            className={`relative w-10 lg:w-12 h-10 cursor-pointer z-30 flex flex-col justify-center p-2 transition-all ${isMenuOpen ? 'is-active' : ''}`}
            onClick={toggleMenu}
            onMouseEnter={(e) => {
              const spans = e.currentTarget.querySelectorAll('span');
              spans.forEach(span => {
                span.style.backgroundColor = 'var(--color-accent)';
              });
            }}
            onMouseLeave={(e) => {
              if (!isMenuOpen) {
                const spans = e.currentTarget.querySelectorAll('span');
                spans.forEach(span => {
                  span.style.backgroundColor = 'var(--color-text)';
                });
              }
            }}
            aria-label="Toggle menu"
            style={{
              transitionDuration: 'var(--duration-fast)',
              transitionTimingFunction: 'var(--ease-expo-out)'
            }}
          >
            <span 
              className={`absolute left-2 w-7 lg:w-8 h-0.5 block transition-all duration-[400ms] ${
                isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
              }`}
              style={{ 
                backgroundColor: isMenuOpen ? 'var(--color-accent)' : 'var(--color-text)',
                transitionTimingFunction: 'var(--ease-expo-out)' 
              }}
            ></span>
            <span 
              className={`absolute left-2 w-7 lg:w-8 h-0.5 block transition-all duration-[400ms] ${
                isMenuOpen ? 'opacity-0 -translate-x-5' : ''
              }`}
              style={{ 
                backgroundColor: isMenuOpen ? 'var(--color-accent)' : 'var(--color-text)',
                transitionTimingFunction: 'var(--ease-expo-out)' 
              }}
            ></span>
            <span 
              className={`absolute left-2 w-7 lg:w-8 h-0.5 block transition-all duration-[400ms] ${
                isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
              }`}
              style={{ 
                backgroundColor: isMenuOpen ? 'var(--color-accent)' : 'var(--color-text)',
                transitionTimingFunction: 'var(--ease-expo-out)' 
              }}
            ></span>
          </button>
        </div>

        {/* Desktop Brand Name */}
        <div className="flex-1 flex justify-center items-center text-center px-2 -rotate-90">
          <h2 style={{fontFamily: "var(--font-heading)"}} className="text-sm lg:text-lg tracking-widest uppercase whitespace-nowrap">
            <span className="text-white">BUZZ</span><span style={{color: "var(--color-accent)"}}>BITES</span>
          </h2>
        </div>

        {/* Desktop Copyright */}
        <div className="text-xs text-center opacity-100 tracking-wider uppercase" style={{fontFamily: "var(--font-heading)"}}>
          <p className="-rotate-90 text-xs">© 2025</p>
        </div>
      </div>

      {/* Mobile Invisible Navbar - Only shows hamburger menu */}
      <div className="md:hidden fixed top-6 left-6 z-50">
        <button
          ref={menuButtonRef}
          className={`relative w-12 h-12 cursor-pointer z-50 flex flex-col justify-center items-center transition-all duration-300 ${
            isMenuOpen ? 'bg-black/20 backdrop-blur-sm rounded-full' : 'bg-transparent'
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          style={{
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Simple Three Bars for Mobile */}
          <span 
            className={`w-6 h-0.5 bg-white block transition-all duration-300 mb-1 ${
              isMenuOpen ? 'rotate-45 translate-y-1.5 mb-0' : ''
            }`}
            style={{ 
              transformOrigin: 'center',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          ></span>
          <span 
            className={`w-6 h-0.5 bg-white block transition-all duration-300 mb-1 ${
              isMenuOpen ? 'opacity-0 scale-0' : ''
            }`}
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          ></span>
          <span 
            className={`w-6 h-0.5 bg-white block transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
            style={{ 
              transformOrigin: 'center',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          ></span>
        </button>
      </div>      {/* Responsive Fullscreen Overlay Menu */}
      <div 
        ref={menuOverlayRef} 
        className={`fixed inset-0 z-40 overflow-hidden backdrop-blur-xl transition-transform duration-[600ms] md:duration-[800ms] ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.98), rgba(13, 13, 13, 0.98))',
          transitionTimingFunction: 'var(--ease-expo-out)'
        }}
      >
        {/* Responsive overlays */}
        <FuturisticOverlay opacity="low" className="z-0 opacity-20 md:opacity-30" />
        
        {/* Desktop gradient overlay */}
        <div 
          className="hidden md:block absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none opacity-100 z-0 animate-[gradientFlow_20s_infinite_alternate_ease-in-out]"
          style={{
            background: `radial-gradient(
              circle at center,
              rgba(255, 255, 0, 0.15) 0%,
              rgba(255, 255, 0, 0.08) 35%,
              rgba(255, 255, 0, 0.03) 70%
            )`
          }}
        ></div>

        <div 
          className="w-full h-full flex flex-col justify-center items-start px-8 md:pl-24 lg:pl-32 md:pr-[5%] overflow-hidden relative z-[1]"
          style={{ containerType: 'inline-size' }}
        >
          <ul className="list-none text-left w-full -mt-4 md:-mt-10 space-y-2 md:space-y-0">
            <li className="m-0 py-2 md:py-4 overflow-hidden relative leading-none">
              <Link 
                href="/" 
                onClick={closeMenu}
                className={`text-white no-underline relative inline-block -tracking-wide uppercase transition-all duration-500 md:duration-700 hover-strike ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                }`}
                style={{
                  fontSize: 'clamp(32px, 12vw, 120px)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '800',
                  transitionTimingFunction: 'var(--ease-expo-out)',
                  transitionDelay: isMenuOpen ? '0.1s' : '0s'
                }}
              >
                Home
              </Link>
            </li>
            <li className="m-0 py-2 md:py-4 overflow-hidden relative leading-none">
              <Link 
                href="/journey" 
                onClick={closeMenu}
                className={`text-white no-underline relative inline-block -tracking-wide uppercase transition-all duration-500 md:duration-700 hover-strike ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                }`}
                style={{
                  fontSize: 'clamp(32px, 12vw, 120px)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '800',
                  transitionTimingFunction: 'var(--ease-expo-out)',
                  transitionDelay: isMenuOpen ? '0.15s' : '0s'
                }}
              >
                Journey
              </Link>
            </li>
            <li className="m-0 py-2 md:py-4 overflow-hidden relative leading-none">
              <Link 
                href="/product" 
                onClick={closeMenu}
                className={`text-white no-underline relative inline-block -tracking-wide uppercase transition-all duration-500 md:duration-700 hover-strike ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                }`}
                style={{
                  fontSize: 'clamp(32px, 12vw, 120px)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '800',
                  transitionTimingFunction: 'var(--ease-expo-out)',
                  transitionDelay: isMenuOpen ? '0.2s' : '0s'
                }}
              >
                INSTACON
              </Link>
            </li>
            <li className="m-0 py-2 md:py-4 overflow-hidden relative leading-none">
              <Link 
                href="/contact" 
                onClick={closeMenu}
                className={`text-white no-underline relative inline-block -tracking-wide uppercase transition-all duration-500 md:duration-700 hover-strike ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                }`}
                style={{
                  fontSize: 'clamp(32px, 12vw, 120px)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '800',
                  transitionTimingFunction: 'var(--ease-expo-out)',
                  transitionDelay: isMenuOpen ? '0.25s' : '0s'
                }}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile-specific footer info */}
          <div className="absolute bottom-8 left-8 right-8 md:hidden">
            <div className="flex justify-between items-center text-white/60 text-xs">
              <span>BUZZBITES</span>
              <span>© 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Container ref for animations */}
      <div ref={containerRef} className="navbar-container">
        {/* This will be used for the push animation */}
      </div>
    </div>
  );
};

export default NavBar;
