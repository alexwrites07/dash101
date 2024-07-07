import React from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import Header from './Header';
const AlertsJobs = () => {
  return (
    <div>
    
    <Sidebar/>
    <Header/>
    <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-8 flex flex-col items-center lg:items-start">
    <h1 className="text-3xl font-bold mb-6 text-gray-900">Jobs Alert</h1>
    <h4 className="text-xl  mb-6 text-gray-900"> No Jobs Alert</h4>
    </div>
    </div>
  );
};

export default AlertsJobs;
