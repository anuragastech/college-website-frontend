import React, { useEffect, useState } from 'react';
import { getTimetable, getClasses } from '../../api/TimeTable';

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
        if (Array.isArray(data.classes)) {
          setClasses(data.classes);
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
    <div className="p-8 bg-gray-900 text-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-400">View Timetable</h2>
      
      {/* Class Selector */}
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

      {/* Date Picker */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Fetch Timetable Button */}
      <button
        onClick={fetchTimetable}
        className="bg-blue-600 w-full text-white px-6 py-3 rounded hover:bg-blue-500 transition duration-300"
      >
        Fetch Timetable
      </button>

      {/* Display Timetable */}
      {timetable && (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
          {timetable.isHoliday ? (
            <p className="text-red-400 text-lg font-semibold">
              No timetable available – today is a holiday.
            </p>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Periods:</h3>
              <ul className="divide-y divide-gray-700">
                {timetable.periods.map((period) => (
                  <li
                    key={period.periodNumber}
                    className="py-2 flex justify-between items-center"
                  >
                    <span className="text-gray-300">
                      Period {period.periodNumber}:
                    </span>
                    <span className="text-blue-300">
                      {period.subject.name}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TimetableDisplay;
