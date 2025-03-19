import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo/Brand Name */}
        <div
          onClick={() => navigate('/')}
          className="text-2xl font-semibold tracking-wide cursor-pointer hover:text-gray-400 transition duration-300"
        >
          College Portal
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <button
            onClick={() => navigate('/admin/add-teacher')}
            className="hover:text-gray-400 transition duration-300"
          >
            Add Teacher
          </button>
          <button
            onClick={() => navigate('/admin/add-student')}
            className="hover:text-gray-400 transition duration-300"
          >
            Add Student
          </button>
          <button
            onClick={() => navigate('/admin/add-subject')}
            className="hover:text-gray-400 transition duration-300"
          >
            Add Subject
          </button>
          <button
            onClick={() => navigate('/admin/set-timetable')}
            className="hover:text-gray-400 transition duration-300"
          >
            Set Timetable
          </button>
        </div>

        {/* Logout Button */}
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
