import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';

const TeacherRegister = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckEmail = async () => {
    try {
      const res = await axios.post('/api/teachers/check-email', { email });
      if (res.data.otpSent) {
        setStep(2);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error checking email');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post('/api/teachers/verify-otp', { email, otp });
      setStep(3);
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid OTP');
    }
  };

  const handleSetPassword = async () => {
    try {
      await axios.post('/api/teachers/set-password', { email, password });
      alert('Password set successfully. You can now log in.');
      navigate('/teacher/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to set password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Teacher Registration
        </h2>

        {/* Step 1: Email Check */}
        {step === 1 && (
          <>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              onClick={handleCheckEmail}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition"
            >
              Send OTP
            </button>
          </>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* Step 3: Set Password */}
        {step === 3 && (
          <>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Set Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              onClick={handleSetPassword}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition"
            >
              Set Password
            </button>
          </>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-center">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        )}

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/teacher')}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegister;
