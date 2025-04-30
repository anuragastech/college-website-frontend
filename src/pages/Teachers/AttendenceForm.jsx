import React, { useState } from 'react';
import { updateAttendance } from '../../api/TimeTable';

const AttendanceTable = ({ timetable }) => {
  const [attendance, setAttendance] = useState({});

  // ✅ Handle Attendance Change
  const handleAttendanceChange = (periodNumber, studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [periodNumber]: {
        ...prev[periodNumber],
        [studentId]: status,
      },
    }));
  };

  // ✅ Mark All Present/Absent
  const markAll = (periodNumber, status) => {
    const period = timetable.periods.find((p) => p.periodNumber === periodNumber);
    if (!period?.studentsAttendance) return;

    const updatedAttendance = period.studentsAttendance.reduce((acc, student) => {
      acc[student.student._id] = status;
      return acc;
    }, {});

    setAttendance((prev) => ({
      ...prev,
      [periodNumber]: updatedAttendance,
    }));
  };

  // ✅ Submit Attendance
  const submitAttendance = async () => {
    if (!timetable?._id) {
      alert('Invalid timetable. Please refresh and try again.');
      return;
    }

    try {
      const updates = Object.entries(attendance).reduce((acc, [periodNumber, students]) => {
        const periodData = Object.entries(students).map(([studentId, status]) => ({
          student: studentId,
          status,
        }));

        if (periodData.length > 0) {
          acc.push({
            periodNumber: Number(periodNumber),
            attendanceData: periodData,
          });
        }

        return acc;
      }, []);

      if (updates.length === 0) {
        alert('No attendance data to submit.');
        return;
      }

      for (const update of updates) {
        await updateAttendance(timetable._id, update.periodNumber, update.attendanceData);
      }

      alert('Attendance marked successfully!');
    } catch (error) {
      console.error('Failed to update attendance:', error);
      alert(`Failed to mark attendance: ${error?.response?.data?.message || error.message}`);
    }
  };

  // ✅ Get unique list of students across all periods
  const allStudents = timetable?.periods?.reduce((acc, period) => {
    period?.studentsAttendance?.forEach((student) => {
      if (!acc.some((s) => s._id === student.student._id)) {
        acc.push(student.student);
      }
    });
    return acc;
  }, []) || [];

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-4">Mark Attendance</h3>
      
      {/* ✅ Attendance Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-400 p-2">Student Name</th>
              {timetable?.periods?.map((period) => (
                <th key={period.periodNumber} className="border border-gray-400 p-2">
                  Period {period.periodNumber}  
                  {/* ✅ Mark All Buttons */}
                  <div className="flex gap-1 mt-1">
                    <button
                      onClick={() => markAll(period.periodNumber, 'present')}
                      className="bg-green-500 text-white px-2 py-1 text-xs rounded"
                    >
                      Present
                    </button>
                    <button
                      onClick={() => markAll(period.periodNumber, 'absent')}
                      className="bg-red-500 text-white px-2 py-1 text-xs rounded"
                    >
                      Absent
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {allStudents.map((student) => (
              <tr key={student._id} className="text-center">
                {/* ✅ Student Name */}
                <td className="border border-gray-400 p-2">
                  {student.name || 'Unknown'}
                </td>

                {/* ✅ Attendance Status for Each Period */}
                {timetable?.periods?.map((period) => {
                  const currentStatus =
                    attendance[period.periodNumber]?.[student._id] || '';

                  return (
                    <td key={`${period.periodNumber}-${student._id}`} className="border border-gray-400 p-2">
                      <div className="flex justify-center gap-2">
                        <label>
                          <input
                            type="radio"
                            name={`${period.periodNumber}-${student._id}`}
                            value="present"
                            checked={currentStatus === 'present'}
                            onChange={() =>
                              handleAttendanceChange(period.periodNumber, student._id, 'present')
                            }
                          />
                          Present
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`${period.periodNumber}-${student._id}`}
                            value="absent"
                            checked={currentStatus === 'absent'}
                            onChange={() =>
                              handleAttendanceChange(period.periodNumber, student._id, 'absent')
                            }
                          />
                          Absent
                        </label>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Submit Button */}
      <button
        onClick={submitAttendance}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default AttendanceTable;
