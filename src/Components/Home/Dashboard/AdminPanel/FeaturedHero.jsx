import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const HeroSectionManager = () => {
  const [heroData, setHeroData] = useState({
    title: 'Welcome to Our Platform',
    description: 'Connecting students with the best tutors available online and offline.',
    image: 'https://via.placeholder.com/1200x500',
  });

  const [editMode, setEditMode] = useState(false);
  const [newHeroData, setNewHeroData] = useState({
    title: heroData.title,
    description: heroData.description,
    image: heroData.image,
  });

  // Edit Hero section
  const editHeroSection = () => {
    setEditMode(true);
    setNewHeroData({ ...heroData });
  };

  // Update Hero section
  const updateHeroSection = () => {
    setHeroData({ ...newHeroData });
    setEditMode(false);
  };

  return (
    <div className="md:ml-24 -mt-12">
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Sidebar />
        <div className="p-4 max-w-3xl mx-auto">
          <Header />
          <h2 className="text-xl font-semibold mb-4">Admin Panel - Manage Hero Section</h2>

          {/* Form to edit hero section */}
          {editMode ? (
            <div className="flex flex-col space-y-4 mb-4">
              <input
                type="text"
                placeholder="Title"
                value={newHeroData.title}
                onChange={(e) => setNewHeroData({ ...newHeroData, title: e.target.value })}
                className="border p-2 rounded"
              />
              <textarea
                placeholder="Description"
                value={newHeroData.description}
                onChange={(e) => setNewHeroData({ ...newHeroData, description: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newHeroData.image}
                onChange={(e) => setNewHeroData({ ...newHeroData, image: e.target.value })}
                className="border p-2 rounded"
              />
              <button
                onClick={updateHeroSection}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 mb-4">
              <h3 className="text-2xl font-bold">{heroData.title}</h3>
              <p>{heroData.description}</p>
              <img
                src={heroData.image}
                alt={heroData.title}
                className="w-full h-auto object-cover rounded"
              />
              <button
                onClick={editHeroSection}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit Hero Section
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSectionManager;
