import React from 'react';
import Dashboard from './DashboardEmployer';
import Sidebar from './SidebarEmployer';
import Header from './HeaderEmployer';
const Locations = () => {
  return (
    <div>
    
    <Sidebar/>
    <Header/>
<div className="applied-company ml-96 mt-24">
      <h1>Locations</h1>
      <p>Explore different locations.</p>
    </div>
    </div>
  );
};

export default Locations;
