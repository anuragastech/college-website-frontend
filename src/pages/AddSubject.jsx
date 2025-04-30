import { useState, useEffect } from 'react';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';
import SubjectList from './components/AllSubjects';

const AddSubject = () => {
  const [name, setName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch teachers when modal opens
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('/api/teachers/getData');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    if (isModalOpen) {
      fetchTeachers();
    }
  }, [isModalOpen]);

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending Data:', { name, teacherId });
    try {
      await axios.post('/api/subject/add-subject', { name, teacherId });
      alert('Subject added successfully');
      setIsModalOpen(false);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error:', error.response?.data?.message || 'Error adding subject');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* ✅ Button to Open Modal */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1"
          >
            + Add Subject
          </button>
        </div>

        {/* ✅ Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-xl p-6">
              {/* ✅ Modal Header */}
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Add New Subject
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                >
                  ✕
                </button>
              </div>

              {/* ✅ Form */}
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                {/* ✅ Subject Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject Name
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white transition"
                    type="text"
                    placeholder="Enter subject name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* ✅ Teacher Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assign Teacher
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white transition"
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    required
                  >
                    <option value="">Select a teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher._id} value={teacher._id}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ✅ Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                  Add Subject
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ✅ Subject List */}
        <SubjectList />
      </div>
    </div>
  );
};

export default AddSubject;
