'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrambleButton from './ScrambleButton';
import { BiFingerprint } from 'react-icons/bi';
import { MdOutlineLocationOn, MdOutlineTask } from 'react-icons/md';
import { BsCalendar3 } from 'react-icons/bs';
import FuturisticOverlay from './FuturisticOverlay';

const FeatureCard = ({ icon: Icon, title, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-black/40 border border-yellow-500/20 p-6 hover:border-yellow-500/40 transition-all duration-300">
        <FuturisticOverlay opacity="low" className="opacity-40" />
        <div className="relative z-10">
          <div className="mb-4 text-yellow-500 text-4xl">
            <Icon />
          </div>
          <h3 className="text-xl font-satoshi font-bold text-white mb-2">{title}</h3>
        </div>
        
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

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-black/20 to-black/40">
      <FuturisticOverlay opacity="medium" className="opacity-60" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-black text-white mb-6 leading-tight">
              Meet <span className="text-yellow-500">Instacon</span>: Your Field Team,{" "}
              <span className="text-yellow-500">Fully Connected</span>
            </h2>
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
              delay={index * 0.1}
            />
          ))}
        </div>

        <div className="text-center">
          <ScrambleButton text="🔘 Book A Demo" className="text-xl px-8 py-4" />
        </div>
      </div>

      {/* Decorative circuit lines */}
      <div className="absolute inset-0 circuit-lines opacity-20"></div>
    </section>
  );
}
