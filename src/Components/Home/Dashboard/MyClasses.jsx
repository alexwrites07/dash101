import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const MyClasses = () => {
  const [demoClasses] = useState([
    { title: 'Demo Class 1', date: '2024-08-20' },
    { title: 'Demo Class 2', date: '2024-08-22' },
  ]);

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="mt-12 lg:ml-64 lg:mt-12 p-4 lg:p-28 flex-1">
        <Header />
        <h3 className="text-2xl font-bold mb-6 text-gray-900">My Classes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoClasses.map((demo, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
            >
              <div>
                <h4 className="text-xl font-semibold text-gray-800">
                  {demo.title}
                </h4>
                <p className="text-gray-600">Scheduled for {demo.date}</p>
              </div>
              <div className="text-green-600 font-semibold">
                <span className="bg-green-100 py-2 px-4 rounded-full">
                  Upcoming
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
