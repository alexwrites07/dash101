import React, { useState } from 'react';

const TutorFinder = () => {
  const [tutors, setTutors] = useState([
    {
      name: 'John Doe',
      profilePic: 'https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_11368.png',
      duration: 'Full-time',
      postingTime: '1 day ago',
      location: 'New York, NY',
      role: 'Coaching',
      stipend: '$80,000 - $100,000',
    },
    {
      name: 'Jane Smith',
      profilePic: 'https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_11368.png',
      duration: 'Part-time',
      postingTime: '2 days ago',
      location: 'San Francisco, CA',
      role: 'Private Tutor',
      stipend: '$60,000 - $80,000',
    },
    {
      name: 'Alice Johnson',
      profilePic: 'https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_11368.png',
      duration: 'Contract',
      postingTime: '3 days ago',
      location: 'Chicago, IL',
      role: 'Professor',
      stipend: '$70,000 - $90,000',
    },
    {
      name: 'Michael Brown',
      profilePic: 'https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_11368.png',
      duration: 'Remote',
      postingTime: '4 days ago',
      location: 'Los Angeles, CA',
      role: 'Teacher',
      stipend: '$75,000 - $95,000',
    },
    {
      name: 'Emily Davis',
      profilePic: 'https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_11368.png',
      duration: 'Full-time',
      postingTime: '5 days ago',
      location: 'Boston, MA',
      role: 'Software Developer',
      stipend: '$85,000 - $110,000',
    },
    {
      name: 'David Wilson',
      profilePic: 'https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_11368.png',
      duration: 'Part-time',
      postingTime: '6 days ago',
      location: 'Austin, TX',
      role: 'Data Scientist',
      stipend: '$70,000 - $90,000',
    },
  ]);

  const [sortBy, setSortBy] = useState('date'); // Default sort by date
  const [showAll, setShowAll] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    category: '',
    jobType: '',
  });

  const maxVisibleTutors = 5;

  const toggleShowMore = () => {
    setShowAll(!showAll);
  };

  const sortTutors = (criteria) => {
    let sortedTutors = [...tutors];
    switch (criteria) {
      case 'date':
        sortedTutors.sort((a, b) => new Date(b.postingTime) - new Date(a.postingTime));
        break;
      case 'role':
        sortedTutors.sort((a, b) => a.role.localeCompare(b.role));
        break;
      case 'stipend':
        sortedTutors.sort((a, b) => {
          const aStipend = parseInt(a.stipend.replace(/[^0-9.-]+/g, ''));
          const bStipend = parseInt(b.stipend.replace(/[^0-9.-]+/g, ''));
          return aStipend - bStipend;
        });
        break;
      default:
        break;
    }
    setTutors(sortedTutors);
    setSortBy(criteria);
  };

  const visibleTutors = showAll ? tutors : tutors.slice(0, maxVisibleTutors);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredTutors = tutors.filter((tutor) => {
    return (
      (filters.keyword === '' || tutor.role.toLowerCase().includes(filters.keyword.toLowerCase())) &&
      (filters.location === '' || tutor.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.category === '' || tutor.role.toLowerCase().includes(filters.category.toLowerCase())) &&
      (filters.jobType === '' || tutor.duration.toLowerCase().includes(filters.jobType.toLowerCase()))
    );
  });

  return (
    <div className="max-w-full mx-auto flex mt-6 px-4">
      {/* Sidebar for Filters */}
      <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-lg mr-6">
        <h2 className="text-2xl text-[#041F96] font-bold mb-4">Filter Tutors</h2>
        
        {/* Keyword Filter */}
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
        
        {/* Location Filter */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
          <a href="/googlemap" className="font-medium text-primary-600 hover:underline"><button
              className="bg-[#041F96] text-white px-4 py-2 rounded-lg hover:bg-[#041F96] focus:outline-none">Enter Location</button></a>
        </div>
        
        {/* Category Filter */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        
        {/* Job Type Filter */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobType">Job Type</label>
          <select
            name="jobType"
            id="jobType"
            value={filters.jobType}
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
      </div>
      
      {/* Main Content */}
      <div className="w-3/4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl text-[#041F96] font-bold">Tutor Listings</h2>
          <div>
            <label htmlFor="sort" className="mr-2 text-sm font-bold text-gray-700">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => sortTutors(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="date">Date</option>
              <option value="role">Role</option>
              <option value="stipend">Stipend</option>
            </select>
          </div>
        </div>
        
        {filteredTutors.length > 0 ? (
          <div className="space-y-4">
            {filteredTutors.map((tutor, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-lg flex">
                <img
                  src={tutor.profilePic}
                  alt={tutor.name}
                  className="w-24 h-24 rounded-full mr-4 object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{tutor.name}</h3>
                  <p className="text-gray-600">{tutor.role}</p>
                  <p className="text-gray-600">{tutor.location}</p>
                  <p className="text-gray-600">{tutor.duration}</p>
                  <p className="text-gray-600">{tutor.stipend}</p>
                  <p className="text-gray-600 text-sm">{tutor.postingTime}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No tutors found.</p>
        )}
        
        {filteredTutors.length > maxVisibleTutors && (
          <div className="mt-4 text-center">
            <button
              onClick={toggleShowMore}
              className="px-4 py-2 bg-[#041F96] text-white rounded-lg"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorFinder;
