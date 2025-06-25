'use client';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import ScrambleButton from './ScrambleButton';
import { BiFingerprint } from 'react-icons/bi';
import { MdOutlineLocationOn, MdOutlineTask } from 'react-icons/md';
import { BsCalendar3 } from 'react-icons/bs';
import FuturisticOverlay from './FuturisticOverlay';


// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Advanced Animated Counter Component with Interactive Elements
const AnimatedCounter = ({ 
  value, 
  suffix = '', 
  duration = 2,
  accentColor = 'rgb(234 179 8)', // Yellow-500 as default
  withAnimation = true
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const animation = useRef(null);
  const digitRefs = useRef({});
  
  // Parse the value early for consistent rendering
  const parsedValue = useMemo(() => {
    const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ''));
    return {
      numeric: numericValue,
      hasDecimal: value.toString().includes('.'),
      formatted: value.toString().includes('.') ? 
        numericValue.toFixed(1) : 
        Math.floor(numericValue).toString()
    };
  }, [value]);
  
  // Reset animation when props change
  useEffect(() => {
    if (!withAnimation || duration === 0) {
      setCount(parsedValue.formatted);
      return;
    }
    
    setHasAnimated(false);
  }, [value, duration, withAnimation, parsedValue]);

  useEffect(() => {
    // If no animation is needed, just set the final value
    if (!withAnimation || duration === 0) {
      setCount(parsedValue.formatted);
      return;
    }

    const element = ref.current;
    if (!element || hasAnimated) return;
    
    // Kill any existing animations
    if (animation.current) {
      animation.current.kill();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const startValue = 0;
          
          // Enhanced animation with improved easing
          animation.current = gsap.to({ value: startValue }, {
            value: parsedValue.numeric,
            duration: duration,
            ease: [0.43, 0.13, 0.23, 0.96], // Cubic bezier equivalent to power2.out
            onUpdate: function() {
              const currentValue = this.targets()[0].value;
              if (parsedValue.hasDecimal) {
                setCount(currentValue.toFixed(1));
              } else {
                setCount(Math.floor(currentValue));
              }
            },
            onComplete: function() {
              setCount(parsedValue.formatted);
              
              // Add a subtle bounce effect to each digit when animation completes
              const digits = parsedValue.formatted.split('');
              digits.forEach((_, i) => {
                const digitEl = digitRefs.current[i];
                if (digitEl) {
                  gsap.fromTo(digitEl, 
                    { scale: 1 },
                    { 
                      scale: 1.2, 
                      duration: 0.3, 
                      ease: "elastic.out(1.2, 0.4)",
                      delay: i * 0.05,
                      yoyo: true,
                      repeat: 1,
                      repeatDelay: 0.1
                    }
                  );
                }
              });
            }
          });
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" } // Start animation even earlier
    );

    observer.observe(element);
    
    return () => {
      observer.disconnect();
      if (animation.current) {
        animation.current.kill();
      }
    };
  }, [value, duration, hasAnimated, withAnimation, parsedValue]);

  // Split the count into individual digits for better animation control
  const displayValue = count.toString();
  
  return (
    <span ref={ref} className="tabular-nums inline-flex items-center relative">
      {displayValue.split('').map((digit, i) => (
        <span 
          key={i} 
          ref={el => digitRefs.current[i] = el}
          className="relative inline-block transform origin-center"
          style={{ 
            textShadow: `0 0 15px ${accentColor}40`
          }}
        >
          {digit}
        </span>
      ))}
      
      {/* Stylized suffix with enhanced animation */}
      {suffix && (
        <motion.span
          className="inline-block ml-1"
          initial={hasAnimated ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 15, 
            delay: duration * 0.8 
          }}
          style={{ 
            textShadow: `0 0 10px ${accentColor}60`,
            color: accentColor
          }}
        >
          {suffix}
        </motion.span>
      )}
    </span>
  );
};

// Micro-animations and utilities for enhanced visual details
const CircuitPath = ({ isActive, color = "rgba(234, 179, 8, 0.7)", delay = 0 }) => (
  <motion.path 
    d="M5,20 L5,80 L95,80"
    fill="none"
    stroke={color}
    strokeWidth="1"
    strokeDasharray="5,5"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={isActive ? { 
      pathLength: 1, 
      opacity: 0.8,
      transition: { 
        delay, 
        duration: 1.5,
        ease: "easeInOut" 
      }
    } : { pathLength: 0, opacity: 0 }}
  />
);

const PulsingCircle = ({ isActive, x, y, size = 6, color = "rgba(234, 179, 8, 0.9)", delay = 0 }) => (
  <motion.circle
    cx={x}
    cy={y}
    r={size}
    fill="transparent"
    stroke={color}
    strokeWidth="1.5"
    initial={{ scale: 0, opacity: 0 }}
    animate={isActive ? {
      scale: [0, 1, 1.5, 1],
      opacity: [0, 0.8, 0.2, 0.8],
      transition: {
        delay,
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1
      }
    } : { scale: 0, opacity: 0 }}
  />
);

const GlowingDot = ({ isActive, x, y, size = 4, color = "rgba(234, 179, 8, 1)", delay = 0 }) => (
  <motion.circle
    cx={x}
    cy={y}
    r={size}
    fill={color}
    initial={{ scale: 0, opacity: 0 }}
    animate={isActive ? {
      scale: 1,
      opacity: 1,
      filter: "drop-shadow(0 0 3px rgba(234, 179, 8, 0.8))",
      transition: { delay, duration: 0.4 }
    } : { scale: 0, opacity: 0 }}
  />
);

const GraphBar = ({ 
  height, 
  width = 24, 
  isActive, 
  delay, 
  color = "#eab308",
  highlightColor = "rgba(234, 179, 8, 0.3)" 
}) => (
  <motion.div
    className="relative"
    style={{
      width: `${width}px`,
      height: `${height}px`,
      overflow: "hidden"
    }}
  >
    <motion.div 
      className="absolute bottom-0 w-full"
      style={{ 
        backgroundColor: color,
        borderRadius: "3px 3px 0 0",
        boxShadow: `0 0 10px 0 ${highlightColor}`
      }}
      initial={{ height: 0 }}
      animate={isActive ? { 
        height: "100%",        transition: { 
          delay, 
          duration: 1,
          ease: [0.43, 0.13, 0.23, 0.96] // Cubic bezier equivalent to power2.out
        }
      } : { height: 0 }}
    />
  </motion.div>
);

const PieSegment = ({ 
  percentage, 
  color = "#eab308", 
  isActive = false, 
  delay = 0, 
  radius = 40,
  strokeWidth = 8,
}) => {
  // Calculate SVG parameters
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);
  
  return (
    <motion.circle
      cx="50"
      cy="50"
      r={radius}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={circumference}
      initial={{ strokeDashoffset: circumference }}
      animate={isActive ? {
        strokeDashoffset,        transition: {
          delay,
          duration: 1.5,
          ease: [0.43, 0.13, 0.23, 0.96] // Cubic bezier equivalent to power2.out
        }
      } : { strokeDashoffset: circumference }}
      style={{ 
        transformOrigin: "center",
        transform: "rotate(-90deg)",
        filter: `drop-shadow(0 0 2px ${color})`
      }}
    />
  );
};

// Enhanced Metric Card with Dashboard-style Infographics
const MetricCard = ({ 
  metric, 
  rawValue,
  description,  
  icon,
  chartType, // 'bar', 'pie', 'scatter', 'growth'
  chartData,
  accentColor = "rgb(234 179 8)", // Yellow-500 default
  isActive,
  index = 0 
}) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const isVisible = isActive;

  // Split description into parts for better layout control
  let [title, subtitle] = ["", ""];
  if (description.includes('(')) {
    [title, subtitle] = [
      description.split('(')[0].trim(), 
      `(${description.split('(')[1]}`
    ];
  } else if (description.includes(':')) {
    [title, subtitle] = description.split(':').map(s => s.trim());
  } else {
    title = description;
  }

  // Determine if metric has special characters like + or %
  const suffix = metric.includes('+') ? '+' : 
                metric.includes('%') ? '%' : 
                metric.includes('★') ? '★' : '';
  
  // Custom chart rendering based on type
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <div className="h-[70px] flex items-end space-x-2 justify-center">
            {chartData.map((value, i) => (
              <GraphBar 
                key={i}
                height={value} 
                isActive={isVisible} 
                delay={0.6 + (i * 0.1)}
                color={accentColor}
                highlightColor={`${accentColor}50`}
              />
            ))}
          </div>
        );
      
      case 'pie':
        return (
          <div className="flex justify-center my-2">
            <svg width="100" height="100" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              
              {/* Percentage fill */}
              <PieSegment 
                percentage={rawValue} 
                color={accentColor}
                isActive={isVisible}
                delay={0.6}
              />
              
              {/* Center text */}
              <text 
                x="50" 
                y="50" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill="white"
                fontSize="16"
                fontWeight="bold"
              >
                {rawValue}%
              </text>
            </svg>
          </div>
        );
      
      case 'scatter':
        return (
          <div className="flex justify-center my-2">
            <svg width="100%" height="80" viewBox="0 0 100 80">
              {/* Grid lines */}
              <line x1="10" y1="70" x2="90" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="10" y1="30" x2="90" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              
              {/* Scatter points with connections */}
              <CircuitPath isActive={isVisible} delay={0.5} />
              
              {chartData.map((point, i) => (
                <React.Fragment key={i}>
                  <GlowingDot 
                    isActive={isVisible} 
                    x={point.x} 
                    y={point.y} 
                    delay={0.7 + (i * 0.15)}
                    color={accentColor}
                  />
                  {i % 2 === 0 && (
                    <PulsingCircle 
                      isActive={isVisible} 
                      x={point.x} 
                      y={point.y} 
                      delay={0.9 + (i * 0.2)}
                      color={`${accentColor}90`}
                    />
                  )}
                </React.Fragment>
              ))}
            </svg>
          </div>
        );
      
      case 'growth':
        return (
          <div className="flex justify-center my-2">
            <svg width="100%" height="80" viewBox="0 0 100 80">
              {/* Background grid */}
              <line x1="0" y1="70" x2="100" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              
              {/* Growth path */}
              <motion.path
                d="M10,65 C25,60 35,40 50,35 S75,20 90,10"
                fill="none"
                stroke={accentColor}
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isVisible ? { 
                  pathLength: 1, 
                  opacity: 1,
                  transition: { 
                    delay: 0.6, 
                    duration: 1.5,
                    ease: "easeInOut" 
                  }
                } : { pathLength: 0, opacity: 0 }}
              />
              
              {/* Highlight points along the path */}
              {[
                { x: 10, y: 65 },
                { x: 35, y: 45 },
                { x: 60, y: 25 },
                { x: 90, y: 10 }
              ].map((point, i) => (
                <GlowingDot 
                  key={i}
                  isActive={isVisible} 
                  x={point.x} 
                  y={point.y} 
                  delay={0.8 + (i * 0.3)}
                  color={accentColor}
                />
              ))}
            </svg>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="h-full w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          type: "spring",
          stiffness: 50,
          damping: 15
        }
      } : {
        opacity: 0,
        y: 50
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div 
        className={`
          h-full relative overflow-hidden rounded-xl
          bg-gradient-to-br from-gray-900/70 via-black/80 to-gray-900/70
          border backdrop-blur-sm dashboard-metric-card metric-backdrop
          transition-all duration-300 transform
          ${hovered ? 'shadow-lg' : ''}
        `}
        style={{
          borderColor: `${accentColor}30`,
          boxShadow: hovered ? `0 0 20px ${accentColor}20` : 'none',
          '--accent-color': accentColor
        }}
      >
        <FuturisticOverlay opacity="low" className={`opacity-20 ${hovered ? 'opacity-30' : ''}`} />
        
        {/* Animated corner decorations */}
        <svg className="absolute top-0 left-0 w-12 h-12 opacity-50" viewBox="0 0 24 24">
          <motion.path
            d="M0,0 L12,0 L0,12 Z"
            fill="none"
            stroke={accentColor}
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { 
              pathLength: 1, 
              opacity: hovered ? 0.8 : 0.5,
              transition: {
                delay: 0.2,
                duration: 1,
                ease: "easeInOut"
              }
            } : { pathLength: 0, opacity: 0 }}
          />
        </svg>
        
        <svg className="absolute bottom-0 right-0 w-12 h-12 opacity-50" viewBox="0 0 24 24">
          <motion.path
            d="M24,24 L12,24 L24,12 Z"
            fill="none"
            stroke={accentColor}
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { 
              pathLength: 1, 
              opacity: hovered ? 0.8 : 0.5,
              transition: {
                delay: 0.3,
                duration: 1,
                ease: "easeInOut"
              }
            } : { pathLength: 0, opacity: 0 }}
          />
        </svg>
        
        {/* Card Content with Modern Dashboard Layout */}
        <div className="relative z-10 p-5 md:p-6">
          {/* Top row with icon and number */}
          <div className="flex justify-between items-center mb-4">
            {/* Icon with glow effect */}
            <motion.div
              className="p-3 rounded-lg bg-black/30 backdrop-blur-sm border glow-accent"
              initial={{ scale: 0, opacity: 0 }}
              animate={isVisible ? { 
                scale: 1, 
                opacity: 1,
                transition: {
                  delay: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }
              } : { scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              style={{
                borderColor: `${accentColor}30`,
                boxShadow: hovered ? `0 0 15px 0 ${accentColor}40` : 'none',
                '--accent-color': accentColor,
                transition: 'box-shadow 0.3s ease'
              }}
            >
              {icon}
            </motion.div>
            
            {/* Metric number with enhanced animation */}
            <motion.div
              className="text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={isVisible ? { 
                opacity: 1, 
                x: 0,
                transition: {
                  delay: 0.5,
                  duration: 0.6
                }
              } : { opacity: 0, x: 20 }}
            >
              <div className="text-4xl md:text-5xl font-satoshi font-black leading-none glow-accent-text">
                <AnimatedCounter 
                  value={metric} 
                  suffix={suffix}
                  duration={isVisible ? 2 : 0}
                  accentColor={accentColor}
                  withAnimation={true}
                />
              </div>
            </motion.div>
          </div>
          
          {/* Visual chart/graphic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { 
              opacity: 1,
              transition: { delay: 0.4 }
            } : { opacity: 0 }}
            className="my-4"
          >
            {renderChart()}
          </motion.div>
          
          {/* Title with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { 
              opacity: 1, 
              y: 0,
              transition: {
                delay: 0.7,
                duration: 0.5
              }
            } : { opacity: 0, y: 10 }}
            className="mt-3"
          >
            <h3 className="font-satoshi font-bold text-white text-lg">
              {title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.8 + (i * 0.05),
                      duration: 0.4
                    }
                  } : { opacity: 0, y: 10 }}
                >
                  {word}
                </motion.span>
              ))}
            </h3>
            
            {subtitle && (
              <motion.p
                className="text-gray-400 font-satoshi text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={isVisible ? {
                  opacity: 0.8,
                  transition: {
                    delay: 1.2,
                    duration: 0.5
                  }
                } : { opacity: 0 }}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
          
          {/* Interactive hover effect overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br"
            style={{
              background: `radial-gradient(circle at ${hovered ? '50% 50%' : '200% 200%'}, ${accentColor}15 0%, transparent 70%)`,
              transition: 'all 0.6s ease-out'
            }}
            animate={{
              opacity: hovered ? 1 : 0
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Completely Redesigned Modern Dashboard Metrics Section
const MetricsSection = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  
  // Unique ID for this ScrollTrigger instance
  const scrollTriggerId = useRef(`metrics-dashboard-${Date.now()}`);

  // Enhanced metrics data with visual configurations
  const metrics = [
    { 
      metric: "50+", 
      rawValue: 50,
      description: "Organizations Using Instacon Across India", 
      icon: <BiFingerprint className="w-6 h-6 text-yellow-500" />,
      chartType: 'growth',
      chartData: []
    },
    { 
      metric: "10+", 
      rawValue: 10,
      description: "Industries Served: Pharma, FMCG, Field Sales, Logistics & more", 
      icon: <MdOutlineLocationOn className="w-6 h-6 text-emerald-500" />,
      chartType: 'bar',
      chartData: [45, 60, 35, 70, 55, 40, 65],
      accentColor: "rgb(16 185 129)" // emerald-500
    },
    { 
      metric: "98.7%", 
      rawValue: 98.7,
      description: "Accuracy Rate in GPS-based Attendance", 
      icon: <MdOutlineTask className="w-6 h-6 text-blue-500" />,
      chartType: 'pie',
      chartData: [],
      accentColor: "rgb(59 130 246)" // blue-500
    },
    { 
      metric: "4.8★", 
      rawValue: 4.8,
      description: "User Rating on App Stores", 
      icon: <BsCalendar3 className="w-6 h-6 text-purple-500" />,
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 45 }, 
        { x: 30, y: 25 }, 
        { x: 50, y: 20 }, 
        { x: 70, y: 15 }, 
        { x: 90, y: 10 }
      ],
      accentColor: "rgb(168 85 247)" // purple-500
    }
  ];

  // Use GSAP for smooth scroll-driven animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    
    if (!section || !trigger) return;

    // Create scroll-triggered dashboard animation
    const scrollHeight = window.innerHeight * 2; // Length of scroll interaction
    
    const tl = gsap.timeline({
      scrollTrigger: {
        id: scrollTriggerId.current,
        trigger: trigger,
        start: "top 20%",
        end: `+=${scrollHeight}px`,
        pin: section,
        pinSpacing: true,
        scrub: 0.5, // Smoother response to scroll
        markers: false,
        anticipatePin: 1,
        fastScrollEnd: true,
        onEnter: () => setIsInView(true),
        onEnterBack: () => setIsInView(true),
        onLeave: () => setIsInView(false),
        onLeaveBack: () => setIsInView(false),
        onUpdate: (self) => {
          // Calculate which metric should be active based on scroll position
          const progress = self.progress;
          const metricsCount = metrics.length;
          const metricsStep = 1 / (metricsCount + 0.5); // Adding buffer at the end
          
          // Only trigger metric change at specific thresholds
          const newIndex = Math.min(
            Math.floor(progress / metricsStep),
            metricsCount - 1
          );
          
          if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
          }
        }
      }
    });

    // Refresh ScrollTrigger after a small delay to ensure proper initialization
    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 200);

    const handleResize = () => {
      ScrollTrigger.update();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      tl.kill();
      ScrollTrigger.getById(scrollTriggerId.current)?.kill();
    };
  }, [activeIndex]);

  return (
    <div ref={triggerRef} className="relative min-h-[250vh]">
      {/* Section heading spacer */}
      <div className="h-20 md:h-40"></div>
      
      {/* Pinned dashboard section */}
      <section 
        ref={sectionRef} 
        className="relative min-h-screen w-full flex flex-col items-center justify-center py-12 bg-black/80"
      >
        <FuturisticOverlay opacity="medium" className="opacity-40" />
        
        {/* Animated circuit background */}
        <motion.div 
          className="absolute inset-0 circuit-lines opacity-10"
          animate={{
            backgroundPosition: ['0px 0px', '20px 20px'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Content container */}
        <motion.div
          className="container mx-auto px-4 relative z-10 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Section header with animated highlight */}
          <div className="text-center mb-10 md:mb-16">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: "80px", opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-4"
            />
            
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-black text-white mb-3"
            >
              Our <span className="text-yellow-500">Impact</span>
            </motion.h2>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 font-satoshi max-w-3xl mx-auto"
            >
              Real-world metrics from organizations transforming their field operations with Instacon
            </motion.p>
          </div>

          {/* Modern grid layout for metrics cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 max-w-6xl mx-auto perspective-1000">
            {metrics.map((item, index) => (
              <div key={index} className="h-[240px] md:h-[260px]">
                <MetricCard
                  {...item}
                  index={index}
                  isActive={activeIndex >= index && isInView}
                />
              </div>
            ))}
          </div>
          
          {/* Interactive nav indicators */}
          <motion.div 
            className="flex justify-center mt-10 space-x-3"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.6 }}
          >
            {metrics.map((_, index) => {
              // Get specific accent color for this indicator
              const indicatorColor = metrics[index].accentColor || "rgb(234 179 8)";
              
              return (
                <motion.button
                  key={index}
                  className="w-3 h-3 rounded-full relative"
                  style={{
                    backgroundColor: index <= activeIndex ? indicatorColor : 'rgba(255, 255, 255, 0.2)',
                    boxShadow: index === activeIndex ? `0 0 10px 0 ${indicatorColor}80` : 'none',
                  }}
                  animate={{
                    scale: index === activeIndex ? 1.2 : 1
                  }}
                  whileHover={{ scale: 1.3 }}
                  onClick={() => {
                    // Navigate to specific section in the scroll sequence
                    const st = ScrollTrigger.getById(scrollTriggerId.current);
                    if (st) {
                      // Position to trigger this specific metric
                      const metricsStep = 1 / (metrics.length + 0.5);
                      const targetProgress = (index * metricsStep) + (metricsStep * 0.2); // Offset a bit to ensure triggering
                      const targetScroll = st.start + ((st.end - st.start) * targetProgress);
                      
                      gsap.to(window, {
                        scrollTo: targetScroll,
                        duration: 0.8,
                        ease: "power2.inOut"
                      });
                    }
                  }}
                >
                  {index === activeIndex && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: indicatorColor }}
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Continue scrolling indicator */}
          <motion.div 
            className="absolute bottom-8 left-0 right-0 flex justify-center opacity-60 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isInView ? [0.4, 0.8, 0.4] : 0,
              y: isInView ? [0, 5, 0] : 0 
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <div className="flex flex-col items-center">
              <p className="text-white/70">Scroll to explore</p>
              <svg className="w-5 h-5 mt-1 text-white/70" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

// Feature Card Component for the main product section
const FeatureCard = ({ icon: Icon, title, delay, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-20% 0px" });

  return (
    <motion.div
      ref={cardRef}
      className="group"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
      transition={{ 
        delay,
        duration: 0.8, 
        type: "spring", 
        stiffness: 80,
        damping: 20
      }}
    >
      <div className="relative p-6 rounded-2xl bg-black/30 backdrop-blur-sm border border-yellow-500/10 hover:border-yellow-500/40 transition-all duration-300 h-full flex flex-col items-center text-center">
        <FuturisticOverlay opacity="low" className="opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
        
        <div className="p-3 rounded-full bg-yellow-500/10 mb-4 relative">
          <Icon className="w-8 h-8 text-yellow-500" />
          
          {/* Animated ring effect */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-yellow-500/30"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: index * 0.5
            }}
          />
        </div>
        
        <h3 className="text-lg font-satoshi font-bold text-white mb-3">{title}</h3>
        
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100
  });
  // Parallax effect for title and subtitle
  const titleY = useTransform(smoothProgress, [0, 0.5], [100, 0]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);
  
  // Delay the subtitle animation to appear only after the title is fully visible
  const subtitleY = useTransform(smoothProgress, [0.4, 0.7], [60, 0]);
  const subtitleOpacity = useTransform(smoothProgress, [0.35, 0.6], [0, 1]);
  const isInView = useInView(containerRef, { once: false, margin: "-10% 0px" });

  return (
    <>
      <section ref={sectionRef} className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-black/20 to-black/40">
        <FuturisticOverlay opacity="medium" className="opacity-60" />
        
        <div className="container mx-auto px-6 relative z-10">          <div className="max-w-4xl mx-auto text-center mb-16 perspective-container">
            <motion.div
              style={{ y: titleY, opacity: titleOpacity }}
              className="mb-8 relative"
            >
              {/* High-tech animated heading with holographic effect */}
              <motion.h2 
                className="text-4xl md:text-5xl font-satoshi font-black text-white mb-6 leading-tight relative z-10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Animated word reveals with holographic scanlines */}
                <motion.span
                  className="inline-block relative"
                  initial={{ opacity: 0, rotateX: -90, z: -100 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    rotateX: 0, 
                    z: 0,
                    transition: { 
                      duration: 0.8, 
                      delay: 0.3,
                      type: "spring",
                      stiffness: 100
                    }
                  } : { opacity: 0, rotateX: -90, z: -100 }}
                  style={{ transformOrigin: "center bottom" }}
                >
                  Meet{" "}
                  {/* Holographic shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={isInView ? { 
                      x: "100%",
                      transition: { 
                        duration: 1.5, 
                        delay: 1.1,
                        ease: "easeInOut"
                      }
                    } : { x: "-100%" }}
                  />
                </motion.span>
                
                <motion.span 
                  className="text-yellow-500 inline-block relative glow-text"
                  initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    scale: 1, 
                    rotateY: 0,
                    transition: { 
                      duration: 1, 
                      delay: 0.6,
                      type: "spring",
                      stiffness: 120
                    }
                  } : { opacity: 0, scale: 0.5, rotateY: 180 }}
                  style={{ 
                    transformOrigin: "center",
                    textShadow: "0 0 20px rgba(234, 179, 8, 0.8), 0 0 40px rgba(234, 179, 8, 0.4)"
                  }}
                >
                  Instacon
                  {/* Pulsing energy ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-yellow-500/50 rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? {
                      scale: [0, 1.2, 1],
                      opacity: [0, 0.8, 0],
                      transition: {
                        duration: 2,
                        delay: 1.2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }
                    } : { scale: 0, opacity: 0 }}
                  />
                </motion.span>
                
                <motion.span
                  className="inline-block relative"
                  initial={{ opacity: 0, y: 50, skewX: 45 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    y: 0, 
                    skewX: 0,
                    transition: { 
                      duration: 0.8, 
                      delay: 0.9,
                      type: "spring",
                      stiffness: 80
                    }
                  } : { opacity: 0, y: 50, skewX: 45 }}
                >
                  : Your Field Team,{" "}
                </motion.span>
                
                <motion.span 
                  className="text-yellow-500 inline-block relative"
                  initial={{ opacity: 0, x: -100, rotateZ: -45 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    x: 0, 
                    rotateZ: 0,
                    transition: { 
                      duration: 1, 
                      delay: 1.2,
                      type: "spring",
                      stiffness: 100
                    }
                  } : { opacity: 0, x: -100, rotateZ: -45 }}
                  style={{ 
                    textShadow: "0 0 15px rgba(234, 179, 8, 0.6)"
                  }}
                >
                  Fully Connected
                  {/* Digital matrix effect */}
                  <motion.div
                    className="absolute -inset-2 opacity-20"
                    initial={{ opacity: 0 }}
                    animate={isInView ? {
                      opacity: [0, 0.3, 0],
                      transition: {
                        duration: 0.3,
                        delay: 2,
                        repeat: 3,
                        repeatDelay: 0.1
                      }
                    } : { opacity: 0 }}
                    style={{
                      background: `
                        repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 2px,
                          rgba(234, 179, 8, 0.1) 2px,
                          rgba(234, 179, 8, 0.1) 4px
                        )
                      `
                    }}
                  />
                </motion.span>
              </motion.h2>
              
              {/* Circuit board background pattern */}
              <motion.svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
                viewBox="0 0 400 200"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                {/* Animated circuit paths */}
                <motion.path
                  d="M50,100 L150,100 L150,50 L250,50 L250,150 L350,150"
                  fill="none"
                  stroke="rgba(234, 179, 8, 0.6)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? {
                    pathLength: 1,
                    opacity: 0.6,
                    transition: {
                      duration: 2,
                      delay: 1.8,
                      ease: "easeInOut"
                    }
                  } : { pathLength: 0, opacity: 0 }}
                />
                
                {/* Pulsing connection nodes */}
                {[{x: 150, y: 100}, {x: 150, y: 50}, {x: 250, y: 50}, {x: 250, y: 150}].map((node, i) => (
                  <motion.circle
                    key={i}
                    cx={node.x}
                    cy={node.y}
                    r="3"
                    fill="rgba(234, 179, 8, 0.8)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? {
                      scale: [0, 1, 1.5, 1],
                      opacity: [0, 1, 0.5, 1],
                      transition: {
                        duration: 1,
                        delay: 2.2 + (i * 0.2),
                        repeat: Infinity,
                        repeatDelay: 4
                      }
                    } : { scale: 0, opacity: 0 }}
                  />
                ))}
              </motion.svg>
              
              {/* Floating tech particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-500/60 rounded-full"
                  style={{
                    left: `${20 + (i * 10)}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? {
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [-20, -40, -60],
                    transition: {
                      duration: 3,
                      delay: 2.5 + (i * 0.3),
                      repeat: Infinity,
                      repeatDelay: 5
                    }
                  } : { opacity: 0, scale: 0 }}
                />
              ))}
            </motion.div>
              <motion.div
              style={{ y: subtitleY, opacity: subtitleOpacity }}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ 
                delay: 0.6,  // Additional delay to ensure it appears after the title
                duration: 0.8, 
                type: "spring", 
                stiffness: 50,
                damping: 15
              }}
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
          </div>

          <motion.div 
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

      {/* Metrics Section with Scroll Trigger */}
      
    </>
  );
}


