import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch teacher data
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/teachers/getData');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Open Modal for Add or Edit
  const openModal = (teacher = null) => {
    if (teacher) {
      setFormData({ name: teacher.name, email: teacher.email });
      setEditingId(teacher._id);
    } else {
      setFormData({ name: '', email: '' });
      setEditingId(null);
    }
    setModalOpen(true);
  };

  // ✅ Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setFormData({ name: '', email: '' });
  };

  // ✅ Add or Edit Teacher
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update teacher
        await axios.put(`/api/teachers/edit/${editingId}`, formData);
      } else {
        // Add new teacher
        await axios.post('/api/teachers/add', formData);
      }
      fetchTeachers();
      closeModal();
    } catch (error) {
      console.error('Error saving teacher:', error);
    }
  };

  // ✅ Delete Teacher
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await axios.delete(`/api/teachers/delete/${id}`);
        fetchTeachers();
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* ✅ Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Teacher Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Teacher
        </button>
      </div>

      {/* ✅ Teacher Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id} className="text-center">
              <td className="border border-gray-300 p-2">{teacher.name}</td>
              <td className="border border-gray-300 p-2">{teacher.email}</td>
              <td className="border border-gray-300 p-2">
                {/* ✅ Edit Button */}
                <button
                  onClick={() => openModal(teacher)}
                  className="bg-green-500 text-white px-2 py-1 rounded-lg mx-1"
                >
                  Edit
                </button>
                {/* ✅ Delete Button */}
                <button
                  onClick={() => handleDelete(teacher._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-lg mx-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Edit Teacher' : 'Add Teacher'}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* ✅ Name */}
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              </div>
              {/* ✅ Email */}
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              </div>
              {/* ✅ Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  {editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherManagement;
