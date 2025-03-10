import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DistanceDisplay from '../Distance';
import { HiFilter } from 'react-icons/hi';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import './Jobpost.css';
import categoriesList from './Dashboard/AdminPanel/categories.json'
import { FaMapMarkerAlt, FaBriefcase,FaGraduationCap, FaStar } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineClock, HiOutlineAcademicCap } from "react-icons/hi"; // Importing icons

const TutorFinder = () => {
  const [tutors, setTutors] = useState([]);
  const [tutorType, setTutorType] = useState("All");
  const [distance, setdistance] = useState('');
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [rating, setRating] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTutors = tutors.slice(indexOfFirstItem, indexOfLastItem);
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredTutors.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const [inputText, setInputText] = useState('');
  const [inputText1, setInputText1] = useState(''); // Separate state for input text
  const [suggestions, setSuggestions] = useState([]);
  const [suggestions1, setSuggestions1] = useState([]);
  const jobsPerPage = 15;
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    subjectsTaught: '',
    city: '',
    distance:'',
    totalExperience: '',
    qualifications:'',
    gender:'',
    highestQualification:'',
    minExpectedSalary: '',
    maxExpectedSalary: '',
    tags: '',
    categories:'',
    tutorType:''
  });

  useEffect(() => {
    fetchTutors();
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    // Add event listener when modal is shown
    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener when modal is closed or component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    
  }, [showFilters]);
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
    "Choreography",
    "IIT JEE Coaching",
  ];
  const handleCategoryInputChange = (e) => {
    const input = e.target.value;
    setInputText1(input);
    const filteredSuggestions = categoriesList.filter(
      (category) => category.toLowerCase().includes(input.toLowerCase()) && !filters.categories.includes(category)
    );
    setSuggestions1(filteredSuggestions);
  };
  const toggleFilters = () => setShowFilters((prev) => !prev);
  const handleCategorySelect = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: [...prev.categories, category],
    }));
    setInputText1('');
    setSuggestions1([]);
  };
  

  const handleCategoryRemove = (categoryToRemove) => {
    setfilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((category) => category !== categoryToRemove),
    }));
  };
  const fetchTutors = async () => {
    try {
      setIsLoading(true); // Start loading animation
  
      const response = await axios.get('https://server.avyudha.com/getTutors');
  
      if (response.data && response.data.tutors && Array.isArray(response.data.tutors)) {
        setTimeout(() => {
          setTutors(response.data.tutors);
          setFilteredTutors(response.data.tutors); // Set the initial filtered tutors
          setIsLoading(false); // Stop loading animation
        }, 1000); // Delay for 1 second
      } else {
        console.error('Invalid data format received:', response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching tutors:', error);
      setIsLoading(false);
    }
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

    return R * c;
  };

  const filterByDistance = (job) => {
    if (!userCoords || !distance || !job.location || !job.location.coordinates) return true;

    const jobCoords = job.location.coordinates;
    const distance = calculateDistance(userCoords, jobCoords);

    return distance <= distance;
  };
  
  const totalPages = Math.ceil(filteredTutors.length / jobsPerPage);

  const paginatedTutors = filteredTutors.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleApplyFilter = async () => {
    setTutors([]); // Clear current tutors

    try {
      const { city, totalExperience, distance, qualifications, gender, categories } = filters;

      let queryString = `location.city=${city}&totalExperience=${totalExperience}&qualifications=${qualifications}&gender=${gender}`;

      if (distance && userCoords) {
        const reversedCoords = [...userCoords].reverse();
        queryString += `&maxDistance=${distance}&coordinates=${reversedCoords.join(",")}&`;
      }

      if (categories.length > 0) {
        queryString += `&categories=${categories.join(",")}`;
      }

      if (tutorType === "Online") {
        queryString += `&tutorType=online`;
      }

      const url = `https://server.avyudha.com/getTutors?${queryString}`;
      const response = await axios.get(url);

      if (response.data && response.data.tutors) {
        setTutors(response.data.tutors);
        setFilteredTutors(response.data.tutors);
      } else {
        console.error("No tutors found with the selected filters.");
      }
    } catch (err) {
      console.error("An error occurred while fetching tutors.", err);
    }
    setCurrentPage(1);
    
    
 
    setShowFilters(false); 
   
  };
  
  
  
  
  

   

  return (
    <div className="flex flex-col md:flex-row  mx-auto max-w-[1800px] p-4">
      <div className="flex flex-col md:flex-row  mx-auto max-w-[1800px] w-4/5">
        <div className="md:hidden w-full flex justify-end ">
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-white px-4 py-2 rounded-lg bg-[#041F96] focus:outline-none"
          >
            <HiFilter className="w-4 h-4" />
          </button>
        </div>
        <div className="md:block p-4  rounded-lg  mb-6" style={{ width: '100%', maxWidth: '300px', height: 'fit-content' }}>
  {/* Show Filter Button for Mobile */}
  

  {/* Mobile Modal Pop-up */}
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
    <button
        onClick={toggleFilters}
        className=" top-2 right-4 text-red-600 hover:text-red-600 text-2xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>
       
        <form className="space-y-4 ">
        <div className=" rounded-md bg-white ">
          <label className="block text-sm font-medium font-bold text-gray-700 mb-1"><strong>Tutor Type</strong></label>
      <select
        value={tutorType}
        onChange={(e) => setTutorType(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="All">All</option>
        <option value="Online">Online</option>
      </select>

    </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">
             <strong>City</strong> 
            </label>
            <input
              type="text"
              name="city"
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

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="distance">
             <strong> Distance (in km)</strong>
            </label>
            <input
              type="number"
              name="distance"
              id="distance"
              placeholder="Enter distance in km"
              value={filters.distance}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:outline-none"
            />
          </div>
       
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Categories">
              <strong>Categories</strong>
            </label>
            <input
              type="text"
              placeholder="Start typing to search categories..."
              value={inputText1}
              onChange={handleCategoryInputChange}
              className="border p-2 w-full rounded-lg"
            />

            {/* Suggestions Dropdown */}
            {suggestions1.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-60 overflow-y-auto w-full z-10">
                {suggestions1.map((cat, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleCategorySelect(cat)}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}

            {/* Selected Categories */}
            {filters.categories.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {filters.categories.map((category, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-2 rounded-full flex items-center gap-1"
                  >
                    {category}
                    <button
                      onClick={() => handleCategoryRemove(category)}
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="experience">
              <strong>Experience</strong>
            </label>
            <input
              type="number"
              name="totalExperience"
              value={filters.totalExperience}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="qualifications">
              <strong>Qualifications</strong>
            </label>
            <input
              type="text"
              name="qualifications"
              value={filters.qualifications ?? ''}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="gender">
              <strong>Gender</strong>
            </label>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:outline-none"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleApplyFilter}
            className="w-full bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </div>
  )}

  {/* Desktop Filters */}
  <div
    className={`hidden md:block p-4 bg-white rounded-lg shadow-lg mb-6 ${showFilters ? 'block' : 'hidden'}`}
    style={{ width: '100%', maxWidth: '400px', height: 'fit-content' }}
  >
    <form className="space-y-4 ">
      {/* Filter Fields (Same as before for desktop) */}
      <div className=" rounded-md bg-white ">
      <label className="block text-sm font-medium font-bold text-gray-700 mb-1"><strong>Tutor Type</strong></label>
      <select
        value={tutorType}
        onChange={(e) => setTutorType(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="All">All</option>
        <option value="Online">Online</option>
      </select>

     
    </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">
        <strong>City</strong> 
        </label>
        <input
          type="text"
          name="city"
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

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="distance">
        <strong> Distance (in km)</strong>
        </label>
        <input
          type="number"
          name="distance"
          id="distance"
          placeholder="Enter distance in km"
          value={filters.distance}
          onChange={handleFilterChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:outline-none"
        />
      </div>
      
      <div className="mb-4 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Categories">
        <strong>Categories</strong>
        </label>
        <input
          type="text"
          placeholder="Start typing to search categories..."
          value={inputText1}
          onChange={handleCategoryInputChange}
          className="border p-2 w-full rounded-lg"
        />

        {/* Suggestions Dropdown */}
        {suggestions1.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-60 overflow-y-auto w-full z-10">
            {suggestions1.map((cat, idx) => (
              <li
                key={idx}
                onClick={() => handleCategorySelect(cat)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {cat}
              </li>
            ))}
          </ul>
        )}

        {/* Selected Categories */}
        {filters.categories.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {filters.categories.map((category, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-2 rounded-full flex items-center gap-1"
              >
                {category}
                <button
                  onClick={() => handleCategoryRemove(category)}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="experience">
        <strong>Experience</strong>
        </label>
        <input
          type="number"
          name="totalExperience"
          value={filters.totalExperience}
          onChange={handleFilterChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="qualifications">
        <strong>Qualifications</strong>
        </label>
        <input
          type="text"
          name="qualifications"
          value={filters.qualifications ?? ''}
          onChange={handleFilterChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="gender">
        <strong>Gender</strong>
        </label>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:outline-none"
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button
        type="button"
        onClick={handleApplyFilter}
        className="w-full bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none"
      >
        Apply Filters
      </button>
    </form>
  </div>
</div>


    
<div className=" w-full sm:ml-0 lg:ml-8">
<div className="flex flex-wrap items-center justify-between gap-4 mb-6">
  <h2 className="text-3xl font-bold text-[#041F96] min-w-0">Tutors</h2>

  <div className="flex items-center gap-2 min-w-0">
    <label htmlFor="itemsPerPage" className="text-gray-700 whitespace-nowrap">
      Items per page:
    </label>
    <select
      id="itemsPerPage"
      value={itemsPerPage}
      onChange={handleItemsPerPageChange}
      className="border border-gray-300 rounded-lg px-2 py-1"
    >
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </div>
</div>
      
      {/* Show Skeleton Loader while loading */}
      {isLoading ? (
        Array(3).fill(0).map((_, index) => (
          <div key={index} className="animate-pulse shadow-lg rounded-lg border border-blue-400 bg-white p-6 mb-4 w-full flex flex-col md:flex-row">
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
      ) : (
        currentTutors.length > 0 ? (
          currentTutors.map((tutor, index) => (
            <div
              className="shadow-lg rounded-lg border border-blue-400 p-6 mb-4 w-full flex flex-col md:flex-row transition-transform transform hover:scale-105 hover:shadow-xl duration-300 bg-white"
              key={index}
            >
              {/* Image Section */}
              <div className="flex-shrink-0 w-full md:w-1/6 flex items-center justify-center mb-4 md:mb-0">
                <img
                  src={`https://server.avyudha.com/tutors/download/image/${tutor._id}`}
                  alt=""
                  className="w-24 h-24 object-cover rounded-full mx-2"
                />
              </div>

              <Link to={`/getTutor/${tutor._id}`} className="block w-full">
                <div className="flex flex-col w-full ml-2 relative">
                  <h2 className="text-xl font-bold flex items-center text-[#041F96]">
                    {tutor.fullName}
                    {tutor.verified && (
                      <span className="ml-2 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full w-5 h-5">
                      ✔
                    </span>
                    )}
                  </h2>

                  {tutor.classCost !== null && tutor.classCost !== undefined && tutor.classCost > 0 && (
  <div className="bg-green-300 text-black font-bold text-xs px-3 py-1 w-24 rounded-full hover:bg-green-400">
    Online Class
  </div>
)}


                  <div className="flex flex-col mt-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-[#F0F4FF] p-2 rounded-full">
                          <FaMapMarkerAlt className="text-[#041F96]" />
                        </div>
                        <span className="text-sm text-gray-600">
                        {tutor.location?.address}, &nbsp;{tutor.location?.city}, &nbsp; {tutor.location?.state}, &nbsp;{tutor.location?.pinCode}
                        </span>
                      </div>

                      
                    </div>

                    <div className="flex items-center gap-2 my-1">
                      <div className="bg-[#F0F4FF] p-2 rounded-full">
                        <FaGraduationCap className="text-[#041F96]" />
                      </div>
                      <span className="text-sm text-gray-600">{tutor.highestQualification}</span>
                    </div>
                    <span className="flex items-center text-sm text-gray-600 font-semibold gap-1">
                      <div className="bg-[#F0F4FF] p-2 rounded-full">
                        <FaBriefcase className="text-[#041F96]" />
                      </div>
                      <span className="text-sm text-gray-600">{tutor.totalExperience} years</span>
                        
                        
                      
                      </span>
                    <div className="flex items-center gap-2">
                    <div className="mt-1 rounded-full flex">
                          <div className="bg-[#F0F4FF] p-2 rounded-full">
                            <FaStar className="text-[#041F96]" />
                          </div>
                          &nbsp;&nbsp;
                          {Array.from({ length: 5 }, (_, index) => (
                            <FaStar
                              key={index}
                              className={`text-2xs mt-2 ${index < tutor.rating ? 'text-[#FFD700]' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-gray-600">
                        {tutor.description?.length > 200
                          ? `${tutor.description.substring(0, 200)}...`
                          : tutor.description}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {tutor.categories?.slice(0, 5).map((skill, index) => (
                        <span key={index} className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {userCoords && tutor.location?.coordinates && (
                      <div className="right-12 mt-4 flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          <strong>Distance: {calculateDistance(userCoords, tutor.location.coordinates).toFixed(2)} km</strong>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>No tutors match your criteria.</div>
        )
      )}
        <div className="flex justify-center gap-4 mt-6 mx-auto">
  <button
    onClick={prevPage}
    disabled={currentPage === 1}
    className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-800'}`}
  >
    Previous
  </button>
  
  <span className="px-4 py-2 text-gray-700">
    Page {currentPage} of {Math.ceil(filteredTutors.length / itemsPerPage)}
  </span>

  <button
    onClick={nextPage}
    disabled={currentPage === Math.ceil(filteredTutors.length / itemsPerPage)}
    className={`px-4 py-2 rounded-lg ${currentPage === Math.ceil(filteredTutors.length / itemsPerPage) ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-800'}`}
  >
    Next
  </button>
</div>
    </div>
        
        
      </div>
    </div>
  );



};

export default TutorFinder;