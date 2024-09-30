import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudentEdit = () => {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState({
    fullName: '',
    email: '',
    class: '',
    location: {
      address: '',
      city: '',
      state: '',
      pinCode: ''
    },
    profileViews: {
      count: 0,
      viewers: []
    },
    profileImageURL: '',
    isActive: false,
    isLocked: false,
    username: ''
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  console.log(token);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/getStudent/${studentId}`, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        });

        if (response.data) {
          setStudentData({
            fullName: response.data.fullName || '',
            email: response.data.email || '',
            class: response.data.class || '',
            location: response.data.location || { address: '', city: '', state: '', pinCode: '' },
            profileViews: response.data.profileViews || { count: 0, viewers: [] },
            profileImageURL: response.data.profileImageURL || '',
            isActive: response.data.isActive || false,
            isLocked: response.data.isLocked || false,
            username: response.data.username || ''
          });
        } else {
          console.error('User data not found in response', response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data', error);
        setLoading(false); // Ensure loading is false even on error
      }
    };

    fetchStudentData();
  }, [studentId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      // Destructure studentData and remove fullName, email, and _id from payload
      const { fullName, email, _id, ...payload } = studentData;
  
      // Send PUT request to update the student profile, passing the filtered payload
      await axios.put(
        `https://backend.akshayy.tech/editUserProfile/${studentId}/Student`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure 'Bearer ' is prefixed
            'Content-Type': 'application/json',
          },
        }
      );
  
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error saving changes', error);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-24 p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Student Profile</h1>
      <div className="space-y-4 w-1/2">
        <input
          type="text"
          name="fullName"
          value={studentData.fullName}
          onChange={handleInputChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          disabled
        />
        <input
          type="text"
          name="username"
          value={studentData.username}
          onChange={handleInputChange}
          placeholder="Username"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          name="email"
          value={studentData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          disabled
        />
        <input
          type="text"
          name="class"
          value={studentData.class}
          onChange={handleInputChange}
          placeholder="Class"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <div className="space-y-2">
          <h3 className="font-bold">Location</h3>
          <input
            type="text"
            name="address"
            value={studentData.location.address}
            onChange={handleLocationChange}
            placeholder="Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="city"
            value={studentData.location.city}
            onChange={handleLocationChange}
            placeholder="City"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="state"
            value={studentData.location.state}
            onChange={handleLocationChange}
            placeholder="State"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="pinCode"
            value={studentData.location.pinCode}
            onChange={handleLocationChange}
            placeholder="Pin Code"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <h3 className="font-bold">Profile Views</h3>
          <p>Count: {studentData.profileViews.count}</p>
          <p>Viewers: {studentData.profileViews.viewers.join(', ')}</p>
        </div>
        <div>
          <img src={studentData.profileImageURL} alt="Profile" className="w-24 h-24 rounded-full" />
        </div>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isActive"
              checked={studentData.isActive}
              onChange={(e) => setStudentData({ ...studentData, isActive: e.target.checked })}
            />
            <span>Active</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isLocked"
              checked={studentData.isLocked}
              onChange={(e) => setStudentData({ ...studentData, isLocked: e.target.checked })}
            />
            <span>Locked</span>
          </label>
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default StudentEdit;
