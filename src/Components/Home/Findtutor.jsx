import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiFilter } from 'react-icons/hi';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import './Jobpost.css';

const TutorFinder = () => {
  const [tutors, setTutors] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState('');
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    subjectsTaught: '',
    city: '',
    totalExperience: '',
    minExpectedSalary: '',
    maxExpectedSalary: '',
    tags: '',
  });

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const response = await axios.get('https://backend.akshayy.tech/getTutors');
      if (response.data && Array.isArray(response.data)) {
        setTutors(response.data);
        setFilteredTutors(response.data);
      } else {
        console.error('Invalid data format received:', response.data);
      }
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  const filterByDistance = (job) => {
    if (!userCoords || !distanceFilter || !job.location || !job.location.coordinates) return true;

    const jobCoords = job.location.coordinates;
    const distance = calculateDistance(userCoords, jobCoords);

    return distance <= distanceFilter;
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
    let filteredTutors = tutors.filter((tutor) => {
      const { subjectsTaught, location, totalExperience, jobAlerts, tags } = tutor;
      const city = location?.city || '';
      const minSalary = jobAlerts?.minExpectedSalary?.value ?? 0;
      const maxSalary = jobAlerts?.maxExpectedSalary?.value ?? Infinity;

      const subjectMatch = filters.subjectsTaught ? subjectsTaught.includes(filters.subjectsTaught) : true;
      const cityMatch = filters.city ? city.toLowerCase().includes(filters.city.toLowerCase()) : true;
      const experienceMatch = filters.totalExperience ? totalExperience >= parseInt(filters.totalExperience) : true;
      const minSalaryMatch = filters.minExpectedSalary ? minSalary >= parseInt(filters.minExpectedSalary) : true;
      const maxSalaryMatch = filters.maxExpectedSalary ? maxSalary <= parseInt(filters.maxExpectedSalary) : true;
      const tagsMatch = filters.tags ? tags.includes(filters.tags) : true;

      return subjectMatch && cityMatch && experienceMatch && minSalaryMatch && maxSalaryMatch && tagsMatch;
    });

    setFilteredTutors(filteredTutors);
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
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobType">Job Type</label>
              <select
                name="jobType"
                id="jobType"
                placeholder="Enter Full Name"
                value={filters.fullName}
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experienceLevel">Experience Level</label>
              <input
                type="text"
                name="experienceLevel"
                placeholder="Subjects Taught"
                id="experienceLevel"
                value={filters.subjectsTaught}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="careerLevel">Career Level</label>
              <input
                type="text"
                name="careerLevel"
                placeholder="Enter Experience Type"
                id="careerLevel"
                value={filters.totalExperience}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
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
        <div className="w-full flex flex-col items-center justify-center">
          {filteredTutors.map((tutor, index) => (
            <div className="shadow rounded flex flex-col md:flex-row items-start border-b border-gray-200 py-4 mb-4 w-full" key={index}>
              <div className="flex-shrink-0 mb-2 md:mb-0 md:mr-4 ml-4 h-16">
                <img src={tutor.image} alt="Company Logo" className="w-full h-full object-contain" />
              </div>
              <Link to={`/getTutor/${tutor._id}`} className="block w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full ml-2">
                  <div>
                    <h2 className="text-lg font-semibold">{tutor.fullName}</h2>
                    <span className="text-gray-600">{tutor.jobTitle}</span>
                    <span className="text-gray-600 mr-2">{tutor.location?.city}, {tutor.location?.state}</span>
                    
                  </div>
                  <div>
                  <span className="text-gray-600 mr-6">{tutor.totalExperience} years </span>
                    <span className="text-gray-600 mr-6">{tutor.highestQualification}</span>
                    <span className="text-gray-600 mr-6">{tutor.distanceFromUser} km away</span>
                  </div>
                  <div className="mt-2 md:mt-0 flex items-center mr-8">
                  <button className="ml-2 mr-6">
                      {tutor.bookmarked ? <HiBookmark className="text-blue-500" /> : <HiOutlineBookmark className="text-blue-500" />}
                    </button>
                    <button className="flex items-center justify-center bg-[#041F96] hover:bg-[#041F96] text-white px-4 py-2 rounded-lg">
                      Apply Now
                    </button>
                   
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorFinder;
