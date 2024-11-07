import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Map from '../../MapDemo';
import categoriesList from './categories.json'

const EditEmployerProfile = () => {
  const { id } = useParams();
  const [employerData, setEmployerData] = useState({});
  const [loading, setLoading] = useState(true);
  
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
      setInputText1(input); // Update the input text for categories
      
      // Filter categories based on input text
      const filteredSuggestions = categoriesList.filter((category) =>
          category.toLowerCase().includes(input.toLowerCase()) && !formData.categories.includes(category)
      );
      setSuggestions1(filteredSuggestions);
  };

  const handleCategorySelect = (category) => {
      setFormData((prevFormData) => ({
          ...prevFormData,
          categories: [...prevFormData.categories, category],
      }));
      setInputText1(''); // Clear input text after selecting a category
      setSuggestions1([]); // Clear suggestions after selecting a category
  };

  const handleCategoryRemove = (categoryToRemove) => {
      setFormData((prevFormData) => ({
          ...prevFormData,
          categories: prevFormData.categories.filter(category => category !== categoryToRemove),
      }));
  };

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/getOrg/${id}`, {
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
          setError('No employer data found.');
        }
      } catch (error) {
        console.error('Error fetching employer data:', error);
        setError('Error fetching employer data');
      } finally {
        setLoading(false);
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
    const url = `https://backend.akshayy.tech/editUserProfile/${id}/Organization`;

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
      console.log('Updated employer profile:', response.data);
      window.alert('Employer profile updated successfully!');
    } catch (error) {
      console.error('Error saving employer data:', error);
      window.alert('Error saving employer data. Please try again.');
      setError('Error saving employer data');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-6 p-4 mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Edit Employer Profile</h1>

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

        <label htmlFor="categories" className="block">Categories:</label>
                <input
                    type="text"
                    id="categories"
                    name="categories"
                    value={inputText1}
                    onChange={handleCategoryInputChange}
                    className="border p-2 w-full"
                    placeholder="Type to search and add categories"
                />
                {/* Suggestions Dropdown for Categories */}
                {suggestions1.length > 0 && (
                    <div className="border border-gray-300 rounded-md mt-1 bg-white shadow-lg max-h-40 overflow-y-auto">
                        {suggestions1.map((category, index) => (
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
                {/* Selected Categories Display */}
                <div className="flex flex-wrap mt-2">
                    {formData.categories.map((category, index) => (
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

        <label className="block">
          Rating:
          <input
            type="text"
            name="rating"
            value={employerData.rating || 0}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
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
          Subjects Required (comma-separated):
          <input
            type="text"
            name="subjectsRequired"
            value={employerData.subjectsRequired?.join(', ') || ''}
            onChange={(e) => handleChange({ target: { name: 'subjectsRequired', value: e.target.value.split(', ') } })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          Job Postings (comma-separated IDs):
          <input
            type="text"
            name="jobPostings"
            value={employerData.jobPostings?.join(', ') || ''}
            onChange={(e) => handleChange({ target: { name: 'jobPostings', value: e.target.value.split(', ') } })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditEmployerProfile;
