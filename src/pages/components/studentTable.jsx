import { useState, useEffect } from 'react';
import axios from '../../services/axios';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    studentClass: '',
    classId: '',
    email: '',
    phone: '',
    parentDetails: {
      name: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students/get-students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get('/api/classes/get-classes');
      setClasses(response.data.classes || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setClasses([]);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const openEditModal = (student) => {
    setEditingStudent(student._id);
    setFormData({
      name: student.name || '',
      rollNumber: student.rollNumber || '',
      studentClass: student.classId?._id || '',
      classId: student.classId || '',
      email: student.email || '',
      phone: student.phone || '',
      parentDetails: {
        name: student.parentDetails?.name || '',
        email: student.parentDetails?.email || '',
        phone: student.parentDetails?.phone || '',
      },
    });
  
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/students/${editingStudent}`, {
        ...formData,
        classId: formData.studentClass, // ✅ Fix classId assignment
        parentDetails: {
          name: formData.parentDetails.name,
          email: formData.parentDetails.email,
          phone: formData.parentDetails.phone,
        },
      });
  
      console.log('Student updated:', response.data);
      setEditingStudent(null);
      fetchStudents(); // Refresh the list after update
    } catch (error) {
      console.error('Error updating student:', error.response?.data || error.message);
    }
  };
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Student List</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              {['Name', 'Roll Number', 'Class', 'Email', 'Phone', 'Actions'].map((heading) => (
                <th key={heading} className="px-6 py-3 text-left font-medium uppercase">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-100 border-b">
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4">{student.rollNumber}</td>
                <td className="px-6 py-4">{student.className}</td>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4">{student.phone}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => openEditModal(student)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(student._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Edit Student</h3>
<div className="space-y-4">
  {['name', 'rollNumber', 'email', 'phone'].map((field) => (
    <input
      key={field}
      type="text"
      value={formData[field]}
      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
      className="border-gray-300 border w-full p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
    />
  ))}

  {/* Class Selection */}
  <select
    value={formData.studentClass}
    onChange={(e) =>
      setFormData({
        ...formData,
        studentClass: e.target.value,
        classId: e.target.value,
      })
    }
    className="border-gray-300 border w-full p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
  >
    <option value="">Select Class</option>
    {classes.map((cls) => (
      <option key={cls._id} value={cls._id}>
        {cls.name}
      </option>
    ))}
  </select>

  {/* Parent Details */}
  <h4 className="text-lg font-semibold mt-4">Parent Details</h4>
  <input
    type="text"
    value={formData.parentDetails.name}
    onChange={(e) =>
      setFormData({
        ...formData,
        parentDetails: { ...formData.parentDetails, name: e.target.value },
      })
    }
    placeholder="Parent Name"
    className="border-gray-300 border w-full p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
  />
  <input
    type="email"
    value={formData.parentDetails.email}
    onChange={(e) =>
      setFormData({
        ...formData,
        parentDetails: { ...formData.parentDetails, email: e.target.value },
      })
    }
    placeholder="Parent Email"
    className="border-gray-300 border w-full p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
  />
  <input
    type="text"
    value={formData.parentDetails.phone}
    onChange={(e) =>
      setFormData({
        ...formData,
        parentDetails: { ...formData.parentDetails, phone: e.target.value },
      })
    }
    placeholder="Parent Phone"
    className="border-gray-300 border w-full p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
  />
</div>

            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setEditingStudent(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
