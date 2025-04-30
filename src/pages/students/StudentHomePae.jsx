import { motion } from 'framer-motion';
import { Home, BookOpen, Calendar, GraduationCap, CheckSquare } from 'lucide-react';

const menuItems = [
  { id: 'home', label: 'Home', icon: <Home size={32} /> },
  { id: 'subjects', label: 'Subjects', icon: <BookOpen size={32} /> },
  { id: 'timetable', label: 'Timetable', icon: <Calendar size={32} /> },
  { id: 'exams', label: 'Exams', icon: <GraduationCap size={32} /> },
  { id: 'attendance', label: 'Attendance', icon: <CheckSquare size={32} /> },
  { id: 'events', label: 'Events', icon: <Calendar size={32} /> },
];

const StudentHomePage = ({ setSelectedMenu }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Grid of Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedMenu(item.id)}
            className="bg-gray-800 text-white flex flex-col items-center justify-center p-6 
                       w-72 h-56 rounded-xl shadow-md cursor-pointer hover:bg-gray-700 
                       transition duration-300"
          >
            {item.icon}
            <span className="text-lg font-semibold mt-2">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Animated Cube */}
      <div className="mt-12 flex items-center justify-center h-40">
        <motion.div
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 
                     rounded-md shadow-xl"
        />
      </div>
    </div>
  );
};

export default StudentHomePage;
