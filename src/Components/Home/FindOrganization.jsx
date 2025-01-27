import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiFilter, HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import DistanceDisplay from '../Distance';
import './Jobpost.css';
import { FaMapMarkerAlt, FaBuilding, FaStar } from "react-icons/fa";

const OrganizationFinder = () => {
  const [tutors, setTutors] = useState([]);
  const [org, setOrg] = useState([]);
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
  };
  
  return (
    <div className="flex flex-col md:flex-row mx-auto max-w-[1800px] p-4">
      <div className="flex flex-col md:flex-row mx-auto max-w-[1800px] w-4/5">
        <div className="md:hidden w-full flex justify-end mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-white px-4 py-2 rounded-lg bg-[#041F96] focus:outline-none"
          >
            <HiFilter className="w-4 h-4" />
          </button>
        </div>
        <div
          className={`md:block p-4 bg-gray-100 rounded-lg shadow-lg mb-6 ${showFilters ? '' : 'hidden'}`}
          style={{ width: '100%', maxWidth: '300px', height: 'fit-content' }}
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
        <div className="flex flex-col items-start justify-start w-full">
  <div className="text-3xl font-bold text-[#041F96] mb-6 ml-8">Organizations</div>
  {org.length > 0 ? (
    org.map((tutor, index) => (
      <div
        className="shadow rounded flex flex-col md:flex-row items-start border-b border-gray-200 py-4 mb-4 w-full ml-8 hover:shadow-lg transition duration-300"
        key={index}
      >
        <Link to={`/getOrg/${tutor._id}`} className="flex w-full flex-col md:flex-row">
          {/* Section 1: Image */}
          <div className="flex-shrink-0 w-full md:w-1/6 flex items-center justify-center mb-4 md:mb-0">
            <img
              src={`https://server.avyudha.com/org/download/logo/${tutor._id}`}
              alt={tutor.title}
              className="w-32 h-32 object-cover rounded-md mx-2"
            />
          </div>

          {/* Section 2: Details */}
          <div className="flex-grow px-4 w-full md:w-4/6">
            <h2 className="text-lg font-semibold text-gray-800">{tutor.name}</h2><br></br>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4  -ml-2 text-sm text-gray-800">
              {/* Location */}
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-600" />
                <span className="font-medium text-gray-600">Location:</span> {tutor.location.city}, {tutor.location.address}
              </p>
              {/* Organization Type */}
              <p className="flex items-center gap-2">
                <FaBuilding className="text-gray-600" />
                <span className="font-medium text-gray-600">Organization Type:</span> {tutor.organizationType}
              </p>
              {/* Rating */}
              <p className="flex items-center gap-2">
                <FaStar className="text-gray-500" />
                <span className="font-medium text-gray-600">Rating:</span> {tutor.rating}
              </p>
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="text-sm text-gray-700">
              <span className="">
      Description: {tutor.description?.length > 100 
        ? `${tutor.description.substring(0, 200)}...` 
        : tutor.description}
    </span> </p>
            </div>

            {/* Distance */}
            {userCoords && tutor.location?.coordinates && (
              <p className="text-gray-700 mt-4"><span className="text-sm text-gray-600">
              Distance: {calculateDistance(userCoords, tutor.location.coordinates).toFixed(2)} km
            </span>

              </p>
            )}

            {/* View Button */}
            <div className="flex justify-end mt-4">
              <button className="bg-[#041F96] text-white px-6 py-2 rounded-lg hover:bg-[#032c6b] focus:outline-none">
                View
              </button>
            </div>
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