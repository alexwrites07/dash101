import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Removed useNavigate since redirection is not needed
import axios from 'axios'; // For making API requests

const EditEmployerProfile = () => {
  const { id } = useParams(); // Get the employer's ID from the route params
  const [employerData, setEmployerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token'); // Get token from localStorage

  useEffect(() => {
    // Fetch employer data on component mount
    const fetchEmployerData = async () => {
      try {
        const response = await axios.get(`https://backend.akshayy.tech/getOrg/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if the response contains the employer data
        if (response.data) {
          const orgData = response.data; // Get the organization data
          setEmployerData(orgData);
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

    // Handle nested object updates (for location and social media)
    if (name.startsWith('location.')) {
      const key = name.split('.')[1]; // Extract the key after 'location.'
      setEmployerData((prevState) => ({
        ...prevState,
        location: {
          ...prevState.location,
          [key]: value,
        },
      }));
    } else if (name.startsWith('socialMediaLinks.')) {
      const key = name.split('.')[1]; // Extract the key after 'socialMediaLinks.'
      setEmployerData((prevState) => ({
        ...prevState,
        socialMediaLinks: {
          ...prevState.socialMediaLinks,
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

  const handleSave = async () => {
    const url = `https://backend.akshayy.tech/editUserProfile/${id}/Organization`;
    const updatedData = {
      location: {
        type: "Point",
        coordinates: [employerData.location?.coordinates[0], employerData.location?.coordinates[1]],
        address: employerData.location?.address,
        city: employerData.location?.city,
        state: employerData.location?.state,
        pinCode: employerData.location?.pinCode,
      },
      name: employerData.name,
      email: employerData.email,
      contactNumber: employerData.contactNumber,
      website: employerData.website,
      description: employerData.description,
      subjectsRequired: employerData.subjectsRequired,
      // Add other fields as necessary...
    };

    try {
      const response = await axios.put(url, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Updated employer profile:', response.data);
      // Alert for successful save
      window.alert('Employer profile updated successfully!');
    } catch (error) {
      console.error('Error saving employer data:', error);
      // Alert for failed save
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
        {/* Basic Fields */}
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

        {/* Uncomment these fields if needed */}
        {/* 
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

        <label className="block">
          Contact Number:
          <input
            type="text"
            name="contactNumber"
            value={employerData.contactNumber || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          Website:
          <input
            type="text"
            name="website"
            value={employerData.website || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        */}

        <label className="block">
          Description:
          <textarea
            name="description"
            value={employerData.description || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        {/* Location Fields */}
        <label className="block">
          Address:
          <input
            type="text"
            name="location.address"
            value={employerData.location?.address || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          City:
          <input
            type="text"
            name="location.city"
            value={employerData.location?.city || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          State:
          <input
            type="text"
            name="location.state"
            value={employerData.location?.state || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          PinCode:
          <input
            type="text"
            name="location.pinCode"
            value={employerData.location?.pinCode || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        {/* Additional Fields */}
        <label className="block">
          Subjects Required:
          <input
            type="text"
            name="subjectsRequired"
            value={employerData.subjectsRequired?.join(', ') || ''}
            onChange={(e) => handleChange({ target: { name: 'subjectsRequired', value: e.target.value.split(', ') } })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          Social Media (LinkedIn):
          <input
            type="text"
            name="socialMediaLinks.link"
            value={employerData.socialMediaLinks?.link || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

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
