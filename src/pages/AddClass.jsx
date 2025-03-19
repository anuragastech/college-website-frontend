import { useState } from 'react';
import axios from '../services/axios';

const AddClass = () => {
  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !section) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post('/api/classes/add', { name, section });
      setMessage(response.data.message);
      setName('');
      setSection('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding class');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Add Class</h2>

        {message && <div className="text-red-500 mb-4">{message}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Class Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded-md"
            placeholder="e.g., 10"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Section</label>
          <input
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full border p-2 rounded-md"
            placeholder="e.g., A"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
