import React, { useState } from 'react';
import GoogleMap2 from './GoogleMap';

const JobPost = () => {
  const [jobs, setJobs] = useState([
    {
      company: 'Example Company 1',
      duration: 'Full-time',
      postingTime: '1 day ago',
      location: 'New York, NY',
      role: 'Coaching',
      stipend: '$80,000 - $100,000',
    },
    {
      company: 'Example Company 2',
      duration: 'Part-time',
      postingTime: '2 days ago',
      location: 'San Francisco, CA',
      role: 'Private Tutor',
      stipend: '$60,000 - $80,000',
    },
    {
      company: 'Example Company 3',
      duration: 'Contract',
      postingTime: '3 days ago',
      location: 'Chicago, IL',
      role: 'Professor',
      stipend: '$70,000 - $90,000',
    },
    {
      company: 'Example Company 4',
      duration: 'Remote',
      postingTime: '4 days ago',
      location: 'Los Angeles, CA',
      role: 'Teacher',
      stipend: '$75,000 - $95,000',
    },
    {
      company: 'Example Company 5',
      duration: 'Full-time',
      postingTime: '5 days ago',
      location: 'Boston, MA',
      role: 'Software Developer',
      stipend: '$85,000 - $110,000',
    },
    {
      company: 'Example Company 6',
      duration: 'Part-time',
      postingTime: '6 days ago',
      location: 'Austin, TX',
      role: 'Data Scientist',
      stipend: '$70,000 - $90,000',
    },
  ]);

  const [sortBy, setSortBy] = useState('date'); // Default sort by date
  const [showAll, setShowAll] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    category: '',
    jobType: '',
  });

  const maxVisibleJobs = 5;

  const toggleShowMore = () => {
    setShowAll(!showAll);
  };

  const sortJobs = (criteria) => {
    let sortedJobs = [...jobs];
    switch (criteria) {
      case 'date':
        sortedJobs.sort((a, b) => new Date(b.postingTime) - new Date(a.postingTime));
        break;
      case 'role':
        sortedJobs.sort((a, b) => a.role.localeCompare(b.role));
        break;
      case 'stipend':
        sortedJobs.sort((a, b) => {
          const aStipend = parseInt(a.stipend.replace(/[^0-9.-]+/g, ''));
          const bStipend = parseInt(b.stipend.replace(/[^0-9.-]+/g, ''));
          return aStipend - bStipend;
        });
        break;
      default:
        break;
    }
    setJobs(sortedJobs);
    setSortBy(criteria);
  };

  const visibleJobs = showAll ? jobs : jobs.slice(0, maxVisibleJobs);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.keyword === '' || job.role.toLowerCase().includes(filters.keyword.toLowerCase())) &&
      (filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.category === '' || job.role.toLowerCase().includes(filters.category.toLowerCase())) &&
      (filters.jobType === '' || job.duration.toLowerCase().includes(filters.jobType.toLowerCase()))
    );
  });

  return (
    <div className="max-w-full mx-auto flex" style={{ margin: '6% 4% 0 4%' }}>
      {/* Sidebar for Filters */}
        <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-lg mr-6">
        <h2 className="text-2xl text-[#041F96] font-bold mb-4">Filter Jobs</h2>
        
        {/* Keyword Filter */}
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="keyword">Keyword</label>
            <input
            type="text"
            name="keyword"
            id="keyword"
            value={filters.keyword}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg"
            />
        </div>
        
        {/* Location Filter */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
          <a href="/googlemap" className="font-medium text-primary-600 hover:underline"><button
              className="bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-[#041F96] focus:outline-none">Enter Location</button></a>
        </div>
        
        
        {/* Category Filter */}
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
            <input
            type="text"
            name="category"
            id="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg"
            />
        </div>
        
        {/* Job Type Filter */}
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobType">Job Type</label>
            <select
            name="jobType"
            id="jobType"
            value={filters.jobType}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg"
            >
            <option value="">All</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
            </select>
        </div>
        
        {/* Date Posted Filter */}
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="datePosted">Date Posted</label>
            <select
            name="datePosted"
            id="datePosted"
            value={filters.datePosted}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg"
            >
            <option value="">All</option>
            <option value="last24hours">Last 24 hours</option>
            <option value="last7days">Last 7 days</option>
            <option value="last14days">Last 14 days</option>
            <option value="last30days">Last 30 days</option>
            </select>
        </div>
        
        {/* Experience Level Filter */}
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experienceLevel">Experience Level</label>
            <select
            name="experienceLevel"
            id="experienceLevel"
            value={filters.experienceLevel}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg"
            >
            <option value="">All</option>
            <option value="entry">Entry</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
            </select>
        </div>
        
        {/* Career Level Filter */}
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="careerLevel">Career Level</label>
            <select
            name="careerLevel"
            id="careerLevel"
            value={filters.careerLevel}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg"
            >
            <option value="">All</option>
            <option value="internship">Internship</option>
            <option value="entry-level">Entry Level</option>
            <option value="mid-level">Mid Level</option>
            <option value="senior-level">Senior Level</option>
            <option value="executive">Executive</option>
            </select>
        </div>
        
        {/* Salary Filter */}
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">Salary Range</label>
            <div className="flex space-x-2">
            <input
                type="number"
                name="minSalary"
                id="minSalary"
                value={filters.minSalary}
                onChange={handleFilterChange}
                className="w-1/2 px-3 py-2 border rounded-lg"
                placeholder="Min"
            />
            <input
                type="number"
                name="maxSalary"
                id="maxSalary"
                value={filters.maxSalary}
                onChange={handleFilterChange}
                className="w-1/2 px-3 py-2 border rounded-lg"
                placeholder="Max"
            />
            </div>
        </div>
        </div>


      {/* Main Content */}
      <div className="flex-1">
        <h2 className="text-3xl text-[#041F96] font-bold mb-4">Jobs Post</h2>

        {/* Sorting Options */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <span className={`cursor-pointer ${sortBy === 'date' ? 'font-semibold' : ''}`} onClick={() => sortJobs('date')}>Sort by Date</span>
            <span className={`cursor-pointer ${sortBy === 'role' ? 'font-semibold' : ''}`} onClick={() => sortJobs('role')}>Sort by Role</span>
            <span className={`cursor-pointer ${sortBy === 'stipend' ? 'font-semibold' : ''}`} onClick={() => sortJobs('stipend')}>Sort by Stipend</span>
          </div>
        </div>

        {/* Job Listings */}
        {filteredJobs.slice(0, visibleJobs.length).map((job, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:flex-1">
                <h3 className="text-xl font-semibold text-[#041F96] mb-2">{job.role}</h3>
                <p className="text-sm text-gray-600 mb-2">{job.company}</p>
              </div>
              <div className="md:flex-1 flex justify-between mt-4 md:mt-0">
                <p className="text-sm text-gray-600">{job.duration}</p>
                <p className="text-sm text-gray-600">{job.postingTime}</p>
                <p className="text-sm text-gray-600">{job.location}</p>
                <p className="text-sm text-gray-600">{job.stipend}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="mb-4">
        {!showAll && filteredJobs.length > maxVisibleJobs && (
          <button
            className="bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-[#041F96] focus:outline-none"
            onClick={toggleShowMore}
          >
            Show More
          </button>
        )}
        {showAll && (
          <button
            className="bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-[#041F96] focus:outline-none"
            onClick={toggleShowMore}
          >
            Show Less
          </button>
        )}
        </div>
      </div>
    </div>
  );
};

export default JobPost;
