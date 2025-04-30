import React, { useState, useEffect } from 'react';
import { getAttendance, getClasses } from '../../api/attendence';

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
      const data = await getAttendance(classId, date);
      setAttendanceData(data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch attendance:', err);
      setAttendanceData(null);
      setError('Failed to load attendance. Please try again.');
    }
  };

  // ✅ Get unique list of students
  const allStudents = attendanceData?.periods?.reduce((acc, period) => {
    period.studentsAttendance.forEach((attendance) => {
      if (!acc.some((student) => student._id === attendance.student?._id)) {
        acc.push(attendance.student);
      }
    });
    return acc;
  }, []) || [];

  return (
    <div className="p-8 bg-gray-900 text-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-400">View Attendance</h2>

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
      {attendanceData && (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
          {attendanceData.isHoliday ? (
            <p className="text-red-400 text-lg font-semibold">
              No attendance available – today is a holiday.
            </p>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Attendance Details:</h3>
              <table className="min-w-full bg-gray-800 border border-gray-700">
                {/* ✅ Table Header */}
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="border border-gray-700 px-4 py-2 text-left">Student Name</th>
                    {attendanceData.periods.map((period) => (
                      <th key={period.periodNumber} className="border border-gray-700 px-4 py-2">
                        Period {period.periodNumber}
                        <br />
                        <span className="text-gray-400 text-sm">
                          {period.subject?.name || 'N/A'}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* ✅ Table Body */}
                <tbody>
                  {allStudents.map((student) => (
                    <tr key={student._id} className="text-center">
                      {/* ✅ Student Name */}
                      <td className="border border-gray-700 px-4 py-2 text-left">
                        {student.name || 'Unknown'}
                      </td>

                      {/* ✅ Attendance Status for Each Period */}
                      {attendanceData.periods.map((period) => {
                        const attendanceRecord = period.studentsAttendance.find(
                          (attendance) => attendance.student?._id === student._id
                        );

                        const status = attendanceRecord?.status || 'N/A';

                        return (
                          <td
                            key={`${period.periodNumber}-${student._id}`}
                            className="border border-gray-700 px-4 py-2"
                          >
                            {status === 'present' ? (
                              <span className="text-green-400">Present</span>
                            ) : status === 'absent' ? (
                              <span className="text-red-400">Absent</span>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceDisplay;
