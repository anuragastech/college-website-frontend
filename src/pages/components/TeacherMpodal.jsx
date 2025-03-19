import { useState, useEffect } from 'react';

const TeacherModal = ({ isOpen, onClose, onSave, teacher }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  // ✅ Update form state when teacher data changes
  useEffect(() => {
    if (teacher) {
      setForm({ name: teacher.name, email: teacher.email, password: '' });
    } else {
      setForm({ name: '', email: '', password: '' });
    }
  }, [teacher]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        {/* ✅ Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            {teacher ? 'Edit Teacher' : 'Add Teacher'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required={!teacher}
          />

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            {teacher ? 'Update Teacher' : 'Add Teacher'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;
