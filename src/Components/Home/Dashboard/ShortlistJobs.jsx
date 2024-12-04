import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const ShortlistJobs = () => {
  const [shortlistedJobs, setShortlistedJobs] = useState([]); // Initialize with an empty array
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update the token to the new one
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWUyNTBmMDEwYjA4NTJhNzU0ZTliZiIsImlhdCI6MTcyMTkwMjE4Mn0.pvPZFwt9VjiRwnNBAWGBjfgd2EK_9B0oQMENsJU0JcM';
  const tutorId = '669e250f010b0852a754e9bf';

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetch('https://server.avyudha.com/tutor/shortlists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add Authorization header
        'tutor-id': tutorId // Add custom tutor-id header if required by your API
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        // Transform the backend data to match the frontend structure
        const transformedJobs = data.map((job, index) => ({
          id: job._id || index,
          title: job.title || 'N/A',
          company: 'N/A', // Assuming no company data is provided in the JSON
          location: `${job.location.city}, ${job.location.state}`,
          salary: `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()} ${job.salary.period}`,
          postedDate: new Date(job.lastDateToApply).toLocaleDateString(),
          experience: job.experience || 'N/A',
          description: job.description || 'No description available',
          keyResponsibilities: job.keyResponsibilities || [],
          skillAndExperience: job.skillAndExperience || [],
          images: job.images || [],
          applicants: job.applicants || [],
          isClosed: job.isClosed,
        }));
        setShortlistedJobs(transformedJobs);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleRemoveJob = (id) => {
    setShortlistedJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const sortJobs = (sortBy) => {
    let sortedJobs = [...shortlistedJobs];
    switch (sortBy) {
      case 'title':
        sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'company':
        sortedJobs.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case 'salary':
        sortedJobs.sort(
          (a, b) =>
            parseFloat(a.salary.slice(1).replace(',', '')) -
            parseFloat(b.salary.slice(1).replace(',', ''))
        );
        break;
      default:
        break;
    }
    setShortlistedJobs(sortedJobs);
  };

  const handleViewJobProfile = (id) => {
    // Placeholder function for viewing job profile, you can implement the actual behavior
    console.log(`Viewing job profile for job with ID: ${id}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredJobs = shortlistedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedJobs = filteredJobs.sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.postedDate) - new Date(a.postedDate);
    } else if (sortOption === 'oldest') {
      return new Date(a.postedDate) - new Date(b.postedDate);
    }
    return 0;
  });

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Shortlisted Jobs</h1>

          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            {loading && <p>Loading jobs...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <>
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
                    <option value="title">Title</option>
                    <option value="company">Company</option>
                    <option value="salary">Salary</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                </div>
                {sortedJobs.length > 0 ? (
                  <table className="min-w-full bg-white">
                    <thead className="bg-grey">
                      <tr>
                        <th className="py-2 px-4 border-b">Job Title</th>
                        <th className="py-2 px-4 border-b">Posted Date</th>
                        <th className="py-2 px-4 border-b">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedJobs.map((job) => (
                        <tr key={job.id}>
                          <td className="py-2 px-4 border-b flex items-center">
                            <img
                              src={
                                job.images[0] ||
                                `https://static.wixstatic.com/media/5a2bf8_4efbddfdec0c49ed94d0dbf3168d6863~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PROFILE%20LOGO%20white%20letter.png`
                              }
                              alt="Profile"
                              className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                              <p className="font-semibold">{job.title}</p>
                              <p className="text-gray-600">{job.company}</p>
                              <p className="text-gray-600">{job.location}</p>
                            </div>
                          </td>
                          <td className="py-2 px-4 border-b">{job.postedDate}</td>
                          <td className="py-2 px-4 border-b">
                            <button
                              onClick={() => handleRemoveJob(job.id)}
                              className="text-red-600 hover:text-red-800 mr-2"
                            >
                              &times;
                            </button>
                            <button
                              onClick={() => handleViewJobProfile(job.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              &#128065;
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No shortlisted jobs yet.</p>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShortlistJobs;
