import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import nm from '../../assets/av.png';
import axios from 'axios';
import { HiUser } from 'react-icons/hi'; // Import HiUser icon

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJobCornerOpen, setIsJobCornerOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dpUrl, setDpUrl] = useState(''); const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if token exists in local storage to determine authentication
    fetchUserIdAndType();
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
   
    
  }, []);
  const [id, setId] = useState('');
  const [userType, setUserType] = useState('');

  // Fetch user ID and user type
  
   // Fetch user ID and user type
   const fetchUserIdAndType = async () => {
   
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type'); // 'student', 'tutor', or 'organization'

    if (!token || !type) {
      setError('Token or user type not found in local storage.');
      return;
    }

    setUserType(type);

    try {
      const response = await axios.get(`https://server.avyudha.com/dashboard/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(1);
      if (response.data && response.data._id) {
        setId(response.data._id); // Save the ID
        console.log(id);
        fetchProfileImage(response.data._id, type, token); // Fetch the profile image
      } else {
        setError('User ID not found in the response.');
      }
    } catch (error) {
      setError('Error fetching user ID: ' + error.message);
    }
  };

  // Fetch profile image
  const fetchProfileImage = async (id, userType, token) => {
   
    let url = '';
    switch (userType) {
      case 'student':
        url = `https://server.avyudha.com/student/dp/${id}`;
        break;
      case 'tutor':
        url = `https://server.avyudha.com/tutors/download/image/${id}`;
        break;
      case 'organization':
        url = `https://server.avyudha.com/org/download/logo/${id}`;
        break;
      default:
        setError('Invalid user type.');
        return;
    }

    try {
      setLoading(true);
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob', // Expect a blob response for the image
      });

      const imageUrl = URL.createObjectURL(response.data); // Create a URL for the blob
      setDpUrl(imageUrl); // Set the profile image URL
    } catch (error) {
      setError('Error fetching profile image: ' + error.message);
      setDpUrl('');
    } finally {
      setLoading(false);
    }
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleJobCornerDropdown = () => {
    setIsJobCornerOpen(!isJobCornerOpen);
  };

  const toggleAuthDropdown = () => {
    setIsAuthDropdownOpen(!isAuthDropdownOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  const getProfileImage = async () => {
    if (!id || !userType) {
      setError('Please select a user type and enter an ID.');
      return;
    }

    let url = '';
    switch (userType) {
      case 'student':
        url = `https://server.avyudha.com/student/dp/${id}`;
        break;
      case 'tutor':
        url = `https://server.avyudha.com/tutors/download/image/${id}`;
        break;
      case 'organization':
        url = `https://server.avyudha.com/org/download/logo/${id}`;
        break;
      default:
        return;
    }

    try {
      setLoading(true);
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob', // Expect a blob response for the image
      });
      const imageUrl = URL.createObjectURL(response.data); // Create a URL for the blob
      setDpUrl(imageUrl); // Set the dpUrl to display the image
      setError('');
    } catch (error) {
      setError('Error fetching profile image or image not found.');
      setDpUrl('');
    } finally {
      setLoading(false);
    }
  };
  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsJobCornerOpen(false);
    setIsAuthDropdownOpen(false);
  };

  const handleLogout = () => {
    // Remove token and update state on logout
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <>
      <div className="mt-2">
        <div className="border-b-2 -mt-2 w-full bg-white z-100 shadow-sm">
          <div className="max-w-full mb-2" style={{ margin: '2% 4% 0.5% 4%' }}>
            <nav className="border-gray-200 relative mx-auto">
              <div className="container mx-auto flex items-center justify-between">
                <a href="/" className="flex items-center ">
                  <img className="w-36 h-36 mr-2 -mt-12 -mb-12" src={nm} alt="logo" />
                </a>
                <button
                  onClick={toggleMobileMenu}
                  type="button"
                  className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
                  aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
                  aria-controls="mobile-menu"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className={isMobileMenuOpen ? 'hidden w-6 h-6' : 'w-6 h-6'}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    className={isMobileMenuOpen ? 'w-6 h-6' : 'hidden w-6 h-6'}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div
                  className={
                    isMobileMenuOpen
                      ? 'absolute bg-white z-50 -mx-4 top-full left-8 w-full md:flex md:items-center md:justify-end md:relative md:top-0'
                      : 'hidden md:flex md:items-center md:justify-end w-full'
                  }
                  id="mobile-menu"
                >
                  <ul className="bg-white z-50 -ml-4 shadow-md md:shadow-none flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0 md:text-sm md:font-medium">
                    <li className="ml-4 md:ml-0">
                      <Link
                        to="/"
                        className="text-gray-700 hover:bg-gray-50 md:hover:text-[#041F96] md:border-0 block py-1"
                        onClick={closeAllMenus}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="ml-4 md:ml-0">
                      <Link
                        to="/findtutor"
                        className="text-gray-700 hover:bg-gray-50 md:hover:text-[#041F96] md:border-0 block py-1"
                        onClick={closeAllMenus}
                      >
                        Find Tutor
                      </Link>
                    </li>
                    <li className="relative ml-4 md:ml-0">
                      <button
                        onClick={toggleJobCornerDropdown}
                        className="text-gray-700 hover:bg-gray-50 md:hover:text-[#041F96] md:border-0 py-1 font-medium flex items-center"
                      >
                        Job Corner
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <div
                        className={`${
                          isJobCornerOpen ? 'absolute right-0 mt-2 bg-white z-10 w-36 shadow-md' : 'hidden'
                        }`}
                      >
                        <ul className="py-1 space-y-0">
                          <li className="ml-4 md:ml-0">
                            <Link
                              to="/jobpost"
                              className="text-sm hover:bg-gray-100 block px-3 py-1"
                              onClick={closeAllMenus}
                            >
                              Find Job
                            </Link>
                          </li>
                          <li className="ml-4 md:ml-0">
                            <Link
                              to="/organizationpost"
                              className="text-sm hover:bg-gray-100 block px-3 py-1"
                              onClick={closeAllMenus}
                            >
                              Find Organization
                            </Link>
                          </li>
                          <li className="ml-4 md:ml-0">
                            <Link
                              to="/needpost"
                              className="text-sm hover:bg-gray-100 block px-3 py-1"
                              onClick={closeAllMenus}
                            >
                              Find Tuitions
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="ml-4 md:ml-0">
                      <Link
                        to="/about"
                        className="text-gray-700 hover:bg-gray-50 md:hover:text-[#041F96] md:border-0 block py-1"
                        onClick={closeAllMenus}
                      >
                        About
                      </Link>
                    </li>
                    <li className="ml-4 md:ml-0">
                      <Link
                        to="/contact"
                        className="text-gray-700 hover:bg-gray-50 md:hover:text-[#041F96] md:border-0 block py-1"
                        onClick={closeAllMenus}
                      >
                        Contact
                      </Link>
                    </li>
                    <li className="relative ml-4 md:ml-0">
                      {isAuthenticated ? (
                        <>
                          <button
                            onClick={toggleAuthDropdown}
                            className="text-gray-700 hover:bg-gray-50 md:hover:text-[#041F96] md:border-0 py-1 font-medium flex items-center"
                          >
                     
                            
                           {loading ? (
        <div className="w-10 h-10 animate-spin border-4 border-blue-500 border-t-transparent rounded-full"></div>
      ) : dpUrl ? (
        <img
          src={dpUrl}
          alt="Profile"
          className="w-8 h-8 object-cover rounded-full"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                <HiUser className="w-8 h-8 mr-2 border-2 border-gray-300 rounded-full p-1 -mt-1" />

        </div>
      )}
                          </button>
                          <div
                            className={`${
                              isAuthDropdownOpen ? 'absolute right-0 mt-2 bg-white z-10 w-36 shadow-md' : 'hidden'
                            }`}
                          >
                            <ul className="py-1 space-y-1">
                              <li className="ml-4 md:ml-0">
                              <Link
  to={localStorage.getItem("type") === "admin" ? "/student-profiles" : "/your-profile"}
  className="text-sm hover:bg-gray-100 block px-3 py-1"
  onClick={closeAllMenus}
>
  {localStorage.getItem("type") === "admin" ? "Admin Panel" : "Your Profile"}
</Link>

                              </li>
                              <li className="ml-4 md:ml-0">
                              <Link
                                  to="/logout"
                                  className="text-sm hover:bg-gray-100 block px-3 py-1"
                                  onClick={closeAllMenus}
                                >
                                  Logout
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={toggleAuthDropdown}
                            className="text-gray-700 hover:bg-gray-50 md:hover:text-[#041F96] md:border-0 py-1 font-medium flex items-center"
                          >
                            Authentication
                            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                          <div
                            className={`${
                              isAuthDropdownOpen ? 'absolute right-0 mt-2 bg-white z-10 w-36 shadow-md' : 'hidden'
                            }`}
                          >
                            <ul className="py-1 space-y-1">
                              <li className="ml-4 md:ml-0">
                                <Link
                                  to="/login"
                                  className="text-sm hover:bg-gray-100 block px-3 py-1"
                                  onClick={closeAllMenus}
                                >
                                  Login
                                </Link>
                              </li>
                              <li className="ml-4 md:ml-0">
                                <Link
                                  to="/signup"
                                  className="text-sm hover:bg-gray-100 block px-3 py-1"
                                  onClick={closeAllMenus}
                                >
                                  Sign Up
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
