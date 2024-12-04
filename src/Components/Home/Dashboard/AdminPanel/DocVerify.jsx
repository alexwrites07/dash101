import React, { useState } from 'react';
import axios from 'axios';

const Doc = () => {
  const [userType, setUserType] = useState('');
  const [id, setId] = useState('');
  const [resume, setresume] = useState(null);
  const [identityProof, setidentityProof] = useState(null);
  const [dpUrl, setDpUrl] = useState('');
  const [IdUrl, setIdUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token'); // Retrieve token from local storage

  // Function to get profile resume
  const getProfileresume = async () => {
    if (!id || !userType) {
      setError('Please select a user type and enter an ID.');
      return;
    }

    let url = '';
    switch (userType) {
      
      case 'tutor':
        url = `https://server.avyudha.com/tutors/${id}/download-resume`;
        break;
     
      default:
        return;
    }

    try {
      setLoading(true);
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob', // Expect a blob response for the resume
      });
      const resumeUrl = URL.createObjectURL(response.data); // Create a URL for the blob
      setDpUrl(resumeUrl); // Set the dpUrl to display the resume
      setError('');
    } catch (error) {
      setError('Error fetching profile resume or resume not found.');
      setDpUrl('');
    } finally {
      setLoading(false);
    }
  };


  const getProfileId = async () => {
    if (!id || !userType) {
      setError('Please select a user type and enter an ID.');
      return;
    }

    let url = '';
    switch (userType) {
      
      case 'tutor':
        url = `https://server.avyudha.com/tutors/download/identityProof/${id}`;
        break;
     
      default:
        return;
    }

    try {
      setLoading(true);
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob', // Expect a blob response for the resume
      });
      const resumeUrl = URL.createObjectURL(response.data); // Create a URL for the blob
      setIdUrl(resumeUrl); // Set the dpUrl to display the resume
      setError('');
    } catch (error) {
      setError('Error fetching profile resume or resume not found.');
      setIdUrl('');
    } finally {
      setLoading(false);
    }
  };



  // Function to handle resume file selection
  const handleIdChange = (e) => {
    setidentityProof(e.target.files[0]);
  };

  // Function to edit profile resume
  const editProfileId = async () => {
    if (!id || !userType || !resume) {
      setError('Please select a user type, enter an ID, and choose an resume.');
      return;
    }

    let url = '';
    let formData = new FormData();

    switch (userType) {
     
      case 'tutor':
        url = `https://server.avyudha.com/admin/edit-file/tutor/${id}/identityProof`;
        formData.append('identityProof', identityProof);
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
      alert('Profile resume updated successfully');
    } catch (error) {
      setError('Error updating profile resume. Make sure the resume URL is correct.');
    } finally {
      setLoading(false);
    }
  };



    // Function to handle resume file selection
    const handleresumeChange = (e) => {
        setresume(e.target.files[0]);
      };
    
      // Function to edit profile resume
      const editProfileresume = async () => {
        if (!id || !userType || !resume) {
          setError('Please select a user type, enter an ID, and choose an resume.');
          return;
        }
    
        let url = '';
        let formData = new FormData();
    
        switch (userType) {
         
          case 'tutor':
            url = `https://server.avyudha.com/admin/edit-file/tutor/${id}/resume`;
            formData.append('resume', resume);
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
          alert('Profile resume updated successfully');
        } catch (error) {
          setError('Error updating profile resume. Make sure the resume URL is correct.');
        } finally {
          setLoading(false);
        }
      };

  // Function to delete profile resume
  const deleteProfileresume = async () => {
    if (!id || !userType) {
      setError('Please select a user type and enter an ID.');
      return;
    }

    let url = '';
    switch (userType) {
      
      case 'tutor':
        url = `https://server.avyudha.com/admin/edit-file/tutor/${id}/resume`;
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
      alert('Profile resume deleted successfully');
      setDpUrl(''); // Clear the displayed resume
    } catch (error) {
      setError('Error deleting profile resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">ID Edit and Delete Page</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">User Type:</label>
        <select 
          className="w-full p-2 border border-gray-300 rounded"
          value={userType} 
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="">Select user type</option>
         
          <option value="tutor">Tutor</option>
         
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
        onClick={getProfileresume}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Profile resume'}
      </button>

      {dpUrl && (
        <div className="mb-4">
          <h3 className="text-gray-700 font-medium mb-2">Current Profile resume:</h3>
          <img src={dpUrl} alt="Profile" className="w-32 h-32 mx-auto rounded-full shadow-md" />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Upload New resume:</label>
        <input type="file" onChange={handleresumeChange} className="w-full p-2 border border-gray-300 rounded" />
      </div>

      <button
        onClick={editProfileresume}
        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Edit Profile resume'}
      </button>

     

      {error && (
        <div className="mt-4 text-red-600 text-center">
          {error}
        </div>
      )}
      <br></br>
      <div><strong>Id Proof</strong></div>
       <button
        onClick={getProfileId}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Identity Proof'}
      </button>

      {IdUrl && (
        <div className="mb-4">
          <h3 className="text-gray-700 font-medium mb-2">Current Id Proof:</h3>
          <img src={IdUrl} alt="Profile" className="w-32 h-32 mx-auto rounded-full shadow-md" />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Upload Id Proof:</label>
        <input type="file" onChange={handleIdChange} className="w-full p-2 border border-gray-300 rounded" />
      </div>

      <button
        onClick={editProfileId}
        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Edit Id Proof'}
      </button>

     

      {error && (
        <div className="mt-4 text-red-600 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default Doc;
