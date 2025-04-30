import { useState } from 'react';
import axios from '../services/axios';
import Clasroup from './GetAllClasswiseStudents';
import { Dialog } from '@headlessui/react';

const AddClass = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      setIsOpen(false);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding class');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-md">
        Manage Classes
      </h1>
      
      {/* Add Class Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          + Add Class
        </button>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md">
        <Dialog.Panel className="bg-gray-900 bg-opacity-90 border border-gray-700 p-6 rounded-2xl shadow-2xl w-full max-w-md">
          <Dialog.Title className="text-2xl font-bold text-gray-300 mb-4">
            Add Class
          </Dialog.Title>

          {message && (
            <div className="text-red-400 bg-red-900 bg-opacity-20 p-3 rounded-lg mb-4">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Class Name */}
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Class Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 text-gray-300 border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="e.g., 10"
              />
            </div>

            {/* Section */}
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Section</label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full bg-gray-800 text-gray-300 border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="e.g., A"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
              >
                Add Class
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>

      {/* Class List Display */}
      <Clasroup />
    </div>
  );
};

export default AddClass;
