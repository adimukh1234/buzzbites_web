'use client';

import { motion } from 'framer-motion';

export default function ContactHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
      
      {/* Content */}
      <div className="relative z-1 max-w-7xl mx-auto text-center">
        <motion.h1 
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 font-satoshi leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Together, we can
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-yellow to-purple-400">
            do extraordinary things.
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Every big step starts with a small message. Got something in mind?<br className="hidden sm:block" />
          Let us know — and we'll take it from there.
        </motion.p>

        <motion.a
          href="mailto:info@buzzbites.in"
          className="inline-flex items-center text-cyber-yellow hover:text-cyber-gold transition-colors text-base sm:text-lg md:text-xl font-semibold underline decoration-2 underline-offset-4 hover:decoration-cyber-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          info@buzzbites.in
        </motion.a>
      </div>
    </section>
  );
}
