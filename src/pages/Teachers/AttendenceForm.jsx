import React, { useState } from 'react';
import { updateAttendance } from '../../api/TimeTable';

const AttendanceForm = ({ timetable }) => {
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

  // ✅ Submit Attendance
  const submitAttendance = async () => {
    if (!timetable?._id) {
      console.error('Timetable ID is undefined');
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
  
      console.log('Submitting attendance:', {
        timetableId: timetable._id,
        updates,
      });
  
      for (const update of updates) {
        const result = await updateAttendance(timetable._id, update.periodNumber, update.attendanceData);
        console.log(`Attendance updated for period ${update.periodNumber}:`, result);
      }
  
      alert('Attendance marked successfully!');
    } catch (error) {
      console.error('Failed to update attendance:', error?.response?.data || error.message);
      alert(`Failed to mark attendance: ${error?.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Mark Attendance</h3>
      {timetable?.periods?.length > 0 ? (
        timetable.periods.map((period) => (
          <div
            key={period?.periodNumber}
            className="mb-4 p-4 border border-gray-700 rounded bg-gray-900"
          >
            <h4 className="text-md font-semibold mb-2">
              Period {period?.periodNumber}: {period?.subject?.name || 'No subject'}
            </h4>
            {period?.studentsAttendance?.length > 0 ? (
              period.studentsAttendance.map((student) => (
                <div key={student?.student?._id} className="flex justify-between mb-2">
                  <span>{student?.student?.name || 'Unknown Student'}</span>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name={`${period?.periodNumber}-${student?.student?._id}`}
                        value="present"
                        onChange={() =>
                          handleAttendanceChange(
                            period?.periodNumber,
                            student?.student?._id,
                            'present'
                          )
                        }
                      />{' '}
                      Present
                    </label>
                    <label className="ml-4">
                      <input
                        type="radio"
                        name={`${period?.periodNumber}-${student?.student?._id}`}
                        value="absent"
                        onChange={() =>
                          handleAttendanceChange(
                            period?.periodNumber,
                            student?.student?._id,
                            'absent'
                          )
                        }
                      />{' '}
                      Absent
                    </label>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No students available for this period.</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-400">No periods available in the timetable.</p>
      )}

      <button
        onClick={submitAttendance}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default AttendanceForm;
