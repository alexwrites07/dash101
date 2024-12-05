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
    highestQualification:'',
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
      const response = await axios.get('https://server.avyudha.com/getTutors');
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
  const applyFilters = () => {
    const filtered = tutors.filter((tutor) => {
      const {
        subjectsTaught,
        location,
        totalExperience,
        highestQualification,
        gender,
        jobAlerts,
        tags,
        categories,
      } = tutor;
  
      const city = location?.city || '';
      const minSalary = jobAlerts?.minExpectedSalary?.value || 0;
      const maxSalary = jobAlerts?.maxExpectedSalary?.value || Infinity;
  
      const matches = {
        subjectMatch: !filters.subjectsTaught || subjectsTaught.includes(filters.subjectsTaught),
        cityMatch: !filters.city || city.toLowerCase().includes(filters.city.toLowerCase()),
        experienceMatch: !filters.totalExperience || totalExperience >= +filters.totalExperience,
        qualMatch: !filters.highestQualification || highestQualification?.toLowerCase().includes(filters.highestQualification.toLowerCase()),
        genderMatch: !filters.gender || gender.toLowerCase() === filters.gender.toLowerCase(),
        minSalaryMatch: !filters.minExpectedSalary || minSalary >= +filters.minExpectedSalary,
        maxSalaryMatch: !filters.maxExpectedSalary || maxSalary <= +filters.maxExpectedSalary,
        categoryMatch: filters.categories.length === 0 || filters.categories.some(cat => categories.includes(cat))
      };
  
      const isMatch = Object.values(matches).every(Boolean);
  
      if (distanceFilter && !filterByDistance(tutor)) return false;
      
      return isMatch;
    });
  
    setFilteredTutors(filtered);
  };
  
  
  
  

   

  return (
    <div className="flex flex-col md:flex-row  mx-auto max-w-[1800px] p-4">
      <div className="flex flex-col md:flex-row  mx-auto max-w-[1800px] w-4/5">
        <div className="md:hidden w-full flex justify-end mb-6">
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-white px-4 py-2 rounded-lg bg-[#041F96] focus:outline-none"
          >
            <HiFilter className="w-4 h-4" />
          </button>
        </div>
        <div className={`md:block p-4 bg-gray-100 rounded-lg shadow-lg mb-6 ${showFilters ? '' : 'hidden'}`} style={{ width: '100%', maxWidth: '300px', height: 'fit-content' }}>
          <form className="space-y-4">
            {/* <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subjectsTaught">Subjects Taught</label>
              <input
                type="text"
                name="subjectsTaught"
                value={filters.subjectsTaught}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div> */}
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalExperience">Experience (Years)</label>
              <input
                type="number"
                name="totalExperience"
                value={filters.totalExperience}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="highestQualification">Qualification</label>
              <input
                type="text"
                name="highestQualification"
                value={filters.highestQualification}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender</label>
               
            <select
            value={filters.gender}
            onChange={handleFilterChange}
 
  className="border rounded px-3 py-2"
>
 
  <option value="">All Genders</option>
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
        <div className="flex flex-col items-start justify-start w-full ml-8">
          <div className='text-3xl font-bold text-[#041F96] mb-6'>Tutors</div>
          {paginatedTutors.length > 0 ? (
          paginatedTutors.map((tutor, index) => (
              <div className="shadow rounded flex flex-col md:flex-row items-start border-b border-gray-200 py-4 mb-4 w-full" key={index}>
                <div className="flex-shrink-0 mb-2 md:mb-0 md:mr-4 ml-4 h-16">
                <img
  src={`https://server.avyudha.com/tutors/download/image/${tutor._id}`}
  alt=""
  className="w-24 h-[70px] object-contain"
/>

                </div>
                <Link to={`/getTutor/${tutor._id}`} className="block w-full">
                  <div className="flex  md:justify-between w-full ml-2">
                    <div>
                      <div className="text-lg font-semibold">{tutor.fullName}</div>
                      <div className="text-gray-600">{tutor.title}</div>
                      {/* <span className="text-gray-600 mr-4">Rating - {tutor.rating}</span> */}
                      <div className="text-gray-600 mr-2">{tutor.location?.city}, {tutor.location?.state}</div>
                      <div className="text-gray-600 mr-6">{tutor.totalExperience} years</div>
                      <div className="text-gray-600 mr-6">{tutor.highestQualification}</div>
                    </div>
                    <div>
                    
                      <div className="flex md:ml-4 md:items-center -mb-2 w-3/3 mr-2 ml-2 my-auto">
          {userCoords && tutor.location?.coordinates && (
            <p className="text-gray-700 mr-4">Distance: {calculateDistance(userCoords, tutor.location.coordinates).toFixed(2)} km</p>
          )}
        </div>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center mr-4">
                      {/* <button className="ml-2 mr-6">
                        {tutor.bookmarked ? <HiBookmark className="text-blue-500" /> : <HiOutlineBookmark />}
                      </button> */}
                      <button className="bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none">
                        View
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div>No tutors match your criteria.</div>
          )}
          <div className="mt-4 flex justify-between w-full">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#041F96] text-white rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#041F96] text-white rounded-lg disabled:opacity-50"
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
