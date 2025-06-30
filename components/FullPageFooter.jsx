'use client';
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Script from 'next/script';

const footerVariants = {
  hidden: { 
    y: "100vh",
    opacity: 0 
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      duration: 1.5, 
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.15
    },
  },
};

const contentVariants = {
  hidden: { 
    opacity: 0, 
    y: 100,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 1.2, 
      ease: "easeOut",
      delay: 0.4,
      staggerChildren: 0.1
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94]
    },
  },
};

export default function FullPageFooter() {
  const controls = useAnimation();
  
  const [ref, inView] = useInView({ 
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "0px 0px -50% 0px"
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  
  // Load Guminert font
  useEffect(() => {
    // Add Guminert font CSS
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = 'https://fonts.cdnfonts.com/css/guminert';
    document.head.appendChild(linkEl);
    
    return () => {
      // Clean up
      document.head.removeChild(linkEl);
    };
  }, []);

  return (
    <>
      {/* Trigger element - positioned right after Let's Talk section */}
      <div 
        ref={ref}
        className="h-screen w-full"
      />
      
      {/* Full Page Footer - Fixed overlay that sweeps in */}
      <motion.footer
        initial="hidden"
        animate={controls}
        variants={footerVariants}
        className="fixed inset-0 w-full h-screen bg-black text-white overflow-hidden z-50"
      >
        {/* High opacity curtain sweep effect */}
        <motion.div
          className="absolute inset-0 bg-black z-10"
        />
        
        {/* Background overlay with dramatic sweep effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black z-20"
        />
        
        {/* Animated sweep line effect */}
        <motion.div
          initial={{ scaleY: 0, transformOrigin: "bottom" }}
          animate={controls}
          variants={{
            hidden: { scaleY: 0 },
            visible: { 
              scaleY: 1,
              transition: { duration: 1.2, ease: "easeOut", delay: 0.3 }
            }
          }}
          // className="absolute inset-0 bg-gradient-to-t from-yellow-400/15 via-yellow-400/5 to-transparent z-30"
        />
        
        {/* Main Content */}
        <motion.div 
          variants={contentVariants}
          className="relative z-40 h-full flex flex-col justify-between p-6 md:p-10 lg:p-16"
        >
          {/* Top Section */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 pt-8 lg:pt-16"
          >
            {/* Company Info */}
            <motion.div variants={itemVariants} className="flex-1 max-w-md">
              <motion.h2 
                variants={itemVariants}
                className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                style={{ fontFamily: "'Guminert', 'Arial Black', sans-serif" }}
              >
                BuzzBites
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-gray-300 mb-6 text-lg leading-relaxed"
              >
                 A product-first company crafting digital tools for smarter workforce management. Built in Kolkata. Driven by purpose.
              </motion.p>
              <motion.button 
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold flex items-center gap-3 hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
              >
                Company Deck 
                <motion.span 
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xl"
                >
                  ⬇️
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Quick Links - Expanded */}
            <motion.div variants={itemVariants} className="flex-1 max-w-lg">
              <motion.div variants={itemVariants}>
                <h3 className="font-semibold mb-6 text-2xl lg:text-3xl text-yellow-400" style={{ fontFamily: "'Guminert', sans-serif" }}>Quick Links</h3>
                <ul className="space-y-5 text-gray-400">
                  {['Home', 'Our Journey', 'Instacon', 'Contact'].map((item, index) => (
                    <motion.li 
                      key={item}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ x: 8, color: '#a3e635', scale: 1.02 }}
                      className="cursor-pointer transition-all duration-300 text-lg lg:text-xl font-medium py-2 px-3 rounded-lg hover:bg-gray-900/50"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Download - Expanded */}
            <motion.div variants={itemVariants} className="flex-1 max-w-lg">
              <motion.div variants={itemVariants}>
                <h3 className="font-semibold mb-6 text-2xl lg:text-3xl text-yellow-400" style={{ fontFamily: "'Guminert', sans-serif" }}>Download Our App</h3>
                <ul className="space-y-5 text-gray-400">
                  {['Google Play Store', 'App Store'].map((item, index) => (
                    <motion.li 
                      key={item}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ x: 8, color: '#a3e635', scale: 1.02 }}
                      className="cursor-pointer transition-all duration-300 text-lg lg:text-xl font-medium py-2 px-3 rounded-lg hover:bg-gray-900/50"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Legal - New Section */}
            <motion.div variants={itemVariants} className="flex-1 max-w-lg">
              <motion.div variants={itemVariants}>
                <h3 className="font-semibold mb-6 text-2xl lg:text-3xl text-yellow-400" style={{ fontFamily: "'Guminert', sans-serif" }}>Legal</h3>
                <ul className="space-y-5 text-gray-400">
                  {['Privacy Policy', 'Terms of Use'].map((item, index) => (
                    <motion.li 
                      key={item}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ x: 8, color: '#a3e635', scale: 1.02 }}
                      className="cursor-pointer transition-all duration-300 text-lg lg:text-xl font-medium py-2 px-3 rounded-lg hover:bg-gray-900/50"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom Section - Moved upward with additional margin-bottom */}
          <motion.div variants={itemVariants} className="space-y-6 mb-24 md:mb-32 lg:mb-40">
            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-gray-800 pt-6 gap-4"
            >
              <div className="flex flex-wrap gap-6 text-gray-400">
                {['Instagram', 'Facebook', 'LinkedIn', 'Twitter'].map((social) => (
                  <motion.span 
                    key={social}
                    whileHover={{ color: '#a3e635', y: -2 }}
                    className="cursor-pointer transition-colors duration-200 hover:underline"
                  >
                    {social}
                  </motion.span>
                ))}
              </div>
              <motion.p 
                variants={itemVariants}
                className="text-gray-400 text-sm"
              >
                © 2025 Buzzbites Media & Entertainment Pvt. Ltd.<br></br>
 All rights reserved. | Crafted with purpose in Kolkata

              </motion.p>
            </motion.div>

            
          </motion.div>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none z-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Large half-cut "wavespace" text at bottom - adjusted to be cut exactly through the middle */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none z-[45] w-full">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ 
              duration: 1.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.8 
            }}
            className="relative overflow-hidden w-full"
          >
            <h2 
              className="font-black leading-none select-none w-full"
              style={{
                fontFamily: "'Satoshi', 'Arial Black', sans-serif",
                fontSize: 'clamp(80px, 15vw, 20vw)', // Slightly smaller size
                WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.8)',
                textShadow: '0 0 20px rgba(255,255,255,0.05)',
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%) translateY(40%)', // Exactly half cut
                letterSpacing: '0.18em', // Increased spacing (positive value)
                maxWidth: '100vw',
                overflow: 'hidden',
                textTransform: 'uppercase', // Makes it more impactful
                fontWeight: 700 // Ensure proper weight for Guminert
              }}
            >
              BuzzBites
            </h2>
            
            {/* Subtle gradient overlay for depth - adjusted for exact middle cut */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"
              style={{ transform: 'translateY(50%)' }}
            />
          </motion.div>
        </div>
      </motion.footer>
    </>
  );
}
