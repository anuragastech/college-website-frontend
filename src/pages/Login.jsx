import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../services/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      return setError('Please fill in all fields.');
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError('Invalid email format.');
    }

    setLoading(true);
    try {
      const { data } = await instance.post('/api/auth/login', { email, password });

      // Store user data in localStorage or context
      localStorage.setItem('userInfo', JSON.stringify(data));

      // Role-based redirection
      if (data.role === 'student') {
        navigate('/student/dashboard');
      } else if (data.role === 'teacher') {
        navigate('/teachers/dashboard');
      } else if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/'); // Default redirect if role is not matched
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">LOGIN</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white py-3 rounded-lg transition duration-300`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-500 hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
