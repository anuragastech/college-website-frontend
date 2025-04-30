import React, { useEffect, useState } from 'react';
import { getAttendance, getClasses } from '../../api/studentAteendence';

const AttendanceDisplay = () => {
  const [classId, setClassId] = useState('');
  const [date, setDate] = useState('');
  const [classes, setClasses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState('');

  // ✅ Decode token to get student ID
  const token = localStorage.getItem('token');
  const studentId = token ? JSON.parse(atob(token.split('.')[1])).id : null;

  console.log('Decoded Token:', token);
  console.log('Student ID:', studentId);

  // ✅ Fetch student-specific classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClasses(studentId); // ✅ Pass studentId
        if (Array.isArray(data.classes)) {
          setClasses(data.classes);
        } else {
          setClasses([]);
        }
      } catch (error) {
        console.error('Failed to fetch classes:', error);
        setError('Failed to load classes');
      }
    };

    if (studentId) {
      fetchClasses();
    }
  }, [studentId]);

  // ✅ Fetch attendance data
  const fetchAttendance = async () => {
    if (!classId || !date) {
      setError('Please select a class and date');
      return;
    }

    try {
      const data = await getAttendance(classId, date, studentId); // ✅ Pass studentId
      setAttendance(data.periods || []);
      setError('');
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
      setAttendance([]);
      setError('Failed to load attendance. Please try again.');
    }
  };

  return (
    <div className="p-8 bg-gray-900 text-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-400">My Attendance</h2>

      {/* ✅ Class Selector */}
      <select
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Class</option>
        {classes.map((cls) => (
          <option key={cls._id} value={cls._id}>
            {cls.name}
          </option>
        ))}
      </select>

      {/* ✅ Date Picker */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* ✅ Fetch Attendance Button */}
      <button
        onClick={fetchAttendance}
        className="bg-blue-600 w-full text-white px-6 py-3 rounded hover:bg-blue-500 transition duration-300"
      >
        Fetch Attendance
      </button>

      {/* ✅ Error Message */}
      {error && <p className="text-red-400 mt-4">{error}</p>}

      {/* ✅ Display Attendance */}
      {attendance.length > 0 ? (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4 text-blue-400">Attendance Details:</h3>
          <table className="min-w-full bg-gray-800 border border-gray-700">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-700 px-4 py-2">Period</th>
                <th className="border border-gray-700 px-4 py-2">Subject</th>
                <th className="border border-gray-700 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((entry) => (
                <tr key={entry.periodNumber}>
                  <td className="border border-gray-700 px-4 py-2 text-center">
                    {entry.periodNumber}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-center">
                    {entry.subject || 'N/A'}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-center">
                    {entry.attendance === 'present' ? (
                      <span className="text-green-400">Present</span>
                    ) : entry.attendance === 'absent' ? (
                      <span className="text-red-400">Absent</span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-gray-400">No attendance data available.</p>
      )}
    </div>
  );
};

export default AttendanceDisplay;
