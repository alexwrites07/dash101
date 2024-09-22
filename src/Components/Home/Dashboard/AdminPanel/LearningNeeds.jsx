import React, { useState, useEffect } from 'react';
import { HiSearch, HiSortAscending, HiFilter } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const LearningNeedsView = () => {
  const [allLearningNeeds, setAllLearningNeeds] = useState([
    { id: 1, name: 'John Doe', need: 'Needs help with Algebra', datePosted: '2023-08-01' },
    { id: 2, name: 'Jane Smith', need: 'Looking for a tutor in Chemistry', datePosted: '2023-07-30' },
    { id: 3, name: 'Alex Johnson', need: 'Wants to improve English writing skills', datePosted: '2023-07-29' },
    { id: 4, name: 'Emily Davis', need: 'Interested in learning History of Ancient Rome', datePosted: '2023-08-03' },
  ]);

  const [selectedLearningNeeds, setSelectedLearningNeeds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const filteredLearningNeeds = allLearningNeeds.filter(learningNeed => {
      const matchesSearch = learningNeed.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });

    const sortedLearningNeeds = filteredLearningNeeds.sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.datePosted) - new Date(b.datePosted);
      } else {
        return new Date(b.datePosted) - new Date(a.datePosted);
      }
    });

    setAllLearningNeeds(sortedLearningNeeds);
  }, [searchQuery, sortOrder]);

  const addToSelected = (learningNeed) => {
    setSelectedLearningNeeds([...selectedLearningNeeds, learningNeed]);
    setAllLearningNeeds(allLearningNeeds.filter(ln => ln.id !== learningNeed.id));
  };

  const removeFromSelected = (learningNeed) => {
    setAllLearningNeeds([...allLearningNeeds, learningNeed]);
    setSelectedLearningNeeds(selectedLearningNeeds.filter(ln => ln.id !== learningNeed.id));
  };

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
            <span>Sort </span>
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-6 w-3/5">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Selected Learning Needs</h2>
            {selectedLearningNeeds.length > 0 ? (
              selectedLearningNeeds.map(learningNeed => (
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

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Unselected Learning Needs</h2>
            {allLearningNeeds.length > 0 ? (
              allLearningNeeds.map(learningNeed => (
                <div key={learningNeed.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{learningNeed.name}</h3>
                    <p className="text-sm text-gray-600">{learningNeed.need}</p>
                    <p className="text-gray-700">{new Date(learningNeed.datePosted).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => addToSelected(learningNeed)}
                    className="ml-4 text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                  >
                    Add
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
