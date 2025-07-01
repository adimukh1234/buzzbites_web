'use client';

import { motion } from 'framer-motion';

export default function ContactHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
      
      {/* Content */}
      <div className="relative z-1 max-w-7xl mx-auto text-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 font-satoshi"
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
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Every big step starts with a small message. Got something in mind?<br />
          Let us know — and we'll take it from there.
        </motion.p>

        <motion.a
          href="mailto:info@buzzbites.in"
          className="inline-flex items-center text-cyber-yellow hover:text-cyber-gold transition-colors text-lg md:text-xl font-semibold"
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
