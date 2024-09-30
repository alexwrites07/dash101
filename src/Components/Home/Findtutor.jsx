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
  const [rating, setRating] = useState("");
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalExperience">Total Experience (Years)</label>
              <input
                type="number"
                name="totalExperience"
                value={filters.totalExperience}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minExpectedSalary">Min Expected Salary</label>
              <input
                type="number"
                name="minExpectedSalary"
                value={filters.minExpectedSalary}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxExpectedSalary">Max Expected Salary</label>
              <input
                type="number"
                name="maxExpectedSalary"
                value={filters.maxExpectedSalary}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">Tags</label>
              <input
                type="text"
                name="tags"
                value={filters.tags}
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
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor, index) => (
              <div className="shadow rounded flex flex-col md:flex-row items-start border-b border-gray-200 py-4 mb-4 w-full" key={index}>
                <div className="flex-shrink-0 mb-2 md:mb-0 md:mr-4 ml-4 h-16">
                  <img src={tutor.image} alt="Tutor Logo" className="w-full h-full object-contain" />
                </div>
                <Link to={`/getTutor/${tutor._id}`} className="block w-full">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full ml-2">
                    <div>
                      <h2 className="text-lg font-semibold">{tutor.fullName}</h2>
                      <span className="text-gray-600">{tutor.jobTitle}</span>
                      <span className="text-gray-600 mr-4">{tutor.rating}</span>
                      <span className="text-gray-600 mr-2">{tutor.location?.city}, {tutor.location?.state}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 mr-6">{tutor.totalExperience} years</span>
                      <span className="text-gray-600 mr-6">{tutor.highestQualification}</span>
                      <div className="flex md:ml-4 md:items-center -mb-2 w-3/3 mr-2 ml-2">
          {userCoords && tutor.location?.coordinates && (
            <p className="text-gray-700 mr-4">Distance: {calculateDistance(userCoords, tutor.location.coordinates).toFixed(2)} km</p>
          )}
        </div>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center mr-4">
                      <button className="ml-2 mr-6">
                        {tutor.bookmarked ? <HiBookmark className="text-blue-500" /> : <HiOutlineBookmark />}
                      </button>
                      <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none">
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
        </div>
      </div>
    </div>
  );
};

export default TutorFinder;
