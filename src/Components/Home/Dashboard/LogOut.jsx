import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection after logout
import Sidebar from './Sidebar';import axios from 'axios';
import './Meeting.css'; // Import the CSS file
import Header from './Header';
const Logout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
     
       
      navigate('/login');
      // Clear the token from localStorage
      localStorage.removeItem('token');
      alert('Logged out successfully!');

    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="logout-container lg:ml-64 lg:mt-18 p-4 mt-24">
              <Sidebar />
       <Header />
       <div className="lg:ml-64 lg:mt-18 p-4">
      <h1 className='text-4xl text-red-600 mt-12'>Do you want to Logout?</h1><br></br><br></br>
      <button onClick={handleLogout}  className={`px-6 py-3 font-semibold text-white rounded-md transition-all duration-300 bg-primary bg-[#1E40AF] shadow-md
  }`}>
        Logout
      </button>
    </div>
    </div>
  );
};

export default Logout;
