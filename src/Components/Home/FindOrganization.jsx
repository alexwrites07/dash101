import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiFilter, HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import './Jobpost.css';

const OrganizationFinder = () => {
  const [tutors, setTutors] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState('');
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    organizationType: '',
    city: '',
    subjectsRequired: '',
  });

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const response = await axios.get('https://backend.akshayy.tech/getOrgs');
      if (response.data && response.data.organizations && Array.isArray(response.data.organizations)) {
        setTutors(response.data.organizations);
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

  const filterByDistance = (job) => {
    if (!userCoords || !distanceFilter || !job.location || !job.location.coordinates) return true;
    const jobCoords = job.location.coordinates;
    const distance = calculateDistance(userCoords, jobCoords);
    return distance <= distanceFilter;
  };

  const applyFilters = () => {
    const filtered = tutors.filter((tutor) => {
      const { subjectsRequired, organizationType } = tutor;
      const city = tutor.location?.city || '';
      const subjectMatch = filters.subjectsRequired
        ? subjectsRequired.includes(filters.subjectsRequired)
        : true;
      const cityMatch = filters.city
        ? city.toLowerCase().includes(filters.city.toLowerCase())
        : true;
      const organizationMatch = filters.organizationType
        ? organizationType.toLowerCase().includes(filters.organizationType.toLowerCase())
        : true;

      let isMatch = subjectMatch && cityMatch && organizationMatch;

      if (distanceFilter && !filterByDistance(tutor)) isMatch = false;

      return isMatch;
    });
    setFilteredTutors(filtered);
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
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(e.target.value)}
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
              onClick={applyFilters}
              className="w-full bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none"
            >
              Apply Filters
            </button>
          </form>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className='text-bold text-xl ml-4'>Organizations</div>
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor, index) => (
              <div className="shadow rounded flex flex-col md:flex-row items-start border-b border-gray-200 py-4 mb-4 w-full" key={index}>
                <div className="flex-shrink-0 mb-2 md:mb-0 md:mr-4 ml-4 h-16"></div>
                <Link to={`/getOrg/${tutor._id}`} className="block w-full">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full ml-2">
                    <div>
                      <h2 className="text-lg font-semibold">{tutor.location.city}, {tutor.location.address}</h2>
                      <h2 className="text-lg">Requirements: {tutor.subjectsRequired.join(", ")}</h2>
                      <h2 className="text-lg">Organization Type: {tutor.organizationType}</h2>
                    </div>
                    <div className="flex md:ml-4 md:items-center -mb-2 w-3/3 mr-2 ml-2">
                      {userCoords && tutor.location?.coordinates && (
                        <p className="text-gray-700 mr-4">Distance: {calculateDistance(userCoords, tutor.location.coordinates).toFixed(2)} km</p>
                      )}
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center mr-4">
                      <button className="ml-2 mr-6">
                        {tutor.bookmarked ? <HiBookmark className="text-blue-500" /> : <HiOutlineBookmark />}
                      </button>
                      <button className="bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none">
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
