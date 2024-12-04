import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiSearch, HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const JobPostPage = () => {
  const [allJobPosts, setAllJobPosts] = useState([]);
  const [filteredJobPosts, setFilteredJobPosts] = useState([]);
  const [selectedJobPosts, setSelectedJobPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterJobType, setFilterJobType] = useState('');
  const [filterExperienceLevel, setFilterExperienceLevel] = useState('');
  const [filterCareerLevel, setFilterCareerLevel] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');

  const token = localStorage.getItem('token'); // Get the token from localStorage

  useEffect(() => {
    // Fetch the job posts from the API
    const fetchJobPosts = async () => {
      try {
        const response = await axios.get('https://server.avyudha.com/featured-jobs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllJobPosts(response.data); // Set the fetched data
        setFilteredJobPosts(response.data); // Initialize the filtered posts
      } catch (error) {
        console.error('Error fetching job posts:', error);
      }
    };

    fetchJobPosts();
  }, [token]);

  useEffect(() => {
    // Filtering logic
    const filtered = allJobPosts.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            job.location.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = filterLocation ? job.location.city === filterLocation : true;
      const matchesExperience = filterExperienceLevel ? job.experience === filterExperienceLevel : true;
      const matchesCareerLevel = filterCareerLevel ? job.careerLevel === filterCareerLevel : true;
      const matchesSalary = (minSalary ? job.salary.min >= minSalary : true) && (maxSalary ? job.salary.max <= maxSalary : true);

      return matchesSearch && matchesLocation && matchesExperience && matchesCareerLevel && matchesSalary;
    });

    const sorted = filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setFilteredJobPosts(sorted);
  }, [searchQuery, filterLocation, filterExperienceLevel, filterCareerLevel, minSalary, maxSalary, sortOrder, allJobPosts]);

  const addToSelected = (job) => {
    setSelectedJobPosts([...selectedJobPosts, job]);
    setFilteredJobPosts(filteredJobPosts.filter(j => j._id !== job._id));
  };

  const removeFromSelected = (job) => {
    setSelectedJobPosts(selectedJobPosts.filter(j => j._id !== job._id));
    setFilteredJobPosts([...filteredJobPosts, job]);
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
            placeholder="Search job posts..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Locations</option>
            {allJobPosts.map(job => (
              <option key={job._id} value={job.location.city}>{job.location.city}</option>
            ))}
          </select>
        </div>

        {/* Additional Filters */}
        <div className="flex justify-between w-3/5 space-x-4 mb-6">
          <input
            type="text"
            value={filterExperienceLevel}
            onChange={(e) => setFilterExperienceLevel(e.target.value)}
            placeholder="Experience Level"
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={filterCareerLevel}
            onChange={(e) => setFilterCareerLevel(e.target.value)}
            placeholder="Career Level"
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            placeholder="Min Salary"
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            placeholder="Max Salary"
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-6 w-3/5">
          {/* Selected Job Posts Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Selected Job Posts</h2>
            {selectedJobPosts.length > 0 ? (
              selectedJobPosts.map(job => (
                <div key={job._id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.location.city}</p>
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
            {filteredJobPosts.length > 0 ? (
              filteredJobPosts.map(job => (
                <div key={job._id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <div className="flex w-full justify-between space-x-4">
                    <h3 className="text-lg font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.location.city}</p>
                    <p className="text-gray-700 truncate">{job.description}</p>
                  </div>
                  <button
                    onClick={() => addToSelected(job)}
                    className="ml-4 text-white bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No job posts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostPage;
