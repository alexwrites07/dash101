import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const ShortlistJobs = () => {
  const [shortlistedJobs, setShortlistedJobs] = useState([
    { id: 1, title: 'Software Engineer', company: 'Tech Co.', location: 'New York', salary: '$100,000' },
    { id: 2, title: 'Product Designer', company: 'Design Studio', location: 'San Francisco', salary: '$90,000' },
    { id: 3, title: 'Marketing Manager', company: 'Digital Marketing Inc.', location: 'Chicago', salary: '$95,000' },
  ]);

  const [interviews, setInterviews] = useState([
    { id: 1, jobTitle: 'Software Engineer', company: 'Tech Co.', scheduledDate: '2024-07-10' },
    { id: 2, jobTitle: 'Product Designer', company: 'Design Studio', scheduledDate: '2024-07-12' },
  ]);

  const handleRemoveJob = (id) => {
    setShortlistedJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const handleCancelInterview = (id) => {
    setInterviews((prevInterviews) => prevInterviews.filter((interview) => interview.id !== id));
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
        sortedJobs.sort((a, b) => parseFloat(a.salary.slice(1).replace(',', '')) - parseFloat(b.salary.slice(1).replace(',', '')));
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

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-8 flex flex-col items-center lg:items-start">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Shortlisted Jobs & Interviews</h1>

        <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Shortlisted Jobs</h2>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-md text-gray-700">List of jobs you have shortlisted.</p>
            <div className="flex space-x-4">
              <button
                onClick={() => sortJobs('title')}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sort by Title
              </button>
              <button
                onClick={() => sortJobs('company')}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sort by Company
              </button>
              <button
                onClick={() => sortJobs('salary')}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sort by Salary
              </button>
            </div>
          </div>
          {shortlistedJobs.map((job) => (
            <div key={job.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <p className="font-semibold">{job.title} at {job.company}</p>
              <p className="text-sm text-gray-600">{job.location}</p>
              <p className="text-sm text-gray-600">Salary: {job.salary}</p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleViewJobProfile(job.id)}
                  className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  View Job Profile
                </button>
                <button
                  onClick={() => handleRemoveJob(job.id)}
                  className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {shortlistedJobs.length === 0 && <p>No shortlisted jobs yet.</p>}
        </section>

        <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Scheduled Interviews</h2>
          <div className="mb-4">
            <p className="text-md text-gray-700">List of interviews you have scheduled.</p>
          </div>
          {interviews.map((interview) => (
            <div key={interview.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <p className="font-semibold">{interview.jobTitle} at {interview.company}</p>
              <p className="text-sm text-gray-600">Scheduled for: {interview.scheduledDate}</p>
              <div className="mt-2">
              <button
                  onClick={() => handleViewJobProfile(job.id)}
                  className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  View Job Profile
                </button>
                <button
                  onClick={() => handleCancelInterview(interview.id)}
                  className="ml-2 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Cancel Interview
                </button>
              </div>
            </div>
          ))}
          {interviews.length === 0 && <p>No interviews scheduled.</p>}
        </section>
      </div>
    </div>
  );
};

export default ShortlistJobs;
