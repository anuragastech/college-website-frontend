import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import GetTimetable from './components/GetTimetable';

const AdminTimetable = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [timetable, setTimetable] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isHoliday, setIsHoliday] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classRes = await axios.get('/api/classes/get-classes');
        setClasses(classRes.data.classes || []);

        const subjectsRes = await axios.get('/api/subject/getsubjects');
        setSubjects(subjectsRes.data);
      } catch (error) {
        console.error('Error loading data:', error);
        setClasses([]);
        setSubjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (index, key, value) => {
    const updatedTimetable = [...timetable];
    if (!updatedTimetable[index]) updatedTimetable[index] = {};
    updatedTimetable[index][key] = value;
    setTimetable(updatedTimetable);
  };

  const handleSaveTimetable = async () => {
    if (!selectedClass) {
      alert('Please select a class first.');
      return;
    }

    if (isHoliday) {
      alert('Cannot save timetable for a holiday.');
      return;
    }

    const isValid = timetable.every((period, index) => {
      const day = selectedDate.toLocaleString('en-GB', { weekday: 'long' });
      const periodNumber = index + 1;
      period.day = day;
      period.periodNumber = periodNumber;
      return period.subject && period.periodNumber && period.day;
    });

    if (!isValid) {
      alert('Please select a subject and period for each slot.');
      return;
    }

    try {
      const timetableWithDetails = timetable.map((period, index) => ({
        ...period,
        periodNumber: index + 1,
        day: selectedDate.toLocaleString('en-GB', { weekday: 'long' }),
        classId: selectedClass,
      }));

      await axios.post('/api/timetable/add', {
        date: selectedDate.toISOString().split('T')[0],
        classId: selectedClass,
        periods: timetableWithDetails,
      });

      alert('Timetable saved successfully.');
      setShowModal(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving timetable.');
    }
  };

  const handleToggleHoliday = async () => {
    if (!selectedClass) {
      alert('Please select a class first.');
      return;
    }

    try {
      const response = await axios.post('/api/timetable/holiday', {
        date: selectedDate.toISOString().split('T')[0],
        classId: selectedClass,
        isHoliday: !isHoliday,
      });

      setIsHoliday(!isHoliday);
      alert(response.data.message);
    } catch (error) {
      console.error('Error updating holiday status:', error);
      alert('Error updating holiday status.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          Admin Timetable Management
        </h2>

        {/* 📅 Calendar */}
        <div className="mb-6">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="mx-auto border rounded-lg shadow-md"
          />
        </div>

        {/* 🏫 Select Class */}
        <div className="mb-6">
          {isLoading ? (
            <p>Loading classes...</p>
          ) : (
            <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              console.log('Selected Class ID:', e.target.value); // ✅ Log selected class ID
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Class</option>
            {Array.isArray(classes) && classes.length > 0 ? (
              classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name} {cls.section}
                </option>
              ))
            ) : (
              <option value="">No classes available</option>
            )}
          </select>
          
          )}
        </div>

        {/* 🚫 Holiday Message */}
        {isHoliday && (
          <div className="text-red-500 font-semibold text-center mb-4">
            This day is marked as a holiday.
          </div>
        )}

        {/* ➕ Add Timetable Button */}
        {!isHoliday && (
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Add Timetable
          </button>
        )}

        {/* 🏖️ Mark/Unmark Holiday */}
        <button
          onClick={handleToggleHoliday}
          className={`w-full mt-4 py-3 rounded-lg shadow-md ${
            isHoliday ? 'bg-green-500' : 'bg-red-500'
          } text-white hover:opacity-90 transition-all`}
        >
          {isHoliday ? 'Unmark Holiday' : 'Mark as Holiday'}
        </button>
      </div>

      {/* ➕ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Set Timetable</h3>
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-4 py-2 border">Period</th>
                  <th className="px-4 py-2 border">Subject</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(7)].map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border">{i + 1}</td>
                    <td className="px-4 py-3 border">
                      <select
                        value={timetable[i]?.subject || ''}
                        onChange={(e) => handleChange(i, 'subject', e.target.value)}
                        className="w-full border rounded-lg px-2 py-1"
                      >
                        <option value="">Select Subject</option>
                        {subjects.map((subject) => (
                          <option key={subject._id} value={subject._id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setShowModal(false)} className="btn-secondary">
                Close
              </button>
              <button onClick={handleSaveTimetable} className="btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <GetTimetable />
    </div>
  );
};

export default AdminTimetable;
