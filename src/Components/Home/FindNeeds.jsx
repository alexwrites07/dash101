import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiFilter, HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaChalkboardTeacher, 
  FaUsers, 
  FaVenusMars, 
  FaClock, 
  FaRupeeSign, 
  FaInfoCircle 
} from "react-icons/fa"
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

  const fetchTutors = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await axios.get('https://server.avyudha.com/learning-needs?limit=10000000', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data?.learningNeeds && Array.isArray(response.data.learningNeeds)) {
        setTutors(response.data.learningNeeds);
        setFilteredTutors(response.data.learningNeeds);
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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoords([latitude, longitude]);
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
    const {city,distance, genderPreference,categories } = filters;
    
    // Start with the base URL
    let url = 'https://server.avyudha.com/learning-needs?';
  
    // Dynamically append filters to the URL
    if ((distance && userCoords)) {
      const reversedCoords = [...userCoords].reverse(); // Reverse the coordinates for query
      url += `maxDistance=${distance}&coordinates=${userCoords.join(",")}&`;
    }

    // if (skillAndExperience.length > 0) {
    //   url += `&jobCategories=${skillAndExperience.join(',')}`;
    // }
    if (city) {
      url += `location.city=${encodeURIComponent(city)}&`;
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
<div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genderPreference">Gender</label>
               
            <select
            name="genderPreference"
            value={filters.genderPreference}
            onChange={handleFilterChange}
 
  className="border rounded px-3 py-2"
>
 
  <option value="">All Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Others">Others</option>
</select>
</div>
            <button
              type="button"
              onClick={applyFilters}
              className="w-full bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none"
            >
              Apply Filters
            </button>
          </form>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className='text-3xl font-bold text-[#041F96] mb-6 ml-8'>Tuition Needs</div>
          {filteredTutors?.length > 0 ? (
            filteredTutors?.map((tutor, index) => (
              <div className="shadow rounded flex flex-col md:flex-row items-start ml-8 border-b border-gray-200 py-4 mb-4 w-full" key={index}>
                <div className="flex-shrink-0 mb-2 md:mb-0 md:mr-4 ml-4 h-16"></div>
                <Link to={`/getNeed/${tutor._id}`} className="block w-full">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full ml-2">
                    <div>
                    <h2 className="text-lg  font-semibold">{tutor.requirement}</h2>    <span className="bg-blue-500 mb-8  text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600">{tutor.typeOfClass}</span><br></br>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4  -ml-2 text-sm text-gray-800">
  {/* Location */}
  <div className="flex items-center gap-2 w-full md:w-1/2 mt-4">
    <FaMapMarkerAlt className="text-black" />
    <span className="">{tutor.location.city}, {tutor.location.address}</span>
  </div>

  {/* Type of Class */}
  <div className="flex items-center gap-2 w-full md:w-1/2 mr-24">
  <FaChalkboardTeacher className="text-black" />
  <span className="">{tutor.start}</span>
  </div>

  {/* Connected Tutors Count */}
  <div className="flex items-center gap-2 w-full md:w-1/2 mr-48">
    <FaUsers className="text-black" />
    <span className="">{tutor.connectedTutorsCount} Tutors connected</span>
  </div>

  {/* Gender Preference */}
  <div className="flex items-center gap-2 w-full md:w-1/2">
    <FaVenusMars className="text-black" />
    <span className="">{tutor.genderPreference}</span>
  </div>

  {/* Availability */}
  <div className="flex items-center gap-2 w-full md:w-1/2">
    <FaClock className="text-black" />
    <span className="">{tutor.available}</span>
  </div>

  {/* Salary */}
  <div className="flex items-center gap-2 w-full md:w-1/2">
    <FaRupeeSign className="text-black" />
    <span className="">Rs. {tutor.salary.max}</span>
  </div>

  {/* Distance */}
 

  {/* Description */}
  <div className="flex items-center gap-2 w-full">
    <FaInfoCircle className="text-black" />
    <span className="">
      {tutor.description?.length > 150 
        ? `${tutor.description.substring(0, 150)}...` 
        : tutor.description}
    </span>
  </div></div> {userCoords && tutor.location?.coordinates && (
    <div className="flex mt-2 ml-2 items-center gap-2 w-full md:w-1/2">
      <FaMapMarkerAlt className="text-black" />
      Distance: {calculateDistance(userCoords, tutor.location.coordinates).toFixed(2)} km
      </div>
  )}
</div>

                    <div className="mt-2 md:mt-0 flex items-center mr-4">
                     
                      <button className="bg-[#041F96] text-white px-4 py-2 mt-48 rounded-lg hover:bg-primary-600 focus:outline-none">
                        View
                      </button>
                    </div>
                    
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-700 ml-4">No Tuition Needs found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NeedsFinder;