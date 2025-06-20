"use client";
import { useRef } from "react";

const ScrambleButton = ({ text = "JOIN NOW", className = "" }) => {
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    const el = textRef.current;
    const originalText = el.dataset.text;
    let iterations = 0;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const interval = setInterval(() => {
      el.innerText = originalText
        .split("")
        .map((char, i) => {
          if (i < iterations) return originalText[i];
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iterations >= originalText.length) clearInterval(interval);
      iterations += 1 / 2;
    }, 30);
  };

  const handleMouseMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    buttonRef.current.style.setProperty("--x", `${x}px`);
    buttonRef.current.style.setProperty("--y", `${y}px`);
  };
  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}      className={`relative group text-white px-6 py-3 rounded-xl font-mono text-lg overflow-hidden transition-all duration-300
      bg-black border border-fuchsia-500
      before:absolute before:inset-0 before:rounded-xl
      before:bg-[radial-gradient(circle_at_var(--x)_var(--y),#ff00cc33,transparent_40%)]
      before:opacity-0 group-hover:before:opacity-100
      before:transition-opacity before:duration-300
      ${className}`}
    >      <span 
        ref={textRef} 
        data-text={text}
        className="block relative z-10"
      >
        {text}
      </span>
    </button>
  );
};

export default ScrambleButton;
