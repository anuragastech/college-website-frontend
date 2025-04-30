// import React, { useState, useEffect } from 'react';
// import axios from '../services/axios';

// const UpdateTimetable = ({ timetableId }) => {
//   const [periods, setPeriods] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // ✅ Fetch subjects for dropdown
//   const fetchSubjects = async () => {
//     try {
//       const response = await axios.get('/api/subjects');
//       setSubjects(response.data);
//     } catch (err) {
//       console.error('Failed to load subjects:', err);
//     }
//   };

//   // ✅ Fetch existing timetable
//   const fetchTimetable = async () => {
//     try {
//       const response = await axios.get(`/api/timetables/${timetableId}`);
//       setPeriods(response.data.periods);
//       setSelectedDate(response.data.date.split('T')[0]);
//     } catch (err) {
//       setError('Failed to load timetable');
//     }
//   };

//   useEffect(() => {
//     fetchSubjects();
//     fetchTimetable();
//   }, [timetableId]);

//   // ✅ Update timetable
//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       await axios.patch(`/api/timetables/${timetableId}/update`, {
//         date: selectedDate,
//         periods,
//       });
//       alert('Timetable updated successfully!');
//     } catch (err) {
//       setError('Failed to update timetable');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Update Timetable</h2>

//       {error && <p className="text-red-500">{error}</p>}

//       {/* ✅ Periods */}
//       {periods.map((period, index) => (
//         <div key={index} className="mb-4">
//           <label className="block font-medium mb-2">
//             Period {period.periodNumber}
//           </label>
//           <select
//             value={period.subject}
//             onChange={(e) => {
//               const updatedPeriods = [...periods];
//               updatedPeriods[index].subject = e.target.value;
//               setPeriods(updatedPeriods);
//             }}
//             className="border rounded px-3 py-2 w-full"
//           >
//             <option value="">Select Subject</option>
//             {subjects.map((subject) => (
//               <option key={subject._id} value={subject._id}>
//                 {subject.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       ))}

//       {/* ✅ Update Button */}
//       <button
//         onClick={handleUpdate}
//         disabled={loading}
//         className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//       >
//         {loading ? 'Updating...' : 'Update Timetable'}
//       </button>
//     </div>
//   );
// };

// export default UpdateTimetable;


import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const UpdateTimetable = ({ classId, date, periods }) => {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // ✅ Fetch subjects and teachers
    const fetchData = async () => {
      try {
        const subjectsRes = await axios.get('/api/subjects');
        const teachersRes = await axios.get('/api/teachers');
        setSubjects(subjectsRes.data);
        setTeachers(teachersRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (periodNumber, newSubjectId, newTeacherId) => {
    try {
      await axios.put('/api/timetable/update', {
        classId,
        date,
        periodNumber,
        newSubjectId,
        newTeacherId,
      });
      alert('Timetable updated successfully!');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to update timetable');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Update Timetable</h2>
      {periods.map((period) => (
        <div key={period.periodNumber} className="mb-4">
          <h3 className="font-bold">Period {period.periodNumber}</h3>
          <select
            onChange={(e) =>
              handleUpdate(period.periodNumber, e.target.value, period.teacher)
            }
            className="border px-2 py-1"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
          <select
            onChange={(e) =>
              handleUpdate(period.periodNumber, period.subject, e.target.value)
            }
            className="border px-2 py-1 ml-2"
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default UpdateTimetable;
