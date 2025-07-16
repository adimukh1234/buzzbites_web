'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const sections = [
  {
    id: 'attendance',
    label: 'Smart Attendance',
    title: 'GPS + Image-Based Attendance',
    description: 'Employees check in with geo-tagged selfies — ensuring verified attendance with location proof. No more fake check-ins or buddy punching.',
    image: '/samples/pexels-alxs-919734.jpg'
  },
  {
    id: 'tracking',
    label: 'Real-Time Tracking',
    title: 'Live Location Monitoring',
    description: 'Track where your team is, in real-time. Improve field visibility, reduce idle time, and stay in control of your distributed workforce.',
    image: '/samples/pexels-joshsorenson-1714208.jpg'
  },
  {
    id: 'reports',
    label: 'Visit Reports',
    title: 'Instant Report Submission',
    description: 'Employees can instantly submit visit summaries, client feedback, or task outcomes — with time, location, and notes all logged automatically.',
    image: '/samples/pexels-junior-teixeira-1064069-2047905.jpg'
  },
  {
    id: 'management',
    label: 'Workforce Management',
    title: 'Leave & Shift Management',
    description: 'Plan better with shift assignments, leave requests, and calendar visibility — all in one place. Streamline your workforce operations.',
    image: '/samples/pexels-luis-gomes-166706-546819.jpg'
  }
];

// Default content when no hover
const defaultContent = {
  title: 'Field Workforce Management',
  description: 'Instacon provides comprehensive tools to manage your field teams with real-time tracking, smart attendance, and seamless reporting — all from one powerful platform.'
};

export default function TitleStack() {
  const [hoveredSection, setHoveredSection] = useState(null);
  const displayContent = hoveredSection ? sections.find(s => s.id === hoveredSection) : null;

  return (    <section className="bg-black min-h-screen w-full text-white flex items-center justify-center px-6 py-0 pt-10 relative z-10">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Content Block */}
        <div className="flex flex-col gap-8">
          {/* Dynamic Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredSection || 'default'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >              <h2 className="text-5xl md:text-6xl font-satoshi font-black text-white leading-tight mb-6 text-center">
                {displayContent?.title || defaultContent.title}
              </h2>
              <p className="text-xl font-satoshi font-regular text-gray-400 leading-relaxed max-w-lg">
                {displayContent?.description || defaultContent.description}
              </p>
            </motion.div>
          </AnimatePresence>          {/* Simple Title List */}          
          <div className="flex flex-col gap-1 mt-12">
            {sections.map((section) => (
              <button
                key={section.id}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`text-left py-4 px-0 transition-all duration-300 relative group border-none bg-transparent cursor-pointer ${
                  hoveredSection === section.id
                    ? 'text-white opacity-100'
                    : hoveredSection && hoveredSection !== section.id
                    ? 'text-gray-600 opacity-30'
                    : 'text-gray-400 opacity-100'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-0.5 transition-all duration-300 ${
                    hoveredSection === section.id 
                      ? 'bg-white' 
                      : 'bg-gray-600'
                  }`} />
                  <span className="text-lg font-medium">{section.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Providers section */}
          <div className="pt-8 border-t border-gray-800 mt-8">
            <p className="text-sm text-blue-500 uppercase tracking-wide mb-4 font-medium">
              TRUSTED BY TEAMS ACROSS INDUSTRIES:
            </p>
            <div className="flex flex-wrap gap-4">
              {['Sales Teams', 'Logistics', 'FMCG', 'Insurance', 'Field Services'].map((industry, i) => (
                <span 
                  key={industry}
                  className={`text-sm transition-colors duration-300 ${
                    i % 2 === 0 ? 'text-red-400' : 'text-blue-400'
                  }`}
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Image Area */}
        <div className="flex justify-center items-center relative">
          <div className="w-full h-[700px] relative overflow-hidden rounded-lg">
            {hoveredSection ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredSection}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={displayContent?.image}
                    alt={displayContent?.title}
                    fill
                    className="object-cover rounded-lg"
                    style={{
                      filter: 'brightness(0.8) contrast(1.1)',
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 rounded-lg" />
                  
                  {/* Feature label overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <h3 className="text-white font-semibold text-lg mb-2">{displayContent?.title}</h3>
                      <p className="text-gray-300 text-sm">{displayContent?.description}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-lg">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-800 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-red-500 rounded-full"></div>
                  </div>
                  <p className="text-gray-500 text-lg">Hover over a feature to explore</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
