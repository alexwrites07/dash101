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
    totalExperience: '',
    gender:'',
    careerLevel: '',
    salary: '',
    skillAndExperience:'',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const jobsPerPage = 15;
  const [userCoords, setUserCoords] = useState(null);
  const [distanceFilter, setDistanceFilter] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://server.avyudha.com/jobs');
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
  const categorySuggestions = [
    "Spoken English",
    "French Language",
    "Hindi Language",
    "German Language",
    "LKG Tuition",
    "UKG Tuition",
    "Class 1 Tuition",
    "Class 3 Tuition",
    "Dance",
    "Handwriting",
    "Summer Camp",
    "ui",
    "Calculus",
    "Choreography",
  ];

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

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
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
      const { keyword, location, category, jobType, totalExperience, gender, careerLevel, salary,skillAndExperience } = filters;
  
      let isMatch = true;
  
      if (keyword && job.title && !job.title.toLowerCase().includes(keyword.toLowerCase())) isMatch = false;
      if (location && job.location && job.location.city && !job.location.city.toLowerCase().includes(location.toLowerCase())) isMatch = false;
      if (category && job.category && !job.category.toLowerCase().includes(category.toLowerCase())) isMatch = false;
      if (jobType && job.jobType && !job.jobType.toLowerCase().includes(jobType.toLowerCase())) isMatch = false;
      if (totalExperience && job.totalExperience && !job.totalExperience.toLowerCase().includes(totalExperience.toLowerCase())) isMatch = false;
      if (careerLevel && job.careerLevel && !job.careerLevel.toLowerCase().includes(careerLevel.toLowerCase())) isMatch = false;
      if (salary && job.salary && parseInt(job.salary.replace(/[^0-9.-]+/g, '')) < parseInt(salary)) isMatch = false;
      if (skillAndExperience && job.skillAndExperience !== "") {
        const skillExists = job.skillAndExperience.includes(skillAndExperience);
        if (!skillExists) isMatch = false;
      }
      // Gender filter - case insensitive
      if (gender && job.gender && !job.gender.toLowerCase().includes(gender.toLowerCase())) isMatch = false;
  
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

  const [margin, setMargin] = useState({ margin: '2% 1% 0.5% 4%' });

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
          <div className="max-w-full mx-auto flex flex-col md:flex-row" >
      {/* Sidebar for Filters (Hidden on Small Screens) */}
      <div className="md:hidden w-full flex justify-end mb-6">
  <button
    onClick={() => setShowFilters(!showFilters)}
    className="text-white px-4 py-2 rounded-lg bg-[#041F96] focus:outline-non"
  >
    <HiFilter className="w-4 h-4" />
  </button>
</div>

      <div className="w-2/5 md:mr-4 md:-ml-4  rounded-lg  mb-4 md:mb-0 md:mr-4">
      
      <div className={`md:block w-full p-4 bg-gray-100 rounded-lg shadow-lg mb-6 md:mr-6 ${showFilters ? '' : 'hidden'}`} style={{ height: 'fit-content' }}>
        <form className="space-y-4">
          {/* Filters */}
          {/* Keyword Filter */}
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="keyword">Keyword</label>
            <input
              type="text"
              name="keyword"
              id="keyword"
              value={filters.keyword}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div> */}

          {/* Location Filter */}
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">City</label>
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

        <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skillAndExperience">Categories</label>
  <select
    name="skillAndExperience"
    value={filters.skillAndExperience}
    onChange={handleFilterChange}
    className="w-full px-3 py-2 border rounded-lg"
  >
    <option value="">Select Category</option>
    {categorySuggestions.map((skillAndExperience, index) => (
      <option key={index} value={skillAndExperience}>
        {skillAndExperience}
      </option>
    ))}
  </select>
</div>

          {/* Career Level Filter */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="careerLevel">Gender</label>
            <select
  name="gender"  // Added name attribute
  value={filters.gender}
  onChange={handleFilterChange}
  className="border rounded px-3 py-2"
>
  <option value="">All Genders</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Any">Others</option>
</select>

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
       
        
        
        {visibleJobs.length > 0 ? (
  <div className="">
    <h1 className="text-3xl font-bold text-[#041F96] mb-6">Available Jobs</h1>
    {visibleJobs.map((job, index) => (
  <div className="shadow rounded  items-start md:ml-8 border-b border-gray-200 py-4 mb-4" key={index}>
    
    <Link to={`/getjobs/${job._id}`} className="block">
    <div className="flex  md:justify-between w-full ml-2">
    {/* Company Info Section */}
    

    {/* Job Info Section */}
    <div className="w-[450px] md:-ml-4">
  <h3 className="text-gray-700 text-center md:text-left font-semibold md:mr-2 md:ml-8">{job.companyName}</h3>
  <p className="text-gray-700 text-center md:text-left text-bold font-semibold md:mr-2 text-xl md:ml-8">{job.title}</p>
  <p className="text-gray-700 text-center md:text-left md:mr-2 md:ml-8">{job.location?.city}</p>
  <p className="text-sm text-gray-600 text-center md:text-left md:ml-8">{job.gender}</p>
  <p className="text-sm text-gray-600 text-center md:text-left md:ml-8">{job.totalExperience}</p>
</div>


    {/* Distance Section */}
    <div className="flex justify-center w-3/5 md:w-1/4 mt-2 md:mt-0 mx-8">
      {userCoords && job.location?.coordinates && (
        <p className="text-gray-700 text-2xs text-center">
          Distance: {calculateDistance(userCoords, job.location.coordinates).toFixed(2)} km
        </p>
      )}
    </div>

    {/* Status and Actions Section */}
    <div className="flex items-center justify-center w-full md:w-1/4 mt-2 md:mt-0 space-x-4 mr-12">
      
      <button
        className="bg-[#041F96] text-white px-4 py-2 rounded-lg focus:outline-none"
      >
        View
      </button>
    </div>
  </div>
</Link>


   
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
