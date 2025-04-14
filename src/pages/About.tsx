import React, { useState, useEffect } from 'react';
import { ArrowRight, Award, BookOpen, Target, TrendingUp, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = `transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  const handleNavigation = (destination) => {
    console.log(`Navigating to: ${destination}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-purple-900 mb-4">About Eventra</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your one-stop platform for college event management and engagement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-purple-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              Eventra is dedicated to revolutionizing the way college students discover, participate in, and engage with campus events. We believe in creating a vibrant campus community where every student can find events that match their interests and contribute to their personal and professional growth.
            </p>
            <p className="text-gray-600">
              Our platform makes it easy for students to find relevant events, register with a single click, and track their participation through our unique XP and Vibe Score system.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-purple-900 mb-4">Key Features</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span className="text-gray-600">Comprehensive event listings with detailed information</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span className="text-gray-600">Easy registration and attendance tracking</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span className="text-gray-600">XP and Vibe Score system to encourage participation</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span className="text-gray-600">Event reviews and ratings</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span className="text-gray-600">Personalized event recommendations</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-purple-900 mb-4">Why Choose Eventra?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Easy Discovery</h3>
              <p className="text-gray-600">
                Find events that match your interests and schedule with our intuitive search and filtering system.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Gamified Experience</h3>
              <p className="text-gray-600">
                Earn XP and increase your Vibe Score as you participate in events and engage with the community.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Community Building</h3>
              <p className="text-gray-600">
                Connect with fellow students, share experiences, and build lasting relationships through events.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;