import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Map from '../../MapDemo';
import categoriesList from './categories.json'

const EditEmployerProfile = () => {
  const { id } = useParams();
  const [employerData, setEmployerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // New saving state
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const [coordinates, setCoordinates] = useState([0, 0]); // Initialize with default coordinates
  const [suggestions, setSuggestions] = useState([]);
  const [suggestions1, setSuggestions1] = useState([]);
  const [inputText1, setInputText1] = useState('');

  const [formData1, setFormData1] = useState({ categories: [] });
  const [formData, setFormData] = useState({ categories: [] });

  const handleCategoryInputChange = (e) => {
    const input = e.target.value;
    setInputText1(input);

    const filteredSuggestions = categoriesList.filter(
      (category) =>
        category.toLowerCase().includes(input.toLowerCase()) &&
        !employerData.categories.includes(category)
    );
    setSuggestions(filteredSuggestions);
  };

  const handleCategorySelect = (category) => {
    setEmployerData((prevData) => ({
      ...prevData,
      categories: [...prevData.categories, category],
    }));
    setInputText1(''); // Clear input text after selecting a category
    setSuggestions([]); // Clear suggestions
  };

  const handleCategoryRemove = (categoryToRemove) => {
    setEmployerData((prevData) => ({
      ...prevData,
      categories: prevData.categories.filter((category) => category !== categoryToRemove),
    }));
  };

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        const response = await axios.get(`https://server.avyudha.com/getOrg/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setEmployerData(response.data);

          const fetchedCoordinates = response.data.location?.coordinates;
          if (fetchedCoordinates && fetchedCoordinates.length === 2) {
            setCoordinates([parseFloat(fetchedCoordinates[0]), parseFloat(fetchedCoordinates[1])]);
          }
        } else {
          setError('No organization data found.');
        }
      } catch (error) {
        console.error('Error fetching organization data:', error);
        setError('Error fetching organization data');
      } finally {
        setLoading(false);
        setSaving(false);
      }
    };

    fetchEmployerData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('location.')) {
      const key = name.split('.')[1];
      setEmployerData((prevState) => ({
        ...prevState,
        location: {
          ...prevState.location,
          [key]: value,
        },
      }));
    } else {
      setEmployerData({
        ...employerData,
        [name]: value,
      });
    }
  };
  const handleMapChange = (updatedCoordinates) => {
    setCoordinates(updatedCoordinates);  
    setEmployerData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: updatedCoordinates,
      },
    }));
  };
  const handleSave = async () => {
    setSaving(true);
    const url = `https://server.avyudha.com/editUserProfile/${id}/Organization`;

    const updatedData = {
      ...employerData,
      location: {
        ...employerData.location,
        coordinates: [
          parseFloat(employerData.location?.coordinates[0]),
          parseFloat(employerData.location?.coordinates[1]),
        ],
      },
    };

    try {
      const response = await axios.put(url, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Updated organization profile:', response.data);
      setSaving(false);
      window.alert('organization profile updated successfully!');
    } catch (error) {
      console.error('Error saving organization data:', error);
      window.alert('Error saving organization data. Please try again.');
      setError('Error saving organization data');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-6 p-4 mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Edit Organization Profile</h1>

      <div className="space-y-4">
        <label className="block">
          Name:
          <input
            type="text"
            name="name"
            value={employerData.name || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        
        <label className="block">
          contactNumber:
          <input
            type="text"
            name="contactNumber"
            value={employerData.contactNumber || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block">
          Email:
          <input
            type="email"
            name="email"
            value={employerData.email || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block font-medium text-gray-700">Identity Verify:</label>
<div className="flex items-center space-x-4 mt-1">
  <label className="flex items-center">
    <input
      type="radio"
      name="identityVerified"
      value="true"
      checked={employerData.identityVerified === "true"}
      onChange={handleChange}
      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
    />
    <span className="ml-2">True</span>
  </label>

  <label className="flex items-center">
    <input
      type="radio"
      name="identityVerified"
      value="false"
      checked={employerData.identityVerified === "false"}
      onChange={handleChange}
      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
    />
    <span className="ml-2">False</span>
  </label>
</div>


        <label htmlFor="categories" className="block">
          Categories:
        </label>
        <input
          type="text"
          id="categories"
          name="categories"
          value={inputText1}
          onChange={handleCategoryInputChange}
          className="border p-2 w-full"
          placeholder="Type to search and add categories"
        />
        {suggestions.length > 0 && (
          <div className="border border-gray-300 rounded-md mt-1 bg-white shadow-lg max-h-40 overflow-y-auto">
            {suggestions.map((category, index) => (
              <div
                key={index}
                onClick={() => handleCategorySelect(category)}
                className="p-2 hover:bg-blue-100 cursor-pointer"
              >
                {category}
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap mt-2">
          {employerData.categories.map((category, index) => (
            <span
              key={index}
              className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2 flex items-center"
            >
              {category}
              <button
                type="button"
                onClick={() => handleCategoryRemove(category)}
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        <label className="block">Website:
          <input type="text" name="website" value={employerData.website || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </label>

       

        <label className="block">Description:
          <textarea name="description" value={employerData.description || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
        </label>

        <label className="block">Priority:
          <input type="number" name="priority" value={employerData.priority || 0} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </label>

        <label className="block">Rating:
          <input type="number" name="rating" value={employerData.rating || 0} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </label>

      

        <label className="block">
          Company Size:
          <input
            type="text"
            name="companySize"
            value={employerData.companySize || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          Username:
          <input
            type="text"
            name="username"
            value={employerData.username || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          Description:
          <textarea
            name="description"
            value={employerData.description || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          contactCost:
          <textarea
            name="contactCost"
            value={employerData.contactCost || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

       
        <label className="block">Organization Type:</label>
<select
  name="organizationType"
  value={employerData.organizationType || 'School'} // Default to 'School' if no value is present
  onChange={handleChange}
  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
>
  <option value="School">School</option>
  <option value="Coaching Institute">Coaching Institute</option>
  <option value="Tuition classes">Tuition classes</option>
  <option value="Other">Other</option>
</select>


        
        <label className="block">Address:
          <input type="text" name="location.address" value={employerData.location?.address || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </label>

        <label className="block">City:
          <input type="text" name="location.city" value={employerData.location?.city || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </label>

        <label className="block">State:
          <input type="text" name="location.state" value={employerData.location?.state || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </label>

        <label className="block">Country:
          <input type="text" name="location.country" value={employerData.location?.country || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </label>

        <label className="block">Pin Code:
          <input type="text" name="location.pinCode" value={employerData.location?.pinCode || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </label>

        <label className="block">
          Coordinates:
          <input
            type="text"
            name="location.coordinates"
            value={
              employerData.location?.coordinates
                ? `${employerData.location.coordinates[0]}, ${employerData.location.coordinates[1]}`
                : ''
            }
            onChange={(e) => {
              const [lat, lng] = e.target.value.split(',').map(coord => parseFloat(coord.trim()));
              setEmployerData(prevData => ({
                ...prevData,
                location: {
                  ...prevData.location,
                  coordinates: [lat, lng],
                },
              }));
            }}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <Map coordinates={coordinates} onCoordinatesChange={handleMapChange} />
        <button
          onClick={handleSave}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
            saving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default EditEmployerProfile;
