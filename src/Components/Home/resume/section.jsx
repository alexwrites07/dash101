import React, { useState } from 'react';

function Section({
  section,
  handleInputChange,
  handleSubheadingChange,
  handleBulletChange,
  addSubheading,
  addBullet,
  deleteSection,
  deleteSubheading,
  deleteBullet,
}) {
  const [subheadingInput, setSubheadingInput] = useState('');
  const [bulletInput, setBulletInput] = useState('');

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{section.title}</h2>
        <button
          onClick={() => deleteSection(section.title)}
          className="bg-red-500 text-white py-1 px-2 rounded-md text-xs"
        >
          Delete Section
        </button>
      </div>
      
      <div className="mt-2">
        {Array.isArray(section.content) ? (
          section.content.map((content, index) => (
            <div key={index} className="flex justify-between items-center space-x-2">
              <input
                type="text"
                value={content}
                onChange={(e) => handleInputChange(e, section.title, index)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => deleteBullet(index)}
                className="bg-red-500 text-white py-1 px-2 rounded-md text-xs"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <input
            type="text"
            value={section.content}
            onChange={(e) => handleInputChange(e, section.title)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        )}

        <div className="flex justify-between items-center mt-4">
          <input
            type="text"
            placeholder="Add subheading"
            value={subheadingInput}
            onChange={(e) => setSubheadingInput(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <button
            onClick={() => {
              addSubheading(section.title, subheadingInput);
              setSubheadingInput('');
            }}
            className="ml-2 bg-blue-500 text-white py-1 px-2 rounded-md text-xs"
          >
            Add Subheading
          </button>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Add bullet point"
            value={bulletInput}
            onChange={(e) => setBulletInput(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <button
            onClick={() => {
              addBullet(section.title, bulletInput);
              setBulletInput('');
            }}
            className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md text-xs"
          >
            Add Bullet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section;
