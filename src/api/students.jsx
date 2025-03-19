import axios from '../services/axios';

// Fetch student data from the backend
export const getStudents = async () => {
  try {
    const response = await axios.get('/api/students/get-students'); // Call the backend API
    return response.data; // Return the student data
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error; // Throw the error if there's an issue
  }
};
