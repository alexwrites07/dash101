import React, { useState, useEffect } from 'react';
import { HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Map from '../../MapDemo';
import Sidebar from './AdminSidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LearningNeedsView = () => {
  const [unapprovedLearningNeeds, setUnapprovedLearningNeeds] = useState([]);
  const [coordinates, setCoordinates] = useState([0,0]);
  const [approvedLearningNeeds, setApprovedLearningNeeds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [newNeed, setNewNeed] = useState({
    email: '',
    phone: '',
    requirement: '',
    description: '',
    location: {
      address: '',
      landmark: '',
      city: '',
      pinCode: '',
      state: '',
      coordinates: ['', ''],
    },
    available: '',
    salary: {
      max: '',
      period: ''
    },
    board: '',
    genderPreference: '',
    start: '',
    typeOfClass: []
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleDelete = async (id) => {
    try {
      // Ask for user confirmation
      const isConfirmed = window.confirm("Are you sure you want to delete this learning need?");
      if (!isConfirmed) {
        console.log("Deletion cancelled by user.");
        return;
      }
  
      // Retrieve the bearer token from local storage
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('No token found in local storage');
        return;
      }
  
      // Sending DELETE request to the backend
      const response = await fetch(`https://server.avyudha.com/learning-need/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Checking if the response is successful
      if (response.ok) {
        console.log('Learning need deleted successfully');
        alert("Learning Need deleted successfully");
        // Optionally, trigger a state update here to remove the deleted item from the UI
      } else {
        console.error('Failed to delete the learning need');
        alert("Learning Need failed to be deleted");
      }
    } catch (error) {
      console.error('Error deleting learning need:', error);
    }
  };
  
  const handleMapChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
    setNewNeed((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: newCoordinates,
      },
    }));
  };
  const handleEditClick = (studentId) => {
    navigate(`/edit-learning-need/${studentId}`);
  };

  useEffect(() => {
    const fetchLearningNeeds = async () => {
      try {
        const response = await axios.get('https://server.avyudha.com/admin/learning-needs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedNeeds = response.data.learningNeeds.map((need) => ({
          id: need._id,
          name: need.email,
          need: need.requirement,
          location: `${need.location.address}, ${need.location.city}, ${need.location.state}, ${need.location.pinCode}`,
          datePosted: need.createdAt,
          salary: need.salary.max,
          salaryPeriod: need.salary.period,
          board: need.board,
          genderPreference: need.genderPreference,
          available: need.available,
          isApproved: need.isApproved,
          typeOfClass:need.typeOfClass,
        }));

        setApprovedLearningNeeds(fetchedNeeds.filter((ln) => ln.isApproved));
        setUnapprovedLearningNeeds(fetchedNeeds.filter((ln) => !ln.isApproved));
      } catch (error) {
        console.error('Error fetching learning needs:', error);
      }
    };

    fetchLearningNeeds();
  }, [token]);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleSortChange = () => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNeed((prev) => ({ ...prev, [name]: value }));
  };
  const handleCoordinatesChange = (e) => {
    const { name, value } = e.target;
    setNewNeed((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: name === 'latitude' 
          ? [value, prev.location.coordinates[1]] 
          : [prev.location.coordinates[0], value],
      },
    }));
  };
  const handleTypeOfClassChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
  
    if (checked) {
      // Add the new class type if checked
      setNewNeed({
        ...newNeed,
        typeOfClass: newNeed.typeOfClass ? `${newNeed.typeOfClass},${value}` : value,
      });
    } else {
      // Remove the class type if unchecked
      setNewNeed({
        ...newNeed,
        typeOfClass: newNeed.typeOfClass
          .split(',')
          .filter((item) => item !== value)
          .join(','),
      });
    }
  };
  

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setNewNeed((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value },
    }));
  };
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude,longitude } = position.coords;
        setCoordinates([latitude,longitude]);
        setNewJobData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            coordinates: [latitude, longitude],
          },
        }));
      }, (error) => {
        console.error("Error fetching location:", error);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    setNewNeed((prev) => ({
      ...prev,
      salary: { ...prev.salary, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://server.avyudha.com/create-need-admin',
        newNeed,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(response.data.message);
      setNewNeed({
        email: '',
        phone: '',
        requirement: '',
        description: '',
        location: {
          address: '',
          landmark: '',
          city: '',
          pinCode: '',
          state: '',
          coordinates: ['', ''], 
        },
        available: '',
        salary: {
          max: '',
          period: ''
        },
        board: '',
        genderPreference: '',
        start: '',
        typeOfClass: []
      });
    } catch (error) {
      console.error('Error creating learning need:', error);
    }
  };

  const filteredApprovedLearningNeeds = approvedLearningNeeds
    .filter((learningNeed) => learningNeed.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => (sortOrder === 'asc' ? new Date(a.datePosted) - new Date(b.datePosted) : new Date(b.datePosted) - new Date(a.datePosted)));

  const filteredUnapprovedLearningNeeds = unapprovedLearningNeeds
    .filter((learningNeed) => learningNeed.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => (sortOrder === 'asc' ? new Date(a.datePosted) - new Date(b.datePosted) : new Date(b.datePosted) - new Date(a.datePosted)));

  return (
    <div className="md:ml-24">
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Sidebar />
        <div className="flex justify-between w-3/5 space-x-4 -mb-12">
          <Header />
          <button
            onClick={handleSortChange}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <HiSortAscending className="w-6 h-6" />
            <span>Sort by Date</span>
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by email..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
            <button
            onClick={() => setShowForm((prev) => !prev)} // Toggle form visibility
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            {showForm ? 'Hide Form' : 'Create Learning Need'}
          </button>
        </div>

        {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-3/5 p-4 border border-gray-300 rounded-md">
          <h2 className="text-xl font-semibold">Create Learning Need</h2>
          <input type="text" name="email" value={newNeed.email} onChange={handleInputChange} placeholder="Email" required className="border p-2 rounded" />
          <input type="text" name="phone" value={newNeed.phone} onChange={handleInputChange} placeholder="Phone" required className="border p-2 rounded" />
          <input type="text" name="requirement" value={newNeed.requirement} onChange={handleInputChange} placeholder="Requirement" required className="border p-2 rounded" />
          <input type="text" name="description" value={newNeed.description} onChange={handleInputChange} placeholder="Description" required className="border p-2 rounded" />
          <input type="text" name="address" value={newNeed.location.address} onChange={handleLocationChange} placeholder="Address" required className="border p-2 rounded" />
          <input type="text" name="landmark" value={newNeed.location.landmark} onChange={handleLocationChange} placeholder="Landmark" className="border p-2 rounded" />
          <input type="text" name="city" value={newNeed.location.city} onChange={handleLocationChange} placeholder="City" required className="border p-2 rounded" />
          <input type="text" name="pinCode" value={newNeed.location.pinCode} onChange={handleLocationChange} placeholder="Pin Code" required className="border p-2 rounded" />
          <input type="text" name="state" value={newNeed.location.state} onChange={handleLocationChange} placeholder="State" required className="border p-2 rounded" />
          <input type="number" name="max" value={newNeed.salary.max} onChange={handleSalaryChange} placeholder="Max Salary" required className="border p-2 rounded" />
          <Map coordinates={coordinates} onCoordinatesChange={handleMapChange} />
          <button
              type="button"
              onClick={fetchCurrentLocation}


              className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            >
              Get Current Location
            </button>
          <div className="mb-2">
  <label className="block font-medium text-gray-700">Salary period</label>
  <select
    name="period"
    value={newNeed.salary.period}
    onChange={handleSalaryChange}
    className="border p-2 rounded-md w-full"
  >
    <option value="">Select Salary period</option>
    <option value="hourly">Hourly</option>
    <option value="daily">Daily</option>
    <option value="monthly">Monthly</option>
    <option value="annually">Annually</option>
  </select>
</div>
          <input type="text" name="board" value={newNeed.board} onChange={handleInputChange} placeholder="Board" className="border p-2 rounded" />
          <div className="mb-2">
  <label className="block font-medium text-gray-700">Gender Preference</label>
  <select
    name="genderPreference"
    value={newNeed.genderPreference}
    onChange={handleInputChange}
    className="border p-2 rounded-md w-full"
  >
    <option value="">Select Gender Preference</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="No Preference">No Preference</option>
  </select>
</div>
          <div className="mb-2">
  <label className="block font-medium text-gray-700">Start Date</label>
  <select
    name="start"
    value={newNeed.start}
    onChange={handleInputChange}
    className="border p-2 rounded-md w-full"
  >
    <option value="">Select Start Date</option>
    <option value="Immediately">Immediately</option>
    <option value="Within a month">Within a month</option>
    <option value="Just looking at options">Just looking at options</option>
  </select>
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
        checked={newNeed.available.includes("Weekends")}
        onChange={handleInputChange}
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
        checked={newNeed.available.includes("Weekdays")}
        onChange={handleInputChange}
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
        checked={newNeed.available.includes("Any")}
        onChange={handleInputChange}
        className="mr-2"
      />
      <label htmlFor="any">Any</label>
    </div>
  </div>
</div>
          <div className="flex space-x-4">
            <input type="text" name="latitude" value={newNeed.location.coordinates[0]} onChange={handleCoordinatesChange} placeholder="Latitude" className="border p-2 rounded" />
            <input type="text" name="longitude" value={newNeed.location.coordinates[1]} onChange={handleCoordinatesChange} placeholder="Longitude" className="border p-2 rounded" />
          </div>

          {/* Type of Class */}
          <label className="block font-medium">Type of Class (If it doesnot work try unclicking and clicking again)</label>
<div className="space-y-2">
  <div>
    <input
      type="checkbox"
      id="Online (Recommended)"
      name="typeOfClass"
      value="Online (Recommended)"
      checked={newNeed.typeOfClass.includes('Online (Recommended)')}
      onChange={handleTypeOfClassChange}
    />
    <label htmlFor="Online (Recommended)" className="ml-2">Online (Recommended)</label>
  </div>
  <div>
    <input
      type="checkbox"
      id="Offline At tutor Place"
      name="typeOfClass"
      value="Offline: At tutor's place"
      checked={newNeed.typeOfClass.includes('Offline: At tutor\'s place')}
      onChange={handleTypeOfClassChange}
    />
    <label htmlFor="Offline At tutor Place" className="ml-2">Offline At tutor Place</label>
  </div>
  <div>
    <input
      type="checkbox"
      id="Offline At student Place"
      name="typeOfClass"
      value="Offline: At student's place"
      checked={newNeed.typeOfClass.includes('Offline: At student\'s place')}
      onChange={handleTypeOfClassChange}
    />
    <label htmlFor="Offline At student Place" className="ml-2">Offline At student Place</label>
  </div>
  <div>
    <input
      type="checkbox"
      id="Offline: Nearby classes"
      name="typeOfClass"
      value="Offline: Nearby classes"
      checked={newNeed.typeOfClass.includes('Offline: Nearby classes')}
      onChange={handleTypeOfClassChange}
    />
    <label htmlFor="Offline: Nearby classes" className="ml-2">Offline: Nearby classes</label>
  </div>
</div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create Learning Need</button>
        </form>
  )}
        <div className="flex flex-col space-y-6 w-4/5 ml-64">
          <div className="space-y-4">
         
            {filteredApprovedLearningNeeds.map((learningNeed) => (
              <div key={`${learningNeed.id}-${learningNeed.datePosted}`} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                <div className="flex w-full justify-between space-x-4">
                  <span>{learningNeed.name}</span>
                  <span>{learningNeed.need}</span>
                  <span>{learningNeed.datePosted?.split('T')[0]}</span>
                  <span>{learningNeed.location}</span>
                 
                </div>
                <button onClick={() => handleEditClick(learningNeed.id)} className="bg-green-500 text-white px-4 py-2 mx-4 rounded-md hover:bg-green-600">Edit</button>
                <button onClick={() => handleDelete(learningNeed.id)} className="bg-red-500 text-white px-4 py-2 mx-4 rounded-md hover:bg-green-600">Delete</button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
           
            {filteredUnapprovedLearningNeeds.map((learningNeed) => (
              <div key={`${learningNeed.id}-${learningNeed.datePosted}`} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                <div className="flex w-full justify-between space-x-4">
                  <span>{learningNeed.name}</span>
                  <span>{learningNeed.need}</span>
                  <span>{learningNeed.datePosted}</span>
                  <span>{learningNeed.location}</span>
               
                </div>
                <button onClick={() => handleEditClick(learningNeed.id)} className="bg-green-500 text-white px-4 py-2 mx-4 rounded-md hover:bg-green-600">Edit</button>
                <button onClick={() => handleDelete(learningNeed.id)} className="bg-red-500 text-white px-4 py-2 mx-4 rounded-md hover:bg-green-600">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningNeedsView;
