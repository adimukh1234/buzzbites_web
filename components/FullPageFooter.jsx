'use client';
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
              >
                BuzzBites
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-gray-300 mb-6 text-lg leading-relaxed"
              >
                Wavespace is a global UI/UX design agency that boosts brand value with user-friendly, effective designs for web, mobile, and SaaS platforms.
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

            {/* Services */}
            <motion.div variants={itemVariants} className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="font-semibold mb-4 text-xl text-yellow-400">Services</h3>
                <ul className="space-y-3 text-gray-400">
                  {['Branding', 'UI UX Design', 'Web Design', 'SaaS Design', 'Webflow', 'Build Product (MVP)'].map((item, index) => (
                    <motion.li 
                      key={item}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ x: 5, color: '#a3e635' }}
                      className="cursor-pointer transition-colors duration-200"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="font-semibold mb-4 text-xl text-transparent">Services</h3>
                <ul className="space-y-3 text-gray-400">
                  {['Mobile App', 'Design System', 'Webflow', 'Build Product (MVP)', 'Conversion Rate (CRO)'].map((item, index) => (
                    <motion.li 
                      key={item}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ x: 5, color: '#a3e635' }}
                      className="cursor-pointer transition-colors duration-200"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Case Studies and Contact */}
            <motion.div variants={itemVariants} className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="font-semibold mb-4 text-xl text-yellow-400">Case studies</h3>
                <ul className="space-y-3 text-gray-400">
                  {['Open Hub', 'Better AI', 'Spacebook', 'Kodezi', 'View all work'].map((item, index) => (
                    <motion.li 
                      key={item}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ x: 5, color: '#a3e635' }}
                      className="cursor-pointer transition-colors duration-200"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="font-semibold mb-4 text-xl text-yellow-400">Contact</h3>
                <ul className="space-y-3 text-gray-400">
                  {['Clutch', 'Behance', 'Dribbble', 'Awwwards'].map((item, index) => (
                    <motion.li 
                      key={item}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ x: 5, color: '#a3e635' }}
                      className="cursor-pointer transition-colors duration-200"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div variants={itemVariants} className="space-y-6">
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
                wavespace LLC © 2025
              </motion.p>
            </motion.div>

            {/* Location and Team */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-gray-400 text-sm"
            >
              <motion.span variants={itemVariants}>
                Wavespace is a limited liability company based in 🇵🇱 🇮🇳 🇧🇩
              </motion.span>
              <motion.div 
                variants={itemVariants}
                className="flex -space-x-2"
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    custom={i}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full border-2 border-black cursor-pointer"
                  />
                ))}
              </motion.div>
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
      </motion.footer>
    </>
  );
}
