import { Home, Users,  Calendar, GraduationCap, CheckSquare } from 'lucide-react';
// FileText,
// BookOpen,
// ClipboardList, 
// LayoutDashboard
// Trophy
const menuItems = [
  { id: 'home', label: 'Home', icon: <Home size={24} /> },
  { id: 'students', label: 'Students', icon: <Users size={24} /> },
  { id: 'parents', label: 'Parents', icon: <Users size={24} /> },
  { id: 'Attendance', label: 'Attendance', icon: <Calendar size={24} /> },

  // { id: 'lessons', label: 'Lessons', icon: <FileText size={24} /> },
  { id: 'exams', label: 'exams', icon: <GraduationCap size={24} /> },
  // { id: 'class', label: 'class', icon: <ClipboardList size={24} /> },

  // { id: 'assignments', label: 'Assignments', icon: <ClipboardList size={24} /> },
  { id: 'timetable', label: 'timetable', icon: <CheckSquare size={24} /> },
  { id: 'events', label: 'events', icon: <Calendar size={24} /> },
];

const Sidebar = ({ selectedMenu, setSelectedMenu }) => {
  return (
<div className="w-80 h-screen bg-gradient-to-b from-black via-[#23232a] to-[#383333] text-white flex flex-col">
{/* Header */}
      <div className="px-8 py-6 text-3xl font-bold tracking-wide border-b border-gray-700">
        College Portal
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedMenu(item.id)}
            className={`flex items-center px-8 py-4 cursor-pointer hover:bg-gray-700 ${
              selectedMenu === item.id ? 'bg-gray-800' : ''
            } transition duration-300 rounded-lg`}
          >
            <span className="mr-4">{item.icon}</span>
            <span className="text-lg font-semibold">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="px-8 py-6 border-t border-gray-700">
        <button
          onClick={() => {
            localStorage.removeItem('userInfo');
            window.location.href = '/login';
          }}
          className="w-52 bg-white text-gray-900 font-semibold text-lg py-3 rounded-xl transition duration-300 hover:bg-gray-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
