import React, { useState, useEffect } from 'react';
import { HiSearch, HiSortAscending, HiFilter } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const InstituteProfileView = () => {
  const [allInstitutes, setAllInstitutes] = useState([
    { id: 1, name: 'ABC Institute', category: 'Engineering', description: 'Leading institute in technology.' },
    { id: 2, name: 'XYZ Academy', category: 'Medical', description: 'Top-notch medical coaching.' },
    { id: 3, name: '123 Learning Center', category: 'Commerce', description: 'Excellence in commerce education.' },
    { id: 4, name: 'DEF Coaching', category: 'Arts', description: 'Focus on creativity and arts.' },
  ]);

  const [selectedInstitutes, setSelectedInstitutes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const filteredInstitutes = allInstitutes.filter(institute => {
      const matchesSearch = institute.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterCategory ? institute.category === filterCategory : true;
      return matchesSearch && matchesFilter;
    });

    const sortedInstitutes = filteredInstitutes.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setAllInstitutes(sortedInstitutes);
  }, [searchQuery, filterCategory, sortOrder]);

  const addToSelected = (institute) => {
    setSelectedInstitutes([...selectedInstitutes, institute]);
    setAllInstitutes(allInstitutes.filter(i => i.id !== institute.id));
  };

  const removeFromSelected = (institute) => {
    setAllInstitutes([...allInstitutes, institute]);
    setSelectedInstitutes(selectedInstitutes.filter(i => i.id !== institute.id));
  };

  return (
    <div className="md:ml-24">
      <div className="flex flex-col items-center p-6 space-y-6  mt-24">
        {/* Selected Posts Section */}
        <Sidebar />
        <div className="flex justify-between w-3/5 space-x-4 mb-6">
          <Header />
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <HiSortAscending className="w-6 h-6" />
            <span>Sort</span>
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search institutes..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Engineering">Engineering</option>
            <option value="Medical">Medical</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
          </select>
        </div>

        <div className="flex flex-col space-y-6 w-3/5">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Selected Institutes</h2>
            {selectedInstitutes.length > 0 ? (
              selectedInstitutes.map(institute => (
                <div key={institute.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{institute.name}</h3>
                    <p className="text-sm text-gray-600">{institute.category}</p>
                    <p className="text-gray-700 truncate">{institute.description}</p>
                  </div>
                  <button
                    onClick={() => removeFromSelected(institute)}
                    className="ml-4 text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No selected institutes.</p>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Unselected Institutes</h2>
            {allInstitutes.length > 0 ? (
              allInstitutes.map(institute => (
                <div key={institute.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{institute.name}</h3>
                    <p className="text-sm text-gray-600">{institute.category}</p>
                    <p className="text-gray-700 truncate">{institute.description}</p>
                  </div>
                  <button
                    onClick={() => addToSelected(institute)}
                    className="ml-4 text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No unselected institutes.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteProfileView;
