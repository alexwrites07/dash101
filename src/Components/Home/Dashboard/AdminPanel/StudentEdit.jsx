import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudentEdit = () => {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState({
    fullName: '',
    
    class: '',
    location: {
      address: '',
      city: '',
      state: '',
      pinCode: '',
      coordinates: []
    },
    profileViews: {
      count: 0,
      viewers: []
    },
    profileImageURL: '',
    isActive: false,
    isLocked: false,
    username: '',
    parentPhone: '',
    dob: '',
    parentName: '',
    schoolName: '',
    phone: '',
    socialMediaLinks: [],
    unlockedContacts: [],
    contactNumberVerified: false,
    boardOfEducation: '',
    hasUnreadNotifications: false
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  console.log(token);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/getStudent/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data) {
          setStudentData({
            fullName: response.data.fullName || '',
            
            class: response.data.class || '',
            location: response.data.location || { address: '', city: '', state: '', pinCode: '', coordinates: [] },
            profileViews: response.data.profileViews || { count: 0, viewers: [] },
            profileImageURL: response.data.profileImageURL || '',
            isActive: response.data.isActive || false,
            isLocked: response.data.isLocked || false,
            username: response.data.username || '',
            parentPhone: response.data.parentPhone || '',
            dob: response.data.dob || '',
            parentName: response.data.parentName || '',
            schoolName: response.data.schoolName || '',
            phone: response.data.phone || '',
            socialMediaLinks: response.data.socialMediaLinks || [],
            unlockedContacts: response.data.unlockedContacts || [],
            contactNumberVerified: response.data.contactNumberVerified || false,
            boardOfEducation: response.data.boardOfEducation || '',
            hasUnreadNotifications: response.data.hasUnreadNotifications || false
          });
        } else {
          console.error('User data not found in response', response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data', error);
        setLoading(false);
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
  const handleCoordinatesChange = (e) => {
    const { name, value } = e.target;
    const index = name === 'latitude' ? 0 : 1; // Determine index for latitude or longitude
    const updatedCoordinates = [...studentData.location.coordinates];
    updatedCoordinates[index] = parseFloat(value) || 0; // Parse float or default to 0
    setStudentData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        coordinates: updatedCoordinates,
      },
    }));
  };
  const handleSave = async () => {
    try {
      await axios.put(
        `https://backend.akshayy.tech/editUserProfile/${studentId}/Student`,
        studentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
        
        <input
          type="date"
          name="dob"
          value={studentData.dob}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
     
        <input
          type="text"
          name="schoolName"
          value={studentData.schoolName}
          onChange={handleInputChange}
          placeholder="School Name"
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
        <input
          type="text"
          name="parentName"
          value={studentData.parentName}
          onChange={handleInputChange}
          placeholder="Parent's Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="parentPhone"
          value={studentData.parentPhone}
          onChange={handleInputChange}
          placeholder="Parent's Phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="boardOfEducation"
          value={studentData.boardOfEducation}
          onChange={handleInputChange}
          placeholder="Board of Education"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="date"
          name="dob"
          value={studentData.dob?.split('T')[0]}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="schoolName"
          value={studentData.schoolName}
          onChange={handleInputChange}
          placeholder="School Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        {/* Additional fields can be added similarly */}
       
        <div className="space-y-2">
            <h4 className="font-bold">Coordinates</h4>
            <input
              type="number"
              name="latitude"
              value={studentData.location.coordinates[0]} // Access latitude
              onChange={handleCoordinatesChange}
              placeholder="Latitude"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="longitude"
              value={studentData.location.coordinates[1]} // Access longitude
              onChange={handleCoordinatesChange}
              placeholder="Longitude"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
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
