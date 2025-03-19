import axios from '../services/axios';


// Fetch timetable by class and date
export const getTimetable = async (classId, date) => {
  try {
    const response = await axios.get(`/api/timetable/getTimetables/${classId}/${date}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching timetable:', error);
    throw error;
  }
};

// Update attendance
export const updateAttendance = async (timetableId, periodNumber, attendanceData) => {
    if (!timetableId) {
      throw new Error('Invalid timetable ID');
    }
    if (!periodNumber) {
      throw new Error('Invalid period number');
    }
    if (!attendanceData || !Array.isArray(attendanceData)) {
      throw new Error('Invalid attendance data');
    }
  
    try {
      const response = await axios.put(`/api/timetable/markAttendance/${timetableId}`, {
        periodNumber,
        attendance: attendanceData // Renamed to 'attendance' for better readability
      });
      return response.data;
    } catch (error) {
      console.error('Error updating attendance:', error?.response?.data || error.message);
      throw error;
    }
  };
  
// Fetch all classes
export const getClasses = async () => {
    try {
      const response = await axios.get('/api/classes/get-classes');
      return response.data;
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  };
  
