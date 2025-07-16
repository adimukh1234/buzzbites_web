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
const BarChart = ({ isActive, accentColor }) => {
  const chartData = [
    { value: 60, label: 'Pharma' },
    { value: 40, label: 'FMCG' },
    { value: 75, label: 'Logistics' },
    { value: 50, label: 'Retail' },
    { value: 65, label: 'Field Sales' },
    { value: 80, label: 'Manufacturing' },
    { value: 45, label: 'Healthcare' },
    { value: 70, label: 'Technology' },
    { value: 55, label: 'Education' },
    { value: 60, label: 'Others' }
  ];
  
  return (
    <div className="h-[120px] w-full">
      <div className="h-full flex items-end justify-center space-x-2">
        {chartData.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <motion.div
              className="relative w-[12px] mb-2"
              style={{
                height: `${item.value}%`,
              }}
            >
              <motion.div 
                className="absolute bottom-0 w-full rounded-t-lg"
                style={{ 
                  backgroundColor: accentColor || '#4ade80',
                  borderRadius: "6px 6px 0 0",
                  boxShadow: `0 0 15px 2px ${accentColor || '#4ade80'}40`
                }}
                initial={{ height: 0 }}            
                animate={isActive ? { 
                  height: "100%",
                  transition: { 
                    delay: 0.2 + (i * 0.1), 
                    duration: 1.2,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }
                } : { height: 0 }}
              />
              {/* Glow effect */}
              <motion.div 
                className="absolute top-0 w-full h-2 rounded-full opacity-60"
                style={{ 
                  backgroundColor: accentColor || '#4ade80',
                  filter: 'blur(4px)'
                }}
                initial={{ opacity: 0 }}
                animate={isActive ? { 
                  opacity: 0.6,
                  transition: { 
                    delay: 0.2 + (i * 0.1) + 0.5, 
                    duration: 0.8
                  }
                } : { opacity: 0 }}
              />
            </motion.div>
            <motion.div
              className="text-xs text-white/60 text-center transform -rotate-45 origin-center"
              style={{ fontSize: '8px', width: '40px' }}
              initial={{ opacity: 0 }}
              animate={isActive ? { 
                opacity: 1,
                transition: { 
                  delay: 0.2 + (i * 0.1) + 0.8, 
                  duration: 0.5
                }
              } : { opacity: 0 }}
            >
              {item.label}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Pie chart for accuracy rate
const PieChart = ({ percentage, isActive, accentColor }) => {
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);
  
  return (
    <div className="flex flex-col items-center justify-center h-[120px] w-full">
      <div className="relative">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {/* Background circle */}
          <circle 
            cx="70" 
            cy="70" 
            r={radius} 
            fill="none" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth={strokeWidth}
            strokeDasharray="4 4"
          />
          
          {/* Percentage fill */}
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={accentColor || "#3b82f6"}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}          
            animate={isActive ? {
              strokeDashoffset,
              transition: {
                delay: 0.3,
                duration: 2,
                ease: [0.43, 0.13, 0.23, 0.96]
              }
            } : { strokeDashoffset: circumference }}
            style={{ 
              transformOrigin: "center",
              transform: "rotate(-90deg)",
              filter: `drop-shadow(0 0 8px ${accentColor || "#3b82f6"})`
            }}
          />
          
          {/* Glowing center */}
          <motion.circle
            cx="70"
            cy="70"
            r="20"
            fill={`${accentColor || "#3b82f6"}20`}
            stroke={accentColor || "#3b82f6"}
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={isActive ? {
              opacity: 1,
              scale: 1,
              transition: {
                delay: 1,
                duration: 0.8
              }
            } : { opacity: 0, scale: 0 }}
          />
          
          {/* Center percentage text */}
          <motion.text
            x="70"
            y="70"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-white font-bold text-lg"
            fill="white"
            initial={{ opacity: 0 }}
            animate={isActive ? {
              opacity: 1,
              transition: {
                delay: 1.2,
                duration: 0.5
              }
            } : { opacity: 0 }}
          >
            {percentage}%
          </motion.text>
        </svg>
        
        {/* Accuracy indicators */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor || "#3b82f6" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isActive ? {
                opacity: i < 5 ? 1 : 0.3,
                scale: 1,
                transition: {
                  delay: 1.5 + (i * 0.1),
                  duration: 0.3
                }
              } : { opacity: 0, scale: 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Star rating visualization
const StarRating = ({ rating, isActive, accentColor }) => {
  const fullStars = Math.floor(rating);
  const partialStar = rating - fullStars;
  const emptyStars = 5 - Math.ceil(rating);
  
  return (
    <div className="flex flex-col items-center justify-center h-[120px] w-full">
      {/* Large star display */}
      <div className="flex justify-center items-center space-x-2 mb-4">
        {[...Array(fullStars)].map((_, i) => (
          <motion.div 
            key={`full-${i}`}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={isActive ? { 
              opacity: 1, 
              scale: 1,
              rotate: 0,
              transition: {
                delay: 0.2 + (i * 0.15),
                type: "spring",
                stiffness: 200,
                damping: 10
              }
            } : { opacity: 0, scale: 0, rotate: -180 }}
          >
            <AiFillStar 
              className="text-3xl"
              style={{ color: accentColor || '#f97316' }}
            />
          </motion.div>
        ))}
        
        {partialStar > 0 && (
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={isActive ? { 
              opacity: 1, 
              scale: 1,
              rotate: 0,
              transition: {
                delay: 0.2 + (fullStars * 0.15),
                type: "spring",
                stiffness: 200,
                damping: 10
              }
            } : { opacity: 0, scale: 0, rotate: -180 }}
          >
            <AiFillStar className="text-gray-400 text-3xl" />
            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${partialStar * 100}%` }}>
              <AiFillStar 
                className="text-3xl"
                style={{ color: accentColor || '#f97316' }}
              />
            </div>
          </motion.div>
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <motion.div 
            key={`empty-${i}`}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={isActive ? { 
              opacity: 1, 
              scale: 1,
              rotate: 0,
              transition: {
                delay: 0.2 + ((fullStars + (partialStar > 0 ? 1 : 0) + i) * 0.15),
                type: "spring",
                stiffness: 200,
                damping: 10
              }
            } : { opacity: 0, scale: 0, rotate: -180 }}
          >
            <AiFillStar className="text-gray-400 text-3xl" />
          </motion.div>
        ))}
      </div>
      
      {/* Rating breakdown */}
      <div className="flex flex-col space-y-1 w-full">
        {[5, 4, 3, 2, 1].map((star, i) => (
          <motion.div
            key={star}
            className="flex items-center space-x-2 text-xs"
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? {
              opacity: 1,
              x: 0,
              transition: {
                delay: 1 + (i * 0.1),
                duration: 0.5
              }
            } : { opacity: 0, x: -20 }}
          >
            <span className="text-white/60 w-2">{star}</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ 
                  backgroundColor: accentColor || '#f97316',
                  width: `${star === 5 ? 85 : star === 4 ? 10 : star === 3 ? 3 : star === 2 ? 1 : 1}%`
                }}
                initial={{ width: 0 }}
                animate={isActive ? {
                  width: `${star === 5 ? 85 : star === 4 ? 10 : star === 3 ? 3 : star === 2 ? 1 : 1}%`,
                  transition: {
                    delay: 1.2 + (i * 0.1),
                    duration: 0.8
                  }
                } : { width: 0 }}
              />
            </div>
            <span className="text-white/40 text-xs w-8 text-right">
              {star === 5 ? '85%' : star === 4 ? '10%' : star === 3 ? '3%' : star === 2 ? '1%' : '1%'}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Expandable Metric Card Component
const MetricCard = ({ 
  metric, 
  description, 
  icon: Icon, 
  index, 
  chartType,
  accentColor,
  isActive,
  isVisible,
  isExpanded = false,
  onClick
}) => {
  const [hovered, setHovered] = useState(false);
  const shouldAnimate = isActive && isVisible;

  // Determine if metric has special characters like + or %
  const suffix = metric.includes('+') ? '+' : 
                metric.includes('%') ? '%' : 
                metric.includes('★') ? '★' : '';
  
  // Get numeric value without suffix
  const numericValue = metric.replace(/[+%★]/g, '');

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <BarChart isActive={shouldAnimate} accentColor={accentColor} />;
      case 'pie':
        return <PieChart percentage={parseFloat(numericValue)} isActive={shouldAnimate} accentColor={accentColor} />;
      case 'rating':
        return <StarRating rating={parseFloat(numericValue)} isActive={shouldAnimate} accentColor={accentColor} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer transition-all duration-700 ease-in-out ${
        isExpanded ? 'flex-grow-[10000] max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-0' : 'flex-grow min-w-[60px] sm:min-w-[70px] md:min-w-[80px] mx-1 sm:mx-2'
      }`}
      style={{
        minHeight: '300px',
        borderRadius: isExpanded ? '20px' : '15px',
        backgroundImage: isExpanded 
          ? `linear-gradient(135deg, ${accentColor}20, ${accentColor}05)`
          : `linear-gradient(135deg, rgba(75, 85, 99, 0.2), rgba(55, 65, 81, 0.1))`,
        border: isExpanded 
          ? `2px solid ${accentColor}30`
          : `2px solid rgba(107, 114, 128, 0.3)`,
        transformOrigin: 'bottom center',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      initial={false}
      animate={{
        scale: hovered ? 1.02 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    >
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: isExpanded ? `
            linear-gradient(90deg, ${accentColor} 1px, transparent 1px),
            linear-gradient(${accentColor} 1px, transparent 1px)
          ` : `
            linear-gradient(90deg, rgba(156, 163, 175, 0.5) 1px, transparent 1px),
            linear-gradient(rgba(156, 163, 175, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
        animate={{
          backgroundPosition: isExpanded ? '20px 20px' : '0px 0px'
        }}
        transition={{ duration: 0.7 }}
      />

      {/* Shadow Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: isExpanded 
            ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 30%, transparent 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)',
        }}
        animate={{
          opacity: isExpanded ? 1 : 0.7,
        }}
        transition={{ duration: 0.7 }}
      />

      <FuturisticOverlay opacity="low" className={`opacity-20 ${hovered ? 'opacity-30' : ''}`} />
      
      {/* Card Content */}
      <div className={`absolute ${isExpanded ? 'bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8' : 'bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4'} z-10`}>
        <div className="flex items-end">
          {/* Icon */}
          <motion.div
            className="flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm"
            style={{
              width: isExpanded ? '40px' : '30px',
              height: isExpanded ? '40px' : '30px',
              color: isExpanded ? accentColor : 'rgba(107, 114, 128, 0.8)',
            }}
            animate={{
              scale: isExpanded ? 1.1 : 1,
            }}
            transition={{ duration: 0.7 }}
          >
            <Icon size={isExpanded ? 20 : 16} />
          </motion.div>

          {/* Content */}
          <motion.div
            className="ml-2 sm:ml-3 md:ml-4 flex-1"
            initial={false}
            animate={{
              opacity: isExpanded ? 1 : 0,
              x: isExpanded ? 0 : 20,
            }}
            transition={{ duration: 0.7, delay: isExpanded ? 0.2 : 0 }}
          >
            {/* Metric Number */}
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-satoshi font-black text-white leading-none mb-1 sm:mb-2" style={{ 
              textShadow: `0 0 20px ${accentColor}70`
            }}>
              <AnimatedCounter 
                value={numericValue} 
                suffix={suffix}
                duration={shouldAnimate && isExpanded ? 2 : 0}
                accentColor={accentColor}
                withAnimation={true}
              />
            </div>

            {/* Description */}
            <h3 className="font-satoshi font-semibold text-white/90 text-sm sm:text-base md:text-lg leading-tight mb-2 sm:mb-3 md:mb-4" style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
            }}>
              {description}
            </h3>

            {/* Chart */}
            <div className="mb-4 sm:mb-5 md:mb-6 mt-2 sm:mt-3 md:mt-4">
              {renderChart()}
            </div>
          </motion.div>
        </div>

        {/* Compact view - show only icon and metric */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={false}
          animate={{
            opacity: isExpanded ? 0 : 1,
          }}
          transition={{ duration: 0.7 }}
        >
          {/* Icon positioned at top center */}
          <motion.div
            className="flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm mb-2 sm:mb-3 md:mb-4"
            style={{
              width: '30px',
              height: '30px',
              color: isExpanded ? accentColor : 'rgba(107, 114, 128, 0.8)',
            }}
            animate={{
              scale: isExpanded ? 0.8 : 1,
            }}
            transition={{ duration: 0.7 }}
          >
            <Icon size={16} />
          </motion.div>
          
          {/* Metric text positioned below icon */}
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-satoshi font-black text-white text-center" style={{ 
            color: isExpanded ? accentColor : 'rgba(156, 163, 175, 0.9)',
            textShadow: isExpanded 
              ? `0 0 15px ${accentColor}70`
              : `0 0 10px rgba(156, 163, 175, 0.3)`,
            writingMode: 'vertical-rl',
            textOrientation: 'mixed'
          }}>
            {metric}
          </div>
        </motion.div>
      </div>

      {/* Animated border effect */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border: isExpanded 
            ? `2px solid ${accentColor}`
            : `2px solid rgba(107, 114, 128, 0.4)`,
          borderRadius: isExpanded ? '20px' : '15px',
        }}
        animate={{
          boxShadow: isExpanded 
            ? `0 0 30px ${accentColor}40, inset 0 0 30px ${accentColor}20` 
            : `0 0 10px rgba(107, 114, 128, 0.2)`,
        }}
        transition={{ duration: 0.7 }}
      />
    </motion.div>
  );
};

// Simple mobile card component
const SimpleMetricCard = ({ 
  metric, 
  description, 
  icon: Icon, 
  index,
  accentColor,
  isActive,
  chartType
}) => {
  const shouldAnimate = isActive;

  // Determine if metric has special characters like + or %
  const suffix = metric.includes('+') ? '+' : 
                metric.includes('%') ? '%' : 
                metric.includes('★') ? '★' : '';
  
  // Get numeric value without suffix
  const numericValue = metric.replace(/[+%★]/g, '');

  const renderSimpleChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <div className="flex items-end space-x-1 h-8">
            {[60, 40, 75, 50, 65].map((height, i) => (
              <motion.div
                key={i}
                className="w-2 rounded-sm"
                style={{ backgroundColor: accentColor }}
                initial={{ height: 0 }}
                animate={shouldAnimate ? { height: `${height}%` } : { height: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              />
            ))}
          </div>
        );
      case 'pie':
        return (
          <div className="relative w-12 h-12">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                fill="none" 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="4"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke={accentColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={125.6}
                initial={{ strokeDashoffset: 125.6 }}
                animate={shouldAnimate ? { 
                  strokeDashoffset: 125.6 * (1 - parseFloat(numericValue) / 100) 
                } : { strokeDashoffset: 125.6 }}
                transition={{ delay: 0.5, duration: 1 }}
                style={{ 
                  transformOrigin: "center",
                  transform: "rotate(-90deg)"
                }}
              />
            </svg>
          </div>
        );
      case 'rating':
        return (
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                initial={{ opacity: 0, scale: 0 }}
                animate={shouldAnimate ? { 
                  opacity: star <= Math.floor(parseFloat(numericValue)) ? 1 : 0.3, 
                  scale: 1 
                } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.5 + star * 0.1, duration: 0.3 }}
              >
                <AiFillStar 
                  size={16} 
                  style={{ color: star <= Math.floor(parseFloat(numericValue)) ? accentColor : '#666' }}
                />
              </motion.div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50"
      style={{
        borderColor: `${accentColor}30`,
        background: `linear-gradient(135deg, ${accentColor}10, rgba(17, 24, 39, 0.8))`
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        borderColor: `${accentColor}60`,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Icon and Metric */}
          <div className="flex items-center space-x-4 mb-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <Icon size={24} style={{ color: accentColor }} />
            </div>
            <div>
              <div 
                className="text-3xl font-satoshi font-black text-white"
                style={{ color: accentColor, textShadow: `0 0 10px ${accentColor}50` }}
              >
                <AnimatedCounter 
                  value={numericValue} 
                  suffix={suffix}
                  duration={shouldAnimate ? 1.5 : 0}
                  accentColor={accentColor}
                  withAnimation={true}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/80 text-sm font-satoshi leading-relaxed mb-4">
            {description}
          </p>

          {/* Chart */}
          <div className="flex justify-start">
            {renderSimpleChart()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main MetricCards Component with Expandable Card System
export default function MetricCards() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [forceShow, setForceShow] = useState(false);
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
      accentColor: "#EABA08" // Yellow
    },
    {
      metric: "10+",
      description: "Industries Served (Pharma, FMCG, Field Sales, Logistics & more)",
      icon: MdCategory,
      chartType: "bar",
      accentColor: "#EABA08" // Yellow
    },
    {
      metric: "98.7%",
      description: "Accuracy Rate in GPS-based Attendance",
      icon: TbTargetArrow,
      chartType: "pie",
      accentColor: "#EABA08" // Yellow
    },
    {
      metric: "4.8★",
      description: "User Rating on App Stores",
      icon: AiFillStar, 
      chartType: "rating",
      accentColor: "#EABA08" // Yellow
    }
  ];
  
  // Use scroll trigger to control animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Use once: false to allow animations to be retriggered when scrolling in/out
  const isInView = useInView(containerRef, { 
    once: false, 
    amount: 0.2, 
    margin: "0px 0px -15% 0px" 
  });
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
  
  // Navigate to a specific card
  const navigateToCard = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 8 seconds of no interaction
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 8000);
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

        {/* Mobile: Simple Card List */}
        <motion.div 
          className="block md:hidden w-full mx-auto pt-4 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 gap-4">
            {metrics.map((metric, index) => (
              <SimpleMetricCard
                key={index}
                {...metric}
                index={index}
                isActive={isInView || forceShow}
              />
            ))}
          </div>
        </motion.div>

        {/* Desktop: Expandable Cards Container */}
        <motion.div 
          className="hidden md:flex items-stretch overflow-hidden w-full mx-auto pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6 md:px-8 
                     min-w-[600px] max-w-[900px] lg:min-w-[700px] lg:max-w-[1000px] xl:min-w-[800px] xl:max-w-[1200px]"
          style={{ height: 'auto', minHeight: '350px' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              {...metric}
              index={index}
              isActive={isInView || forceShow}
              isVisible={true}
              isExpanded={activeIndex === index}
              onClick={() => navigateToCard(index)}
            />
          ))}
        </motion.div>

        {/* Indicator Dots - Desktop Only */}
        <motion.div 
          className="hidden md:flex justify-center mt-10 space-x-3"
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
                backgroundColor: activeIndex === index ? metric.accentColor : 'rgba(107, 114, 128, 0.4)',
                boxShadow: activeIndex === index ? `0 0 8px ${metric.accentColor}80` : 'none'
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={activeIndex === index ? { scale: 1.2 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              aria-label={`View metric ${index + 1}`}
              aria-current={activeIndex === index ? "true" : "false"}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
