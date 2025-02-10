import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DistanceDisplay from '../Distance';
import { Link } from 'react-router-dom';
import categoriesList from './Dashboard/AdminPanel/categories.json'
import { HiFilter, HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import { FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign,FaHandHoldingUsd,FaClock,FaInfoCircle } from 'react-icons/fa';
import './Jobpost.css';

const JobPost = () => {
  const [jobs, setJobs] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputText1, setInputText1] = useState(''); // Separate state for input text
  const [suggestions, setSuggestions] = useState([]);
  const [suggestions1, setSuggestions1] = useState([]);const [isLoading, setIsLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    skillAndExperience: [],
    jobType: '',
    totalExperience: '',
    gender:'',
    careerLevel: '',
    salary: '',
    
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const jobsPerPage = 15;
  const [userCoords, setUserCoords] = useState(null);
  const [distance, setdistance] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://server.avyudha.com/jobs?limit=1000000');
      console.log('API response:', response.data);
      if (response.data && Array.isArray(response.data.jobs)) {
        const jobsWithBookmarks = response.data.jobs.map(job => ({
          ...job,
          isBookmarked: false
        }));
        // Initialize filtered jobs with all jobs
        setTimeout(() => {
          setJobs(jobsWithBookmarks);
        setFilteredJobs(jobsWithBookmarks); // Set the initial filtered tutors
          setIsLoading(false); // Stop loading animation
        }, 1000); 
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
  const skillAndExperienceSuggestions = [
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
  
  const toggleFilters = () => setShowFilters(!showFilters);
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
  
  const handleskillAndExperienceInputChange = (e) => {
    const input = e.target.value;
    setInputText1(input);
    const filteredSuggestions = categoriesList.filter(
      (skillAndExperience) => skillAndExperience.toLowerCase().includes(input.toLowerCase()) && !filters.skillAndExperience.includes(skillAndExperience)
    );
    setSuggestions1(filteredSuggestions);
  };

  const handleskillAndExperienceSelect = (skillAndExperience) => {
    setFilters((prev) => ({
      ...prev,
      skillAndExperience: [...prev.skillAndExperience, skillAndExperience],
    }));
    setInputText1('');
    setSuggestions1([]);
  };
  

  const handleskillAndExperienceRemove = (skillAndExperienceToRemove) => {
    setfilters((prev) => ({
      ...prev,
      skillAndExperience: prev.skillAndExperience.filter((skillAndExperience) => skillAndExperience !== skillAndExperienceToRemove),
    }));
  };
  const calculateDistance = (coords2, coords1) => {
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
    if (!userCoords || !distance || !job.location || !job.location.coordinates) return true;

    const jobCoords = job.location.coordinates;
    const distance = calculateDistance(userCoords, jobCoords);

    return distance <= distance;
  };

  const applyFilters = async () => {
    // Build the query parameters based on available filters
    const {city,distance, skillAndExperience, gender } = filters;
    console.log(filteredJobs);
    // Start with the base URL
    let url = 'https://server.avyudha.com/jobs?';
  
    // Dynamically append filters to the URL
    if (distance && userCoords) {
      const reversedCoords = [...userCoords].reverse(); 
      // Add distance condition to the query string if user coordinates are available
      url+= `&maxDistance=${distance}`;
      url+= `&coordinates=${reversedCoords}`;
    }

    if (skillAndExperience.length > 0) {
      url += `&jobCategories=${skillAndExperience.join(',')}`;
    }
    if (city) {
      url += `&location.city=${encodeURIComponent(city)}`;
    }
   
    if (gender) {
      url += `&gender=${encodeURIComponent(gender)}`;
    }
   
  
    // Make the GET request to the server
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // If the request was successful, update the state with the filtered jobs
      if (response.ok) {
        
        setFilteredJobs(data.jobs); // Assuming the API returns the filtered list of jobs
        console.log("after",filteredJobs);
      } else {
        console.error('Failed to fetch jobs:', data.message);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  
    setShowFilters(false); // Optionally hide the filters after applying
    
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
        const {longitude,latitude } = position.coords;
        setUserCoords([longitude,latitude]);
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
    <div className="flex flex-col md:flex-row mx-auto max-w-[1800px] p-4">
    <div className="flex flex-col md:flex-row mx-auto max-w-[1800px] w-4/5">
      {/* Sidebar for Filters (Hidden on Small Screens) */}
      <div className="md:hidden w-full flex justify-end mb-6">
  <button
    onClick={() => setShowFilters(!showFilters)}
    className="text-white px-4 py-2 rounded-lg bg-[#041F96] focus:outline-none"
  >
    <HiFilter className="w-4 h-4" />
  </button>
</div>

{/* Mobile Filter Modal */}
{showFilters && (
  <div
    className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40 flex justify-center items-center"
    onClick={toggleFilters}
    aria-labelledby="filter-modal-title"
    role="dialog"
  >
    <div
      className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm"
      onClick={(e) => e.stopPropagation()} // Prevent click on modal from closing it
    >
      <h2 id="filter-modal-title" className="text-lg font-semibold mb-4">Filters</h2>
      <form className="space-y-4">
        {/* Location Filter */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            placeholder="Enter city"
            id="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:outline-none"
          />
          <button
            type="button"
            onClick={fetchUserCoordinates}
            className="mt-2 bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-[#041F96] focus:outline-none"
          >
            Use My Location
          </button>
        </div>

        {/* Distance Filter */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="distance">Distance (in km)</label>
          <input
            type="number"
            name="distance"
            id="distance"
            placeholder="Enter distance in km"
            value={filters.distance}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Categories Filter */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skillAndExperience">Categories</label>
          <input
            type="text"
            placeholder="Start typing to search Categories..."
            value={inputText1}
            onChange={handleskillAndExperienceInputChange}
            className="border p-2 w-full rounded-lg"
          />
          {/* Suggestions Dropdown */}
          {suggestions1.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-60 overflow-y-auto w-full z-10">
              {suggestions1.map((cat, idx) => (
                <li
                  key={idx}
                  onClick={() => handleskillAndExperienceSelect(cat)}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}

          {/* Selected skillAndExperience */}
          {filters.skillAndExperience.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {filters.skillAndExperience.map((skillAndExperience, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-2 rounded-full flex items-center gap-1"
                >
                  {skillAndExperience}
                  <button
                    onClick={() => handleskillAndExperienceRemove(skillAndExperience)}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Gender Filter */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender</label>
          <select
            name="gender"
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
)}

{/* Desktop Filters */}
<div
    className={`hidden md:block p-4 bg-white rounded-lg shadow-lg mb-6 ${showFilters ? 'block' : 'hidden'}`}
    style={{  height: 'fit-content' }}
  >
  <form className="space-y-4">
    {/* Location Filter */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">City</label>
      <input
        type="text"
        name="city"
        placeholder="Enter city"
        id="city"
        value={filters.city}
        onChange={handleFilterChange}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:outline-none"
      />
      <button
        type="button"
        onClick={fetchUserCoordinates}
        className="mt-2 bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-[#041F96] focus:outline-none"
      >
        Use My Location
      </button>
    </div>

    {/* Distance Filter */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="distance">Distance (in km)</label>
      <input
        type="number"
        name="distance"
        id="distance"
        placeholder="Enter distance in km"
        value={filters.distance}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border rounded-lg"
      />
    </div>

    {/* Categories Filter */}
    <div className="mb-4 relative">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skillAndExperience">Categories</label>
      <input
        type="text"
        placeholder="Start typing to search Categories..."
        value={inputText1}
        onChange={handleskillAndExperienceInputChange}
        className="border p-2 w-full rounded-lg"
      />
      {/* Suggestions Dropdown */}
      {suggestions1.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-60 overflow-y-auto w-full z-10">
          {suggestions1.map((cat, idx) => (
            <li
              key={idx}
              onClick={() => handleskillAndExperienceSelect(cat)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {cat}
            </li>
          ))}
        </ul>
      )}

      {/* Selected skillAndExperience */}
      {filters.skillAndExperience.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {filters.skillAndExperience.map((skillAndExperience, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-2 rounded-full flex items-center gap-1"
            >
              {skillAndExperience}
              <button
                onClick={() => handleskillAndExperienceRemove(skillAndExperience)}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}
    </div>

    {/* Gender Filter */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender</label>
      <select
        name="gender"
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
      className="w-full bg-[#041F96] hidden md:block text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none"
    >
      View
    </button>
  </form>
</div>



      <div className="w-full ">
        {/* Jobs header */}
        <div className=" ">
        
        {isLoading ? (
  Array(3)
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className="animate-pulse shadow-lg rounded-lg border border-blue-400 bg-white p-6 mb-4 w-full flex flex-col md:flex-row"
      >
        {/* Image Placeholder */}
        <div className="flex-shrink-0 w-full md:w-1/6 flex items-center justify-center mb-4 md:mb-0">
          <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        </div>

        {/* Text Placeholders */}
        <div className="flex flex-col w-full ml-2 space-y-3">
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>

          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-2/4"></div>

          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    ))
) : filteredJobs.length > 0 ? (
  <div>
    <h1 className="text-3xl font-bold text-[#041F96] mb-6 ml-4">
      Available Jobs
    </h1>
    {filteredJobs.map((job, index) => (
      <div
        key={index}
        className="shadow sm:-mx-6 md:mx-0 rounded-lg md:ml-6 md:-mr-8 -mr-8 text-xl transition-transform hover:scale-105 hover:shadow-2xl duration-300 hover:bg-gray-50 items-start py-4 mb-4 hover:shadow-lg bg-white shadow-md rounded-lg p-6 border-l-4 border-[#041F96]"
      >
        <Link to={`/getjobs/${job._id}`} className="block">
          {/* Job Heading */}
          <div className="mb-2 px-4 sm:-mx-6 flex flex-wrap items-center justify-between gap-4">
  {/* Company Name & Job Title */}
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <h3 className="text-gray-700 font-semibold text-lg">{job.companyName}</h3>
    <p className="text-2xl font-semibold text-[#041F96]">{job.title}</p>
  </div>

  {/* Job Created Date */}
  <div className="flex items-center text-green-700 gap-2">
    
  <span className="text-sm sm:text-base">
  
      {(() => {
        const dateObj = new Date(job.jobCreated);
        const hours = dateObj.getHours() % 12 || 12;
        const minutes = dateObj.getMinutes().toString().padStart(2, "0");
        const amPm = dateObj.getHours() >= 12 ? "PM" : "AM";
        const day = dateObj.getDate().toString().padStart(2, "0");
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
        const year = dateObj.getFullYear();

        return `${hours}:${minutes} ${amPm} ${day}/${month}/${year}`;
      })()}
    </span>
  </div>
</div>


          <br />

          {/* Job Details */}
          <div className="grid grid-cols-1 -mx-6 md:grid-cols-2 gap-4 px-4 text-xs sm:text-sm md:text-base text-gray-800">
            {/* Location */}
            <div className="flex items-center gap-2 -my-1">
              <div className="p-2 bg-gray-200 rounded-full">
                <FaMapMarkerAlt className="text-black" />
              </div>
              <span>
              {job.location?.address},&nbsp;{job.location?.city},&nbsp;{job.location?.state},&nbsp;{job.location?.pinCode} 
              </span>
            </div>

            {/* Commitment */}
            <div className="flex items-center gap-2 -my-1">
              <div className="p-2 bg-gray-200 rounded-full">
                <FaClock className="text-black" />
              </div>
              <span>{job.workDetails.commitment}</span>
            </div>

            {/* Connected Tutors */}
            <div className="flex items-center gap-2 -my-1">
              <div className="p-2 bg-gray-200 rounded-full">
                <FaHandHoldingUsd className="text-black" />
              </div>
              <span>{job.timesPurchased} tutors Connected</span>
            </div>

            {/* Job Created */}
            

            {/* Salary */}
            <div className="flex items-center gap-2 -my-1">
              <div className="p-2 bg-green-200 rounded-full">
                <FaRupeeSign className="text-black" />
              </div>
              <strong>
                <span>Rs. {job.salary.min} {job.salary.period}</span>
              </strong>
            </div>

            {/* Details */}
            <div className="flex items-center gap-2 -my-1 col-span-2">
              <div className="p-2 bg-gray-200 rounded-full">
                <FaInfoCircle className="text-black" />
              </div>
              <span>
                {job.description?.length > 100
                  ? `${job.description.substring(0, 100)}...`
                  : job.description}
              </span>
            </div>

            {/* Distance */}
            {userCoords && job.location?.coordinates && (
              <div className="flex items-center gap-2 -my-1">
                <strong>
                  <span>
                    Distance: {calculateDistance(userCoords, job.location.coordinates).toFixed(2)} km
                  </span>
                </strong>
              </div>
            )}
          </div>
        </Link>
      </div>
    ))}
  </div>
) : null}



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
       
        <br></br>
      </div>
    </div>
  
  );


};

export default JobPost;