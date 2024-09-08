import React, { useState, useEffect } from 'react';
import { HiSearch, HiSortAscending, HiFilter } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const EmployerProfileView = () => {
  const [allEmployers, setAllEmployers] = useState([
    { id: 1, name: 'Dunder Mifflin', industry: 'Paper Manufacturing', description: 'Leading provider of paper products.' },
    { id: 2, name: 'Scranton Business Park', industry: 'Real Estate', description: 'Commercial real estate company.' },
    { id: 3, name: 'Vance Refrigeration', industry: 'HVAC', description: 'Specializes in HVAC systems and services.' },
    { id: 4, name: 'Athlead', industry: 'Sports Management', description: 'Sports talent management and marketing.' },
  ]);

  const [selectedEmployers, setSelectedEmployers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterIndustry, setFilterIndustry] = useState('');

  useEffect(() => {
    const filteredEmployers = allEmployers.filter(employer => {
      const matchesSearch = employer.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterIndustry ? employer.industry === filterIndustry : true;
      return matchesSearch && matchesFilter;
    });

    const sortedEmployers = filteredEmployers.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setAllEmployers(sortedEmployers);
  }, [searchQuery, filterIndustry, sortOrder]);

  const addToSelected = (employer) => {
    setSelectedEmployers([...selectedEmployers, employer]);
    setAllEmployers(allEmployers.filter(e => e.id !== employer.id));
  };

  const removeFromSelected = (employer) => {
    setAllEmployers([...allEmployers, employer]);
    setSelectedEmployers(selectedEmployers.filter(e => e.id !== employer.id));
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
            <span>Sort</span>
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employers..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Industries</option>
            <option value="Paper Manufacturing">Paper Manufacturing</option>
            <option value="Real Estate">Real Estate</option>
            <option value="HVAC">HVAC</option>
            <option value="Sports Management">Sports Management</option>
          </select>
        </div>

        <div className="flex flex-col space-y-6 w-3/5">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Selected Employers</h2>
            {selectedEmployers.length > 0 ? (
              selectedEmployers.map(employer => (
                <div key={employer.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{employer.name}</h3>
                    <p className="text-sm text-gray-600">{employer.industry}</p>
                    <p className="text-gray-700 truncate">{employer.description}</p>
                  </div>
                  <button
                    onClick={() => removeFromSelected(employer)}
                    className="ml-4 text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No selected employers.</p>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Unselected Employers</h2>
            {allEmployers.length > 0 ? (
              allEmployers.map(employer => (
                <div key={employer.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{employer.name}</h3>
                    <p className="text-sm text-gray-600">{employer.industry}</p>
                    <p className="text-gray-700 truncate">{employer.description}</p>
                  </div>
                  <button
                    onClick={() => addToSelected(employer)}
                    className="ml-4 text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No unselected employers.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileView;
