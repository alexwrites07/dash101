import React, { useState, useEffect } from 'react';
import { HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';
import axios from 'axios';

const LearningNeedsView = () => {
  const [unapprovedLearningNeeds, setUnapprovedLearningNeeds] = useState([]); // Store unapproved learning needs
  const [approvedLearningNeeds, setApprovedLearningNeeds] = useState([]); // Store approved learning needs
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const token = localStorage.getItem('token');
  // Fetch learning needs from API
  useEffect(() => {
    const fetchLearningNeeds = async () => {
      try {
        const response = await axios.get('https://backend.akshayy.tech/learning-needs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedNeeds = response.data.map((need) => ({
          id: need._id,  // Ensure this is correctly set
          name: need.email, // Use email as the name placeholder
          need: need.requirement,
          location: need.location,
          datePosted: need.createdAt,
          salary: need.salary.max,
          board: need.board,
          genderPreference: need.genderPreference,
          available: need.available,
          isApproved: need.isApproved,
        }));
        

        // Separate approved and unapproved learning needs
        const approved = fetchedNeeds.filter((ln) => ln.isApproved);
        const unapproved = fetchedNeeds.filter((ln) => !ln.isApproved);

        setApprovedLearningNeeds(approved);
        setUnapprovedLearningNeeds(unapproved);
      } catch (error) {
        console.error('Error fetching learning needs:', error);
      }
    };

    fetchLearningNeeds();
  }, [token]);

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle sorting
  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Toggle approval status
  const toggleApprovalStatus = async (learningNeed) => {
    try {
      const response = await axios.patch(
        `https://backend.akshayy.tech/approve/learningNeed/${learningNeed.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedNeed = response.data.document;

      // Update the learning need in both lists with the new approval status
      if (updatedNeed.isApproved) {
        setUnapprovedLearningNeeds((prev) => prev.filter((ln) => ln.id !== updatedNeed._id));
        setApprovedLearningNeeds((prev) => [...prev, updatedNeed]);
      } else {
        setApprovedLearningNeeds((prev) => prev.filter((ln) => ln.id !== updatedNeed._id));
        setUnapprovedLearningNeeds((prev) => [...prev, updatedNeed]);
      }
    } catch (error) {
      console.error('Error toggling approval status:', error);
    }
  };

// Filter and sort approved learning needs
const filteredApprovedLearningNeeds = approvedLearningNeeds
  .filter((learningNeed) =>
    (learningNeed.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.datePosted) - new Date(b.datePosted);
    } else {
      return new Date(b.datePosted) - new Date(a.datePosted);
    }
  });

// Filter and sort unapproved learning needs
const filteredUnapprovedLearningNeeds = unapprovedLearningNeeds
  .filter((learningNeed) =>
    (learningNeed.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.datePosted) - new Date(b.datePosted);
    } else {
      return new Date(b.datePosted) - new Date(a.datePosted);
    }
  });



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

        <div className="flex flex-col space-y-6 w-3/5">
          {/* Selected Learning Needs Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Selected Learning Needs (Approved)</h2>
            {filteredApprovedLearningNeeds.length > 0 ? (
              filteredApprovedLearningNeeds.map((learningNeed) => (
                <div key={`${learningNeed.id}-${learningNeed.datePosted}`} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{learningNeed.name}</h3>
                    <p className="text-sm text-gray-600">{learningNeed.need}</p>
                    <p className="text-gray-700">{new Date(learningNeed.datePosted).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => toggleApprovalStatus(learningNeed)}
                    className="ml-4 text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                  >
                    Unapprove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No approved learning needs.</p>
            )}
          </div>

          {/* Unselected Learning Needs Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Unselected Learning Needs (Unapproved)</h2>
            {filteredUnapprovedLearningNeeds.length > 0 ? (
              filteredUnapprovedLearningNeeds.map((learningNeed) => (
                <div key={learningNeed.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{learningNeed.name}</h3>
                    <p className="text-sm text-gray-600">{learningNeed.need}</p>
                    <p className="text-gray-700">{new Date(learningNeed.datePosted).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => toggleApprovalStatus(learningNeed)}
                    className="ml-4 text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                  >
                    Approve
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No unapproved learning needs.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningNeedsView;
