import React, { useEffect, useState } from 'react';
import { getTimetable, getClasses } from '../../api/TimeTable';
import AttendanceForm from './AttendenceForm';

const TimetableDisplay = () => {
  const [classId, setClassId] = useState('');
  const [date, setDate] = useState('');
  const [classes, setClasses] = useState([]);
  const [timetable, setTimetable] = useState(null);

  // Fetch existing classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClasses();
        console.log('Fetched classes:', data); // ✅ Debug log to check fetched data
        if (Array.isArray(data.classes)) {
          setClasses(data.classes); 
          console.log('Classes state:', data.classes); // ✅ Debug log to check state
        } else {
          setClasses([]);
        }
      } catch (error) {
        console.error('Failed to fetch classes:', error);
        setClasses([]);
      }
    };
  
    fetchClasses();
  }, []);
  

  const fetchTimetable = async () => {
    if (!classId || !date) {
      alert('Please select class and date');
      return;
    }

    try {
      const data = await getTimetable(classId, date);
      setTimetable(data);
    } catch (error) {
      console.error('Failed to fetch timetable:', error);
      setTimetable(null);
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">View Timetable</h2>
      
      {/* Select Class */}
      <select
  value={classId}
  onChange={(e) => setClassId(e.target.value)}
  className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-900"
>
  <option value="">Select Class</option>
  {classes.map((cls) => (
    <option key={cls._id} value={cls._id}>
      {cls.name}
    </option>
  ))}
</select>

      
      {/* Date Picker */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-900"
      />

      {/* Fetch Timetable Button */}
      <button
        onClick={fetchTimetable}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Fetch Timetable
      </button>

      {/* Display Timetable */}
      {timetable && (
        <div className="mt-6">
          {timetable.isHoliday ? (
            <p className="text-red-400 text-xl font-bold">
              No timetable available – today is a holiday.
            </p>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-2">Periods:</h3>
              <ul>
                {timetable.periods.map((period) => (
                  <li key={period.periodNumber} className="mb-2">
                    {`Period ${period.periodNumber}: ${period.subject.name}`}
                  </li>
                ))}
              </ul>
              <AttendanceForm timetable={timetable} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TimetableDisplay;
