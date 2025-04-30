import React, { useState, useEffect } from 'react';
import { getStdAttendance, getClasses } from '../../api/attendence';

const AttendanceDisplay = () => {
  const [classId, setClassId] = useState('');
  const [date, setDate] = useState('');
  const [classes, setClasses] = useState([]);
  const [attendanceData, setAttendanceData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClasses();
        if (Array.isArray(data.classes)) {
          setClasses(data.classes);
        }
      } catch (err) {
        console.error('Failed to fetch classes:', err);
      }
    };

    fetchClasses();
  }, []);

  const fetchAttendance = async () => {
    if (!classId || !date) {
      setError('Please select class and date');
      return;
    }

    try {
      const data = await getStdAttendance(classId, date);
      setAttendanceData(data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch attendance:', err);
      setAttendanceData(null);
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
        className="w-full p-3 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-300"
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
        className="w-full p-3 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-300"
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
      {attendanceData && (
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
              {attendanceData.periods.map((period) => (
                <tr key={period.periodNumber}>
                  <td className="border border-gray-700 px-4 py-2 text-center">
                    {period.periodNumber}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-center">
                    {period.subject?.name || 'N/A'}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-center">
                    {period.attendance === 'present' ? (
                      <span className="text-green-400">Present</span>
                    ) : period.attendance === 'absent' ? (
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
      )}
    </div>
  );
};

export default AttendanceDisplay;
