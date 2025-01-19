import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Password visibility states
  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isRetypePasswordVisible, setRetypePasswordVisible] = useState(false);

  const [endpoint, setEndpoint] = useState('tutor'); // Default to 'tutor'

  useEffect(() => {
    const type = localStorage.getItem('type');
    if (type) {
      setEndpoint(type);
    }
  }, []); // Run this effect only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== retypePassword) {
      setError('New password and retype password do not match.');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const apiUrl = 'https://server.avyudha.com/update_password';

      const response = await axios.post(
        apiUrl,
        {
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setSuccess('Password updated successfully!');
        setOldPassword('');
        setNewPassword('');
        setRetypePassword('');
      }
    } catch (err) {
      setError('Failed to update password. Please try again.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Update Password</h1>

          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 ">
                <label htmlFor="oldPassword" className="block text-gray-700 font-semibold mb-2">
                  Old Password
                </label>
                <input
                  type={isOldPasswordVisible ? 'text' : 'password'}
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                  required
                />
                <span
                  className="absolute right-3 top-10 cursor-pointer text-gray-600"
                  onClick={() => setOldPasswordVisible(!isOldPasswordVisible)}
                >
                  {isOldPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="mb-4 ">
                <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">
                  New Password
                </label>
                <input
                  type={isNewPasswordVisible ? 'text' : 'password'}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                  required
                />
                <span
                  className="absolute right-3 top-10 cursor-pointer text-gray-600"
                  onClick={() => setNewPasswordVisible(!isNewPasswordVisible)}
                >
                  {isNewPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="mb-4 ">
                <label htmlFor="retypePassword" className="block text-gray-700 font-semibold mb-2">
                  Retype Password
                </label>
                <input
                  type={isRetypePasswordVisible ? 'text' : 'password'}
                  id="retypePassword"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                  required
                />
                <span
                  className="absolute right-3 top-10 cursor-pointer text-gray-600"
                  onClick={() => setRetypePasswordVisible(!isRetypePasswordVisible)}
                >
                  {isRetypePasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Change Password
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
