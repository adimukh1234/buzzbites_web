'use client'

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full px-8 py-5 flex justify-between items-center bg-transparent z-50">
      <div className="text-white text-2xl font-bold tracking-wide flex items-center gap-1 select-none">
        <span>BUZZ</span>
        <span className="text-yellow-500">BITES</span>
        <span className="text-yellow-500 text-lg align-super ml-1">●</span>
      </div>
      
      <button className="ml-6 px-5 py-2 rounded-full font-semibold text-white bg-yellow-500 shadow-[0_0_20px_0_rgba(255,102,0,0.6)] hover:bg-yellow-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400">
        Book a Demo &rarr;
      </button>
      <div className="md:hidden">
        {/* Mobile menu button (optional for future) */}
      </div>
    </header>
  );
}
