import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HiFilter, HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import './Jobpost.css';

const JobPost = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    category: '',
    jobType: '',
    experience: '',
    careerLevel: '',
    salary: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const jobsPerPage = 5;
  const [userCoords, setUserCoords] = useState(null);
  const [distanceFilter, setDistanceFilter] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://backend.akshayy.tech/jobs');
      console.log('API response:', response.data);
      if (response.data && Array.isArray(response.data.jobs)) {
        const jobsWithBookmarks = response.data.jobs.map(job => ({
          ...job,
          isBookmarked: false
        }));
        setJobs(jobsWithBookmarks);
        setFilteredJobs(jobsWithBookmarks); // Initialize filtered jobs with all jobs
      } else {
        console.error('Invalid data format received:', response.data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const toggleBookmark = (index) => {
    setJobs(prevJobs => {
      const updatedJobs = [...prevJobs];
      updatedJobs[index].isBookmarked = !updatedJobs[index].isBookmarked;
      return updatedJobs;
    });
  };

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
 

  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const sortJobs = (criteria) => {
    let sortedJobs = [...filteredJobs]; // Sort filtered jobs
    switch (criteria) {
      case 'date':
        sortedJobs.sort((a, b) => parsePostingTime(b.postingTime) - parsePostingTime(a.postingTime));
        break;
      case 'title':
        sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'salary':
        sortedJobs.sort((a, b) => {
          const asalary = parseInt(a.salary.replace(/[^0-9.-]+/g, ''));
          const bsalary = parseInt(b.salary.replace(/[^0-9.-]+/g, ''));
          return asalary - bsalary;
        });
        break;
      default:
        break;
    }
    setFilteredJobs(sortedJobs); // Update filtered jobs with sorted results
    setSortBy(criteria);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const calculateDistance = (coords1, coords2) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const R = 6371;

    if (!coords1 || !coords2 || coords1.length !== 2 || coords2.length !== 2) {
      console.error('Invalid coordinates format');
      return NaN;
    }

    const [lat1, lon1] = coords1;
    const [lon2, lat2] = coords2;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const rLat1 = toRadians(lat1);
    const rLat2 = toRadians(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
  };

  const filterByDistance = (job) => {
    if (!userCoords || !distanceFilter || !job.location || !job.location.coordinates) return true;

    const jobCoords = job.location.coordinates;
    const distance = calculateDistance(userCoords, jobCoords);

    return distance <= distanceFilter;
  };

  const applyFilters = () => {
    // Filter jobs based on current filters and distance filter
    let filteredJobs = jobs.filter((job) => {
      const { keyword, location, category, jobType, experience, careerLevel, salary } = filters;

      let isMatch = true;

      if (keyword && job.title && !job.title.toLowerCase().includes(keyword.toLowerCase())) isMatch = false;
      if (location && job.location && job.location.city && !job.location.city.toLowerCase().includes(location.toLowerCase())) isMatch = false;
      if (category && job.category && !job.category.toLowerCase().includes(category.toLowerCase())) isMatch = false;
      if (jobType && job.jobType && !job.jobType.toLowerCase().includes(jobType.toLowerCase())) isMatch = false;
      if (experience && job.experience && !job.experience.toLowerCase().includes(experience.toLowerCase())) isMatch = false;
      if (careerLevel && job.careerLevel && !job.careerLevel.toLowerCase().includes(careerLevel.toLowerCase())) isMatch = false;
      if (salary && job.salary && parseInt(job.salary.replace(/[^0-9.-]+/g, '')) < parseInt(salary)) isMatch = false;

      if (distanceFilter && !filterByDistance(job)) isMatch = false;

      return isMatch;
    });

    setFilteredJobs(filteredJobs); // Update filtered jobs with new filters
    setShowFilters(false);
  };

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const visibleJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const fetchUserCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords([latitude, longitude]);
      }, (error) => {
        console.error('Error fetching user coordinates:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const [margin, setMargin] = useState({ margin: '2% 4% 0.5% 4%' });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 2100) {
        setMargin({ margin: '2% 20% 0.5% 20%' });
      } else {
        setMargin({ margin: '2% 4% 0.5% 4%' });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call handler right away so state gets updated with initial window size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row " style={margin}>
          <div className="max-w-full mx-auto flex flex-col md:flex-row" style={{ margin: '4% 4% 0 4%' }}>
      {/* Sidebar for Filters (Hidden on Small Screens) */}
      <div className="md:hidden w-full flex justify-end mb-6">
  <button
    onClick={() => setShowFilters(!showFilters)}
    className="text-white px-4 py-2 rounded-lg bg-[#041F96] focus:outline-non"
  >
    <HiFilter className="w-4 h-4" />
  </button>
</div>

      <div className="w-full md:mr-4 md:-ml-4 bg-gray-100 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-4">
      
      <div className={`md:block w-full p-4 bg-gray-100 rounded-lg shadow-lg mb-6 md:mr-6 ${showFilters ? '' : 'hidden'}`} style={{ height: 'fit-content' }}>
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
            placeholder="Enter city"
            id="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
         <button
  type="button" // Add type="button" to prevent form submission
  onClick={fetchUserCoordinates}
  className="mt-2 bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-[#041F96] focus:outline-none"
>
  Use My Location
</button>

        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2"  htmlFor="distance">Distance (in km)</label>
          <input
            type="number"
            name="distance"
            id="distance"
            placeholder="Enter distance in km"
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

          {/* Job Type Filter */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobType">Job Type</label>
            <select
              name="jobType"
              id="jobType"
              placeholder="Enter Role"
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
          {/* <div className="mb-4">
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
          </div> */}

          {/* Experience Level Filter */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experienceLevel">Experience Level</label>
            <input
              type="text"
              name="experienceLevel"
              placeholder="Enter Years of Experience"
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
              placeholder="Enter Career Type"
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
            onClick={applyFilters}
            className="w-full bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none"
          >
            View
          </button>
        </form>
        </div>
      </div>

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
              <option value="title">title</option>
              <option value="salary">salary</option>
            </select>
          </div>
        </div>
        
        
        {visibleJobs.length > 0 ? (
  <div className="space-y-4">
    {visibleJobs.map((job, index) => (
  <div className="shadow rounded flex flex-col md:flex-row items-start md:ml-8 border-b border-gray-200 py-4 mb-4" key={index}>
    <div className="flex-shrink-0 mb-2 md:mb-0 md:mr-4 ml-4 w-16 h-16">
      <img src={job.images[1]} alt="Company Logo" className="w-full h-full object-contain" />
    </div>
    <Link to={`/getjobs/${job._id}`} className="block">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full ml-2">
        <div className="md:ml-4 w-1/3 ml-2">
          <h3 className="font-medium text-gray-800">{job.companyName}</h3>
          <p className="text-2xs text-[#041F96]">{job.title}</p>
          <p className="text-gray-700 mb-2">{job.location?.city},</p>
        </div>
        <div className="flex md:ml-2 md:items-center mb-2 w-2/3 ml-2">
          <span className="text-sm text-gray-600 mr-8">{job.experience}</span>
          <span className="text-sm text-gray-600 mr-8">{job.careerLevel}</span>
          {/* <p className="text-sm text-gray-600 mr-8">{job.salary}</p> */}
        </div>
        <div className="flex md:ml-4 md:items-center mb-2 w-3/3 mr-4 ml-2">
          {userCoords && job.location?.coordinates && (
            <p className="text-gray-700 mb-2 mr-4">Distance: {calculateDistance(userCoords, job.location.coordinates).toFixed(2)} km</p>
          )}
        </div>
        <div className="flex md:ml-2 md:items-center mb-2 w-2/3 ml-2">
          <span className="text-sm bg-green-100 text-green-800 justify-center rounded-full w-[50px] ml-2 py-1 mr-8">
            <p className='ml-2'> Open</p>
          </span>
          <span className="flex my-auto md:ml-4 md:items-center w-3/3 mr-8">
            <button onClick={(e) => { e.stopPropagation(); toggleBookmark(index); }}>
              {job.isBookmarked ? (
                <HiBookmark className='w-6 h-6 mb-2 mr-2 bg-blue-500' />
              ) : (
                <HiOutlineBookmark className='w-6 h-6 mb-2 mr-2 ' />
              )}
            </button>
          </span>
        </div>
      </div>
    </Link>
    <button
      onClick={openModal}
      className="mr-4 ml-2 my-auto bg-[#041F96] text-white px-4 py-2 rounded-lg focus:outline-none w-[100px]"
    >
      Apply
    </button>
  </div>
))}
  </div>
) : (
  <p className="text-gray-700">No jobs found.</p>
)}
{isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
            <form>
              <input type="file" className="mb-4 w-full" />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

        </div>
</div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#041F96] text-white rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#041F96] text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <br></br>
      </div>
    </div>
   
    </div>
  );
};

export default JobPost;
