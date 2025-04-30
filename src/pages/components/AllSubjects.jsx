import { useEffect, useState } from 'react';
import instance from '../../services/axios';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedSubject, setEditedSubject] = useState({ _id: '', name: '', teacherId: '' });
  const [teachers, setTeachers] = useState([]);

  // ✅ Fetch subjects
  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await instance.get('/api/subject/getsubjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await instance.get('/api/teachers/getData');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  // ✅ Handle Edit
  const handleEdit = (subject) => {
    setEditedSubject({
      _id: subject._id,
      name: subject.name,
      teacherId: subject.teacherId || ''
    });
    setEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      await instance.put(`/api/subject/edit-subject/${editedSubject._id}`, {
        name: editedSubject.name,
        teacherId: editedSubject.teacherId
      });
      fetchSubjects();
      setEditMode(false);
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this subject?');
    if (isConfirmed) {
      try {
        await instance.delete(`/api/subject/delete-subject/${id}`);
        fetchSubjects();
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        📚 Subject List
      </h2>

      {/* ✅ Subject Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-3 px-6 border-b text-left text-gray-800 font-semibold">
                Subject Name
              </th>
              <th className="py-3 px-6 border-b text-left text-gray-800 font-semibold">
                Teacher Name
              </th>
              <th className="py-3 px-6 border-b text-left text-gray-800 font-semibold">
                Teacher Email
              </th>
              <th className="py-3 px-6 border-b text-left text-gray-800 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
  {subjects.map((subject) => (
    <tr key={subject._id} className="hover:bg-gray-50 transition">
      {/* ✅ Subject Name */}
      <td className="py-4 px-6 border-b text-gray-700">
        {subject.name}
      </td>

      {/* ✅ Teacher Name */}
      <td className="py-4 px-6 border-b text-gray-700">
        {subject.teacher?.name || 'N/A'}
      </td>

      {/* ✅ Teacher Email */}
      <td className="py-4 px-6 border-b text-gray-700">
        {subject.teacher?.email || 'N/A'}
      </td>

      {/* ✅ Action Buttons */}
      <td className="py-4 px-6 border-b text-gray-700">
        <button
          onClick={() => handleEdit(subject)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(subject._id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {/* ✅ Edit Modal */}
      {editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Edit Subject</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Subject Name</label>
              <input
                type="text"
                value={editedSubject.name}
                onChange={(e) =>
                  setEditedSubject({ ...editedSubject, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md mb-4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Assign Teacher</label>
              <select
                value={editedSubject.teacherId}
                onChange={(e) =>
                  setEditedSubject({ ...editedSubject, teacherId: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md mb-4"
              >
                <option value="">Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
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

export default SubjectList;
