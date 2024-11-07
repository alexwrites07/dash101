import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Map from '../../MapDemo'; // Ensure the Map component is properly imported

const EditLearningNeed = () => {
  const { id } = useParams(); // Get the learning need ID from URL parameters
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [learningNeed, setLearningNeed] = useState({
    location: { address: '', landmark: '', city: '', pinCode: '', state: '', coordinates: { lat: '', lng: '' } },
    salary: { max: '', period: 'monthly' },
    email: '',
    phone: '',
    requirement: '',
    available: '',
    start: '',
    typeOfClass: '',
    connectedTutors: '',
    board: '',
    genderPreference: '',
    description: '',
    contactCost: 0,
  });

  const [coordinates, setCoordinates] = useState([0, 0]);

  // Fetch the current learning need data
  useEffect(() => {
    const fetchLearningNeed = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/learning-need/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLearningNeed(response.data);
        const fetchedCoordinates = response.data.location?.coordinates;
        if (fetchedCoordinates && fetchedCoordinates.length === 2) {
          setCoordinates([parseFloat(fetchedCoordinates[0]), parseFloat(fetchedCoordinates[1])]);}
      } catch (error) {
        console.error('Error fetching learning need:', error);
      }
    };

    fetchLearningNeed();
  }, [id, token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLearningNeed((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLearningNeed((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    setLearningNeed((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        [name]: value,
      },
    }));
  };

  // Update the coordinates in the parent state
  const handleCoordinatesChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
    setLearningNeed((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: newCoordinates,
      },
    }));
  };

  // Construct the payload for the PUT request
 // Construct the payload for the PUT request
const createPayload = () => {
  const payload = { ...learningNeed };
  payload.location.coordinates = [coordinates[0], coordinates[1]]; // Accessing lat and lng correctly
  return payload;
};


  // Submit updated learning need data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = createPayload();
      await axios.put(
        `https://backend.akshayy.tech/learning-need/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Learning need updated successfully!');
      
    } catch (error) {
      console.error('Error updating learning need:', error);
      alert('Failed to update learning need');
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold">Edit Learning Need</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Location Section */}
        <div>
          <h3 className="text-lg font-medium">Location</h3>
          <input type="text" name="address" value={learningNeed.location.address} onChange={handleLocationChange} placeholder="Address" className="border p-2 rounded-md w-full mb-2" />
          <input type="text" name="landmark" value={learningNeed.location.landmark} onChange={handleLocationChange} placeholder="Landmark" className="border p-2 rounded-md w-full mb-2" />
          <input type="text" name="city" value={learningNeed.location.city} onChange={handleLocationChange} placeholder="City" className="border p-2 rounded-md w-full mb-2" />
          <input type="text" name="pinCode" value={learningNeed.location.pinCode} onChange={handleLocationChange} placeholder="Pin Code" className="border p-2 rounded-md w-full mb-2" />
          <input type="text" name="state" value={learningNeed.location.state} onChange={handleLocationChange} placeholder="State" className="border p-2 rounded-md w-full mb-2" />
        </div>

        {/* Coordinates Section */}
        <div>
          <h3 className="text-lg font-medium">Coordinates</h3>
          <input
            type="text"
            name="location.coordinates"
            value={coordinates.length === 2 ? `${coordinates[0]}, ${coordinates[1]}` : ''}
            onChange={(e) => {
              const [lat, lng] = e.target.value.split(',').map(coord => parseFloat(coord.trim()));
              setCoordinates([lat, lng]);
              setLearningNeed(prevData => ({
                ...prevData,
                location: {
                  ...prevData.location,
                  coordinates: [lat, lng],
                },
              }));
            }}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        {/* Map Component */}
        <Map coordinates={coordinates} onCoordinatesChange={handleCoordinatesChange} />

        {/* Salary Section */}
        <div>
          <h3 className="text-lg font-medium">Salary</h3>
          <input type="number" name="max" value={learningNeed.salary.max} onChange={handleSalaryChange} placeholder="Max Salary" className="border p-2 rounded-md w-full mb-2" />
          <select name="period" value={learningNeed.salary.period} onChange={handleSalaryChange} className="border p-2 rounded-md w-full">
            <option value="monthly">Monthly</option>
            <option value="hourly">Hourly</option>
          </select>
        </div>

        {/* Other Fields */}
        <div className="mb-2">
  <label className="block font-medium text-gray-700">Email</label>
  <input
    type="email"
    name="email"
    value={learningNeed.email}
    onChange={handleChange}
    placeholder="Email"
    className="border p-2 rounded-md w-full"
  />
</div>

<div className="mb-2">
  <label className="block font-medium text-gray-700">Phone</label>
  <input
    type="tel"
    name="phone"
    value={learningNeed.phone}
    onChange={handleChange}
    placeholder="Phone"
    className="border p-2 rounded-md w-full"
  />
</div>

<div className="mb-2">
  <label className="block font-medium text-gray-700">Requirement</label>
  <textarea
    name="requirement"
    value={learningNeed.requirement}
    onChange={handleChange}
    placeholder="Requirement"
    className="border p-2 rounded-md w-full"
  />
</div>

<div className="mb-2">
  <label className="block font-medium text-gray-700">Availability</label>
  <div className="flex space-x-4">
    <div>
      <input
        type="checkbox"
        id="weekends"
        name="available"
        value="Weekends"
        checked={learningNeed.available.includes("Weekends")}
        onChange={handleChange}
        className="mr-2"
      />
      <label htmlFor="weekends">Weekends</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="weekdays"
        name="available"
        value="Weekdays"
        checked={learningNeed.available.includes("Weekdays")}
        onChange={handleChange}
        className="mr-2"
      />
      <label htmlFor="weekdays">Weekdays</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="any"
        name="available"
        value="Any"
        checked={learningNeed.available.includes("Any")}
        onChange={handleChange}
        className="mr-2"
      />
      <label htmlFor="any">Any</label>
    </div>
  </div>
</div>


<div className="mb-2">
  <label className="block font-medium text-gray-700">Start Date</label>
  <select
    name="start"
    value={learningNeed.start}
    onChange={handleChange}
    className="border p-2 rounded-md w-full"
  >
    <option value="">Select Start Date</option>
    <option value="Immediately">Immediately</option>
    <option value="Within a month">Within a month</option>
    <option value="Just looking at options">Just looking at options</option>
  </select>
</div>


<div className="mb-2">
  <label className="block font-medium text-gray-700">Type of Class</label>
  <div className="space-y-2">
    {['Online (Recommended)', "Offline: At tutor's place", "Offline: At student's place", 'Offline: Nearby classes'].map((option) => (
      <div key={option} className="flex items-center">
        <input
          type="checkbox"
          name="typeOfClass"
          value={option}
          onChange={handleChange}
          checked={learningNeed.typeOfClass.includes(option)}
          className="mr-2"
        />
        <label>{option}</label>
      </div>
    ))}
  </div>
</div>


<div className="mb-2">
  <label className="block font-medium text-gray-700">Connected Tutors</label>
  <input
    type="text"
    name="connectedTutors"
    value={learningNeed.connectedTutors}
    onChange={handleChange}
    placeholder="Connected Tutors"
    className="border p-2 rounded-md w-full"
  />
</div>

<div className="mb-2">
  <label className="block font-medium text-gray-700">Board</label>
  <input
    type="text"
    name="board"
    value={learningNeed.board}
    onChange={handleChange}
    placeholder="Board"
    className="border p-2 rounded-md w-full"
  />
</div>

<div className="mb-2">
  <label className="block font-medium text-gray-700">Gender Preference</label>
  <select
    name="genderPreference"
    value={learningNeed.genderPreference}
    onChange={handleChange}
    className="border p-2 rounded-md w-full"
  >
    <option value="">Select Gender Preference</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="No Preference">No Preference</option>
  </select>
</div>



<div className="mb-2">
  <label className="block font-medium text-gray-700">Description</label>
  <textarea
    name="description"
    value={learningNeed.description}
    onChange={handleChange}
    placeholder="Description"
    className="border p-2 rounded-md w-full"
  />
</div>

<div className="mb-2">
  <label className="block font-medium text-gray-700">Contact Cost</label>
  <input
    type="number"
    name="contactCost"
    value={learningNeed.contactCost}
    onChange={handleChange}
    placeholder="Contact Cost"
    className="border p-2 rounded-md w-full"
  />
</div>

        {/* Map Component */}
        
          
        

        {/* Save Button */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Changes</button>
      </form>
    </div>
  );
};

export default EditLearningNeed;
