import React from 'react';
import { Globe, MessageSquare, Users, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: 'Website Development',
      description: 'Custom website solutions that drive engagement and convert visitors into customers.',
      features: ['Responsive design', 'SEO optimization', 'Performance optimization', 'Content management']
    },
    {
      icon: MessageSquare,
      title: 'Chatbot Development',
      description: 'AI-powered chatbots that provide 24/7 customer support and enhance user experience.',
      features: ['Natural language processing', 'Custom workflows', 'Integration capabilities', 'Analytics dashboard']
    },
    {
      icon: Users,
      title: 'Influencer Marketing',
      description: 'Connect with influential voices in your industry to amplify your brand message and reach new audiences.',
      features: ['Influencer identification', 'Campaign strategy', 'Performance tracking', 'ROI analysis']
    },
    {
      icon: Briefcase,
      title: 'Senior Talent Acquisition',
      description: 'Expert interviewing and assessment services for senior-level positions to ensure the best talent fit.',
      features: ['Currently only serving the Cement Industry','Technical assessment', 'Cultural fit evaluation', 'Leadership evaluation', 'Candidate screening']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-8">
            <img 
              src="/src/img/logo.jpg"
              alt="Company Logo" 
              className="h-24 w-auto object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive business solutions tailored to your needs
          </p>
        </motion.div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-900 rounded-3xl transform rotate-3 opacity-10"></div>
                  <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-purple-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700 group">
                          <ArrowRight className="w-5 h-5 text-gold-400 mr-3 transform group-hover:translate-x-1 transition-transform duration-200" />
                          <span className="group-hover:text-purple-900 transition-colors duration-200">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-900 to-purple-700 p-8 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <service.icon className="w-32 h-32 text-gold-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;