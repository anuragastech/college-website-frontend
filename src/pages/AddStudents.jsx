import { useState, useEffect } from 'react';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';
import StudentTable from './components/studentTable';

const AddStudent = () => {
  const [form, setForm] = useState({
    name: '',
    rollNumber: '',
    classId: '',
    email: '',
    phone: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    address: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch available classes from backend
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        console.log('Fetching class options...');
        const response = await axios.get('/api/classes/get-classes'); // Adjust API route as needed
        console.log('Class options fetched:', response.data.classes);
        setClassOptions(response.data.classes);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  // ✅ Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field changed - ${name}: ${value}`);
    setForm({ ...form, [name]: value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting form data:', form);

    // Validation (optional)
    if (!form.classId) {
      alert('Please select a class');
      console.warn('Validation failed: classId is required');
      return;
    }

    try {
      const studentData = {
        name: form.name,
        rollNumber: form.rollNumber,
        classId: form.classId,
        email: form.email,
        phone: form.phone,
        parentDetails: {
          name: form.parentName,
          email: form.parentEmail,
          phone: form.parentPhone,
        },
        address: form.address,
      };

      console.log('Sending student data to backend:', studentData);

      await axios.post('/api/students/add-students', studentData);
      console.log('Student added successfully');

      alert('Student added successfully');
      setIsModalOpen(false);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error adding student:', error);
      alert(error.response?.data?.message || 'Failed to add student');
    }
  };

  return (
    <div className="p-6">
      {/* ✅ Add Student Button */}
      <div className="flex justify-center my-6">
        <button
          onClick={() => {
            console.log('Opening modal...');
            setIsModalOpen(true);
          }}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Add Student
        </button>
      </div>

      {/* ✅ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-800">Add Student</h2>
              <button
                onClick={() => {
                  console.log('Closing modal...');
                  setIsModalOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* ✅ Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />

                {/* Roll Number */}
                <input
                  type="text"
                  name="rollNumber"
                  placeholder="Roll Number"
                  value={form.rollNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />

                {/* ✅ Class Dropdown */}
                <select
                  name="classId"
                  value={form.classId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Class</option>
                  {classOptions?.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.name}
                    </option>
                  ))}
                </select>

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />

                {/* Phone */}
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* ✅ Parent Details */}
              <h3 className="text-lg font-semibold mt-4">Parent Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="parentName"
                  placeholder="Parent Name"
                  value={form.parentName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  name="parentEmail"
                  placeholder="Parent Email"
                  value={form.parentEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="parentPhone"
                  placeholder="Parent Phone"
                  value={form.parentPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* ✅ Address */}
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />

              {/* ✅ Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Add Student
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Student Table */}
      <StudentTable />
    </div>
  );
};

export default AddStudent;
