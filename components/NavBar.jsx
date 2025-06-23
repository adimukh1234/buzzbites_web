"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import FuturisticOverlay from './FuturisticOverlay';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const containerRef = useRef(null);
  const fixedMenuRef = useRef(null);

  useEffect(() => {
    // Page load animation
    if (fixedMenuRef.current) {
      gsap.fromTo(
        fixedMenuRef.current,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.1 }
      );
    }

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
    <>      {/* Tailwind v4 Fixed Left Menu */}      <div 
        ref={fixedMenuRef} 
        className="fixed top-0 left-0 w-30 h-screen z-20 flex flex-col justify-between items-center py-8 backdrop-blur-lg border-r border-[var(--color-border)] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(13, 13, 13, 0.97))',
          containerType: 'inline-size'
        }}
      >
        <FuturisticOverlay opacity="low" className="opacity-60" />
        {/* Top Section */}
        <div className="w-full flex justify-center">          <button
            ref={menuButtonRef}
            className={`relative w-12 h-10 cursor-pointer z-30 flex flex-col justify-center p-2 transition-all ${isMenuOpen ? 'is-active' : ''}`}
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
              className={`absolute left-2 w-8 h-0.5 block transition-all duration-[400ms] ${
                isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
              }`}
              style={{ 
                backgroundColor: isMenuOpen ? 'var(--color-accent)' : 'var(--color-text)',
                transitionTimingFunction: 'var(--ease-expo-out)' 
              }}
            ></span>
            <span 
              className={`absolute left-2 w-8 h-0.5 block transition-all duration-[400ms] ${
                isMenuOpen ? 'opacity-0 -translate-x-5' : ''
              }`}
              style={{ 
                backgroundColor: isMenuOpen ? 'var(--color-accent)' : 'var(--color-text)',
                transitionTimingFunction: 'var(--ease-expo-out)' 
              }}
            ></span>
            <span 
              className={`absolute left-2 w-8 h-0.5 block transition-all duration-[400ms] ${
                isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
              }`}
              style={{ 
                backgroundColor: isMenuOpen ? 'var(--color-accent)' : 'var(--color-text)',
                transitionTimingFunction: 'var(--ease-expo-out)' 
              }}
            ></span>
          </button>
        </div>        {/* Middle Section */}
        <div className="flex-1 flex justify-center items-center text-center px-4 -rotate-90">
          <h2 style={{fontFamily: "var(--font-heading)"}} className="text-xl tracking-widest uppercase whitespace-nowrap">
            <span className="text-white">BUZZ</span><span style={{color: "var(--color-accent)"}}>BITES</span>
          </h2>
        </div>{/* Bottom Section */}
        <div className="text-xs text-center opacity-100 tracking-wider uppercase" style={{fontFamily: "var(--font-heading)"}}>
          <p className="-rotate-90">© 2025</p>
        </div>
      </div>      {/* Tailwind v4 Fullscreen Overlay Menu */}      <div 
        ref={menuOverlayRef} 
        className={`fixed inset-0 z-10 overflow-hidden backdrop-blur-2xl transition-transform duration-[800ms] ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(13, 13, 13, 0.97))',
          transitionTimingFunction: 'var(--ease-expo-out)'
        }}
      >
        {/* Enhanced Futuristic Overlays */}
        <FuturisticOverlay opacity="medium" className="z-0" />
        
        {/* Gradient Overlay */}        <div 
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none opacity-100 z-0 animate-[gradientFlow_20s_infinite_alternate_ease-in-out]"
          style={{
            background: `radial-gradient(
              circle at center,
              rgba(255, 255, 0, 0.25) 0%,
              rgba(255, 255, 0, 0.15) 35%,
              rgba(255, 255, 0, 0.05) 70%
            )`
          }}
        ></div>

        <div 
          className="w-full h-full flex flex-col justify-center items-start pl-45 pr-[5%] overflow-hidden relative z-[1]"
          style={{ containerType: 'inline-size' }}
        >
          <ul className="list-none text-left w-full -mt-10">
            <li className="m-0 py-4 overflow-hidden relative leading-none">              <Link 
                href="/" 
                onClick={closeMenu}
                className={`text-white no-underline relative inline-block -tracking-wide uppercase transition-all duration-700 hover-strike ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                }`}
                style={{
                  fontSize: 'clamp(50px, 9cqw, 120px)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '800',
                  transitionTimingFunction: 'var(--ease-expo-out)',
                  transitionDelay: isMenuOpen ? '0.1s' : '0s'
                }}
              >
                Home
              </Link>
            </li>
            <li className="m-0 py-4 overflow-hidden relative leading-none">              <Link 
                href="/about" 
                onClick={closeMenu}
                className={`text-white no-underline relative inline-block -tracking-wide uppercase transition-all duration-700 hover-strike ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                }`}
                style={{
                  fontSize: 'clamp(50px, 9cqw, 120px)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '800',
                  transitionTimingFunction: 'var(--ease-expo-out)',
                  transitionDelay: isMenuOpen ? '0.2s' : '0s'
                }}
              >
                About
              </Link>
            </li>
            <li className="m-0 py-4 overflow-hidden relative leading-none">              <Link 
                href="/work" 
                onClick={closeMenu}
                className={`text-white no-underline relative inline-block -tracking-wide uppercase transition-all duration-700 hover-strike ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                }`}
                style={{
                  fontSize: 'clamp(50px, 9cqw, 120px)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '800',
                  transitionTimingFunction: 'var(--ease-expo-out)',
                  transitionDelay: isMenuOpen ? '0.3s' : '0s'
                }}
              >
                Work
              </Link>
            </li>
            <li className="m-0 py-4 overflow-hidden relative leading-none">              <Link 
                href="/contact" 
                onClick={closeMenu}
                className={`text-white no-underline relative inline-block -tracking-wide uppercase transition-all duration-700 hover-strike ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                }`}
                style={{
                  fontSize: 'clamp(50px, 9cqw, 120px)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '800',
                  transitionTimingFunction: 'var(--ease-expo-out)',
                  transitionDelay: isMenuOpen ? '0.4s' : '0s'
                }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Container ref for animations */}
      <div ref={containerRef} className="navbar-container">
        {/* This will be used for the push animation */}
      </div>
    </>
  );
};

export default NavBar;
