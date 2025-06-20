"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

const ScrambleNavButton = ({ 
  section, 
  hoveredSection, 
  onMouseEnter, 
  onMouseLeave, 
  className 
}) => {
  const textRef = useRef(null);

  const handleMouseEnter = () => {
    // Original hover functionality
    onMouseEnter();
    
    // Scramble effect
    const el = textRef.current;
    if (!el) return;
    
    const originalText = section.label;
    let iterations = 0;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const interval = setInterval(() => {
      el.innerText = originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " "; // Preserve spaces
          if (i < iterations) return originalText[i];
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iterations >= originalText.length) clearInterval(interval);
      iterations += 1 / 3; // Slightly slower for navigation
    }, 40);
  };

  const handleMouseLeave = () => {
    // Original hover functionality
    onMouseLeave();
    
    // Reset text
    if (textRef.current) {
      textRef.current.innerText = section.label;
    }
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <span 
        ref={textRef}
        className="text-2xl md:text-3xl font-satoshi font-bold block transition-colors duration-300 relative pb-2"
      >
        {section.label}
        {/* White bar that appears on hover - exactly like Scale.com */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: hoveredSection === section.id ? '100%' : '0%',
            opacity: hoveredSection === section.id ? 1 : 0
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 1, 0.5, 1],
            opacity: { duration: 0.2 }
          }}
          className="absolute bottom-0 left-0 h-[1px] bg-white"
          style={{
            transformOrigin: 'left center'
          }}
        />
      </span>
    </button>
  );
};

export default ScrambleNavButton;
