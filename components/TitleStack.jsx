'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import ScrambleNavButton from './ScrambleNavButton';

const sections = [
  {
    id: 'foundation',
    label: 'Foundation Models',
    title: 'Foundation Models',
    description: 'Scale partners or integrates with all of the leading AI models, from open-source to closed-source, including OpenAI, Google, Meta, Cohere, and more.',
    splineScene: 'https://prod.spline.design/fiHF2yV8AdTtXjKd/scene.splinecode'
  },
  {
    id: 'enterprise',
    label: 'Enterprise Data',
    title: 'Enterprise Data',
    description: "Scale's Data Engine enables you to integrate your enterprise data into the fold of these models, providing the base for long-term strategic differentiation.",
    splineScene: 'https://prod.spline.design/xy8peGBv-xACXzFT/scene.splinecode'
  },
  {
    id: 'evaluation',
    label: 'Model Evaluation',
    title: 'Model Evaluation',
    description: 'Comprehensive testing and evaluation frameworks to ensure your AI models perform reliably across diverse scenarios and use cases.',
    splineScene: 'https://prod.spline.design/fiHF2yV8AdTtXjKd/scene.splinecode'
  },
  {
    id: 'deployment',
    label: 'AI Deployment',
    title: 'AI Deployment',
    description: 'Seamlessly deploy and scale your AI models in production environments with enterprise-grade security and performance monitoring.',
    splineScene: 'https://prod.spline.design/xy8peGBv-xACXzFT/scene.splinecode'
  }
];

// Default content when no hover
const defaultContent = {
  title: 'Fine-Tuning and RLHF',
  description: 'Adapt best-in-class foundation models to your business and your specific data to build sustainable, successful AI programs and data from your enterprise.'
};

export default function TitleStack() {
  const [hoveredSection, setHoveredSection] = useState(null);
  const displayContent = hoveredSection ? sections.find(s => s.id === hoveredSection) : null;

  return (    <section className="bg-black min-h-screen w-full text-white flex items-center justify-center px-6 py-0 pt-10">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Content Block */}
        <div className="flex flex-col gap-8">
          {/* Dynamic Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredSection || 'default'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >              <h2 className="text-5xl md:text-6xl font-satoshi font-black text-white leading-tight mb-6 text-center">
                {displayContent?.title || defaultContent.title}
              </h2>
              <p className="text-xl font-satoshi font-regular text-gray-400 leading-relaxed max-w-lg">
                {displayContent?.description || defaultContent.description}
              </p>
            </motion.div>
          </AnimatePresence>          {/* Simple Title List with white bars */}          <div className="flex flex-col gap-1 mt-12">
            {sections.map((section) => (
              <ScrambleNavButton
                key={section.id}
                section={section}
                hoveredSection={hoveredSection}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`text-left py-4 px-0 transition-all duration-300 relative group ${
                  hoveredSection === section.id
                    ? 'text-white opacity-100'
                    : hoveredSection && hoveredSection !== section.id
                    ? 'text-gray-600 opacity-30'
                    : 'text-gray-400 opacity-100'
                }`}
              />
            ))}
          </div>

          {/* Providers section */}
          <div className="pt-8 border-t border-gray-800 mt-8">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-4 font-medium">
              GENERATIVE AI PROVIDERS WE PARTNER WITH:
            </p>
            <div className="flex flex-wrap gap-4">
              {['OpenAI', 'Google', 'Meta', 'Anthropic', 'Cohere'].map((provider) => (
                <span 
                  key={provider}
                  className="text-gray-500 text-sm"
                >
                  {provider}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right 3D Model Area */}
        <div className="flex justify-center items-center relative">
          <div className="w-full h-[700px] relative overflow-visible">
            {hoveredSection ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredSection}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full h-full"
                >                  <Spline
                    scene={displayContent?.splineScene}
                    data-lenis-prevent
                    style={{ 
                      width: '120%', 
                      height: '120%', 
                      marginLeft: '-10%', 
                      marginTop: '-10%',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      pointerEvents: 'none'
                    }} 
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-800 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-500 text-lg">Hover over a title to explore</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
