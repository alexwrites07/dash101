import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";

const AlertJobs = () => {
  const [typeOfClass, setTypeOfClass] = useState('');
  const [city, setCity] = useState('');
  const [genderPreference, setgenderPreference] = useState('');
  const [requirement, setrequirement] = useState('');
  const [board, setboard] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  
  // Fetch the alerts on component mount
  useEffect(() => {
    const fetchAlerts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in local storage');
        return;
      }

      try {
        const response = await fetch('https://server.avyudha.com/tutor/needAlerts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch alerts');
        }

        const result = await response.json();
        setAlerts(result);
      } catch (error) {
        console.error('Error fetching alerts:', error.message);
      }
    };

    fetchAlerts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in local storage');
      return;
    }

    const queryString = new URLSearchParams({
      typeOfClass,
      genderPreference,
      requirement,
      [`location.city`]: city,
      board,
    }).toString();

    const payload = {
      uri: `https://server.avyudha.com/learning-needs?${queryString}`,
    };

    try {
      setIsSaving(true);
      const response = await fetch('https://server.avyudha.com/saveNeeds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save filter');
      }

      const result = await response.json();
      alert('Alert saved successfully', result);
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving filter:', error.message);
      setIsSaving(true);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col lg:ml-64 lg:flex-row">
        <Sidebar />
        <div className="flex-1 lg:ml-24">
          <Header />
          <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full">
            <h3 className='font-semibold'>Set Candidate Alerts</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block">City:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block">Gender:</label>
              <input
                type="text"
                value={genderPreference}
                onChange={(e) => setgenderPreference(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block">Requirements:</label>
              <input
                type="text"
                value={requirement}
                onChange={(e) => setrequirement(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block">Board:</label>
              <input
                type="text"
                value={board}
                onChange={(e) => setboard(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block">Type of class:</label>
              <input
                type="text"
                value={typeOfClass}
                onChange={(e) => setTypeOfClass(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-4">
            {isSaving ? 'Saving...' : 'Save'}
            </button>
          </form>

          {/* Displaying Alerts */}
          <div className="mt-8">
            <h3 className="font-semibold">Saved Alerts</h3>
            {alerts.length > 0 ? (
              <ul className="space-y-4 mt-4">
                {alerts.map((alert) => (
                  <li key={alert._id} className="border p-4 rounded">
                    <div><strong>Type of Class:</strong> {alert.filter.typeOfClass.join(', ')}</div>
                    <div><strong>City:</strong> {alert.filter.location?.city}</div>
                    <div><strong>Gender Preference:</strong> {alert.filter.genderPreference}</div>
                    <div><strong>Requirement:</strong> {alert.filter.requirement}</div>
                    <div><strong>Board:</strong> {alert.filter.board}</div>
                    <div><strong>Created At:</strong> {new Date(alert.createdAt).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No alerts found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertJobs;
