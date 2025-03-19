import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await axios.get('/api/exams/get-exam');
      setExams(res.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const handleAddExam = async () => {
    if (!name || !date) {
      alert('Please fill all fields');
      return;
    }

    try {
      const res = await axios.post('/api/exams/add-exam', { name, date });
      setExams([...exams, res.data]);
      setName('');
      setDate('');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add exam');
    }
  };

  const handleDeleteExam = async (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await axios.delete(`/api/exams/${id}`);
        setExams(exams.filter((exam) => exam._id !== id));
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete exam');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Exams</h2>

        {/* Add Exam */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Exam Name"
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <button
            onClick={handleAddExam}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Exam List */}
        {exams.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 border">Exam Name</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border">{exam.name}</td>
                  <td className="px-4 py-3 border">
                    {new Date(exam.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    <button
                      onClick={() => handleDeleteExam(exam._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No exams added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ExamList;
