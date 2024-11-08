import React, { useState } from 'react';
import axios from 'axios';

const DpEditDelete = () => {
  const [userType, setUserType] = useState('');
  const [id, setId] = useState('');
  const [image, setImage] = useState(null);
  const [dpUrl, setDpUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token'); // Retrieve token from local storage

  // Function to get profile image
  const getProfileImage = async () => {
    if (!id || !userType) {
      setError('Please select a user type and enter an ID.');
      return;
    }

    let url = '';
    switch (userType) {
      case 'student':
        url = `https://backend.akshayy.tech/student/dp/${id}`;
        break;
      case 'tutor':
        url = `https://backend.akshayy.tech/tutors/download/image/${id}`;
        break;
      case 'organization':
        url = `https://backend.akshayy.tech/org/download/logo/${id}`;
        break;
      default:
        return;
    }

    try {
      setLoading(true);
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob', // Expect a blob response for the image
      });
      const imageUrl = URL.createObjectURL(response.data); // Create a URL for the blob
      setDpUrl(imageUrl); // Set the dpUrl to display the image
      setError('');
    } catch (error) {
      setError('Error fetching profile image or image not found.');
      setDpUrl('');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle image file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Function to edit profile image
  const editProfileImage = async () => {
    if (!id || !userType || !image) {
      setError('Please select a user type, enter an ID, and choose an image.');
      return;
    }

    let url = '';
    let formData = new FormData();

    switch (userType) {
      case 'student':
        url = `https://backend.akshayy.tech/admin/edit-file/student/${id}/profileImageURL`;
        formData.append('profileImageURL', image);
        break;
      case 'tutor':
        url = `https://backend.akshayy.tech/admin/edit-file/tutor/${id}/image`;
        formData.append('image', image);
        break;
      case 'organization':
        url = `https://backend.akshayy.tech/admin/edit-file/organization/${id}/logo`;
        formData.append('logo', image);
        break;
      default:
        return;
    }

    try {
      setLoading(true);
      await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setError('');
      alert('Profile image updated successfully');
    } catch (error) {
      setError('Error updating profile image. Make sure the image URL is correct.');
    } finally {
      setLoading(false);
    }
  };

  // Function to delete profile image
  const deleteProfileImage = async () => {
    if (!id || !userType) {
      setError('Please select a user type and enter an ID.');
      return;
    }

    let url = '';
    switch (userType) {
      case 'student':
        url = `https://backend.akshayy.tech/admin/edit-file/student/${id}/profileImageURL`;
        break;
      case 'tutor':
        url = `https://backend.akshayy.tech/admin/edit-file/tutor/${id}/image`;
        break;
      case 'organization':
        url = `https://backend.akshayy.tech/admin/edit-file/organization/${id}/logo`;
        break;
      default:
        return;
    }

    try {
      setLoading(true);
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setError('');
      alert('Profile image deleted successfully');
      setDpUrl(''); // Clear the displayed image
    } catch (error) {
      setError('Error deleting profile image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">DP Edit and Delete Page</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">User Type:</label>
        <select 
          className="w-full p-2 border border-gray-300 rounded"
          value={userType} 
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="">Select user type</option>
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
          <option value="organization">Organization</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={getProfileImage}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Profile Image'}
      </button>

      {dpUrl && (
        <div className="mb-4">
          <h3 className="text-gray-700 font-medium mb-2">Current Profile Image:</h3>
          <img src={dpUrl} alt="Profile" className="w-32 h-32 mx-auto rounded-full shadow-md" />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Upload New Image:</label>
        <input type="file" onChange={handleImageChange} className="w-full p-2 border border-gray-300 rounded" />
      </div>

      <button
        onClick={editProfileImage}
        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Edit Profile Image'}
      </button>

      <button
        onClick={deleteProfileImage}
        className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        disabled={loading}
      >
        {loading ? 'Deleting...' : 'Delete Profile Image'}
      </button>

      {error && (
        <div className="mt-4 text-red-600 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default DpEditDelete;
