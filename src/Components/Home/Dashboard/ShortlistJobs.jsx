import React from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import Header from './Header';
const ShortlistJobs = () => {
  return (
    <div>
    
    <Sidebar/>
    <Header/>
    <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-8 flex flex-col items-center lg:items-start">
<h1 className="text-3xl font-bold mb-6 text-gray-900">Shortlisted Jobs</h1>
      <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Shortlisted Jobs</h2>
            <p className="text-md text-gray-700 mb-4">List of jobs you have shortlisted.</p>
            <button className=" py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">View Shortlisted Jobs</button>
          </section>
          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Interviews</h2>
            <p className="text-md text-gray-700 mb-4">List of jobs you have shortlisted.</p>
            <button className=" py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">View Listed Interviews</button>
          </section>
    </div>
    </div>
  );
};

export default ShortlistJobs;
