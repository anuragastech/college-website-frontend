import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
              alt="College Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-lg md:text-2xl font-semibold text-blue-700 tracking-wide">
              SOLSTICE COLLEGE
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-blue-700 transition font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-700 transition font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-700 transition font-medium">
              Contact
            </Link>

            {/* Login Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="text-gray-700 hover:text-blue-700 transition font-medium"
              >
                Login ▼
              </button>
              {showLogin && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md z-10">
                  <Link to="/studentLogin" className="block px-4 py-2 text-sm hover:bg-gray-100">Student Login</Link>
                  <Link to="/teacher" className="block px-4 py-2 text-sm hover:bg-gray-100">Teacher Login</Link>
                  <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-gray-100">Admin Login</Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-blue-700">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md px-4 py-4 space-y-2">
          <Link to="/" className="block text-gray-700 font-medium hover:text-blue-700">Home</Link>
          <Link to="/about" className="block text-gray-700 font-medium hover:text-blue-700">About</Link>
          <Link to="/contact" className="block text-gray-700 font-medium hover:text-blue-700">Contact</Link>
          <div>
            <span className="block font-semibold text-gray-700">Login</span>
            <Link to="/studentLogin" className="block pl-4 text-gray-600 hover:text-blue-700">Student</Link>
            <Link to="/teacher" className="block pl-4 text-gray-600 hover:text-blue-700">Teacher</Link>
            <Link to="/admin" className="block pl-4 text-gray-600 hover:text-blue-700">Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
