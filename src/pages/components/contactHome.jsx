// src/pages/Contact.jsx
import React, { useState } from 'react';
import NavbarHome from '../components/NavbarHome';
import Footer from '../components/footer';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert("Thank you for contacting us!");
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <>
      <NavbarHome />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-600 to-indigo-500 h-[40vh] flex items-center justify-center text-center text-white">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-extrabold leading-tight mb-4">Contact Us</h1>
          <p className="text-xl font-light mb-6">We would love to hear from you! Please fill out the form below.</p>
        </motion.div>
      </div>

      {/* Contact Form Section */}
      <div className="py-16 px-6 md:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-2xl">
          <motion.h2 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl font-bold text-center text-blue-900 mb-8"
          >
            Get in Touch
          </motion.h2>
          
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-3 p-4 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-3 p-4 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full mt-3 p-4 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-4 px-6 text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default Contact;
