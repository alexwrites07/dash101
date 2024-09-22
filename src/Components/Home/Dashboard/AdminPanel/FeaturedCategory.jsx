import React, { useState, useEffect } from 'react';
import { HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const FeaturedCategoryPage = () => {
  const [allCategories, setAllCategories] = useState([
    { id: 1, type: 'Coaching', position: '10 Openings', location: 'New York', description: 'Coaching center for SAT preparation.' },
    { id: 2, type: 'School', position: '5 Openings', location: 'Remote', description: 'Online school offering K-12 education.' },
    { id: 3, type: 'Coaching', position: '8 Openings', location: 'San Francisco', description: 'Coaching center for GRE preparation.' },
    { id: 4, type: 'School', position: '3 Openings', location: 'Los Angeles', description: 'Private school with a focus on STEM education.' },
  ]);

  const [filteredCategories, setFilteredCategories] = useState(allCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterDescription, setFilterDescription] = useState('');

  useEffect(() => {
    const filtered = allCategories.filter(category => {
      const matchesSearch = 
        category.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType ? category.type === filterType : true;
      const matchesLocation = filterLocation ? category.location === filterLocation : true;
      const matchesPosition = filterPosition ? category.position.toLowerCase().includes(filterPosition.toLowerCase()) : true;
      const matchesDescription = filterDescription ? category.description.toLowerCase().includes(filterDescription.toLowerCase()) : true;

      return matchesSearch && matchesType && matchesLocation && matchesPosition && matchesDescription;
    });

    const sorted = filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.type.localeCompare(b.type);
      } else {
        return b.type.localeCompare(a.type);
      }
    });

    setFilteredCategories(sorted);
  }, [searchQuery, filterType, filterLocation, filterPosition, filterDescription, sortOrder, allCategories]);

  const addToSelected = (category) => {
    setSelectedCategories([...selectedCategories, category]);
    setFilteredCategories(filteredCategories.filter(c => c.id !== category.id));
  };

  const removeFromSelected = (category) => {
    setFilteredCategories([...filteredCategories, category]);
    setSelectedCategories(selectedCategories.filter(c => c.id !== category.id));
  };

  return (
    <div className="md:ml-24">
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Sidebar />
        <div className="flex flex-col w-3/5 space-y-4 mb-6">
          <Header />
          <div className="flex items-center gap-4 mb-4 flex-wrap">
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
              placeholder="Search categories..."
              className="px-4 py-2 border border-gray-300 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
              placeholder="Filter by position..."
              className="px-4 py-2 border border-gray-300 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={filterDescription}
              onChange={(e) => setFilterDescription(e.target.value)}
              placeholder="Filter by description..."
              className="px-4 py-2 border border-gray-300 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="Coaching">Coaching</option>
              <option value="School">School</option>
            </select>
            <select
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              <option value="New York">New York</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className="flex flex-col space-y-6">
            {/* Selected Categories Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Selected Categories</h2>
              {selectedCategories.length > 0 ? (
                selectedCategories.map(category => (
                  <div key={category.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                    <div className="flex w-full justify-between space-x-4">
                      <h3 className="text-lg font-medium">{category.type}</h3>
                      <p className="text-sm text-gray-600">{category.position}</p>
                      <p className="text-gray-700 truncate">{category.description}</p>
                    </div>
                    <button
                      onClick={() => removeFromSelected(category)}
                      className="ml-4 text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No selected categories.</p>
              )}
            </div>

            {/* Unselected Categories Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Unselected Categories</h2>
              {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
                  <div key={category.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                    <div className="flex w-full justify-between space-x-4">
                      <h3 className="text-lg font-medium">{category.type}</h3>
                      <p className="text-sm text-gray-600">{category.position}</p>
                      <p className="text-gray-700 truncate">{category.description}</p>
                    </div>
                    <button
                      onClick={() => addToSelected(category)}
                      className="ml-4 text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                    >
                      Add
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No unselected categories.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategoryPage;
