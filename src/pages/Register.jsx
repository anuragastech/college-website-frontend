import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../services/axios';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    parentEmail: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.post('/api/auth/register', form);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Parent's Email Input (Conditional) */}
          {form.role === 'student' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Parent's Email
              </label>
              <input
                type="email"
                name="parentEmail"
                placeholder="Enter parent's email"
                value={form.parentEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/')}
              className="text-blue-500 hover:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
