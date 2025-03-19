import axios from './axios';

export const getClasses = async () => {
  try {
    const res = await axios.get('/api/classes/get-classes');
    return res.data?.data || []; // Ensure it returns an empty array if no data
  } catch (error) {
    console.error('Error fetching classes:', error.message);
    throw error;
  }
};
