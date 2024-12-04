import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';

const TutorEditPage = () => {
  const { id } = useParams(); // Get tutor ID from URL parameters
  const [tutorData, setTutorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const response = await fetch(`https://server.avyudha.com/getTutor/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTutorData(data);
          setCategories(data.categories || {}); // Initialize categories from fetched data
          setLoading(false);
        } else {
          console.error('Failed to fetch tutor data');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching tutor:', error);
        setLoading(false);
      }
    };

    fetchTutor();
  }, [id, token]);

  const handleCategoryChange = (categoryKey, index, value) => {
    const updatedCategories = { ...categories };
    updatedCategories[categoryKey][index] = value;
    setCategories(updatedCategories);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://server.avyudha.com/editUserProfile/${id}/Tutor`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categories }), // Send updated categories
      });

      if (response.ok) {
        const updatedData = await response.json();
        setTutorData(updatedData);
        alert('Categories updated successfully!');
      } else {
        console.error('Failed to update categories');
      }
    } catch (error) {
      console.error('Error updating categories:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!tutorData) return <div>No tutor data found.</div>;

  return (
    <div className="p-6">
      <Header />
      <h1 className="text-2xl font-bold mb-4">{tutorData.fullName}</h1>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Edit Categories</h2>
        {Object.entries(categories).map(([categoryKey, categoryValues]) => (
          <div key={categoryKey} className="mb-4">
            <h3 className="text-md font-semibold">{categoryKey}</h3>
            {categoryValues.map((category, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={category}
                  onChange={(e) => handleCategoryChange(categoryKey, index, e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
            ))}
          </div>
        ))}
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TutorEditPage;
