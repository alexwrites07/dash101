import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';

const AlertsJobs = () => {
  const [jobAlerts, setJobAlerts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch job alerts from the backend
    axios
      .get('https://backend.akshayy.tech/tutor/jobAlerts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const jobAlertsData = response.data.map((job) => ({
          id: job._id,
          title: job.title,
          location: `${job.location.city}, ${job.location.state} ${job.location.pinCode}`,
          salary: `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()} ${job.salary.period}`,
          experience: job.experience,
          qualification: job.qualification,
          careerLevel: job.careerLevel,
          description: job.description,
          skills: job.skillAndExperience.join(', '),
          postedDate: new Date(job.lastDateToApply).toLocaleDateString(),
          images: job.images,
          maxApplicants: job.maxApplicants,
          isClosed: job.isClosed,
        }));
        setJobAlerts(jobAlertsData);
      })
      .catch((error) => {
        console.error('Error fetching job alerts:', error);
        setError('Failed to fetch job alerts. Please try again later.');
      });
  }, [token]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredAlerts = jobAlerts.filter(
    (alert) =>
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.skills.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedAlerts = filteredAlerts.sort((a, b) => {
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortOption === 'postedDate') {
      return new Date(b.postedDate) - new Date(a.postedDate);
    }
    return 0; // Default sorting
  });

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Job Alerts</h1>

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
                <option value="title">Title</option>
                <option value="postedDate">Posted Date</option>
              </select>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Active Job Alerts
            </h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : sortedAlerts.length > 0 ? (
              <table className="min-w-full bg-white">
                <thead className="bg-grey">
                  <tr>
                    <th className="py-2 px-4 border-b">Job Title</th>
                    <th className="py-2 px-4 border-b">Skills</th>
                    <th className="py-2 px-4 border-b">Experience</th>
                    <th className="py-2 px-4 border-b">Qualification</th>
                    <th className="py-2 px-4 border-b">Career Level</th>
                    <th className="py-2 px-4 border-b">Location</th>
                    <th className="py-2 px-4 border-b">Posted Date</th>
                    <th className="py-2 px-4 border-b">Max Applicants</th>
                    <th className="py-2 px-4 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAlerts.map((alert) => (
                    <tr key={alert.id}>
                      <td className="py-2 px-4 border-b">
                        <div className="flex items-center">
                          <img
                            src={alert.images[0]}
                            alt={alert.title}
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {alert.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {alert.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b">{alert.skills}</td>
                      <td className="py-2 px-4 border-b">{alert.experience}</td>
                      <td className="py-2 px-4 border-b">
                        {alert.qualification}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {alert.careerLevel}
                      </td>
                      <td className="py-2 px-4 border-b">{alert.location}</td>
                      <td className="py-2 px-4 border-b">{alert.postedDate}</td>
                      <td className="py-2 px-4 border-b">
                        {alert.maxApplicants}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {alert.isClosed ? 'Closed' : 'Open'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No Job Alerts</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AlertsJobs;
