import React, { useEffect, useState } from 'react';
import { getStudents } from '../api/students';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error.message);
      alert('Failed to load student data.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student and Parent Details</h2>
      {students.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white border border-gray-700">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 border border-gray-600">Parent Name</th>
                <th className="px-4 py-2 border border-gray-600">Parent Email</th>
                <th className="px-4 py-2 border border-gray-600">Parent Phone</th>
                <th className="px-4 py-2 border border-gray-600">Student Name</th>
                <th className="px-4 py-2 border border-gray-600">Roll Number</th>
                <th className="px-4 py-2 border border-gray-600">Class</th>
                <th className="px-4 py-2 border border-gray-600">Student Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-700">
                  <td className="px-4 py-2 border border-gray-600">{student.parentDetails?.name || 'N/A'}</td>
                  <td className="px-4 py-2 border border-gray-600">{student.parentDetails?.email || 'N/A'}</td>
                  <td className="px-4 py-2 border border-gray-600">{student.parentDetails?.phone || 'N/A'}</td>
                  <td className="px-4 py-2 border border-gray-600">{student.name}</td>
                  <td className="px-4 py-2 border border-gray-600">{student.rollNumber}</td>
                  <td className="px-4 py-2 border border-gray-600">{student.classId?.name || 'N/A'}</td>
                  <td className="px-4 py-2 border border-gray-600">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400">No students found.</p>
      )}
    </div>
  );
};

export default StudentList;
