import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../services/axios';

const StudentRegister = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1 = email, Step 2 = OTP, Step 3 = set password
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Handle email check and OTP sending
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) return setError('Please enter your email');

    try {
      setLoading(true);

      // ✅ Check if email exists + send OTP
      const checkResponse = await instance.post('/api/students/check-email', { email });

      if (checkResponse.data.exists) {
        setStep(2);
      } else {
        setError('Email not found. Please contact the admin.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!otp) return setError('Please enter the OTP');

    try {
      setLoading(true);

      // ✅ Verify OTP
      const { data } = await instance.post('/api/students/verify-otp', { email, otp });

      setStep(3); // ✅ OTP Verified → Move to password setup
      setOtp('');
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle password setup
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!password) return setError('Please enter your new password');

    try {
      setLoading(true);

      // ✅ Set password
      await instance.post('/api/students/set-password', { email, password });

      alert('Password set successfully');
      navigate('/'); // ✅ Redirect to login
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to set password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* ✅ Dynamic Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {step === 1 ? 'Verify Email' : step === 2 ? 'Enter OTP' : 'Set Password'}
        </h2>

        {/* ✅ Error Message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* ✅ Step 1: Email Input */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white py-3 rounded-lg transition duration-300`}
            >
              {loading ? 'Checking...' : 'Check Email'}
            </button>
          </form>
        )}

        {/* ✅ Step 2: OTP Input */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white py-3 rounded-lg transition duration-300`}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        {/* ✅ Step 3: Password Input */}
        {step === 3 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white py-3 rounded-lg transition duration-300`}
            >
              {loading ? 'Setting Password...' : 'Set Password'}
            </button>
          </form>
        )}

        {/* ✅ Login Link */}
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

export default StudentRegister;
