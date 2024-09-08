import React, { useState, useEffect } from 'react';
import { HiSearch, HiSortAscending, HiFilter } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const JobPostPage = () => {
  const [allJobPosts, setAllJobPosts] = useState([
    { id: 1, title: 'Software Engineer', company: 'Tech Corp', location: 'New York', description: 'Develop and maintain software applications.' },
    { id: 2, title: 'Data Scientist', company: 'Data Inc', location: 'San Francisco', description: 'Analyze and interpret complex data sets.' },
    { id: 3, title: 'Product Manager', company: 'Innovate Ltd', location: 'Los Angeles', description: 'Lead product development and strategy.' },
    { id: 4, title: 'UX Designer', company: 'DesignWorks', location: 'Chicago', description: 'Create user-friendly designs and interfaces.' },
  ]);

  const [selectedJobPosts, setSelectedJobPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    const filteredJobPosts = allJobPosts.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterLocation ? job.location === filterLocation : true;
      return matchesSearch && matchesFilter;
    });

    const sortedJobPosts = filteredJobPosts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setAllJobPosts(sortedJobPosts);
  }, [searchQuery, filterLocation, sortOrder]);

  const addToSelected = (job) => {
    setSelectedJobPosts([...selectedJobPosts, job]);
    setAllJobPosts(allJobPosts.filter(j => j.id !== job.id));
  };

  const removeFromSelected = (job) => {
    setAllJobPosts([...allJobPosts, job]);
    setSelectedJobPosts(selectedJobPosts.filter(j => j.id !== job.id));
  };

  return (
    <div className="md:ml-24">
      <div className="flex flex-col items-center p-6 space-y-6  mt-24">
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
            placeholder="Search job posts..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Locations</option>
            <option value="New York">New York</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>

        <div className="flex flex-col space-y-6 w-3/5">
          {/* Selected Job Posts Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Selected Job Posts</h2>
            {selectedJobPosts.length > 0 ? (
              selectedJobPosts.map(job => (
                <div key={job.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <p className="text-gray-700 truncate">{job.description}</p>
                  </div>
                  <button
                    onClick={() => removeFromSelected(job)}
                    className="ml-4 text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No selected job posts.</p>
            )}
          </div>

          {/* Unselected Job Posts Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Unselected Job Posts</h2>
            {allJobPosts.length > 0 ? (
              allJobPosts.map(job => (
                <div key={job.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <p className="text-gray-700 truncate">{job.description}</p>
                  </div>
                  <button
                    onClick={() => addToSelected(job)}
                    className="ml-4 text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No unselected job posts.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostPage;
