const TeacherTable = ({ teachers, onEdit, onDelete }) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{teacher.name}</td>
                <td className="border border-gray-300 px-4 py-2">{teacher.email}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {/* Edit Button */}
                  <button
                    onClick={() => onEdit(teacher)}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => onDelete(teacher._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TeacherTable;
  