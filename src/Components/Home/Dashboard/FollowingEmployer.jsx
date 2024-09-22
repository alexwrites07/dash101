import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import axios from 'axios';

const EmployersPage = () => {
  const [employers, setEmployers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [error, setError] = useState(null);


  
  const token = localStorage.getItem('token');


  // Fetch data from the backend
  useEffect(() => {
    axios
      .get('https://backend.akshayy.tech/tutor/following', {
        headers: {
          Authorization: `Bearer ${token}` // Set the Authorization header
        }
      })
      .then((response) => {
        const employersData = response.data.map((employer) => ({
          id: employer._id,
          name: employer.name,
          location: employer.location?.city || 'N/A', // Use 'N/A' if city is undefined
          type: 'Education Institute', // Assuming a type for demonstration
          featured: false, // Assume default as false since it's not in backend data
          jobOpenings: employer.jobPostings?.length || 0, // Use 0 if jobPostings is undefined
          isBookmarked: false, // Assuming initial bookmark state
        }));
        setEmployers(employersData);
      })
      .catch((error) => {
        console.error('Error fetching employers:', error);
        setError('Failed to fetch employers. Please try again later.');
      });
  }, [token]);
  

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const toggleBookmark = (id) => {
    setEmployers((prevEmployers) =>
      prevEmployers.map((employer) =>
        employer.id === id ? { ...employer, isBookmarked: !employer.isBookmarked } : employer
      )
    );
  };

  const filteredEmployers = employers.filter((employer) =>
    (employer.name?.toLowerCase().includes(searchQuery.toLowerCase()) || '')
    ||
    (employer.location?.toLowerCase().includes(searchQuery.toLowerCase()) || '')
    ||
    (employer.type?.toLowerCase().includes(searchQuery.toLowerCase()) || '')
  );
  
  const sortedEmployers = filteredEmployers.sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortOption === 'jobOpenings') {
      return b.jobOpenings - a.jobOpenings;
    }
    return 0;
  });

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="mt-4 lg:ml-64 lg:mt-4 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 mt-24">Employers</h1>

          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="p-2 border border-gray-300 rounded-lg w-full lg:w-1/3"
              />
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="p-2 border border-gray-300 rounded-lg ml-4"
              >
                <option value="default">Sort by</option>
                <option value="name">Name</option>
                <option value="jobOpenings">Job Openings</option>
              </select>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">List of Employers</h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : sortedEmployers.length > 0 ? (
              sortedEmployers.map((employer) => (
                <div key={employer.id} className="mb-4 p-4 border border-gray-300 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{employer.name}</h3>
                    <p className="text-md text-gray-700">{employer.location}</p>
                    <p className="text-md text-gray-700">{employer.type}</p>
                  </div>
                  <div className="flex items-center">
                    {employer.featured && <span className="bg-yellow-500 text-white py-1 px-3 rounded-full text-xs mr-2">Featured</span>}
                    <span className="bg-green-500 text-white py-1 px-3 rounded-full text-xs mr-2">{employer.jobOpenings} Job Openings</span>
                    {employer.isBookmarked ? (
                      <FaBookmark
                        className="text-blue-600 hover:text-blue-700 ml-2 cursor-pointer"
                        onClick={() => toggleBookmark(employer.id)}
                      />
                    ) : (
                      <FaRegBookmark
                        className="text-blue-600 hover:text-blue-700 ml-2 cursor-pointer"
                        onClick={() => toggleBookmark(employer.id)}
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No employers found</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmployersPage;
