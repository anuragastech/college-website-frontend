import axios from '../services/axios';

export const getClasses = async () => {
  const response = await axios.get('/api/classes/get-classes');
  return response.data;
};

export const getAttendance = async (classId, date) => {
  const response = await axios.get(`/api/timetable/get-attendance/${classId}/${date}`);
  return response.data;
};

// export const getStdAttendance = async (classId, date) => {
//   const response = await axios.get(`/api/timetable/get-studentattendance/${classId}/${date}`);
//   return response.data;
// };
// export const getStdAttendance = async (classId, date) => {
//   const token = localStorage.getItem('token');

//   const response = await fetch(`${API_URL}/${classId}/${date}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`, // ✅ Include token in headers
//     },
//   });

//   if (!response.ok) throw new Error('Failed to fetch attendance');
//   return response.json();
// };