'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import '../globals.css';
import Spline from '@splinetool/react-spline';
import TitleStack from "../../../components/TitleStack";
import NavBar from "../../../components/NavBar";

export default function ProductPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring physics for parallax
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  // Hero section parallax transforms
  const heroY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -300]), springConfig);
  const heroOpacity = useSpring(useTransform(scrollYProgress, [0, 0.3], [1, 0]), springConfig);
  const heroScale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 1.1]), springConfig);
  
  // 3D Model parallax
  const modelY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), springConfig);
  const modelRotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 10]), springConfig);
  const modelScale = useSpring(useTransform(scrollYProgress, [0, 0.6], [1, 1.2]), springConfig);
  
  // Background layers parallax
  const bgLayer1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), springConfig);
  const bgLayer2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), springConfig);
  const bgLayer3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]), springConfig);
  
  // Particles parallax
  const particlesY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -400]), springConfig);
  const particlesOpacity = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0.2]), springConfig);

  return (
    <>
    <NavBar />
    <div ref={containerRef} className="relative">
      {/* Fixed Background Layers with Parallax */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-b from-black to-gray-900 z-0"
        style={{ y: bgLayer1 }}
      />
      
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/10 to-red-900/5 z-0"
        style={{ y: bgLayer2 }}
      />
      
      <motion.div 
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,rgba(239,68,68,0.1)_50%,transparent_70%)] z-0"
        style={{ y: bgLayer3 }}
      />

      {/* Floating Particles with Parallax */}
      <motion.div 
        className="fixed inset-0 overflow-hidden pointer-events-none z-10"
        style={{ y: particlesY, opacity: particlesOpacity }}
      >
        <motion.div 
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-1 h-1 bg-red-300 rounded-full opacity-30"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1 
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-25"
          animate={{ 
            x: [0, 15, 0],
            scale: [1, 1.3, 1] 
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2 
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 rounded-full opacity-20"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear",
            delay: 3 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-2/3 w-2 h-2 bg-blue-600 rounded-full opacity-15"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 10, 0] 
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4 
          }}
        />
      </motion.div>



      {/* Hero Section with Parallax */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center z-20"
        style={{ 
          y: heroY, 
          opacity: heroOpacity,
          scale: heroScale 
        }}
      >
        <div className="mx-auto px-8 py-16 max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content with Staggered Animation */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 1, 
                staggerChildren: 0.2,
                ease: "easeOut" 
              }}
            >
              <motion.h1 
                className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-blue-500">Instacon</span> — Field Workforce <span className="text-red-500">Management</span> Software
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Real-time location tracking. Smarter attendance. Seamless operations.
                Instacon helps you manage on-ground teams with confidence — all from your screen.
              </motion.p>

              <motion.div 
                className="pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Request a Demo
                  </motion.button>
                  <motion.button 
                    className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Download App
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Model with Enhanced Parallax */}
            <motion.div 
              className="flex justify-center items-center relative"
              style={{ 
                y: modelY,
                rotateY: modelRotate,
                scale: modelScale 
              }}
            >
              <motion.div 
                className="w-full h-[800px] relative overflow-visible"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* Enhanced gradient backdrop */}
                <motion.div 
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,rgba(239,68,68,0.1)_50%,transparent_70%)] opacity-30"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3] 
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                
                {/* 3D Model */}
                <Spline
                  scene="/tech_inspired_3_d_assets_location.spline"
                  data-lenis-prevent
                  style={{ 
                    width: '150%', 
                    height: '120%', 
                    marginLeft: '-20%', 
                    marginTop: '-5%',  
                    transform: 'translateY(-50px) scale(1.1)', 
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    pointerEvents: 'none' 
                  }} 
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Transition Area with Floating Elements */}
      <motion.div 
        className="relative h-32 overflow-hidden z-15"
        style={{ y: useSpring(useTransform(scrollYProgress, [0.3, 0.7], [0, -100]), springConfig) }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 2 === 0 ? 'bg-red-400/30' : 'bg-blue-400/30'
            }`}
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + Math.sin(i) * 30}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* TitleStack Section with Parallax */}
      <motion.div 
        className="relative z-20"
        style={{ 
          y: useSpring(useTransform(scrollYProgress, [0.4, 1], [100, -50]), springConfig),
          opacity: useSpring(useTransform(scrollYProgress, [0.3, 0.5], [0, 1]), springConfig)
        }}
      >
        <TitleStack />
      </motion.div>

      {/* Additional Content Section */}
      <motion.section 
        className="relative min-h-screen bg-gradient-to-b from-black to-gray-800 z-20 overflow-hidden"
        style={{ 
          y: useSpring(useTransform(scrollYProgress, [0.6, 1], [200, 0]), springConfig) 
        }}
      >
        <div className="absolute inset-0">
          {/* Animated background pattern */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                i % 2 === 0 ? 'bg-red-500/10' : 'bg-blue-500/10'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
          <motion.div 
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Key <span className="text-blue-500">Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to manage your field workforce effectively, all in one powerful platform.
            </p>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { 
                  title: "GPS + Image-Based Attendance", 
                  desc: "Employees check in with geo-tagged selfies — ensuring verified attendance with location proof.",
                  icon: "📍"
                },
                { 
                  title: "Real-Time Location Tracking", 
                  desc: "Track where your team is, in real-time. Improve field visibility, reduce idle time, and stay in control.",
                  icon: "🗺️"
                },
                { 
                  title: "Visit Report Submission", 
                  desc: "Employees can instantly submit visit summaries, client feedback, or task outcomes — with time, location, and notes all logged automatically.",
                  icon: "📋"
                },
                { 
                  title: "Leave & Shift Management", 
                  desc: "Plan better with shift assignments, leave requests, and calendar visibility — all in one place.",
                  icon: "📅"
                },
                { 
                  title: "Route & Task Reporting", 
                  desc: "Employees can log meeting details, site visits, and client interactions — backed by location history and notes.",
                  icon: "🛣️"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-left"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: i % 2 === 0 ? 'rgba(239, 68, 68, 0.5)' : 'rgba(59, 130, 246, 0.5)',
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Teams Choose Instacon Section */}
      <motion.section 
        className="relative min-h-screen bg-gradient-to-b from-gray-800 to-black z-20 overflow-hidden"
        style={{ 
          y: useSpring(useTransform(scrollYProgress, [0.7, 1], [100, 0]), springConfig) 
        }}
      >
        <div className="absolute inset-0">
          {/* Animated background pattern */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                i % 3 === 0 ? 'bg-blue-500/20' : i % 3 === 1 ? 'bg-red-500/20' : 'bg-gray-500/20'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Why Teams Choose */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Why Teams Choose <span className="text-red-500">Instacon</span>
              </h2>
              
              <div className="space-y-4">
                {/*
                  "Reduces manual reporting",
                  "Eliminates fake attendance",
                  "Centralizes task updates & location trails",
                  "Boosts accountability & trust in distributed teams",
                  "Works seamlessly across industries: Sales, Logistics, FMCG, Insurance, and more"
                */}
                {["Reduces manual reporting", "Eliminates fake attendance", "Centralizes task updates & location trails", "Boosts accountability & trust in distributed teams", "Works seamlessly across industries: Sales, Logistics, FMCG, Insurance, and more"].map((benefit, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                      ✓
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Get Instacon Today */}
            <motion.div 
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 text-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-4">
                Get <span className="text-blue-500">Instacon</span> Today
              </h3>
              <p className="text-gray-300 mb-6">
                Available on Android & iOS. Simple to set up. Easy to scale.
                Let your workforce work smarter — from anywhere.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <motion.button 
                  className="bg-black text-white px-6 py-3 rounded-lg font-semibold border border-gray-600 hover:border-white transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>📱</span>
                  <span>Download on Play Store</span>
                </motion.button>
                <motion.button 
                  className="bg-black text-white px-6 py-3 rounded-lg font-semibold border border-gray-600 hover:border-white transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>🍎</span>
                  <span>Download on App Store</span>
                </motion.button>
              </div>
              
              <motion.button 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25 w-full mb-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Request a Demo
              </motion.button>
              
              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-xl font-semibold text-white mb-3">Need a Custom Use Case?</h4>
                <p className="text-gray-300 mb-4">
                  Whether you're managing 50 or 1,000 field employees, Instacon adapts to your workflow.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>📩 Email us at: <span className="text-blue-400">support@instacon.co.in</span></p>
                  <p>📞 Contact Us: <span className="text-blue-400">9903294089</span></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Custom Styles */}
      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000;
        }
        
        .glow-text-blue {
          text-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6;
        }
        
        .glow-text-red {
          text-shadow: 0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444;
        }
        
        canvas, iframe {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        
        /* Smooth scrolling enhancement */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
    </>
  );
}
