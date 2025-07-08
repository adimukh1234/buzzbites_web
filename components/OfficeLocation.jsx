'use client';

import { motion } from 'framer-motion';

export default function OfficeLocation() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 sm:mb-16 text-center font-satoshi"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our <span className="text-cyber-yellow">Office</span>
        </motion.h2>

        <div className="flex justify-center">
          {/* Main Office */}
          <motion.div 
            className="bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-cyber-yellow/50 transition-all duration-300 max-w-4xl w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
              {/* Office Information */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-cyber-yellow">Main Office</h3>
                <h4 className="text-xl sm:text-2xl font-bold mb-4 text-white">KOLKATA</h4>
                <div className="text-gray-300 mb-6 space-y-2 text-sm sm:text-base">
                  <p>Ergo Tower, Suite No. 501,</p>
                  <p>5th Floor, A1-4, Block EP&GP, Sector 5, </p>
                  <p>Kolkata - 700091</p>
                </div>
                <div className="space-y-3">
                  <a href="tel:033 4004 0202" className="block text-cyber-yellow hover:text-cyber-gold transition-colors text-sm sm:text-base">
                    033 4004 0202
                  </a>
                  <a href="mailto:info@buzzbites.in" className="block text-cyber-yellow hover:text-cyber-gold transition-colors text-sm sm:text-base">
                    info@buzzbites.in
                  </a>
                  <a href="https://maps.app.goo.gl/nKekhJ1a2DrNbXhe6" target="_blank" rel="noopener noreferrer" className="inline-block text-gray-400 hover:text-cyber-yellow text-xs sm:text-sm transition-colors">
                    Google Maps
                  </a>
                </div>
              </div>
              
              {/* Google Map */}
              <div className="relative">
                <div className="rounded-lg overflow-hidden border border-gray-700">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117082.23449670939!2d88.2663518298817!3d22.535563936766443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a0c0000000%3A0x0!2zMjLCsDMzJzU2LjEiTiA4OMKwMjYnMjAuNCJF!5e0!3m2!1sen!2sin!4v1704067200000!5m2!1sen!2sin"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="filter brightness-90 hover:brightness-100 transition-all duration-300 sm:h-[300px]"
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
