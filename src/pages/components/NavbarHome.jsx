import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="bg-blue-700 text-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">SOLSTICE COLLEGE</div>

      <ul className="flex gap-6 text-white">
        <li className="hover:underline cursor-pointer">
          <Link to="/home">Home</Link>
        </li>
        <li className="hover:underline cursor-pointer">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:underline cursor-pointer">
          <Link to="/contact">Contact</Link>
        </li>

        <li className="relative">
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="hover:underline"
          >
            Login ▼
          </button>

          {showLogin && (
            <div className="absolute right-0 bg-white text-black mt-2 rounded-md shadow-md z-10 w-40">
              <ul className="flex flex-col">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/studentLogin">Student Login</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/teacher">Teacher Login</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/admin">Admin Login</Link>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
