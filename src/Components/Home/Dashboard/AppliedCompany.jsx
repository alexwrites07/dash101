import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AppliedCompany = () => {
  const [appliedJobs, setAppliedJobs] = useState([
    { id: 1, company: 'Tech Co.', status: 'Under Review', previousStatus: '' },
    { id: 2, company: 'Design Studio', status: 'Interview Scheduled', previousStatus: '' },
    { id: 3, company: 'Digital Marketing Inc.', status: 'Rejected', previousStatus: '' },
  ]);

  const handleCancelApplication = (id) => {
    setAppliedJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const handleUpdateStatus = (id, newStatus) => {
    setAppliedJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === id) {
          return { ...job, previousStatus: job.status, status: newStatus };
        }
        return job;
      })
    );
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-8 flex flex-col items-center lg:items-start">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Applied Jobs</h1>
          <p className="text-lg mb-12 text-gray-700">List of companies where you have applied.</p>

          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Applied Companies</h2>
            {appliedJobs.map((job) => (
              <div key={job.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
                <p className="font-semibold">{job.company}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-600">
                    Status: {job.status}
                    {job.previousStatus && (
                      <span className="ml-2 text-gray-500">(Old: {job.previousStatus})</span>
                    )}
                  </p>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleCancelApplication(job.id)}
                      className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Cancel Application
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(job.id, 'Offer Received')}
                      className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Updated Status
                    </button>
                    <button
                      className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      View Job Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {appliedJobs.length === 0 && <p>No applications submitted yet.</p>}
          </section>

        </div>
      </div>
    </div>
  );
};

export default AppliedCompany;
