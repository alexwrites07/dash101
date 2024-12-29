import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Link } from 'react-router-dom';

const AppliedCompany = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [appliedNeeds, setAppliedNeeds] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingNeeds, setLoadingNeeds] = useState(true);
  const [errorJobs, setErrorJobs] = useState(null);
  const [errorNeeds, setErrorNeeds] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch Applied Jobs
    fetch('https://server.avyudha.com/tutor/applications', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch applied jobs');
        }
        return response.json();
      })
      .then((data) => {
        const transformedJobs = data.map((job, index) => ({
          id: job._id || index,
          jobTitle: job.title || 'N/A',
          location: `${job.location.city}, ${job.location.state}`,
          dateApplied: new Date(job.lastDateToApply).toLocaleDateString(),
          status: job.applicants?.[0]?.status || 'N/A',
        }));
        setAppliedJobs(transformedJobs);
        setLoadingJobs(false);
      })
      .catch((err) => {
        setErrorJobs(err.message);
        setLoadingJobs(false);
      });

    // Fetch Applied Learning Needs
    fetch('https://server.avyudha.com/appliedNeeds', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch applied learning needs');
        }
        return response.json();
      })
      .then((data) => {
        const transformedNeeds = data.map((need) => ({
          id: need._id,
          requirement: need.requirement,
          location: `${need.location.city}, ${need.location.state}`,
          salary: `${need.salary.max} (${need.salary.period})`,
          available: need.available,
          start: need.start,
          createdAt: new Date(need.createdAt).toLocaleDateString(),
        }));
        setAppliedNeeds(transformedNeeds);
        setLoadingNeeds(false);
      })
      .catch((err) => {
        setErrorNeeds(err.message);
        setLoadingNeeds(false);
      });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Applied Jobs</h1>
          <p className="text-lg mb-12 text-gray-700">List of companies where you have applied.</p>

          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            {loadingJobs && <p>Loading jobs...</p>}
            {errorJobs && <p>Error: {errorJobs}</p>}
            {!loadingJobs && !errorJobs && (
              <table className="min-w-full bg-white text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">Job Title</th>
                    <th className="py-2 px-4 border-b">Location</th>
                    <th className="py-2 px-4 border-b">Date Applied</th>
                    <th className="py-2 px-4 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">
                        <Link to={`/getjobs/${job.id}`} className="text-blue-500 hover:underline">
                          {job.jobTitle}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">{job.location}</td>
                      <td className="py-2 px-4 border-b">{job.dateApplied}</td>
                      <td className="py-2 px-4 border-b">{job.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <h1 className="text-3xl font-bold mb-2 text-gray-900">Applied Learning Needs</h1>
          <p className="text-lg mb-12 text-gray-700">List of learning needs you have applied for.</p>

          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            {loadingNeeds && <p>Loading learning needs...</p>}
            {errorNeeds && <p>Error: {errorNeeds}</p>}
            {!loadingNeeds && !errorNeeds && (
              <table className="min-w-full bg-white text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">Requirement</th>
                    <th className="py-2 px-4 border-b">Location</th>
                    <th className="py-2 px-4 border-b">Salary</th>
                    <th className="py-2 px-4 border-b">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedNeeds.map((need) => (
                    <tr key={need.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">
                        <Link to={`/getNeed/${need.id}`} className="text-blue-500 hover:underline">
                          {need.requirement}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">{need.location}</td>
                      <td className="py-2 px-4 border-b">{need.salary}</td>
                      <td className="py-2 px-4 border-b">{need.available}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AppliedCompany;
