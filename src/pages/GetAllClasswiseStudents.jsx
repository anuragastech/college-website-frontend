import { useEffect, useState } from 'react';
import axios from '../services/axios';

const ClassWiseStudents = () => {
  const [classWiseStudents, setClassWiseStudents] = useState([]);

  useEffect(() => {
    fetchClassWiseStudents();
  }, []);

  const fetchClassWiseStudents = async () => {
    try {
      const response = await axios.get('/api/classes/class-wise-students');
      setClassWiseStudents(response.data);
    } catch (error) {
      console.error('Error fetching class-wise students:', error);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-transparent">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-wide drop-shadow-md">
        Class-Wise Students
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classWiseStudents.map((cls) => (
          <div
            key={cls.className}
            className="relative bg-white bg-opacity-20 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-5">
              <h3 className="text-xl font-semibold tracking-wider">
                {cls.className}
              </h3>
              <p className="text-sm opacity-80 mt-1">
                Total Students: {cls.students.length}
              </p>
            </div>

            {/* Student List */}
            <div className="p-6 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {cls.students.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-300 bg-opacity-40">
                      <th className="p-4 border-b border-gray-300 font-semibold text-gray-700 uppercase tracking-wider text-sm">
                        Name
                      </th>
                      <th className="p-4 border-b border-gray-300 font-semibold text-gray-700 uppercase tracking-wider text-sm">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cls.students.map((student, index) => (
                      <tr
                        key={student._id}
                        className={`${
                          index % 2 === 0
                            ? 'bg-white bg-opacity-10'
                            : 'bg-white bg-opacity-20'
                        } transition duration-300 hover:bg-blue-500 hover:text-white`}
                      >
                        <td className="p-4 border-b border-gray-300 text-gray-800 text-sm font-medium">
                          {student.name}
                        </td>
                        <td className="p-4 border-b border-gray-300 text-gray-600 text-sm">
                          {student.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No students assigned
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassWiseStudents;
