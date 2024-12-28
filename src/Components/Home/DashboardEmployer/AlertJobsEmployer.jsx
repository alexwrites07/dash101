import React, { useState, useEffect } from 'react';
import Sidebar from "../Dashboard/Sidebar";
import Header from './HeaderEmployer';
const AlertJobs = () => {
  const [tags, setTags] = useState('');
  const [city, setCity] = useState('');
  const [categories, setCategories] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [topicBasedLearning, setTopicBasedLearning] = useState('');
  const [gender, setGender] = useState('');
  const [distance, setDistance] = useState(''); // Added distance state
  const [highestQualification, setHighestQualification] = useState('');
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
        const response = await fetch('https://server.avyudha.com/getFilters', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
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
      tags: tags.split(',').map((tag) => tag.trim()).join(','),
      'location.city': city,
      categories: categories.split(',').map((cat) => cat.trim()).join(','),
      qualifications: qualifications.split(',').map((qual) => qual.trim()).join(','),
      topicBasedLearning: topicBasedLearning.split(',').map((topic) => topic.trim()).join(','),
      gender,
      highestQualification,
      distance, 

    }).toString();

    const payload = {
      uri: `https://server.avyudha.com/getTutors?${queryString}`,
    };

    try {
      setIsSaving(true);
      const response = await fetch('https://server.avyudha.com/saveFilters', {
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
      alert('Alert saved successfully');
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving filter:', error.message);
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col lg:ml-64 lg:flex-row">
        <Sidebar />
        <div className="flex-1 lg:ml-24">
          <Header />
          <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full">
            <h3 className="font-semibold">Set Candidate Alerts</h3>
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
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            {/* <div>
              <label className="block">Tags (comma-separated):</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="border p-2 w-full"
              />
            </div> */}
            <div>
              <label className="block">Categories (comma-separated):</label>
              <input
                type="text"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block">Qualifications (comma-separated):</label>
              <input
                type="text"
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            {/* <div>
              <label className="block">Topic-Based Learning (comma-separated):</label>
              <input
                type="text"
                value={topicBasedLearning}
                onChange={(e) => setTopicBasedLearning(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block">Highest Qualification:</label>
              <input
                type="text"
                value={highestQualification}
                onChange={(e) => setHighestQualification(e.target.value)}
                className="border p-2 w-full"
              />
            </div> */}
             <div>
              <label className="block">Distance (km):</label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="border p-2 w-full"
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
                    {/* <div><strong>Tags:</strong> {alert.filter.tags?.join(', ')}</div> */}
                    <div><strong>City:</strong> {alert.filter['location.city']}</div>
                    <div><strong>Categories:</strong> {alert.filter.categories?.join(', ')}</div>
                    <div><strong>Qualifications:</strong> {alert.filter.qualifications?.join(', ')}</div>
                    {/* <div><strong>Topic-Based Learning:</strong> {alert.filter.topicBasedLearning?.join(', ')}</div> */}
                    <div><strong>Gender:</strong> {alert.filter.gender}</div>
                    <div><strong>Distance:</strong> {alert.filter.distance} km</div>
                   
                    {/* <div><strong>Highest Qualification:</strong> {alert.filter.highestQualification}</div>
                 */}
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
