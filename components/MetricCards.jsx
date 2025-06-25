'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { BiBuildings } from 'react-icons/bi';
import { MdCategory } from 'react-icons/md';
import { TbTargetArrow } from 'react-icons/tb';
import { AiFillStar } from 'react-icons/ai';
import FuturisticOverlay from './FuturisticOverlay';

// Reusing AnimatedCounter from InstaconProduct.fixed.jsx
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
  
  React.useEffect(() => {
    if (!withAnimation || duration === 0) {
      setCount(value.toString());
      return;
    }
    
    const element = ref.current;
    if (!element || hasAnimated) return;
      // Cancel any existing animations
    if (animation.current) {
      cancelAnimationFrame(animation.current);
      animation.current = null;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ''));
          let startVal = 0;
          
          // Animate the counter
          let startTime = null;
        const animateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            
            // Apply easeOutQuad easing function (equivalent to power2.out)
            const easedProgress = 1 - Math.pow(1 - progress, 2);
            const currentCount = easedProgress * numericValue;
            
            if (value.toString().includes('.')) {
              setCount(currentCount.toFixed(1));
            } else {
              setCount(Math.floor(currentCount).toString());
            }
            
            if (progress < 1) {
              animation.current = requestAnimationFrame(animateCount);
            } else {
              setHasAnimated(true);
            }
          };
          
          animation.current = requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(element);
    
    return () => {
      observer.disconnect();
      if (animation.current) {
        cancelAnimationFrame(animation.current);
      }
    };
  }, [value, duration, hasAnimated, withAnimation]);

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

// Bar chart for industries metric
const BarChart = ({ isActive }) => {
  const chartData = [60, 40, 75, 50, 65, 80, 45, 70, 55, 60];
  
  return (
    <div className="h-[50px] flex items-end space-x-1 justify-center">
      {chartData.map((value, i) => (
        <motion.div
          key={i}
          className="relative w-[6px]"
          style={{
            height: `${value}%`,
          }}
        >
          <motion.div 
            className="absolute bottom-0 w-full"
            style={{ 
              backgroundColor: '#4ade80',
              borderRadius: "2px 2px 0 0",
              boxShadow: `0 0 10px 0 rgba(74, 222, 128, 0.3)`
            }}
            initial={{ height: 0 }}            
            animate={isActive ? { 
              height: "100%",
              transition: { 
                delay: 0.2 + (i * 0.05), 
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96] // Easing curve equivalent to power2.out
              }
            } : { height: 0 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Pie chart for accuracy rate
const PieChart = ({ percentage, isActive }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);
  
  return (
    <div className="flex justify-center my-2">
      <svg width="70" height="70" viewBox="0 0 70 70">
        {/* Background circle */}
        <circle cx="35" cy="35" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
        
        {/* Percentage fill */}
        <motion.circle
          cx="35"
          cy="35"
          r={radius}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}          
          animate={isActive ? {
            strokeDashoffset,
            transition: {
              delay: 0.3,
              duration: 1.5,
              ease: [0.43, 0.13, 0.23, 0.96] // Easing curve equivalent to power2.out
            }
          } : { strokeDashoffset: circumference }}
          style={{ 
            transformOrigin: "center",
            transform: "rotate(-90deg)",
            filter: "drop-shadow(0 0 2px #3b82f6)"
          }}
        />
      </svg>
    </div>
  );
};

// Star rating visualization
const StarRating = ({ rating, isActive }) => {
  const fullStars = Math.floor(rating);
  const partialStar = rating - fullStars;
  const emptyStars = 5 - Math.ceil(rating);
  
  return (
    <div className="flex justify-center items-center space-x-1">
      {[...Array(fullStars)].map((_, i) => (
        <motion.div 
          key={`full-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { 
            opacity: 1, 
            scale: 1,
            transition: {
              delay: 0.2 + (i * 0.1),
              type: "spring",
              stiffness: 300,
              damping: 10
            }
          } : { opacity: 0, scale: 0 }}
        >
          <AiFillStar className="text-yellow-500 text-xl" />
        </motion.div>
      ))}
      
      {partialStar > 0 && (
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { 
            opacity: 1, 
            scale: 1,
            transition: {
              delay: 0.2 + (fullStars * 0.1),
              type: "spring",
              stiffness: 300,
              damping: 10
            }
          } : { opacity: 0, scale: 0 }}
        >
          <AiFillStar className="text-gray-400 text-xl" />
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${partialStar * 100}%` }}>
            <AiFillStar className="text-yellow-500 text-xl" />
          </div>
        </motion.div>
      )}
      
      {[...Array(emptyStars)].map((_, i) => (
        <motion.div 
          key={`empty-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { 
            opacity: 1, 
            scale: 1,
            transition: {
              delay: 0.2 + ((fullStars + (partialStar > 0 ? 1 : 0) + i) * 0.1),
              type: "spring",
              stiffness: 300,
              damping: 10
            }
          } : { opacity: 0, scale: 0 }}
        >
          <AiFillStar className="text-gray-400 text-xl" />
        </motion.div>
      ))}
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ 
  metric, 
  description, 
  icon: Icon, 
  index, 
  chartType,
  accentColor,
  isActive,
  isVisible,
  stackIndex = 0,
  scrollProgress = 0
}) => {
  const [hovered, setHovered] = useState(false);
  const shouldAnimate = isActive && isVisible;

  // Determine if metric has special characters like + or %
  const suffix = metric.includes('+') ? '+' : 
                metric.includes('%') ? '%' : 
                metric.includes('★') ? '★' : '';
  
  // Get numeric value without suffix
  const numericValue = metric.replace(/[+%★]/g, '');

  // Calculate stack effect transforms based on stackIndex and scroll progress
  const stackTransform = {
    translateY: `${stackIndex * -10 - (scrollProgress * 15 * stackIndex)}px`,
    scale: Math.max(0.85, 1 - (stackIndex * 0.05)),
    rotateX: `${stackIndex * -1.5 - (scrollProgress * 2)}deg`, 
    rotateY: `${(index % 2 === 0 ? 1 : -1) * stackIndex * 0.5 * scrollProgress}deg`
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <BarChart isActive={shouldAnimate} />;
      case 'pie':
        return <PieChart percentage={parseFloat(numericValue)} isActive={shouldAnimate} />;
      case 'rating':
        return <StarRating rating={parseFloat(numericValue)} isActive={shouldAnimate} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        zIndex: 100 - stackIndex * 10
      }}
      animate={{
        translateY: stackTransform.translateY,
        scale: hovered ? Math.min(1.02, stackTransform.scale + 0.02) : stackTransform.scale,
        rotateX: stackTransform.rotateX,
        rotateY: stackTransform.rotateY,
        opacity: Math.max(0.5, 1 - (stackIndex * 0.1)),
        filter: `blur(${stackIndex * 0.5}px)`
      }}
      transition={{
        type: "spring",
        stiffness: 300, 
        damping: 30,
        mass: 1
      }}
    >      <motion.div 
        className={`
          p-6 relative overflow-hidden rounded-2xl
          bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90
          border-2 backdrop-blur-lg
          transition-all transform
          ${hovered ? 'shadow-lg' : ''}
          ${stackIndex === 0 ? 'shadow-xl' : ''}
        `}
        style={{
          borderColor: `${accentColor}50`,
          boxShadow: hovered ? `0 0 20px ${accentColor}40` : 
                    (stackIndex === 0 ? `0 10px 20px rgba(0,0,0,0.3), 0 0 10px ${accentColor}30` : 
                    `0 ${5 - stackIndex}px ${10 - stackIndex * 2}px rgba(0,0,0,0.2)`),
          transformStyle: "preserve-3d",
        }}
        transition={{ duration: 0.3 }}
      >
        <FuturisticOverlay opacity="low" className={`opacity-20 ${hovered ? 'opacity-30' : ''}`} />
        
        {/* Card Content with Modern Dashboard Layout */}
        <div className="relative z-10">          {/* Icon with glow effect */}
          <motion.div
            className="p-4 rounded-xl bg-black/30 backdrop-blur-sm border inline-block mb-6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: shouldAnimate ? 1 : 0, 
              opacity: shouldAnimate ? 1 : 0,
              transition: {
                delay: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 15
              }
            }}
            style={{
              borderColor: `${accentColor}30`,
              boxShadow: hovered ? `0 0 15px 0 ${accentColor}40` : 'none',
              transition: 'box-shadow 0.3s ease'
            }}
          >
            <Icon size={28} style={{ color: accentColor }} />
          </motion.div>
          
          {/* Metric number with enhanced animation */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: shouldAnimate ? 1 : 0, 
              y: shouldAnimate ? 0 : 20,
              transition: {
                delay: 0.5,
                duration: 0.6
              }
            }}
          >
            <div className="text-5xl font-satoshi font-black leading-none" style={{ 
                color: accentColor,
                textShadow: `0 0 10px ${accentColor}70`
              }}>
              <AnimatedCounter 
                value={numericValue} 
                suffix={suffix}
                duration={shouldAnimate ? 2 : 0}
                accentColor={accentColor}
                withAnimation={true}
              />
            </div>
          </motion.div>
            {/* Chart visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: shouldAnimate ? 1 : 0,
              transition: { delay: 0.7 }
            }}
            className="my-6"
          >
            {renderChart()}
          </motion.div>
          
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: shouldAnimate ? 1 : 0, 
              y: shouldAnimate ? 0 : 10,
              transition: {
                delay: 0.9,
                duration: 0.5
              }
            }}
          >
            <h3 className="font-satoshi font-semibold text-white/90 text-base leading-tight" style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
            }}>
              {description}
            </h3>
          </motion.div>
          
          {/* Animated corners */}
          <svg className="absolute top-0 left-0 w-8 h-8 opacity-50" viewBox="0 0 24 24">
            <motion.path
              d="M0,0 L12,0 L0,12 Z"
              fill="none"
              stroke={accentColor}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: shouldAnimate ? 1 : 0, 
                opacity: shouldAnimate ? (hovered ? 0.8 : 0.5) : 0,
                transition: {
                  delay: 0.2,
                  duration: 1,
                  ease: "easeInOut"
                }
              }}
            />
          </svg>
          
          <svg className="absolute bottom-0 right-0 w-8 h-8 opacity-50" viewBox="0 0 24 24">
            <motion.path
              d="M24,24 L12,24 L24,12 Z"
              fill="none"
              stroke={accentColor}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: shouldAnimate ? 1 : 0, 
                opacity: shouldAnimate ? (hovered ? 0.8 : 0.5) : 0,
                transition: {
                  delay: 0.3,
                  duration: 1,
                  ease: "easeInOut"
                }
              }}
            />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main MetricCards Component with Stacking Effect and ScrollTrigger
export default function MetricCards() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [forceShow, setForceShow] = useState(false);
  const [stackLevels, setStackLevels] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Animation controls to manually trigger metric animations
  const controls = useRef([]);
  const autoPlayRef = useRef(null);
  
  // Define metrics data
  const metrics = [
    {
      metric: "50+",
      description: "Organizations Using Instacon Across India",
      icon: BiBuildings,
      chartType: "bar",
      accentColor: "#EABA08" // Yellow - more vibrant
    },
    {
      metric: "10+",
      description: "Industries Served (Pharma, FMCG, Field Sales, Logistics & more)",
      icon: MdCategory,
      chartType: "bar",
      accentColor: "#4ade80" // Green
    },
    {
      metric: "98.7%",
      description: "Accuracy Rate in GPS-based Attendance",
      icon: TbTargetArrow,
      chartType: "pie",
      accentColor: "#3b82f6" // Blue
    },
    {
      metric: "4.8★",
      description: "User Rating on App Stores",
      icon: AiFillStar, 
      chartType: "rating",
      accentColor: "#f97316" // Orange
    }
  ];
  
  // Use scroll trigger to control stacking effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to a usable animation value
  const scrollProgressTransformed = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  
  // Use once: false to allow animations to be retriggered when scrolling in/out
  const isInView = useInView(containerRef, { 
    once: false, 
    amount: 0.2, 
    margin: "0px 0px -15% 0px" 
  });
  
  // Update scroll progress for animation
  useEffect(() => {
    const unsubscribe = scrollProgressTransformed.onChange(value => {
      setScrollProgress(value);
    });
    return () => unsubscribe();
  }, [scrollProgressTransformed]);
  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;
    
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % metrics.length;
          return nextIndex;
        });
      }, 4000); // Change every 4 seconds
    };
    
    // Start auto-play after a short delay
    const delay = setTimeout(startAutoPlay, 1000);
    
    return () => {
      clearTimeout(delay);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isInView, metrics.length]);
  
  // Pause auto-play on user interaction
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    // Resume auto-play after 8 seconds of no interaction
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 8000);
  };

  // Fallback to ensure cards are visible after a delay even if animations fail
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceShow(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate stack levels based on active index
  const updateStackLevels = (currentIndex) => {
    const newStackLevels = metrics.map((_, idx) => {
      // Active card has level 0, others increase based on distance
      const distance = Math.abs(idx - currentIndex);
      return distance;
    });
    
    setStackLevels(newStackLevels);
  };
  
  // Initialize stack levels when active index changes
  useEffect(() => {
    updateStackLevels(activeIndex);
  }, [activeIndex]);
  
  // Initialize stack levels
  useEffect(() => {
    const initialStackLevels = metrics.map((_, idx) => Math.abs(idx - activeIndex));
    setStackLevels(initialStackLevels);
  }, []);
    // Function to navigate in the stack
  const scroll = (direction) => {
    pauseAutoPlay(); // Pause auto-play when user interacts
    
    const newIndex = direction === 'left' 
      ? Math.max(0, activeIndex - 1)
      : Math.min(metrics.length - 1, activeIndex + 1);
    
    navigateToCard(newIndex);
  };
  
  // Navigate to a specific card in the stack
  const navigateToCard = (index) => {
    pauseAutoPlay(); // Pause auto-play when user interacts
    
    setActiveIndex(index);
    updateStackLevels(index);
    
    // Scroll the section slightly to trigger animation if needed
    if (sectionRef.current) {
      window.scrollBy({
        top: 1,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        window.scrollBy({
          top: -1,
          behavior: 'smooth'
        });
      }, 100);
    }
  };
  
  // Initialize animation controls for each metric
  useEffect(() => {
    controls.current = metrics.map(() => ({ triggered: false }));
  }, [metrics.length]);
  
  // Trigger animations for the active card
  useEffect(() => {
    if (isInView || forceShow) {
      // Mark the current active index as triggered
      if (controls.current[activeIndex]) {
        controls.current[activeIndex].triggered = true;
      }
    }
  }, [activeIndex, isInView, forceShow]);  return (
    <section 
      ref={sectionRef}
      className="py-16 relative overflow-hidden bg-black/90 backdrop-blur-md min-h-[600px] flex flex-col justify-center" 
      style={{ 
        backgroundColor: 'rgba(0,0,0,0.92)',
        willChange: 'transform', // Optimize for animations
        contain: 'content', // Improve performance
        perspective: "1200px" // Add perspective for 3D effect
      }}
      id="metrics-section"
      data-visible={isInView || forceShow ? "true" : "false"} // Help with debugging
    >
      <div className="container mx-auto px-4" ref={containerRef}>        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl font-satoshi font-black text-white text-center mb-8 relative overflow-hidden"
          initial={{ opacity: 1 }}
          animate={isInView ? {
            opacity: 1,
            transition: { duration: 0.1 }
          } : { opacity: 1 }}
        >
          {/* Tech grid background */}
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ scale: 0, rotate: 45 }}
            animate={isInView ? {
              scale: 1,
              rotate: 0,
              transition: { duration: 1.5, ease: "easeOut" }
            } : { scale: 0, rotate: 45 }}
            style={{
              backgroundImage: `
                linear-gradient(90deg, #3b82f6 1px, transparent 1px),
                linear-gradient(#3b82f6 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />

          {["Instacon", "by", "the", "Numbers"].map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              className="inline-block relative mr-4"
              initial={{ opacity: 0, rotateX: -90, z: -100 }}
              animate={isInView ? {
                opacity: 1,
                rotateX: 0,
                z: 0,
                transition: {
                  delay: wordIndex * 0.2,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              } : { opacity: 0, rotateX: -90, z: -100 }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              {/* Scanning line effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                initial={{ x: "-100%", opacity: 0 }}
                animate={isInView ? {
                  x: "100%",
                  opacity: [0, 1, 0],
                  transition: {
                    delay: wordIndex * 0.2 + 0.5,
                    duration: 0.8,
                    ease: "easeInOut"
                  }
                } : { x: "-100%", opacity: 0 }}
                style={{ mixBlendMode: "overlay" }}
              />

              {/* Digital glitch effect on letters */}
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  className="inline-block relative"
                  initial={{ 
                    opacity: 0, 
                    y: 50,
                    filter: "blur(10px) hue-rotate(180deg)",
                    textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff"
                  }}
                  animate={isInView ? {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px) hue-rotate(0deg)",
                    textShadow: "0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)",
                    transition: {
                      delay: wordIndex * 0.2 + letterIndex * 0.05,
                      duration: 0.6,
                      ease: "easeOut"
                    }
                  } : { 
                    opacity: 0, 
                    y: 50,
                    filter: "blur(10px) hue-rotate(180deg)",
                    textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff"
                  }}
                >
                  {letter}
                  
                  {/* Holographic effect */}
                  <motion.span
                    className="absolute inset-0 text-cyan-400 opacity-30"
                    initial={{ x: 0, y: 0 }}
                    animate={isInView ? {
                      x: [0, 2, -1, 0],
                      y: [0, -1, 1, 0],
                      transition: {
                        delay: wordIndex * 0.2 + letterIndex * 0.05 + 0.8,
                        duration: 0.3,
                        repeat: 2
                      }
                    } : { x: 0, y: 0 }}
                  >
                    {letter}
                  </motion.span>
                </motion.span>
              ))}

              {/* Circuit board connecting lines */}
              {wordIndex < 3 && (
                <motion.div
                  className="absolute top-1/2 -right-2 w-4 h-0.5"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={isInView ? {
                    scaleX: 1,
                    opacity: 1,
                    transition: {
                      delay: wordIndex * 0.2 + 1,
                      duration: 0.5
                    }
                  } : { scaleX: 0, opacity: 0 }}
                  style={{
                    background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                    boxShadow: "0 0 10px #3b82f6"
                  }}
                />
              )}
            </motion.span>
          ))}

          {/* Tech corner decorations */}
          <motion.div
            className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? {
              opacity: 0.6,
              scale: 1,
              transition: { delay: 2, duration: 0.5 }
            } : { opacity: 0, scale: 0 }}
          />
          <motion.div
            className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? {
              opacity: 0.6,
              scale: 1,
              transition: { delay: 2.1, duration: 0.5 }
            } : { opacity: 0, scale: 0 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? {
              opacity: 0.6,
              scale: 1,
              transition: { delay: 2.2, duration: 0.5 }
            } : { opacity: 0, scale: 0 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? {
              opacity: 0.6,
              scale: 1,
              transition: { delay: 2.3, duration: 0.5 }
            } : { opacity: 0, scale: 0 }}
          />
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 md:left-4 z-50 flex items-center">
            <motion.button 
              onClick={() => scroll('left')} 
              className="bg-black/40 backdrop-blur-sm hover:bg-black/60 p-2 md:p-3 rounded-full text-white border border-gray-600 shadow-lg transform -translate-x-1 md:translate-x-0"
              aria-label="Previous card"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: activeIndex > 0 ? 1 : 0.3, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.5 }}
              whileHover={activeIndex > 0 ? { scale: 1.1 } : {}}
              whileTap={activeIndex > 0 ? { scale: 0.95 } : {}}
              disabled={activeIndex === 0}
              style={{ opacity: activeIndex === 0 ? 0.3 : 1 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          </div>
          
          <div className="absolute inset-y-0 right-0 md:right-4 z-50 flex items-center">
            <motion.button 
              onClick={() => scroll('right')} 
              className="bg-black/40 backdrop-blur-sm hover:bg-black/60 p-2 md:p-3 rounded-full text-white border border-gray-600 shadow-lg transform translate-x-1 md:translate-x-0"
              aria-label="Next card"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: activeIndex < metrics.length - 1 ? 1 : 0.3, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.5 }}
              whileHover={activeIndex < metrics.length - 1 ? { scale: 1.1 } : {}}
              whileTap={activeIndex < metrics.length - 1 ? { scale: 0.95 } : {}}
              disabled={activeIndex === metrics.length - 1}
              style={{ opacity: activeIndex === metrics.length - 1 ? 0.3 : 1 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>          {/* Stacked Cards Container */}
          <div className="relative min-h-[450px] flex items-center justify-center pb-8">
            <div className="absolute w-full max-w-2xl mx-auto">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="absolute w-full left-0 right-0"
                  style={{
                    zIndex: 100 - (stackLevels[index] || 0) * 10,
                    pointerEvents: stackLevels[index] === 0 ? 'auto' : 'none',
                  }}
                >
                  <MetricCard
                    {...metric}
                    index={index}
                    isActive={isInView || forceShow}
                    isVisible={stackLevels[index] === 0}
                    stackIndex={stackLevels[index] || 0}
                    scrollProgress={scrollProgress}
                  />
                </div>
              ))}
            </div>
          </div>          {/* Indicator Dots */}
          <motion.div 
            className="flex justify-center mt-10 space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.7 }}
          >
            {metrics.map((metric, index) => (
              <motion.button
                key={index}
                onClick={() => navigateToCard(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300`}
                style={{
                  backgroundColor: stackLevels[index] === 0 ? metric.accentColor : 'rgba(107, 114, 128, 0.4)',
                  boxShadow: stackLevels[index] === 0 ? `0 0 8px ${metric.accentColor}80` : 'none'
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={stackLevels[index] === 0 ? { scale: 1.2 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label={`View metric ${index + 1}`}
                aria-current={stackLevels[index] === 0 ? "true" : "false"}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
