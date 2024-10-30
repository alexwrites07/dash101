import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditLearningNeed = () => {
  const { id } = useParams(); // Get the learning need ID from URL parameters
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [learningNeed, setLearningNeed] = useState({
    location: { address: '', landmark: '', city: '', pinCode: '', state: '' },
    salary: { max: '', period: 'monthly' },
    email: '',
    phone: '',
    requirement: '',
    available: '',
    start: '',
    typeOfClass: [],
    board: '',
    genderPreference: '',
    description: '',
  });

  // Fetch the current learning need data
  useEffect(() => {
    const fetchLearningNeed = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/learning-need/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLearningNeed(response.data);
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

  // Construct the payload for the PUT request
  const createPayload = () => {
    const payload = {};
    for (const key in learningNeed) {
      if (typeof learningNeed[key] === 'object' && !Array.isArray(learningNeed[key])) {
        for (const subKey in learningNeed[key]) {
          payload[`${key}.${subKey}`] = learningNeed[key][subKey];
        }
      } else {
        payload[key] = learningNeed[key];
      }
    }
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
        <input type="email" name="email" value={learningNeed.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded-md w-full mb-2" />
        <input type="tel" name="phone" value={learningNeed.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded-md w-full mb-2" />
        <textarea name="requirement" value={learningNeed.requirement} onChange={handleChange} placeholder="Requirement" className="border p-2 rounded-md w-full mb-2" />
        <input type="text" name="available" value={learningNeed.available} onChange={handleChange} placeholder="Availability" className="border p-2 rounded-md w-full mb-2" />
        <input type="text" name="start" value={learningNeed.start} onChange={handleChange} placeholder="Start Date" className="border p-2 rounded-md w-full mb-2" />
        <input type="text" name="board" value={learningNeed.board} onChange={handleChange} placeholder="Board" className="border p-2 rounded-md w-full mb-2" />
        <input type="text" name="genderPreference" value={learningNeed.genderPreference} onChange={handleChange} placeholder="Gender Preference" className="border p-2 rounded-md w-full mb-2" />
        <textarea name="description" value={learningNeed.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded-md w-full mb-2" />

        {/* Save Button */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Changes</button>
      </form>
    </div>
  );
};

export default EditLearningNeed;
