import { useState, useEffect } from 'react';
import axios from '../../services/axios';

const StudentTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students/get-students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Student List</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              {['Name', 'Roll Number', 'Class', 'Email', 'Phone'].map((heading) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
