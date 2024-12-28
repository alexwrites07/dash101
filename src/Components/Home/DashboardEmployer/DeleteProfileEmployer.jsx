import React, { useState } from 'react';
import Sidebar from "../Dashboard/Sidebar";
import Header from './HeaderEmployer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'; // Ensure Axios is installed

const DeleteProfile = () => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State to show success message

  // Constants for the API call
  const apiUrl = 'https://server.avyudha.com/tutor/delete';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWUyNTBmMDEwYjA4NTJhNzU0ZTliZiIsImlhdCI6MTcyMTkwMjE4Mn0.pvPZFwt9VjiRwnNBAWGBjfgd2EK_9B0oQMENsJU0JcM';
  const tutorId = '669e250f010b0852a754e9bf';

  const handleDeleteProfile = async (e) => {
    e.preventDefault();

    // Perform password validation
    if (!password) {
      setError('Please enter your password to confirm.');
      return;
    }

    setError('');

    try {
      // Make the API call to delete the profile
      const response = await axios.post(apiUrl, {
        password: password,
        confirmation: true
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      // Check if the response is successful
      if (response.status === 200) {
        setSuccess('Profile deleted successfully!');
        // Implement any additional logic after successful deletion
        console.log('Profile deleted:', response.data);
      }
    } catch (err) {
      // Handle errors from the API
      setError('Failed to delete profile. Please check your password and try again.');
      console.error('Error deleting profile:', err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28  flex flex-col items-center lg:items-start w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Delete Profile</h1>

          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 mb-4">
              Are you sure you want to delete your profile?
            </p>
            <p className="text-lg text-red-600 font-bold mb-4">
              This can't be undone!
            </p>
            <form onSubmit={handleDeleteProfile}>
              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                  Please enter your login password to confirm:
                </label>
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                  required
                />
                <span
                  className="absolute right-3 top-10 cursor-pointer text-gray-600"
                  onClick={() => setPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              {/* Success Message */}
              {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

              <button
                type="submit"
                className="w-1/4 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none"
              >
                Delete Profile
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;
