import { useEffect, useState } from 'react';
import axios from '../services/axios';
import { FaUserGraduate, FaChalkboardTeacher, FaChartPie } from 'react-icons/fa';

const AdminHome = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Student Count
        const studentRes = await axios.get('/api/students/get-counts');
        setStudentCount(studentRes.data.count);

        // Fetch Teacher Count
        const teacherRes = await axios.get('/api/teachers/get-count');
        setTeacherCount(teacherRes.data.count);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        🎓 Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Student Count Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2">
          <div className="flex items-center">
            <div className="p-4 bg-blue-100 rounded-full">
              <FaUserGraduate className="text-blue-500 text-3xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-600">Total Students</h2>
              <p className="text-5xl font-bold text-blue-500 mt-2">{studentCount}</p>
            </div>
          </div>
        </div>

        {/* Teacher Count Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2">
          <div className="flex items-center">
            <div className="p-4 bg-green-100 rounded-full">
              <FaChalkboardTeacher className="text-green-500 text-3xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-600">Total Teachers</h2>
              <p className="text-5xl font-bold text-green-500 mt-2">{teacherCount}</p>
            </div>
          </div>
        </div>

        {/* Attendance Percentage Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2">
          <div className="flex items-center">
            <div className="p-4 bg-purple-100 rounded-full">
              <FaChartPie className="text-purple-500 text-3xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-600">Attendance Percentage</h2>
              <div className="relative w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200 stroke-current"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-purple-500 stroke-current"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`70, 100`} // Example value (70%)
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                  70%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="mt-12 flex justify-center">
        <img
          src="https://source.unsplash.com/1200x400/?college,students"
          alt="College Campus"
          className="rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
        />
      </div>
    </div>
  );
};

export default AdminHome;
