import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";
import categoriesList from '../Dashboard/AdminPanel/categories.json'
const AlertJobs = () => {
  const [typeOfClass, setTypeOfClass] = useState('');
  const [city, setCity] = useState('');
  const [suggestions1, setSuggestions1] = useState([]);
  const [genderPreference, setgenderPreference] = useState('');
  const [requirement, setrequirement] = useState('');
  const [categories, setCategories] = useState([]);
  const [inputText1, setInputText1] = useState('');
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
  const handleCategoryInputChange = (e) => {
    const input = e.target.value;
    setInputText1(input); // Update the input text for categories
  
    // Filter categories based on input text
    const filteredSuggestions = categoriesList.filter(
      (category) =>
        category.toLowerCase().includes(input.toLowerCase()) &&
        !categories.includes(category) // Ensure it’s not already added
    );
    setSuggestions1(filteredSuggestions);
  };
  
  const handleCategorySelect = (category) => {
    setCategories((prevCategories) => [...prevCategories, category]); // Add selected category
    setInputText1(''); // Clear input text after selecting a category
    setSuggestions1([]); // Clear suggestions after selecting a category
  };
  
  const handleCategoryRemove = (categoryToRemove) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category !== categoryToRemove)
    ); // Remove the category
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
  <select
    value={genderPreference}
    onChange={(e) => setgenderPreference(e.target.value)}
    className="border p-2 w-full"
    required
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="No Preference">No Preference</option>
  </select>
</div>

<div className="mb-4">
            <label htmlFor="categories" className="block ">Requirements:</label>
            <div className="mb-4 relative">
        <input
          type="text"
          value={inputText1}
          onChange={handleCategoryInputChange}
          placeholder="Type to search requirements..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        {/* Suggestions Dropdown */}
        {suggestions1.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-10">
            {suggestions1.map((category, index) => (
              <li
                key={index}
                onClick={() => handleCategorySelect(category)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Categories */}
      {categories.length > 0 && (
        <div className="mb-4">
          <h2 className="text-md mb-2">Selected Requirements:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-3 rounded-lg flex items-center"
              >
                {category}
                <button
                  onClick={() => handleCategoryRemove(category)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
            <div>
  <label className="block">Type of class:</label>
  <select
    value={typeOfClass}
    onChange={(e) => setTypeOfClass(e.target.value)}
    className="border p-2 w-full"
    required
  >
    <option value="">Select Type of Class</option>
    <option value="Online (Recommended)">Online (Recommended)</option>
    <option value="Offline: At tutor's place">Offline: At tutor's place</option>
    <option value="Offline: At student's place">Offline: At student's place</option>
    <option value="Offline: Nearby classes">Offline: Nearby classes</option>
  </select>
</div>

  

<div>
  <label className="block">Board:</label>
  <select
    value={board}
    onChange={(e) => setboard(e.target.value)}
    className="border p-2 w-full"
    required
  >
    <option value="">Select Board</option>
    <option value="ICSE">ICSE</option>
    <option value="CBSE">CBSE</option>
    <option value="State Board">State Board</option>
    <option value="International Baccalaureate">International Baccalaureate</option>
    <option value="IGCSE">IGCSE</option>
    <option value="None of the above">None of the above</option>
  </select>
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
