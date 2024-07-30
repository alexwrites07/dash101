import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';

const AlertsJobs = () => {
  const [skills, setSkills] = useState([]);
  const [jobAlerts, setJobAlerts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [error, setError] = useState(null);

  // Token and Tutor ID
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWUyNTBmMDEwYjA4NTJhNzU0ZTliZiIsImlhdCI6MTcyMTkwMjE4Mn0.pvPZFwt9VjiRwnNBAWGBjfgd2EK_9B0oQMENsJU0JcM';
  const tutorId = '669e250f010b0852a754e9bf';

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
          location: job.location.city,
          salary: `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()} ${job.salary.period}`,
          postedDate: new Date(job.lastDateToApply).toLocaleDateString(),
          skills: job.skillAndExperience,
          company: 'Unknown', // Company field is not available in the backend data
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
      alert.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const sortedAlerts = filteredAlerts.sort((a, b) => {
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortOption === 'postedDate') {
      return new Date(b.postedDate) - new Date(a.postedDate);
    }
    return filteredAlerts;
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
                    <th className="py-2 px-4 border-b">Posted Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAlerts.map((alert) => (
                    <tr key={alert.id}>
                      <td className="py-2 px-4 border-b">
                        <div className="flex items-center">
                          <img
                            src={`https://static.wixstatic.com/media/5a2bf8_4efbddfdec0c49ed94d0dbf3168d6863~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PROFILE%20LOGO%20white%20letter.png`}
                            alt="Profile"
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {alert.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {alert.company}
                            </div>
                            <div className="text-sm text-gray-500">
                              {alert.location}
                            </div>
                            <div className="text-sm text-gray-500">
                              {alert.salary}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {alert.skills.join(', ')}
                      </td>
                      <td className="py-2 px-4 border-b">{alert.postedDate}</td>
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
