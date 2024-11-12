import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Map from '../../MapDemo';

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
      coordinates: ["set location", "set location"],
    },
    profileViews: {
      count: 0,
      viewers: []
    },
    profileImageURL: '',
    isActive: false,
    isLocked: false,
    username: '',
    email:'',
    parentPhone: '',
    dob: '',
    parentName: '',
    schoolName: '',
    phone: '',
    socialMediaLinks: [],
    unlockedContacts: [],
    contactNumberVerified: false,
    boardOfEducation: '',
    
    contactCost: 0,
    hasUnreadNotifications: false,
    learningNeeds: []
  });

  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState([
    parseFloat(studentData.location.coordinates[0]) || 0,
    parseFloat(studentData.location.coordinates[1]) || 0
  ]);
  console.log(coordinates);
  const token = localStorage.getItem('token');

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
            ...response.data,
            location: response.data.location || { address: '', city: '', state: '', pinCode: '', coordinates: [] },
            profileViews: response.data.profileViews || { count: 0, viewers: [] },
            learningNeeds: response.data.learningNeeds || []
          });
          setCoordinates([
            parseFloat(response.data.location.coordinates[0]) || 0,
            parseFloat(response.data.location.coordinates[1]) || 0
          ]);
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

  const handleMapChange = (updatedCoordinates) => {
    setCoordinates(updatedCoordinates);  
    setStudentData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: updatedCoordinates,
      },
    }));
  };

  const handleCoordinatesChange = (e) => {
    const { name, value } = e.target;
    const index = name === 'latitude' ? 0 : 1; 
    const updatedCoordinates = [...studentData.location.coordinates];
    updatedCoordinates[index] = parseFloat(value) || 0; 
    setStudentData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        coordinates: updatedCoordinates,
      },
    }));
    setCoordinates(updatedCoordinates);  
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
          type="text"
          name="schoolName"
          value={studentData.schoolName}
          onChange={handleInputChange}
          placeholder="School Name"
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
          type="text"
          name="parentPhone"
          value={studentData.parentPhone}
          onChange={handleInputChange}
          placeholder="Parent Phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
         <input
          type="text"
          name="StudentPhone"
          value={studentData.phone}
          onChange={handleInputChange}
          placeholder="Student Phone"
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
          type="number"
          name="contactCost"
          value={studentData.contactCost}
          onChange={handleInputChange}
          placeholder="Contact Cost"
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
        
        <div className="space-y-2">
          <h4 className="font-bold">Coordinates</h4>
          <input
            type="number"
            name="latitude"
            value={studentData.location.coordinates[0]} 
            onChange={handleCoordinatesChange}
            placeholder="Latitude"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="longitude"
            value={studentData.location.coordinates[1]} 
            onChange={handleCoordinatesChange}
            placeholder="Longitude"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        {/* Map Integration */}
        <Map coordinates={coordinates} onCoordinatesChange={handleMapChange} />
        
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
