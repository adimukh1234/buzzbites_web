'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ScrambleButton from './ScrambleButton';
import { BiFingerprint } from 'react-icons/bi';
import { MdOutlineLocationOn, MdOutlineTask } from 'react-icons/md';
import { BsCalendar3 } from 'react-icons/bs';
import FuturisticOverlay from './FuturisticOverlay';
import ScrollReveal from './ScrollReveal';
import MouseParallax from './MouseParallax';

const FeatureCard = ({ icon: Icon, title, delay, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);
  
  // Calculate different starting positions for staggered animations
  const xOffset = index % 2 === 0 ? -20 : 20;
  const yOffset = 30;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: yOffset, x: xOffset }}
      transition={{ 
        duration: 0.8, 
        delay, 
        type: "spring", 
        stiffness: 50, 
        damping: 12 
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group perspective-container"
    >      <div className="relative overflow-hidden rounded-2xl bg-black/40 border border-yellow-500/20 p-6 hover:border-yellow-500/40 transition-all duration-300">
        <MouseParallax strength={0.03} tiltEnabled={true} followMouse={hovered}>
          <FuturisticOverlay opacity="low" className="opacity-40" />
          <div className="relative z-10">
            <motion.div 
              animate={hovered ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="mb-4 text-yellow-500 text-4xl"
            >
              <Icon />
            </motion.div>
            <h3 className="text-xl font-satoshi font-bold text-white mb-2">{title}</h3>
          </div>
        </MouseParallax>
        
        {/* Tech corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 tech-corner-lt opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-0 right-0 w-8 h-8 tech-corner-rt opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 tech-corner-lb opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 tech-corner-rb opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </motion.div>
  );
};

export default function InstaconProduct() {
  const features = [
    { icon: BiFingerprint, title: "GPS-based image attendance" },
    { icon: MdOutlineLocationOn, title: "Live location tracking" },
    { icon: MdOutlineTask, title: "Task Management" },
    { icon: BsCalendar3, title: "Shift & Leave Management" },
  ];

  // Ref for the section to track scroll progress
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  
  // Viewport detection
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // Track scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Apply spring physics for smoother animation
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Create transforms based on scroll position
  const titleY = useTransform(smoothProgress, [0, 0.5], [100, 0]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);
  const subtitleY = useTransform(smoothProgress, [0.1, 0.6], [50, 0]);
  const subtitleOpacity = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);
  return (
    <section ref={sectionRef} className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-black/20 to-black/40">
      <FuturisticOverlay opacity="medium" className="opacity-60" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 perspective-container">
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-black text-white mb-6 leading-tight">
              Meet <span className="text-yellow-500">Instacon</span>: Your Field Team,{" "}
              <span className="text-yellow-500">Fully Connected</span>
            </h2>
          </motion.div>
          
          <motion.div
            style={{ y: subtitleY, opacity: subtitleOpacity }}
          >
            <p className="text-xl text-gray-300 font-satoshi">
              Instacon is a field workforce management tool designed to simplify Employee Attendance,
              live Location tracking, and Task Management.
            </p>
          </motion.div>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              delay={index * 0.15}
              index={index}
            />
          ))}
        </div>        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
          transition={{ 
            delay: 0.6, 
            duration: 0.8, 
            type: "spring", 
            stiffness: 80, 
            damping: 15 
          }}
        >
          <ScrambleButton text="🔘 Book A Demo" className="text-xl px-8 py-4" />
        </motion.div>
      </div>

      {/* Decorative circuit lines */}
      <motion.div 
        style={{ opacity: useTransform(smoothProgress, [0, 0.5], [0, 0.2]) }}
        className="absolute inset-0 circuit-lines"
      ></motion.div>
    </section>
  );
}
