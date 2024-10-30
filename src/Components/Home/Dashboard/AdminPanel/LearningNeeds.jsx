import React, { useState, useEffect } from 'react';
import { HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LearningNeedsView = () => {
  const [unapprovedLearningNeeds, setUnapprovedLearningNeeds] = useState([]);
  const [approvedLearningNeeds, setApprovedLearningNeeds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
      state: ''
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

  const handleEditClick = (studentId) => {
    navigate(`/edit-learning-need/${studentId}`);
  };

  useEffect(() => {
    const fetchLearningNeeds = async () => {
      try {
        const response = await axios.get('https://backend.akshayy.tech/admin/learning-needs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedNeeds = response.data.map((need) => ({
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

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setNewNeed((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value },
    }));
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
        'https://backend.akshayy.tech/create-need-admin',
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
          state: ''
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
        <div className="flex justify-between w-3/5 space-x-4 mb-6">
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
        </div>

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
          <input type="text" name="period" value={newNeed.salary.period} onChange={handleSalaryChange} placeholder="Salary Period" required className="border p-2 rounded" />
          <input type="text" name="board" value={newNeed.board} onChange={handleInputChange} placeholder="Board" className="border p-2 rounded" />
          <input type="text" name="genderPreference" value={newNeed.genderPreference} onChange={handleInputChange} placeholder="Gender Preference" className="border p-2 rounded" />
          <input type="text" name="start" value={newNeed.start} onChange={handleInputChange} placeholder="Start Date" className="border p-2 rounded" />
          <input type="text" name="available" value={newNeed.available} onChange={handleInputChange} placeholder="Available" className="border p-2 rounded" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create Learning Need</button>
        </form>

        <div className="flex flex-col space-y-6 w-3/5">
          <div className="space-y-4">
         
            {filteredApprovedLearningNeeds.map((learningNeed) => (
              <div key={`${learningNeed.id}-${learningNeed.datePosted}`} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                <div className="flex w-full justify-between space-x-4">
                  <span>{learningNeed.name}</span>
                  <span>{learningNeed.need}</span>
                  <span>{learningNeed.datePosted}</span>
                  <span>{learningNeed.location}</span>
                 
                </div>
                <button onClick={() => handleEditClick(learningNeed.id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Edit</button>
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
                <button onClick={() => handleEditClick(learningNeed.id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Edit</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningNeedsView;
