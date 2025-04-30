import axios from '../services/axios';

export const getAttendance = async (classId, date, studentId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`/api/timetable/get-studentattendance/${classId}/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      studentId, // ✅ Send studentId as query param
    },
  });
  return response.data;
};

export const getClasses = async (studentId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`/api/classes/get-classes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      studentId, // ✅ Send studentId as query param
    },
  });
  return response.data;
};
