import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiFilter } from 'react-icons/hi';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import './Jobpost.css';
import categoriesList from './Dashboard/AdminPanel/categories.json'

const TutorFinder = () => {
  const [tutors, setTutors] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState('');
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [rating, setRating] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [inputText, setInputText] = useState('');
  const [inputText1, setInputText1] = useState(''); // Separate state for input text
  const [suggestions, setSuggestions] = useState([]);
  const [suggestions1, setSuggestions1] = useState([]);

  const jobsPerPage = 15;
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    subjectsTaught: '',
    city: '',
    totalExperience: '',
    gender:'',
    qualifications:'',
    
    minExpectedSalary: '',
    maxExpectedSalary: '',
    tags: '',
    categories:'',
  });

  useEffect(() => {
    fetchTutors();
  }, []);
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
      const response = await axios.get('https://server.avyudha.com/getTutors?limit=1000000000');
      if (response.data && response.data.tutors && Array.isArray(response.data.tutors)) {
        setTutors(response.data.tutors);
        setFilteredTutors(response.data.tutors); // Set the initial filtered tutors
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

    const distance = R * c;

    return distance;
  };

  const filterByDistance = (job) => {
    if (!userCoords || !distanceFilter || !job.location || !job.location.coordinates) return true;

    const jobCoords = job.location.coordinates;
    const distance = calculateDistance(userCoords, jobCoords);

    return distance <= distanceFilter;
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
        const { latitude, longitude } = position.coords;
        setUserCoords([latitude, longitude]);
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
    setTutors([]);  // Clear current tutors
  
    try {
      const { city, distance, totalExperience, qualifications, gender, categories } = filters;
  
      let queryString = `location.city=${city}&totalExperience=${totalExperience}&qualifications=${qualifications}&gender=${gender}`;
      
      if (distance && userCoords) {
        // Add distance condition to the query string if user coordinates are available
        queryString += `&distance=${distance}`;
      }
  
      if (categories.length > 0) {
        queryString += `&categories=${categories.join(',')}`;
      }
  
      const url = `https://server.avyudha.com/getTutors?${queryString}`;
  
      const response = await axios.get(url);
  
      if (response.data && response.data.tutors) {
        setTutors(response.data.tutors);
      } else {
        console.error("No tutors found with the selected filters.");
      }
    } catch (err) {
      console.error("An error occurred while fetching tutors.", err);
    }
  };
  

   

return (
  <div className="flex flex-col md:flex-row mx-auto p-6 bg-[#F9FAFB] text-[#0D1B2A]">
    <div className="flex flex-col md:flex-row mx-auto w-4/5">
      {/* Tutors Section */}
      <div className="flex flex-col items-start justify-start w-full md:mr-8">
        <div className="text-4xl font-bold text-[#0D1B2A] mb-6">Tutors</div>
        {tutors.length > 0 ? (
          tutors.map((tutor, index) => (
            <div className="flex flex-col md:flex-row items-center justify-between shadow-lg rounded-lg py-6 px-8 mb-6 w-full bg-white transition duration-300 hover:shadow-xl cursor-pointer transform hover:scale-105" key={index}>
              {/* Image Section */}
              <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden bg-gray-200">
                <img
                  src={`https://server.avyudha.com/tutors/download/image/${tutor._id}`}
                  alt="Tutor"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tutor Details Section */}
              <div className="flex-1 px-6">
                <div className="text-xl font-semibold text-[#0D1B2A]">{tutor.fullName}</div>
                <div className="text-sm text-[#3A506B] font-medium">{tutor.title}</div>
                <div className="text-sm text-gray-500">
                  {tutor.location?.city}, {tutor.location?.state}
                </div>
                <div className="text-sm text-gray-500">
                  {tutor.totalExperience} years of experience
                </div>
                <div className="text-sm text-gray-500">
                  {tutor.qualifications}
                </div>
                <div className="text-sm text-gray-500 capitalize">{tutor.gender}</div>
              </div>

              {/* Distance Section */}
              {userCoords && tutor.location?.coordinates && (
                <div className="flex flex-col items-center text-gray-700">
                  <p className="text-sm">Distance:</p>
                  <span className="text-lg font-semibold text-[#0D1B2A]">
                    {calculateDistance(
                      userCoords,
                      tutor.location.coordinates
                    ).toFixed(2)} km
                  </span>
                </div>
              )}

              {/* View Button Section */}
              <div className="flex items-center ml-6">
                <Link to={`/getTutor/${tutor._id}`}>
                  <button className="bg-[#3A506B] text-white px-6 py-2 rounded-lg hover:bg-[#1E3D58] transition duration-300">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No tutors match your criteria.</div>
        )}

        {/* Pagination Section */}
        <div className="mt-6 flex justify-between w-full">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-6 py-3 bg-[#3A506B] text-white rounded-lg hover:bg-[#1E3D58] disabled:opacity-50 transition duration-300"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-6 py-3 bg-[#3A506B] text-white rounded-lg hover:bg-[#1E3D58] disabled:opacity-50 transition duration-300"
          >
            Next
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div
        className={`md:block p-6 bg-white rounded-lg shadow-lg ${showFilters ? "" : "hidden"}`}
        style={{
          width: "100%",
          maxWidth: "320px",
          height: "fit-content",
        }}
      >
        <form className="space-y-1">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">
              City
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
              className="mt-4 bg-[#3A506B] text-white px-5 py-2 rounded-full hover:bg-[#1E3D58] transition duration-300"
            >
              Use My Location
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="distance">
              Distance (in km)
            </label>
            <input
              type="number"
              name="distance"
              id="distance"
              placeholder="Enter distance in km"
              value={distanceFilter}
              onChange={(e) => handleFilterChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:outline-none"
            />
          </div>
          
                
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Categories">
              Categories
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
              Experience
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
              Qualification
            </label>
            <input
              type="text"
              name="qualifications"
              value={filters.qualifications}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="gender">
              Gender
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
            className="w-full bg-[#F4A261] text-white px-5 py-3 rounded-full hover:bg-[#E76F51] transition duration-300"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </div>
  </div>
);

};

export default TutorFinder;
