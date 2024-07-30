import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiFilter } from 'react-icons/hi';
import './Jobpost.css';
const TutorFinder = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Find a Tutor</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => setShowFilters(!showFilters)}
        >
          <HiFilter className="mr-2" /> Filters
        </button>
      </div>
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border rounded-lg bg-gray-100">
          <div>
            <label className="block mb-1">Subject</label>
            <input
              type="text"
              name="subjectsTaught"
              value={filters.subjectsTaught}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">City</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">Experience (years)</label>
            <input
              type="number"
              name="totalExperience"
              value={filters.totalExperience}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">Min Salary</label>
            <input
              type="number"
              name="minExpectedSalary"
              value={filters.minExpectedSalary}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">Max Salary</label>
            <input
              type="number"
              name="maxExpectedSalary"
              value={filters.maxExpectedSalary}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">Tags</label>
            <input
              type="text"
              name="tags"
              value={filters.tags}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="col-span-full flex justify-end">
            <button
              className="px-4 py-2 bg-[#041F96] text-white rounded-lg hover:bg-green-600"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTutors.map((tutor) => (
          
          <div key={tutor._id} className="border rounded-lg p-4 shadow-lg bg-white">
            <img
              src={tutor.image}
              alt={tutor.fullName}
              className="w-full h-40  rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{tutor.fullName}</h3>
            <p className="text-gray-600 mb-2">{tutor.description}</p>
            <p className="text-gray-600 mb-1">
              <strong>Subjects:</strong> {tutor.subjectsTaught.join(', ')}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Location:</strong> {tutor.location.city}, {tutor.location.state}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Experience:</strong> {tutor.totalExperience} years
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Expected Salary:</strong>{' '}
              {tutor.jobAlerts?.minExpectedSalary?.value ?? 'N/A'} -{' '}
              {tutor.jobAlerts?.maxExpectedSalary?.value ?? 'N/A'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorFinder;
