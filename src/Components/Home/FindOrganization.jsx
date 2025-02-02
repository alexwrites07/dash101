import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiFilter, HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import DistanceDisplay from '../Distance';
import './Jobpost.css';
import { FaMapMarkerAlt, FaBuilding, FaStar } from "react-icons/fa";

const OrganizationFinder = () => {
  const [tutors, setTutors] = useState([]);


  const toggleFilters = () => setShowFilters(!showFilters);

  const [org, setOrg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [distance, setDistance] = useState('');
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [inputText, setInputText] = useState('');
  const [inputText1, setInputText1] = useState(''); // Separate state for input text
  const [suggestions, setSuggestions] = useState([]);
  const [suggestions1, setSuggestions1] = useState([]);

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    organizationType: '',
    city: '',
    distance:'',
    subjectsRequired: '',
  });

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const response = await axios.get('https://server.avyudha.com/getOrgs');
      if (response.data && response.data.organizations && Array.isArray(response.data.organizations)) {
        setOrg(response.data.organizations);
        setFilteredTutors(response.data.organizations);
        setTimeout(() => {
           // Set the initial filtered tutors
           setOrg(response.data.organizations);
           setFilteredTutors(response.data.organizations);
          setIsLoading(false); // Stop loading animation
        }, 1000);
      } else {
        console.error('Invalid data format received:', response.data);
      }
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
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

    return R * c;
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

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`https://server.avyudha.com/reviews/profile/${IId}`);
      // Filter reviews based on reviewedId matching tutor's ID
      const filteredReviews = response.data.reviews.filter(review => review.reviewedId === Id);
      setReviews(filteredReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      
    }
  };
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filterByDistance = (job) => {
    if (!userCoords || !distance || !job.location || !job.location.coordinates) return true;
    const jobCoords = job.location.coordinates;
    const distance = calculateDistance(userCoords, jobCoords);
    return distance <= distance;
  };

  const ApplyFilter = async () => {

      // Create the base URL
      let url = `https://server.avyudha.com/getOrgs?`;

      // Extract filters
      const { city, distance, organizationType } = filters;
  
      // Add filters to the URL if they are present
      if (city) {
        url += `city=${city}&`;
      }
      if (organizationType) {
        url += `organizationType=${organizationType}&`;
      }
      if ((distance && userCoords)) {
        const reversedCoords = [...userCoords].reverse(); // Reverse the coordinates for query
        url += `maxDistance=${distance}&coordinates=${reversedCoords.join(",")}&`;
      }
  
      // Fetch filtered data
      const response = await axios.get(url);
  
      // Set the response data to org state if valid
      if (response.data && response.data.organizations) {
        setOrg(response.data.organizations);
      } else {
        console.error("No organizations found with the selected filters.");
        setOrg([]); // In case no valid data returned, set empty
      }
      setShowFilters(false); 
     
  };
  
  return (
    <div className="flex flex-col md:flex-row mx-auto max-w-[1800px] p-4">
      <div className="flex flex-col md:flex-row mx-auto max-w-[1800px] w-4/5">
        {/* Mobile Filter Button */}
        <div className="md:hidden w-full flex justify-end mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-white px-4 py-2 rounded-lg bg-[#041F96] focus:outline-none shadow-md"
          >
            <HiFilter className="w-5 h-5" />
          </button>
        </div>

  
  
   <div>
  {/* Mobile Filter Button */}
  

  {/* Filters Modal for Mobile */}
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-lg"
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organizationType">Organization Type</label>
            <input
              type="text"
              name="organizationType"
              value={filters.organizationType}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button
            type="button"
            onClick={ApplyFilter}
            className="w-full bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </div>
  )}

  {/* Desktop Filter - Show this only on desktop */}
  <div
    className={`hidden md:block p-4 bg-white rounded-lg shadow-lg mb-6 ${showFilters ? 'block' : 'hidden'}`}
    style={{ width: '100%', maxWidth: '400px', height: 'fit-content' }}
  >
    <form className="space-y-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          value={filters.city}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 border rounded-lg"
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
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organizationType">Organization Type</label>
        <input
          type="text"
          name="organizationType"
          value={filters.organizationType}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <button
        type="button"
        onClick={ApplyFilter}
        className="w-full bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none"
      >
        Apply Filters
      </button>
    </form>
  </div>
</div>

  
        {/* Organization List */}
        <div className="flex flex-col items-start justify-start w-full ml-8">
  <div className="text-3xl font-bold text-[#041F96] mb-6 ml-8">
    Organizations
  </div>

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
          <div className="flex-grow px-4 w-full md:w-4/6 space-y-3">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-300 rounded-full w-6 h-6"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-300 rounded-full w-6 h-6"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-300 rounded-full w-6 h-6"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>

            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/4"></div>

            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      ))
  ) : org.length > 0 ? (
    org.map((tutor, index) => (
      <div
        key={index}
        className="shadow-lg rounded-lg border border-blue-400 bg-white p-6 mb-4 w-full flex flex-col md:flex-row hover:shadow-xl transition transform hover:scale-105 duration-300 hover:bg-gray-50"
      >
        <Link to={`/getOrg/${tutor._id}`} className="flex w-full flex-col md:flex-row">
          {/* Image Section */}
          <div className="flex-shrink-0 w-full md:w-1/6 flex items-center justify-center mb-4 md:mb-0">
            <img
              src={`https://server.avyudha.com/org/download/logo/${tutor._id}`}
              alt={tutor.title}
              className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 shadow-sm"
            />
          </div>

          {/* Details Section */}
          <div className="flex-grow px-4 w-full md:w-4/6">
            <h2 className="text-2xl font-semibold text-[#041F96] mb-4">{tutor.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800 mt-2">
              <p className="flex items-center gap-2">
                <span className="bg-gray-200 p-2 rounded-full">
                  <FaMapMarkerAlt className="text-gray-600" />
                </span>
                <span className="font-medium text-gray-600">
                  Location: {tutor.location.city}, {tutor.location.address}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <span className="bg-gray-200 p-2 rounded-full">
                  <FaBuilding className="text-gray-600" />
                </span>
                <span className="font-medium text-gray-600">
                  Type: {tutor.organizationType}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <span className="bg-gray-200 p-2 rounded-full">
                  <FaStar className="text-gray-500" />
                </span>
                <span className="font-medium text-gray-600">Rating: {tutor.rating}</span>
              </p>
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                <span>
                  {tutor.description?.length > 200
                    ? `${tutor.description.substring(0, 200)}...`
                    : tutor.description}
                </span>
              </p>
            </div>

            {/* Distance */}
            {userCoords && tutor.location?.coordinates && (
              <p className="text-gray-700 mt-4 text-sm">
                Distance: {calculateDistance(userCoords, tutor.location.coordinates).toFixed(2)} km
              </p>
            )}
          </div>
        </Link>
      </div>
    ))
  ) : (
    <p className="text-gray-700 ml-4">No organizations found matching your criteria.</p>
  )}
</div>

      </div>
    </div>
  );

};

export default OrganizationFinder;