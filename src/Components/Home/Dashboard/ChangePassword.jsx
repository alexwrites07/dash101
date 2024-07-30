import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import axios from 'axios'; // Import Axios for HTTP requests

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success message

  // Password visibility states
  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isRetypePasswordVisible, setRetypePasswordVisible] = useState(false);

  // API endpoint
  const apiUrl = 'https://backend.akshayy.tech/update_password';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWUyNTBmMDEwYjA4NTJhNzU0ZTliZiIsImlhdCI6MTcyMTkwMjE4Mn0.pvPZFwt9VjiRwnNBAWGBjfgd2EK_9B0oQMENsJU0JcM';
  const tutorId = '669e250f010b0852a754e9bf';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if new password and retype password match
    if (newPassword !== retypePassword) {
      setError('New password and retype password do not match.');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('');

    try {
      // Make the API call to update the password
      const response = await axios.post(
        apiUrl,
        {
          userId: tutorId,        // Include the tutorId in the request body if needed by the API
          newPassword: newPassword,
          oldPassword: oldPassword, // Include the old password for verification
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers for authentication
            'Content-Type': 'application/json',
          },
        }
      );

      // Check if the response is successful
      if (response.status === 200) {
        setSuccess('Password updated successfully!');
        setOldPassword('');
        setNewPassword('');
        setRetypePassword('');
        console.log('Password updated:', response.data);
      }
    } catch (err) {
      // Handle errors from the API
      setError('Failed to update password. Please try again.');
      console.error('Error updating password:', err);
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
              {/* Old Password Field */}
              <div className="mb-4 relative">
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

              {/* New Password Field */}
              <div className="mb-4 relative">
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

              {/* Retype Password Field */}
              <div className="mb-4 relative">
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

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              {/* Success Message */}
              {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

              {/* Change Password Button */}
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
