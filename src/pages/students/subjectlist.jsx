import { useEffect, useState } from 'react';
import instance from '../../services/axios';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  // ✅ Fetch subjects
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await instance.get('/api/subject/getsubjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        📚 Subject List
      </h2>

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
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject._id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-6 border-b text-gray-700">
                  {subject.name}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {subject.teacher ? subject.teacher.name : 'N/A'}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {subject.teacher ? subject.teacher.email : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectList;
