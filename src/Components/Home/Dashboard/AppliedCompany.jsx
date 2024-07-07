import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AppliedCompany = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-8 flex flex-col items-center lg:items-start">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Applied Jobs</h1>
          <p className="text-lg mb-12 text-gray-700"></p>

          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Applied Jobs</h2>
            <p className="text-md text-gray-700 mb-4">List of jobs you have applied to.</p>
            <button className=" py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">View Applied Jobs</button>
          </section>

        

          <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Current Status</h2>
            <p className="text-md text-gray-700 mb-4">Current status of your job applications.</p>
            <button className=" py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">View Current Status</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AppliedCompany;
