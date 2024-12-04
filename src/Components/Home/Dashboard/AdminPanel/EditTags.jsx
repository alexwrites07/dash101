import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const predefinedTags = [
  'At my place', 'At tutors place', 'Urgent', 'Full time', 'Part Time', 'Online'
];

const EditTags = () => {
  const { id } = useParams();
  const [tutorData, setTutorData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    description: '',
    location: {
      type: 'Point',
      coordinates: [],
      address: '',
      city: '',
      state: '',
      pinCode: ''
    },
    jobAlerts: {
      alertDistance: {
        privateTutor: { distance: 10, flag: true },
        organizationEducator: { distance: 20, flag: true }
      },
      minExpectedSalary: { value: 0, flag: false, period: 'monthly' },
      maxExpectedSalary: { value: 0, flag: false, period: 'monthly' }
    },
    tags: []
  });
  const [inputValue, setInputValue] = useState('');
  const [filteredTags, setFilteredTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutorDetails = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://server.avyudha.com/getTutor/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setTutorData({
        ...data, 
        jobAlerts: data.jobAlerts || tutorData.jobAlerts, 
        location: data.location || tutorData.location,
        tags: data.tags || [] // Set tags if they exist
      });
    };

    fetchTutorDetails();
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`https://server.avyudha.com/editUserProfile/${id}/Tutor`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(tutorData), // Send the complete payload, including tags
      });

      if (response.ok) {
        alert('Tutor data updated successfully!');
        navigate('/tags');
      } else {
        alert('Failed to update tutor data. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter predefined tags based on user input
    const filtered = predefinedTags.filter((tag) =>
      tag.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTags(filtered);
  };

  const handleTagSelection = (tag) => {
    setTutorData((prevData) => ({
      ...prevData,
      tags: [...prevData.tags, tag],
    }));
    setInputValue(''); // Clear input value after selection
    setFilteredTags([]); // Clear filtered tags after selection
  };

  const removeTag = (tagToRemove) => {
    setTutorData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Edit Tutor: {tutorData.fullName}</h2>

      {/* Input for Tags */}
      <div className="my-4 relative">
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Type to search and add tags"
        />
        {filteredTags.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
            {filteredTags.map((tag, index) => (
              <div
                key={index}
                onClick={() => handleTagSelection(tag)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display selected tags */}
      <div className="my-4">
        <h3 className="text-lg font-medium">Selected Tags:</h3>
        <ul className="flex flex-wrap mt-2">
          {tutorData.tags.map((tag, index) => (
            <li
              key={index}
              className="bg-blue-200 px-3 py-1 m-1 rounded-full flex items-center space-x-2"
            >
              <span>{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Save
      </button>
    </div>
  );
};

export default EditTags;
