import {MdDelete} from 'react-icons/md';
import { IoIosAddCircle } from "react-icons/io";
import { FaCircleMinus } from "react-icons/fa6";
import { useState } from 'react';
function Section({ index, section, handleInputChange, handleSubheadingChange, handleBulletChange, addSubheading, addBullet, deleteSection, deleteSubheading, deleteBullet }) {
  const [showDetails, setShowDetails] = useState(false); // State to manage visibility of section details

  const toggleDetails = () => {
    setShowDetails(!showDetails); // Toggle the display of the section details
  };
    return (
      <div className="mb-4 border p-2">
        <div className="flex justify-between items-center">
          <input
            type="text"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            placeholder="Section Title"
            value={section.title}
            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
          />
        
          {showDetails ?<FaCircleMinus onClick={()=> toggleDetails()} className="text-blue-500 cursor-pointer text-3xl"/>:<IoIosAddCircle onClick={()=> toggleDetails()} className="text-green-500 cursor-pointer text-3xl" />}
        </div>
  {
    showDetails && (
      <>

        {section.subheadings.map((subheading, subheadingIndex) => (
          <div key={subheadingIndex} className="mb-2">
            <div className="flex justify-between items-center">
              <input
                type="text"
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                placeholder="Subheading Title"
                value={subheading.subtitle}
                onChange={(e) => handleSubheadingChange(index, subheadingIndex, 'subtitle', e.target.value)}
              />
              <MdDelete onClick={() => deleteSubheading(index, subheadingIndex)} className="text-red-500 cursor-pointer text-3xl" />
              
            </div>
            {subheading.bullets.map((bullet, bulletIndex) => (
              <div key={bulletIndex} className="flex justify-between items-center">
                <input
                  type="text"
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                  placeholder="Bullet Point"
                  value={bullet}
                  onChange={(e) => handleBulletChange(index, subheadingIndex, bulletIndex, e.target.value)}
                />
                <MdDelete onClick={() => deleteBullet(index, subheadingIndex, bulletIndex)} className="text-red-500 cursor-pointer text-3xl" />
                
              </div>
            ))}
            <button
              className="w-full mb-2 p-2 bg-blue-500 text-white rounded-md"
              onClick={() => addBullet(index, subheadingIndex)}
            >
              Add Bullet
            </button>
          </div>
        ))}
        <div className="flex justify-between">

        <button
          className="w-full mb-2 p-2 bg-blue-500 text-white rounded-md"
          onClick={() => addSubheading(index)}
        >
          Add Subheading
        </button>
      <div className="w-2"></div>
        <button
          className="w-full mb-2 p-2 bg-red-500 text-white rounded-md"
          onClick={() =>  deleteSection(index)}
        >
          Delete Section
        </button>
        </div>
      </>
    )
  }
      </div>
    );
  }

  export default Section;

