// src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/NavbarHome';
import Footer from '../components/footer';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div
          className="h-[60vh] bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1580894908365-214343b7fbb2?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8OXx8Y2FtcHVzfGVufDB8fHx8fDE2NTc2Mjg4NzA&ixlib=rb-1.2.1&q=80&w=1080')",
          }}
        >
          <div className="bg-black bg-opacity-60 text-white p-10 rounded-lg text-center">
            <h1 className="text-5xl font-bold mb-4">SOLSTICE COLLEGE</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Nurturing Minds, Shaping Futures
            </p>
          </div>
        </div>

        {/* About Us Section */}
        <div className="py-16 px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-semibold text-blue-700 mb-8">Welcome to SOLSTICE COLLEGE</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-700">
              Founded with a passion for academic excellence, SOLSTICE College aims to provide students with a holistic learning experience. Our modern infrastructure, passionate faculty, and supportive community prepare students for a successful future.
            </p>
          </motion.div>

          {/* Vision & Mission */}
          <div className="mt-16 grid md:grid-cols-2 gap-10">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-600">
                To foster an environment of creativity, integrity, and innovation that empowers students to become leaders who will shape the world.
              </p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-600">
                Our mission is to provide a dynamic and inclusive learning environment that nurtures academic excellence, fosters personal growth, and inspires social responsibility in every student.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Campus Gallery */}
        {/* <div className="py-16 px-6 md:px-20 bg-gray-100">
          <h2 className="text-4xl font-semibold text-center text-blue-700 mb-12">Campus Life & Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "https://images.unsplash.com/photo-1572376842313-eef1ed9a4185?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8Y2FtcHVzfGVufDB8fHx8fDE2Njg5Nzk3NjM&ixlib=rb-1.2.1&q=80&w=1080",
              "https://images.unsplash.com/photo-1617765399757-c978cf7ee6e9?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8OXx8Y2FtcHVzfGVufDB8fHx8fDE2Njg5Nzg3Mjg&ixlib=rb-1.2.1&q=80&w=1080",
              "https://images.unsplash.com/photo-1592296316319-f3ac8425f56a?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8Y2FtcHVzfGVufDB8fHx8fDE2Njg5Nzg1MTk&ixlib=rb-1.2.1&q=80&w=1080",
              "https://images.unsplash.com/photo-1571687892024-83a78d07bbf6?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Nnx8Y2FtcHVzfGVufDB8fHx8fDE2Njg5Nzg1NzY&ixlib=rb-1.2.1&q=80&w=1080",
              "https://images.unsplash.com/photo-1586501065456-e1b62b167e1d?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8Y2FtcHVzfGVufDB8fHx8fDE2Njg5Nzg3NjI&ixlib=rb-1.2.1&q=80&w=1080",
              "https://images.unsplash.com/photo-1603352234536-d33465b5106b?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Nnx8Y2FtcHVzfGVufDB8fHx8fDE2Njg5Nzg3ODc&ixlib=rb-1.2.1&q=80&w=1080",
            ].map((url, index) => (
              <motion.img
                key={index}
                src={url}
                alt={`Gallery ${index + 1}`}
                className="rounded-xl shadow-md hover:scale-105 transition duration-300"
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0.5, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default About;
