import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';

const Timetable = () => {
  const [timetableData, setTimetableData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Fetch available classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/api/classes/get-classes');
        console.log('Fetched classes:', response.data);

        // Handle response structure properly
        setClasses(Array.isArray(response.data.classes) ? response.data.classes : []);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setError('Failed to load classes.');
      }
    };

    fetchClasses();
  }, []);

  // ✅ Fetch timetable when class is selected
  const fetchTimetable = async () => {
    if (!selectedClass) {
      setError('Please select a class.');
      return;
    }

    setLoading(true);
    setError('');
    setTimetableData(null);

    try {
      console.log(`Fetching timetable for class: ${selectedClass}`);

      // Pass classId as a path parameter
      const response = await axios.get(`/api/timetable/getAllTimetable/${selectedClass}`);
      console.log('Timetable response:', response.data);

      if (response.data) {
        if (response.data.isHoliday) {
          setTimetableData(null);
          setError('No timetable available – today is a holiday.');
        } else if (response.data.periods?.length > 0) {
          setTimetableData(response.data);
        } else {
          setTimetableData(null);
          setError('No timetable available for this class.');
        }
      }
    } catch (error) {
      console.error('Error fetching timetable:', error);
      setTimetableData(null);
      setError('Timetable not assigned'); // ✅ Show only when fetching fails
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Class Timetable</h2>

      {/* ✅ Class Selector */}
      <div className="flex gap-4 mb-6">
        <select
          value={selectedClass}
          onChange={(e) => {
            console.log('Selected class:', e.target.value);
            setSelectedClass(e.target.value);
          }}
          className="border border-gray-300 p-3 rounded w-full"
        >
          <option value="">Select Class</option>
          {Array.isArray(classes) && classes.length > 0 ? (
            classes.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {classItem.name} - {classItem.section}
              </option>
            ))
          ) : (
            <option disabled>No classes available</option>
          )}
        </select>
        <button
          onClick={fetchTimetable}
          className={`bg-blue-500 text-white p-3 rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading || !selectedClass}
        >
          {loading ? 'Loading...' : 'Show Timetable'}
        </button>
      </div>

      {/* ✅ Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* ✅ Timetable Table */}
      {timetableData?.periods?.length > 0 ? (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-3">Date</th>
              <th className="border border-gray-200 p-3">Class</th>
              <th className="border border-gray-200 p-3">Teacher</th>
              <th className="border border-gray-200 p-3">Subject</th>
              <th className="border border-gray-200 p-3">Period</th>
              <th className="border border-gray-200 p-3">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {timetableData.periods.map((period) => (
              <tr key={period._id} className="hover:bg-gray-50">
                <td className="border border-gray-200 p-3">
                  {new Date(timetableData.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-200 p-3">
                  {timetableData.class?.name || 'N/A'}
                </td>
                <td className="border border-gray-200 p-3">
                  {period.teacher?.name || 'N/A'}
                </td>
                <td className="border border-gray-200 p-3">
                  {period.subject?.name || 'N/A'}
                </td>
                <td className="border border-gray-200 p-3">
                  {period.periodNumber}
                </td>
                <td className="border border-gray-200 p-3">
                  {period.studentsAttendance.length > 0 ? (
                    period.studentsAttendance.map((att) => (
                      <div key={att.student?._id}>
                        {att.student?.name || 'N/A'} —{' '}
                        <span
                          className={
                            att.status === 'present'
                              ? 'text-green-500'
                              : 'text-red-500'
                          }
                        >
                          {att.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-500">No data</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && (
          <p className="text-gray-500 mt-4">
            {error || 'No timetable available.'}
          </p>
        )
      )}
    </div>
  );
};

export default Timetable;
