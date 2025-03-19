import React, { useState, useEffect } from 'react';

const TimetableView = ({ timetable }) => {
  const [todayPeriods, setTodayPeriods] = useState([]);

  useEffect(() => {
    if (timetable?.periods?.length > 0) {
      // ✅ Filter today's periods based on date
      const today = new Date().toISOString().split('T')[0];
      const filteredPeriods = timetable.periods.filter(
        (period) => period.date?.split('T')[0] === today
      );
      setTodayPeriods(filteredPeriods);
    }
  }, [timetable]);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Today's Timetable</h3>
      {todayPeriods.length > 0 ? (
        todayPeriods.map((period) => (
          <div
            key={period?.periodNumber}
            className="mb-4 p-4 border border-gray-700 rounded bg-gray-900"
          >
            <h4 className="text-md font-semibold mb-2">
              Period {period?.periodNumber}: {period?.subject?.name || 'No subject'}
            </h4>
            {period?.teacher ? (
              <p className="text-gray-400">
                Teacher: {period?.teacher?.name || 'N/A'}
              </p>
            ) : (
              <p className="text-gray-400">No teacher assigned</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-400">No periods available for today.</p>
      )}
    </div>
  );
};

export default TimetableView;
