'use client'

import Link from 'next/link';
import FuturisticOverlay from './FuturisticOverlay';
import ScrambleButton from './ScrambleButton';

export default function Header() {
  return (
    <header className="w-full px-8 py-5 flex justify-between items-center bg-transparent z-50 relative">
      <div className="absolute inset-0 pointer-events-none">
        <FuturisticOverlay opacity="low" className="opacity-40" />
      </div>      <div className="text-white text-2xl font-satoshi font-black tracking-wide flex items-center gap-1 select-none tech-title">
        <span>BUZZ</span>
        <span className="text-yellow-500">BITES</span>
        <span className="text-yellow-500 text-lg align-super ml-1">●</span>
      </div>      <a 
        href="https://calendly.com/buzzbites/instacon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ScrambleButton 
          text="Book a Demo →" 
          className="ml-6 px-5 py-2 rounded-full font-satoshi font-bold text-white bg-yellow-500 shadow-[0_0_20px_0_rgba(255,255,0,0.4)] hover:bg-yellow-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 relative overflow-hidden"
        />
      </a>
      <div className="md:hidden">
        {/* Mobile menu button (optional for future) */}
      </div>
    </header>
  );
}
