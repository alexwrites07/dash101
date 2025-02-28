import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiFilter, HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import { FaMapMarkerAlt, FaChalkboardTeacher,FaRegClock, FaUsers, FaVenusMars, FaClock, FaRupeeSign, FaInfoCircle } from "react-icons/fa";

import { Link } from 'react-router-dom';
// import { 
//   FaMapMarkerAlt, 
//   FaChalkboardTeacher, 
//   FaUsers, 
//   FaVenusMars, 
//   FaClock, 
//   FaRupeeSign, 
//   FaInfoCircle 
// } from "react-icons/fa"
import './Jobpost.css';
import DistanceDisplay from '../Distance';
import categoriesList from './Dashboard/AdminPanel/categories.json'

const NeedsFinder = () => {
  const [tutors, setTutors] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState('');
  const [inputText1, setInputText1] = useState('');
  const [suggestions1, setSuggestions1] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10); // Adjust based on your preference
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentTutors = filteredTutors.slice(indexOfFirstItem, indexOfLastItem);
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


  const [filters, setFilters] = useState({
    genderPreference: '',
    city: '',
    categories: [], // Default as empty array
  });

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleCategoryInputChange = (e) => {
    const input = e.target.value;
    setInputText1(input);

    const filteredSuggestions = categoriesList.filter(
      (category) => category.toLowerCase().includes(input.toLowerCase()) && !filters.categories.includes(category)
    );
    setSuggestions1(filteredSuggestions);
  };

  const handleCategorySelect = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: [...prev.categories, category],
    }));
    setInputText1('');
    setSuggestions1([]);
  };

  const handleCategoryRemove = (categoryToRemove) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((category) => category !== categoryToRemove),
    }));
  };

  const toggleFilters = () => setShowFilters(!showFilters);
  const fetchTutors = async () => {
    try {
     

      const response = await axios.get('https://server.avyudha.com/learning-needs', {
       
      });

      if (response.data?.learningNeeds && Array.isArray(response.data.learningNeeds)) {

        setTimeout(() => {
          // Set the initial filtered tutors
          setTutors(response.data.learningNeeds);
          setFilteredTutors(response.data.learningNeeds);
          setLoading(false); // Stop loading animation
        }, 1000); // Delay for 1 second
      } else {
        console.error('Invalid data format received:', response.data);
      }
    } catch (error) {
      console.error('Error fetching tutors:', error);
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
    const [lat2, lon2] = coords2;

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

  const fetchUserCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoords([latitude, longitude]);console.log(userCoords);
        },
        
        (error) => {
          console.error('Error fetching user coordinates:', error);
        }
      );
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

  const applyFilters = async () => {
    // Build the query parameters based on available filters
    let filteredResults = tutors; 
    const {city,distance, genderPreference,categories } = filters;
    
    // Start with the base URL
    let url = 'https://server.avyudha.com/learning-needs?limit=100000000000&';
  
    // Dynamically append filters to the URL
    if ((distance && userCoords)) {
      const reversedCoords = [...userCoords].reverse(); // Reverse the coordinates for query
      url += `maxDistance=${distance}&coordinates=${userCoords.join(",")}&`;
    }

    // if (skillAndExperience.length > 0) {
    //   url += `&jobCategories=${skillAndExperience.join(',')}`;
    // }
    if (city) {
      url += `location=${encodeURIComponent(city)}&`;
    }
   
    if (genderPreference) {
      url += `genderPreference=${encodeURIComponent(genderPreference)}&`;
    }
    if (categories.length > 0) {
      url += `&requirement=${categories.join(',')}`;
    }
   
  
    // Make the GET request to the server
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // If the request was successful, update the state with the filtered jobs
      if (response.ok) {
        
        setFilteredTutors(data.learningNeeds); // Assuming the API returns the filtered list of jobs
        // console.log(filteredTutors);
      } else {
        console.error('Failed to fetch jobs:', data.message);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
 
      setCurrentPage(1);
    
    
 
    setShowFilters(false); // Optionally hide the filters after applying
    
  };

  const filterByDistance = (job) => {
    if (!userCoords || !distanceFilter || !job.location || !job.location.coordinates) return true;
    const jobCoords = job.location.coordinates;
    const distance = calculateDistance(userCoords, jobCoords);
    return distance <= distanceFilter;
  };
  

  return (
    <div className="flex flex-col md:flex-row mx-auto max-w-[1800px] p-4">
      {/* Container */}
      <div className="flex flex-col md:flex-row mx-auto w-4/5 gap-6">
        
        {/* Mobile Filter Button */}
        <div className="md:hidden w-full flex justify-end">
          <button
            onClick={() => setShowFilters(true)}
            className="text-white px-4 py-2 rounded-lg bg-[#041F96] hover:bg-[#032c6b] transition flex items-center gap-2"
          >
             <HiFilter className="w-5 h-5" />
          </button>
        </div>
  
        {/* Filter Sidebar (Mobile: Popup, Desktop: Sidebar) */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center md:relative md:bg-transparent md:z-auto ${
            showFilters ? "block" : "hidden"
          } md:block`}
          onClick={toggleFilters}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm md:max-w-[420px] md:w-full relative"
           onClick={(e) => e.stopPropagation()}>
            {/* Close Button for Mobile */}
            <button
              onClick={() => setShowFilters(false)}
              className="absolute top-3 right-3 text-gray-600 md:hidden"
            >
              ✕
            </button>
            
  
            <form className="space-y-6">
              {/* City Input */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="city">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#041F96]"
                />
                <button
                  type="button"
                  onClick={fetchUserCoordinates}
                  className="mt-3 bg-[#041F96] text-white w-full px-4 py-2 rounded-lg hover:bg-[#032c6b] transition"
                >
                  Use My Location
                </button>
              </div>
  
              {/* Distance & Gender Preference in One Row */}
              <div className="grid grid-cols-1 gap-4">
                {/* Distance Input */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="distance">
                    Distance (km)
                  </label>
                  <input
                    type="number"
                    name="distance"
                    id="distance"
                    placeholder="Enter distance"
                    value={filters.distance}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#041F96]"
                  />
                </div>
  
                {/* Gender Preference */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="genderPreference">
                    Gender
                  </label>
                  <select
                    name="genderPreference"
                    value={filters.genderPreference}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#041F96]"
                  >
                    <option value="">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
  
              {/* Requirements Input */}
              <div className="mb-4 relative">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Categories">
    Requirements
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
          className="bg-blue-100 text-blue-800 text-sm  py-1 px-2 rounded-full flex items-center gap-1"
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
  
              {/* Apply Filters Button */}
              <button
                type="button"
                onClick={() => {
                  applyFilters();
                  setShowFilters(false);
                }}
                className="w-full bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-[#032c6b] transition"
              >
                Apply Filters
              </button>
            </form>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="flex flex-col w-full">
          <h2 className="text-3xl font-bold text-[#041F96] mb-6">Tuition Needs</h2>
  
          {loading ? (
        // ✅ Loading Animation (Skeleton Cards)
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
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
          ))}
        </div>
      ) : (
        // ✅ Show Actual Cards If Not Loading
        currentTutors.length > 0 ? (
          currentTutors.map((tutor, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg sm:-mx-4 md:-mx-0 p-6 mb-4 border-l-4 border-[#041F96] transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 hover:bg-gray-50">
              <Link to={`/getNeed/${tutor._id}`} className="block w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
  {/* Title & Created Date */}
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <h3 className="text-xl font-semibold text-[#041F96]">{tutor.requirement}</h3>
    <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full sm:mt-0 mt-2">
    {tutor.typeOfClass}
  </span>
   
  </div>

  {/* Type of Class */}
  <span className="text-sm sm:text-base text-green-700">
     
      {(() => {
        const dateObj = new Date(tutor.createdAt);
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


                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-gray-700 text-2xs">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <FaMapMarkerAlt />
                    </div>
                    {tutor.location.landmark}, &nbsp;{tutor.location.city},  &nbsp;{tutor.location.state},&nbsp;{tutor.location.pinCode}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <FaChalkboardTeacher />
                    </div>
                    {tutor.start}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <FaUsers />
                    </div>
                    {tutor.connectedTutorsCount} Tutors connected
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <FaVenusMars />
                    </div>
                    {tutor.genderPreference}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <FaClock />
                    </div>
                    {tutor.available}
                  </div>
                  <div className="flex items-center gap-2">
  <div className="p-2 bg-green-200 rounded-full">
    <FaRupeeSign className="text-black" />
  </div>

  {tutor.salary.period === "Not sure, will discuss with tutor and decide" ? (
    <span>{tutor.salary.period}</span>
  ) : (
    <span>
      Rs. {tutor.salary.max} / {tutor.salary.period}
    </span>
  )}
</div>
                  {/* <div className="flex items-center gap-2">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <FaRegClock />
                    </div>
 
  
  <strong> Created:</strong> {new Date(tutor.createdAt).toLocaleDateString("en-GB")}
</div> */}

                
</div>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <FaInfoCircle />
                    </div>
                    {tutor.description.length > 150 ? `${tutor.description.substring(0, 150)}...` : tutor.description}
                  </div>
               

                {/* ✅ Distance Calculation */}
                {userCoords && tutor.location?.coordinates && (
                  <div className="mt-2 text-gray-700">
                   <strong>Distance: {calculateDistance(userCoords, tutor.location.coordinates).toFixed(2)} km
                   </strong> </div>
                )}
              </Link>
            </div>
          ))
        ) : (
          // ✅ Show Skeleton Cards If No Data
          
            <p className="text-gray-700">No Tuition Needs found matching your criteria.</p>
          ))}
          <div className="flex justify-center gap-4 mt-6">
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

export default NeedsFinder;