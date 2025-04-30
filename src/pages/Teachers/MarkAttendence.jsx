// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const MarkAttendance = ({ timetableId }) => {
//   const [periods, setPeriods] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch timetable
//   useEffect(() => {
//     const fetchTimetable = async () => {
//       const res = await axios.get(`/api/timetables/${timetableId}`);
//       setPeriods(res.data.periods);
//     };

//     fetchTimetable();
//   }, [timetableId]);

//   // ✅ Handle Attendance Change
//   const handleAttendanceChange = (periodIndex, studentIndex, status) => {
//     const updatedPeriods = [...periods];
//     updatedPeriods[periodIndex].studentsAttendance[studentIndex].status = status;
//     setPeriods(updatedPeriods);
//   };

//   // ✅ Submit Attendance
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       for (const period of periods) {
//         await axios.patch(`/api/timetables/${timetableId}/mark-attendance`, {
//           periodNumber: period.periodNumber,
//           attendance: period.studentsAttendance.map((student) => ({
//             studentId: student.student._id,
//             status: student.status,
//           })),
//         });
//       }
//       alert('Attendance marked successfully');
//     } catch (err) {
//       console.error('Failed to mark attendance:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>

//       {periods.map((period, periodIndex) => (
//         <div key={periodIndex}>
//           <h3 className="font-semibold">Period {period.periodNumber}</h3>
//           {period.studentsAttendance.map((student, studentIndex) => (
//             <div key={studentIndex} className="flex gap-2 items-center">
//               <span>{student.student.name}</span>
//               <button
//                 onClick={() => handleAttendanceChange(periodIndex, studentIndex, 'present')}
//                 className={`px-3 py-1 rounded ${
//                   student.status === 'present' ? 'bg-green-500' : 'bg-gray-300'
//                 }`}
//               >
//                 Present
//               </button>
//               <button
//                 onClick={() => handleAttendanceChange(periodIndex, studentIndex, 'absent')}
//                 className={`px-3 py-1 rounded ${
//                   student.status === 'absent' ? 'bg-red-500' : 'bg-gray-300'
//                 }`}
//               >
//                 Absent
//               </button>
//             </div>
//           ))}
//         </div>
//       ))}

//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//       >
//         {loading ? 'Submitting...' : 'Submit'}
//       </button>
//     </div>
//   );
// };

// export default MarkAttendance;
import React, { useState } from 'react';
import axios from '../../services/axios';

const MarkAttendance = ({ classId, date, periods, students }) => {
  const [attendance, setAttendance] = useState([]);

  const handleAttendanceChange = (studentId, periodNumber, status) => {
    setAttendance((prev) => {
      const updated = [...prev];
      const existing = updated.find(
        (att) => att.studentId === studentId && att.periodNumber === periodNumber
      );

      if (existing) {
        existing.status = status;
      } else {
        updated.push({ studentId, periodNumber, status });
      }
      return updated;
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/attendance/mark', {
        classId,
        date,
        attendance,
      });
      alert('Attendance marked successfully!');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to mark attendance');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Mark Attendance</h2>
      {periods.map((period) => (
        <div key={period.periodNumber} className="mb-4">
          <h3 className="font-bold">Period {period.periodNumber} - {period.subject}</h3>
          {students.map((student) => (
            <div key={student.id} className="flex items-center mb-2">
              <span className="mr-4">{student.name}</span>
              <select
                onChange={(e) =>
                  handleAttendanceChange(student.id, period.periodNumber, e.target.value)
                }
                className="border px-2 py-1"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default MarkAttendance;

