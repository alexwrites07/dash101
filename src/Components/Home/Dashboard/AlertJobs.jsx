import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

// Mock data for skills and job alerts
const mockSkills = ['Maths', 'Physics', 'Chemistry'];
const mockJobAlerts = [
  { id: 1, title: 'Tutor', skills: ['Maths', 'Physics', 'Chemistry'] },
  { id: 2, title: 'Classes', skills: ['Physics', 'Maths', 'Aptitude'] }
];

const AlertsJobs = () => {
  const [skills, setSkills] = useState(mockSkills);
  const [jobAlerts, setJobAlerts] = useState([]);

  useEffect(() => {
    // Mock fetching job alerts
    const alerts = mockJobAlerts.filter(job =>
      job.skills.some(skill => skills.includes(skill))
    );
    setJobAlerts(alerts);
  }, [skills]);

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-8 flex flex-col items-center lg:items-start">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Job Alerts</h1>
        {jobAlerts.length === 0 ? (
          <h4 className="text-xl mb-6 text-gray-900">No Job Alerts</h4>
        ) : (
          <div className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Active Job Alerts</h2>
            <ul>
              {jobAlerts.map(alert => (
                <li key={alert.id} className="mb-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold">{alert.title}</h3>
                    <p className="text-md text-gray-700">Skills: {alert.skills.join(', ')}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <section className="w-full lg:w-2/3 bg-white p-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Set Up Job Alerts</h2>
          <form className="flex flex-col">
            <label className="text-md text-gray-700 mb-2">Skills:</label>
            <input
              type="text"
              className="p-2 mb-4 border rounded-lg"
              placeholder="Enter your skills"
              onChange={(e) => setSkills(e.target.value.split(',').map(skill => skill.trim()))}
            />
            <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Alerts
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AlertsJobs;
