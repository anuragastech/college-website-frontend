import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/NavbarHome';
import Footer from '../components/footer';

const Home = () => {
  return (
    <div className="text-gray-800 flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[75vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="bg-black bg-opacity-60 p-8 md:p-12 rounded-lg text-center text-white mx-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to SOLSTICE COLLEGE</h1>
          <p className="text-lg md:text-xl">Empowering Students, Shaping Futures</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 md:px-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6">About Our College</h2>
          <p className="max-w-3xl mx-auto text-base sm:text-lg">
            SOLSTICE College is committed to excellence in education and holistic student development.
            Our dedicated faculty, advanced labs, and vibrant campus life prepare students for success in a dynamic world.
          </p>
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="py-16 px-4 sm:px-6 md:px-20 bg-gray-100">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-12">College Highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Modern Labs', desc: 'Equipped with the latest technology and tools for hands-on learning.', icon: '🔬' },
            { title: 'Library', desc: 'Thousands of books, journals, and e-resources.', icon: '📚' },
            { title: 'Experienced Faculty', desc: 'Qualified professors dedicated to student success.', icon: '👨‍🏫' },
            { title: 'Sports Facilities', desc: 'Well-maintained grounds for indoor and outdoor games.', icon: '🏀' },
            { title: 'Cultural Events', desc: 'Encouraging creativity through arts and fests.', icon: '🎭' },
            { title: 'Placements', desc: 'Strong industry connections ensuring career opportunities.', icon: '💼' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="text-4xl sm:text-5xl mb-4">{item.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm sm:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Optional: Gallery Section (can be enabled later) */}
      {/* 
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">Campus Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.img
              key={i}
              src={`https://source.unsplash.com/random/300x300?sig=${i}&school`}
              alt={`Gallery ${i}`}
              className="rounded-lg shadow-md hover:scale-105 transition duration-300 w-full object-cover"
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0.5, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </section> 
      */}

      <Footer />
    </div>
  );
};

export default Home;
