'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    interest: '',
    message: '',
    consent: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center font-satoshi">
            Let's start a <span className="text-cyber-yellow">conversation</span>
          </h2>
          
          <p className="text-gray-300 text-center mb-8 sm:mb-12 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            GET IN TOUCH TODAY - We'd love to hear from you, let's have a conversation about what we do and how we can help your brand.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 sm:mb-3 text-gray-300">
                  Your Full Name*
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-cyber-yellow focus:outline-none focus:ring-2 focus:ring-cyber-yellow/20 text-white placeholder-gray-400 transition-colors text-sm sm:text-base"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 sm:mb-3 text-gray-300">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-cyber-yellow focus:outline-none focus:ring-2 focus:ring-cyber-yellow/20 text-white placeholder-gray-400 transition-colors text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 sm:mb-3 text-gray-300">
                WHAT ARE YOU INTERESTED IN?*
              </label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-cyber-yellow focus:outline-none focus:ring-2 focus:ring-cyber-yellow/20 text-white transition-colors text-sm sm:text-base"
              >
                <option value="">Select an option</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-apps">Mobile Apps</option>
                <option value="ai-solutions">AI Solutions</option>
                <option value="digital-transformation">Digital Transformation</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 sm:mb-3 text-gray-300">
                Write a message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-cyber-yellow focus:outline-none focus:ring-2 focus:ring-cyber-yellow/20 text-white placeholder-gray-400 transition-colors resize-none text-sm sm:text-base"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <div>
              <label className="flex items-start space-x-3 text-xs sm:text-sm text-gray-300">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 bg-gray-900/50 border border-gray-700 rounded focus:ring-cyber-yellow focus:ring-2 text-cyber-yellow flex-shrink-0"
                />
                <span>
                  <strong>CONSENT*</strong> I understand that BuzzBites will securely hold my data in accordance with their privacy policy.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyber-yellow to-cyber-gold text-black font-bold rounded-lg hover:from-cyber-gold hover:to-cyber-yellow transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyber-yellow/50 text-sm sm:text-base"
            >
              SUBMIT FORM
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
