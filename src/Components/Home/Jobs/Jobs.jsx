import React, { useState } from 'react';

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([
    {
      company: 'Example Company 1',
      duration: 'Full-time',
      postingTime: '1 day ago',
      location: 'New York, NY',
      role: 'Software Engineer',
      stipend: '$80,000 - $100,000',
    },
    {
      company: 'Example Company 2',
      duration: 'Part-time',
      postingTime: '2 days ago',
      location: 'San Francisco, CA',
      role: 'Data Analyst',
      stipend: '$60,000 - $80,000',
    },
    {
      company: 'Example Company 3',
      duration: 'Contract',
      postingTime: '3 days ago',
      location: 'Chicago, IL',
      role: 'Marketing Specialist',
      stipend: '$70,000 - $90,000',
    },
    {
      company: 'Example Company 4',
      duration: 'Remote',
      postingTime: '4 days ago',
      location: 'Los Angeles, CA',
      role: 'UX/UI Designer',
      stipend: '$75,000 - $95,000',
    },
    {
      company: 'Example Company 5',
      duration: 'Full-time',
      postingTime: '5 days ago',
      location: 'Boston, MA',
      role: 'Software Developer',
      stipend: '$85,000 - $110,000',
    },
    {
      company: 'Example Company 6',
      duration: 'Part-time',
      postingTime: '6 days ago',
      location: 'Austin, TX',
      role: 'Data Scientist',
      stipend: '$70,000 - $90,000',
    },
  ]);

  const [sortBy, setSortBy] = useState('date'); // Default sort by date
  const [showAll, setShowAll] = useState(false);
  const maxVisibleJobs = 4;

  const toggleShowMore = () => {
    setShowAll(!showAll);
  };

  const sortJobs = (criteria) => {
    let sortedJobs = [...jobs];
    switch (criteria) {
      case 'date':
        sortedJobs.sort((a, b) => new Date(b.postingTime) - new Date(a.postingTime));
        break;
      case 'role':
        sortedJobs.sort((a, b) => a.role.localeCompare(b.role));
        break;
      case 'stipend':
        sortedJobs.sort((a, b) => {
          const aStipend = parseInt(a.stipend.replace(/[^0-9.-]+/g, ''));
          const bStipend = parseInt(b.stipend.replace(/[^0-9.-]+/g, ''));
          return aStipend - bStipend;
        });
        break;
      default:
        break;
    }
    setJobs(sortedJobs);
    setSortBy(criteria);
  };

  const visibleJobs = showAll ? jobs.length : maxVisibleJobs;

  return (
    <div className="max-w-full mx-auto" style={{ margin: '6% 4% 0 4%' }}>
      <h2 className="text-3xl text-blue-700 font-bold mb-4">Featured Jobs</h2>

      {/* Sorting Options */}
      <div className="flex justify-between items-center mb-4">
        {/* <div className="flex space-x-4">
          <span className={`cursor-pointer ${sortBy === 'date' ? 'font-semibold' : ''}`} onClick={() => sortJobs('date')}>Sort by Date</span>
          <span className={`cursor-pointer ${sortBy === 'role' ? 'font-semibold' : ''}`} onClick={() => sortJobs('role')}>Sort by Role</span>
          <span className={`cursor-pointer ${sortBy === 'stipend' ? 'font-semibold' : ''}`} onClick={() => sortJobs('stipend')}>Sort by Stipend</span>
        </div> */}
        {/* Show More Button */}
       
      </div>

      {/* Job Listings */}
      {jobs.slice(0, visibleJobs).map((job, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:flex-1">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{job.role}</h3>
              <p className="text-sm text-gray-600 mb-2">{job.company}</p>
            </div>
            <div className="md:flex-1 flex justify-between mt-4 md:mt-0">
              <p className="text-sm text-gray-600">{job.duration}</p>
              <p className="text-sm text-gray-600">{job.postingTime}</p>
              <p className="text-sm text-gray-600">{job.location}</p>
              <p className="text-sm text-gray-600">{job.stipend}</p>
            </div>
          </div>
        </div>
      ))}
 {!showAll && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none mr-0"
            onClick={toggleShowMore}
          >
            Show More
          </button>
        )}
      {/* Show More Button (for hiding jobs) */}
      {showAll && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          onClick={toggleShowMore}
        >
          Show Less
        </button>
      )}
    </div>
  );
};

export default FeaturedJobs;
