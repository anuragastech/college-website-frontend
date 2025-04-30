import React, { useEffect, useState } from 'react';
import { getStudents } from '../api/students';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (err) {
        console.error('Failed to fetch students:', err);
        setError('Failed to load students');
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-8 bg-gray-900 text-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-400">Student List</h2>

      {/* Error Message */}
      {error && <p className="text-red-400">{error}</p>}

      {/* Display Students */}
      <table className="min-w-full bg-gray-800 border border-gray-700">
        <thead>
          <tr>
            <th className="border border-gray-700 px-4 py-2">Roll Number</th>
            <th className="border border-gray-700 px-4 py-2">Name</th>
            {/* <th className="border border-gray-700 px-4 py-2">Class</th> */}
            <th className="border border-gray-700 px-4 py-2">Email</th>
            <th className="border border-gray-700 px-4 py-2">Phone</th>
            <th className="border border-gray-700 px-4 py-2">Parent Name</th>
            <th className="border border-gray-700 px-4 py-2">Parent Email</th>
            <th className="border border-gray-700 px-4 py-2">Parent Phone</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="hover:bg-gray-700">
              <td className="border border-gray-700 px-4 py-2">{student.rollNumber}</td>
              <td className="border border-gray-700 px-4 py-2">{student.name}</td>
              <td className="border border-gray-700 px-4 py-2">
                {/* {student.className   || 'Not Assigned'} */}
              </td>
              <td className="border border-gray-700 px-4 py-2">{student.email}</td>
              <td className="border border-gray-700 px-4 py-2">{student.phone}</td>
              <td className="border border-gray-700 px-4 py-2">
                {student.parentDetails?.name || 'N/A'}
              </td>
              <td className="border border-gray-700 px-4 py-2">
                {student.parentDetails?.email || 'N/A'}
              </td>     
              <td className="border border-gray-700 px-4 py-2">
                {student.parentDetails?.phone || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
