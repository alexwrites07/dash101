import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
const MyClasses = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <FreeDemoCard />
    </div>
  );
};

const FreeDemoCard = () => {
  const navigate = useNavigate();

  const handleBookDemo = () => {
    navigate('/demo-form'); // Replace '/demo-form' with the route for booking a demo
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
      {/* Icon */}
      <Sidebar />
       <Header />
       <div className="">
      <div className="text-blue-600 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16h8M8 12h8m-9 4a1 1 0 011-1h10a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1zm0-6a1 1 0 011-1h10a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1V9z"
          />
        </svg>
      </div>

      {/* Text */}
      <p className="text-gray-800 text-lg font-semibold">
        You have not enrolled for any classes.
      </p>
      <p className="text-gray-600 text-sm mt-2">
        Get started by booking a Free Demo Class.
      </p>

      {/* Button */}
      <button
        onClick={handleBookDemo}
        className="mt-6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Book a Demo
      </button>
      </div>
    </div>
  );
};

export default MyClasses;
