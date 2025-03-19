import { useState, useEffect, useCallback } from 'react';
import axios from '../../services/axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimetableView = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [date, setDate] = useState(new Date());
  const [timetable, setTimetable] = useState([]);
  const [classes, setClasses] = useState([]);

  // Fetch available classes from /api/classes/get-classes
  const fetchClasses = async () => {
    try {
      const response = await axios.get('/api/classes/get-classes');
      // Ensure response.data is an array
      setClasses(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };
  
  useEffect(() => {
    fetchClasses();
  }, []);
  
  // Fetch timetable based on class and date
  const fetchTimetable = useCallback(async () => {
    if (!selectedClass || !date) return;

    try {
      const res = await axios.get('/api/timetable', {
        params: {
          classId: selectedClass,
          date: date.toISOString().split('T')[0] // Format date to 'YYYY-MM-DD'
        }
      });
      setTimetable(res.data.periods);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  }, [selectedClass, date]);

  useEffect(() => {
    fetchTimetable();
  }, [selectedClass, date, fetchTimetable]);

  return (
    <div className="p-4">
      {/* Class Dropdown */}
      <div className="mb-4">
      <select
  value={selectedClass}
  onChange={(e) => setSelectedClass(e.target.value)}
  className="p-2 border rounded"
>
  <option value="">Select Class</option>
  {Array.isArray(classes) && classes.length > 0 ? (
    classes.map((cls) => (
      <option key={cls._id} value={cls._id}>
        {cls.name}
      </option>
    ))
  ) : (
    <option disabled>No classes available</option>
  )}
</select>


      </div>

      {/* Date Picker */}
      <div className="mb-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          className="p-2 border rounded"
        />
      </div>

      {/* Timetable Display */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Period</th>
            <th className="border p-2">Subject</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 7 }).map((_, i) => {
            const period = timetable.find((p) => p.periodNumber === i + 1);
            return (
              <tr key={i}>
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2">
                  {period?.subject?.name || 'Not assigned'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TimetableView;
