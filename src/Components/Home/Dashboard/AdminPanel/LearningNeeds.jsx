import React, { useState, useEffect } from 'react';
import { HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';
import axios from 'axios';

const LearningNeedsView = () => {
  const [allLearningNeeds, setAllLearningNeeds] = useState([]); // Initially no learning needs
  const [selectedLearningNeeds, setSelectedLearningNeeds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTc4YjI3ODk0NzIzMzUzZTZiNyIsImlhdCI6MTcyNTAwODI0NH0.6L0lN2fHK-iccGsEAbSQAr2GY1Bca9tWqkDQdAtIan8'; // Use the provided token

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
          id: need._id,
          name: need.email, // Use email as the name placeholder
          need: need.requirement,
          location: need.location,
          datePosted: need.createdAt,
          salary: need.salary.max,
          board: need.board,
          genderPreference: need.genderPreference,
          available: need.available,
          isApproved: need.isApproved, // Track approval status
        }));

        setAllLearningNeeds(fetchedNeeds);
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
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Add learning need to selected
  const addToSelected = (learningNeed) => {
    setSelectedLearningNeeds([...selectedLearningNeeds, learningNeed]);
    setAllLearningNeeds(allLearningNeeds.filter(ln => ln.id !== learningNeed.id));
  };

  // Remove learning need from selected
  const removeFromSelected = (learningNeed) => {
    setAllLearningNeeds([...allLearningNeeds, learningNeed]);
    setSelectedLearningNeeds(selectedLearningNeeds.filter(ln => ln.id !== learningNeed.id));
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

      // Update the learning need in the list with the new approval status
      const updatedLearningNeeds = allLearningNeeds.map((ln) =>
        ln.id === updatedNeed._id ? { ...ln, isApproved: updatedNeed.isApproved } : ln
      );

      setAllLearningNeeds(updatedLearningNeeds);

      console.log(response.data.message);
    } catch (error) {
      console.error('Error toggling approval status:', error);
    }
  };

  // Filter and sort learning needs
  const filteredLearningNeeds = allLearningNeeds
    .filter((learningNeed) =>
      learningNeed.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
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
            <h2 className="text-2xl font-semibold">Selected Learning Needs</h2>
            {selectedLearningNeeds.length > 0 ? (
              selectedLearningNeeds.map((learningNeed) => (
                <div key={learningNeed.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{learningNeed.name}</h3>
                    <p className="text-sm text-gray-600">{learningNeed.need}</p>
                    <p className="text-gray-700">{new Date(learningNeed.datePosted).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => removeFromSelected(learningNeed)}
                    className="ml-4 text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No selected learning needs.</p>
            )}
          </div>

          {/* Unselected Learning Needs Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Unselected Learning Needs</h2>
            {filteredLearningNeeds.length > 0 ? (
              filteredLearningNeeds.map((learningNeed) => (
                <div key={learningNeed.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{learningNeed.name}</h3>
                    <p className="text-sm text-gray-600">{learningNeed.need}</p>
                    <p className="text-gray-700">{new Date(learningNeed.datePosted).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => toggleApprovalStatus(learningNeed)}
                    className={`ml-4 px-3 py-2 rounded-md ${
                      learningNeed.isApproved
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {learningNeed.isApproved ? 'Unapprove' : 'Approve'}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No unselected learning needs.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningNeedsView;
