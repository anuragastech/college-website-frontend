      import { Home, BookOpen, Calendar,  GraduationCap,  CheckSquare  } from 'lucide-react';
      // FileText,
      // ClipboardList, 
      const menuItems = [
        { id: 'home', label: 'Home', icon: <Home size={24} /> },

        // { id: 'students', label: 'Students', icon: <ClipboardList size={24} /> },

        { id: 'subjects', label: 'Subjects', icon: <BookOpen size={24} /> },

        { id: 'timetable', label: 'Timetable', icon: <Calendar size={24} /> },

        // { id: 'lessons', label: 'Lessons', icon: <FileText size={24} /> },

        { id: 'exams', label: 'Exams', icon: <GraduationCap size={24} /> },

        // { id: 'assignments', label: 'Assignments', icon: <ClipboardList size={24} /> },
        // { id: 'results', label: 'Results', icon: <Trophy size={24} /> },
        { id: 'attendance', label: 'Attendance', icon: <CheckSquare size={24} /> },
        { id: 'events', label: 'Events', icon: <Calendar size={24} /> },
      ];

      const Sidebar = ({ selectedMenu, setSelectedMenu }) => {
        return (
          <div className="w-72 h-screen bg-gray-900 text-white flex flex-col">
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
    localStorage.clear(); // Clears all keys from localStorage
    window.location.href = '/'; // Redirect to login page after logout
  }}
  className="w-full bg-white text-gray-900 font-semibold text-lg py-3 rounded-xl transition duration-300 hover:bg-gray-200"
>
  Logout
</button>
            </div>
          </div>
        );
      };

      export default Sidebar;
