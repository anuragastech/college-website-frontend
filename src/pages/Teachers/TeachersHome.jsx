import { useEffect, useState } from 'react';
import axios from '../../services/axios';

const TeacherHome = () => {
  const [studentCount, setStudentCount] = useState(0);
  // const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Student Count
        const studentRes = await axios.get('/api/students/get-counts');
        setStudentCount(studentRes.data.count);

        // Fetch Attendance Percentage
        // const attendanceRes = await axios.get('/api/attendance/get-percentage');
        // setAttendancePercentage(attendanceRes.data.percentage);

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Teacher Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Count Card */}
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-600">Total Students</h2>
          <p className="text-4xl font-bold text-blue-500">{studentCount}</p>
        </div>

        {/* Attendance Percentage Card */}
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-600">Attendance Percentage</h2>
          <div className="relative w-24 h-24 mx-auto">
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
                className="text-green-500 stroke-current"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                // strokeDasharray={`${attendancePercentage}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
              {/* {attendancePercentage}% */}
            </span>
          </div>
        </div>
      </div>

      {/* 📸 Add an educational image */}
      <div className="mt-12 flex justify-center">
        <img
          src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg"
          alt="Classroom"
          className="rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
        />
      </div>
    </div>
  );
};

export default TeacherHome;
