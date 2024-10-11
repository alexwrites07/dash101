import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios
import { HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const InstituteProfileView = () => {
  const [allInstitutes, setAllInstitutes] = useState([]);
  const [filteredInstitutes, setFilteredInstitutes] = useState([]);
  const [selectedInstitutes, setSelectedInstitutes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDescription, setFilterDescription] = useState('');

  // Fetch featured organizations data from the backend
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get('https://backend.akshayy.tech/featured-organizations');
        const institutes = response.data.map((institute, index) => ({
          id: index + 1, // Assign an id based on index
          name: institute.name,
          category: institute.category || 'Unknown', // Fallback if no category
          description: institute.description || 'No description available',
          subjectsRequired: institute.subjectsRequired.join(', '),
          address: institute.location.address,
        }));
        setAllInstitutes(institutes);
        setFilteredInstitutes(institutes);
      } catch (error) {
        console.error('Error fetching institutes:', error);
      }
    };

    fetchInstitutes();
  }, []);

  useEffect(() => {
    const filtered = allInstitutes.filter(institute => {
      const matchesSearch = institute.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory ? institute.category === filterCategory : true;
      const matchesDescription = filterDescription ? institute.description.toLowerCase().includes(filterDescription.toLowerCase()) : true;
      return matchesSearch && matchesCategory && matchesDescription;
    });

    const sorted = filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredInstitutes(sorted);
  }, [searchQuery, filterCategory, filterDescription, sortOrder, allInstitutes]);

  const addToSelected = (institute) => {
    setSelectedInstitutes([...selectedInstitutes, institute]);
    setFilteredInstitutes(filteredInstitutes.filter(i => i.id !== institute.id));
  };

  const removeFromSelected = (institute) => {
    setFilteredInstitutes([...filteredInstitutes, institute]);
    setSelectedInstitutes(selectedInstitutes.filter(i => i.id !== institute.id));
  };

  return (
    <div className="md:ml-24">
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Sidebar />
        <div className="flex flex-col w-3/5 space-y-4 mb-6">
          <Header />
          <div className="flex items-center space-x-4 mb-4">
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
              placeholder="Search by name..."
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Educational">Educational</option>
            </select>
            <input
              type="text"
              value={filterDescription}
              onChange={(e) => setFilterDescription(e.target.value)}
              placeholder="Filter by description..."
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-6">
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
              {filteredInstitutes.length > 0 ? (
                filteredInstitutes.map(institute => (
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
    </div>
  );
};

export default InstituteProfileView;
