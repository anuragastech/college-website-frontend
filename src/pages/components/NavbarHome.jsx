import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/college-logo.svg'; // your logo path

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="bg-blue-700 text-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo and title */}
        <Link to="/home" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold">SOLSTICE COLLEGE</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 items-center">
          <li><Link to="/home" className="hover:underline">Home</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          <li className="relative">
            <button
              onClick={() => setShowLogin(!showLogin)}
              className="hover:underline"
            >
              Login ▼
            </button>
            {showLogin && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow z-10 w-40">
                <ul className="flex flex-col">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/studentLogin">Student Login</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/teacher">Teacher Login</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/admin">Admin Login</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-3 px-4">
          <Link to="/home" className="block hover:underline">Home</Link>
          <Link to="/about" className="block hover:underline">About</Link>
          <Link to="/contact" className="block hover:underline">Contact</Link>
          <div>
            <span className="block font-semibold">Login</span>
            <Link to="/studentLogin" className="block pl-4 hover:underline">Student</Link>
            <Link to="/teacher" className="block pl-4 hover:underline">Teacher</Link>
            <Link to="/admin" className="block pl-4 hover:underline">Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
