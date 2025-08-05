'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const sections = [
  {
    id: 'attendance',
    label: 'Smart Attendance',
    title: 'GPS + Image-Based Attendance',
    description: 'Employees check in with geo-tagged selfies — ensuring verified attendance with location proof. No more fake check-ins or buddy punching.',
    image: '/smart_attendance.jpg'
  },
  {
    id: 'tracking',
    label: 'Real-Time Tracking',
    title: 'Live Location Monitoring',
    description: 'Track where your team is, in real-time. Improve field visibility, reduce idle time, and stay in control of your distributed workforce.',
    image: '/1080x1350_Real_Time_Tracking.jpg'
  },
  {
    id: 'reports',
    label: 'Visit Reports',
    title: 'Instant Report Submission',
    description: 'Employees can instantly submit visit summaries, client feedback, or task outcomes — with time, location, and notes all logged automatically.',
    image: '/1080x1350_visit_Report.jpg'
  },
  {
    id: 'management',
    label: 'Workforce Management',
    title: 'Leave & Shift Management',
    description: 'Plan better with shift assignments, leave requests, and calendar visibility — all in one place. Streamline your workforce operations.',
    image: '/1080x1350_workface_Management.jpg'
  }
];

// Default content when no hover
const defaultContent = {
  title: 'Field Workforce Management',
  description: 'Instacon provides comprehensive tools to manage your field teams with real-time tracking, smart attendance, and seamless reporting — all from one powerful platform.'
};

export default function TitleStack() {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef(null);
  const displayContent = hoveredSection ? sections.find(s => s.id === hoveredSection) : null;

  // Ensure component only renders on client to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Clean up any pending animations on unmount
  useEffect(() => {
    return () => {
      setHoveredSection(null);
    };
  }, []);

  // Don't render until client-side to prevent hydration issues
  if (!isClient) {
    return (
      <section className="relative min-h-screen w-full text-white flex items-center justify-center px-6 py-16 overflow-hidden">
        <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded mb-4"></div>
              <div className="h-6 bg-gray-700 rounded mb-8"></div>
            </div>
          </div>
          <div className="w-full h-[600px] bg-gray-800 rounded-lg animate-pulse"></div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full text-white flex items-center justify-center px-6 py-16 overflow-hidden"
    >
      {/* Background with gradient to match other sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-800 z-0"></div>
      
      {/* Animated background pattern to match other sections */}
      <div className="absolute inset-0 z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute w-1 h-1 rounded-full ${
              i % 2 === 0 ? 'bg-red-500/20' : 'bg-blue-500/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      
      {/* Content with proper z-index */}
      <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Content Block */}
        <motion.div 
          className="flex flex-col gap-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Dynamic Content */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={hoveredSection || 'default'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ willChange: 'opacity, transform' }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-black text-white leading-tight mb-6">
                {displayContent?.title || defaultContent.title}
              </h2>
              <p className="text-lg font-satoshi font-regular text-gray-300 leading-relaxed max-w-lg">
                {displayContent?.description || defaultContent.description}
              </p>
            </motion.div>
          </AnimatePresence>          {/* Simple Title List */}          
          <div className="flex flex-col gap-2 mt-12">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`text-left py-3 px-4 transition-all duration-300 relative group border-none bg-transparent cursor-pointer rounded-lg ${
                  hoveredSection === section.id
                    ? 'text-white opacity-100 bg-gray-900/30 border-l-2 border-blue-500'
                    : hoveredSection && hoveredSection !== section.id
                    ? 'text-gray-500 opacity-40'
                    : 'text-gray-300 opacity-100 hover:bg-gray-900/20'
                }`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-6 h-0.5 transition-all duration-300 ${
                    hoveredSection === section.id 
                      ? 'bg-blue-500' 
                      : 'bg-gray-600'
                  }`} />
                  <span className="text-base font-medium">{section.label}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Providers section */}
          <div className="pt-8 border-t border-gray-700 mt-8">
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
        </motion.div>

        {/* Right Image Area */}
        <motion.div 
          className="flex justify-center items-center relative"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-full h-[600px] relative overflow-hidden rounded-lg border border-gray-700/30">
            <AnimatePresence mode="wait" initial={false}>
              {hoveredSection ? (
                <motion.div
                  key={hoveredSection}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full h-full relative"
                  style={{ willChange: 'opacity, transform' }}
                >
                  <Image
                    src={displayContent?.image}
                    alt={displayContent?.title || 'Feature image'}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={hoveredSection === 'attendance'}
                    style={{
                      filter: 'brightness(0.8) contrast(1.1)',
                    }}
                    onError={(e) => {
                      console.warn('Image failed to load:', displayContent?.image);
                      e.target.style.display = 'none';
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 rounded-lg" />
                  
                  {/* Feature label overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <h3 className="text-white font-semibold text-lg mb-2">{displayContent?.title}</h3>
                      <p className="text-gray-300 text-sm">{displayContent?.description}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700/30"
                  style={{ willChange: 'opacity' }}
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gray-800/50 flex items-center justify-center border border-gray-700/30">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-red-500 rounded-full"></div>
                    </div>
                    <p className="text-gray-400 text-lg">Hover over a feature to explore</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
