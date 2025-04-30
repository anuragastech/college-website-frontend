import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TimetableDisplay = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState('');

  // ✅ Fetch all classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get('/api/classes/get-classes');
        console.log('Classes fetched:', res.data.classes);
        
        // ✅ Ensure classes is an array
        setClasses(Array.isArray(res.data.classes) ? res.data.classes : []);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setClasses([]); // ✅ Set to empty array to avoid map error
        setError('Failed to load classes');
      }
    };

    fetchClasses();
  }, []);

  // ✅ Handle class change
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  // ✅ Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // ✅ Fetch timetable on submit
  const fetchTimetable = async () => {
    if (!selectedClass || !selectedDate) {
      setError('Please select class and date');
      return;
    }

    try {
      const res = await axios.get(`/api/timetable/get-timetable`, {
        params: {
          classId: selectedClass,
          date: selectedDate
        }
      });

      console.log('Timetable fetched:', res.data);
      setTimetable(res.data.timetable || null);
      setError('');
    } catch (error) {
      console.error('Error fetching timetable:', error);
      setError('Failed to load timetable');
      setTimetable(null);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Timetable Display</h1>

      {/* ✅ Error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* ✅ Class dropdown */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Class:</label>
        <select
          value={selectedClass}
          onChange={handleClassChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Select Class --</option>
          {classes?.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name} - {cls.section}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Date input */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* ✅ Submit button */}
      <button
        onClick={fetchTimetable}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Get Timetable
      </button>

      {/* ✅ Display timetable */}
      {timetable ? (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Timetable for {new Date(selectedDate).toDateString()}
          </h2>

          {timetable.isHoliday ? (
            <p className="text-red-500 font-medium">Holiday</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Period</th>
                  <th className="border border-gray-300 px-4 py-2">Subject</th>
                  <th className="border border-gray-300 px-4 py-2">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {timetable.periods?.map((period) => (
                  <tr key={period._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {period.periodNumber}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {period.subject?.name || 'Not assigned'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {period.studentsAttendance?.length
                        ? period.studentsAttendance.map((student) => (
                            <div key={student.student._id}>
                              {student.student.name} - {student.status}
                            </div>
                          ))
                        : 'No attendance recorded'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        selectedClass &&
        selectedDate && (
          <p className="mt-4 text-gray-500">No timetable available</p>
        )
      )}
    </div>
  );
};

export default TimetableDisplay;
