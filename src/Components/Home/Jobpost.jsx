import React, { useState } from 'react';
import { HiFilter } from 'react-icons/hi';

const JobPost = () => {
  const [jobs, setJobs] = useState([
    {
      company: 'Example Company 1',
      duration: 'Full-time',
      postingTime: '1 day ago',
      location: 'New York, NY',
      role: 'Coaching',
      stipend: '$80,000 - $100,000',
      experienceLevel: '4+ years',
      careerLevel: 'Senior',
      profilePic: 'https://static.wixstatic.com/media/5a2bf8_4efbddfdec0c49ed94d0dbf3168d6863~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PROFILE%20LOGO%20white%20letter.png',
    },
    {
      company: 'Example Company 2',
      duration: 'Part-time',
      postingTime: '2 days ago',
      location: 'San Francisco, CA',
      role: 'Private Tutor',
      stipend: '$60,000 - $80,000',
      experienceLevel: '4+ years',
      careerLevel: 'Junior',
      profilePic: 'https://static.wixstatic.com/media/5a2bf8_4efbddfdec0c49ed94d0dbf3168d6863~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PROFILE%20LOGO%20white%20letter.png',
    },
    {
      company: 'Example Company 3',
      duration: 'Contract',
      postingTime: '3 days ago',
      location: 'Chicago, IL',
      role: 'Professor',
      stipend: '$70,000 - $90,000',
      experienceLevel: '2-4 years',
      careerLevel: 'Senior',
      profilePic: 'https://static.wixstatic.com/media/5a2bf8_4efbddfdec0c49ed94d0dbf3168d6863~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PROFILE%20LOGO%20white%20letter.png',
    },
    {
      company: 'Example Company 4',
      duration: 'Remote',
      postingTime: '4 days ago',
      location: 'Los Angeles, CA',
      role: 'Teacher',
      stipend: '$75,000 - $95,000',
      experienceLevel: '2-4 years',
      careerLevel: 'Mid',
      profilePic: 'https://static.wixstatic.com/media/5a2bf8_4efbddfdec0c49ed94d0dbf3168d6863~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PROFILE%20LOGO%20white%20letter.png',
    },
    {
      company: 'Example Company 5',
      duration: 'Full-time',
      postingTime: '5 days ago',
      location: 'Boston, MA',
      role: 'Software Developer',
      stipend: '$85,000 - $110,000',
      experienceLevel: '2-4 years',
      careerLevel: 'Senior',
      profilePic: 'https://static.wixstatic.com/media/5a2bf8_4efbddfdec0c49ed94d0dbf3168d6863~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PROFILE%20LOGO%20white%20letter.png',
    },
    {
      company: 'Example Company 6',
      duration: 'Part-time',
      postingTime: '6 days ago',
      location: 'Austin, TX',
      role: 'Data Scientist',
      stipend: '$70,000 - $90,000',
      experienceLevel: '0-1 years',
      careerLevel: 'Junior',
      profilePic: 'https://static.wixstatic.com/media/5a2bf8_4efbddfdec0c49ed94d0dbf3168d6863~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PROFILE%20LOGO%20white%20letter.png',
    },
  ]);

  const [sortBy, setSortBy] = useState('date'); // Default sort by date
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    category: '',
    jobType: '',
    datePosted: '',
    experienceLevel: '',
    careerLevel: '',
    minSalary: '',
    maxSalary: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false); // State for showing/hiding filters
  const jobsPerPage = 5;

  const parsePostingTime = (postingTime) => {
    const now = new Date();
    const timeMapping = {
      day: 24 * 60 * 60 * 1000,
      days: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      hours: 60 * 60 * 1000,
      minute: 60 * 1000,
      minutes: 60 * 1000,
    };

    const [amount, unit] = postingTime.split(' ');
    return new Date(now - amount * timeMapping[unit]);
  };

  const sortJobs = (criteria) => {
    let sortedJobs = [...jobs];
    switch (criteria) {
      case 'date':
        sortedJobs.sort((a, b) => parsePostingTime(b.postingTime) - parsePostingTime(a.postingTime));
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredJobs = jobs.filter((job) => {
    const now = new Date();
    const { keyword, location, category, jobType, datePosted, experienceLevel, careerLevel, minSalary, maxSalary } = filters;

    let isMatch = true;

    if (keyword && !job.role.toLowerCase().includes(keyword.toLowerCase())) isMatch = false;
    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) isMatch = false;
    if (category && !job.role.toLowerCase().includes(category.toLowerCase())) isMatch = false;
    if (jobType && !job.duration.toLowerCase().includes(jobType.toLowerCase())) isMatch = false;

    if (datePosted) {
      const jobPostingDate = parsePostingTime(job.postingTime);
      let filterDate;
      switch (datePosted) {
        case 'last24hours':
          filterDate = new Date(now - 24 * 60 * 60 * 1000);
          break;
        case 'last7days':
          filterDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'last14days':
          filterDate = new Date(now - 14 * 24 * 60 * 60 * 1000);
          break;
        case 'last30days':
          filterDate = new Date(now - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          filterDate = new Date(0);
          break;
      }
      if (jobPostingDate < filterDate) isMatch = false;
    }

    if (experienceLevel && !job.experienceLevel.toLowerCase().includes(experienceLevel.toLowerCase())) isMatch = false;
    if (careerLevel && !job.careerLevel.toLowerCase().includes(careerLevel.toLowerCase())) isMatch = false;

    if (minSalary) {
      const jobMinStipend = parseInt(job.stipend.replace(/[^0-9.-]+/g, ''));
      if (jobMinStipend < minSalary) isMatch = false;
    }
    if (maxSalary) {
      const jobMaxStipend = parseInt(job.stipend.replace(/[^0-9.-]+/g, ''));
      if (jobMaxStipend > maxSalary) isMatch = false;
    }

    return isMatch;
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const visibleJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-full mx-auto flex flex-col md:flex-row" style={{ margin: '6% 4% 0 4%' }}>
      {/* Sidebar for Filters (Hidden on Small Screens) */}
      <div className="md:hidden w-full flex justify-end mb-6">
  <button
    onClick={() => setShowFilters(!showFilters)}
    className="text-white px-4 py-2 rounded-lg bg-[#041F96] focus:outline-non"
  >
    <HiFilter className="w-4 h-4" />
  </button>
</div>
      <div className={`md:block md:w-1/4 p-4 bg-gray-100 rounded-lg shadow-lg mb-6 md:mr-6 ${showFilters ? '' : 'hidden'}`} style={{ height: 'fit-content' }}>
        <form className="space-y-4">
          {/* Filters */}
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
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
              <option value="">Select Job Type</option>
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
              <option value="">Anytime</option>
              <option value="last24hours">Last 24 hours</option>
              <option value="last7days">Last 7 days</option>
              <option value="last14days">Last 14 days</option>
              <option value="last30days">Last 30 days</option>
            </select>
          </div>

          {/* Experience Level Filter */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experienceLevel">Experience Level</label>
            <input
              type="text"
              name="experienceLevel"
              id="experienceLevel"
              value={filters.experienceLevel}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Career Level Filter */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="careerLevel">Career Level</label>
            <input
              type="text"
              name="careerLevel"
              id="careerLevel"
              value={filters.careerLevel}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Salary Range Filter */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salaryRange">Salary Range</label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="minSalary"
                id="minSalary"
                placeholder="Min"
                value={filters.minSalary}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="number"
                name="maxSalary"
                id="maxSalary"
                placeholder="Max"
                value={filters.maxSalary}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Apply Filters Button */}
          <button
            type="button"
            onClick={() => setShowFilters(false)}
            className="w-full bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none"
          >
            Apply Filters
          </button>
        </form>
      </div>

      {/* Button for Small Screens */}
  


      {/* Jobs List */}
      <div className="w-full ">
        {/* Jobs header */}
        <div className="flex items-center justify-between mb-4">
         
          <div className="w-full">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold text-[#041F96] mb-6">Available Jobs</h1>
          <div className="flex items-center">
            <label className="mr-2 font-bold text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => sortJobs(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="date">Date</option>
              <option value="role">Role</option>
              <option value="stipend">Stipend</option>
            </select>
          </div>
        </div>
        {visibleJobs.length > 0 ? (
          <div className="space-y-4 ">
          {visibleJobs.map((job, index) => (
          <div key={index} className="shadow  rounded flex flex-col md:flex-row items-start md:ml-12 border-b border-gray-200 py-4 mb-4">
          <div className="flex-shrink-0 mb-2 md:mb-0 md:mr-4 ml-4">
            <img src={job.profilePic} alt="Company Logo" className="w-12 h-12 object-contain" />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between ml-4 w-full">
          <div className="md:ml-4">
      <h3 className="font-medium text-gray-800">{job.company}</h3>
      <p className="text-sm text-gray-600">{job.role}</p>
      <p className="text-sm text-gray-600">{job.location}</p>
    </div>
    <div className="flex md:ml-4 md:items-center mb-2">
      <p className="text-sm text-gray-600 mr-8">{job.stipend}</p>
      <span className="text-sm text-gray-600 mr-8">{job.experienceLevel}</span>
      <span className="text-sm text-gray-600 mr-8">{job.careerLevel}</span>
     
    </div>
    <button className=" mr-4  bg-[#041F96] text-white px-4 py-2 rounded-lg focus:outline-none w-[100px]">
        Apply
      </button>
          </div>
        </div>
        
   
          ))}
        </div>               
        ) : (
          <p className="text-gray-700">No jobs found.</p>
        )}

        {/* Pagination */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={goToPreviousPage}
            className={`bg-gray-200 text-gray-600 px-4 py-2 rounded-lg ${
              currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-300'
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={goToNextPage}
            className={`bg-gray-200 text-gray-600 px-4 py-2 rounded-lg ${
              currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-300'
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        </div></div>
      </div>
    </div>
  );
};

export default JobPost;
