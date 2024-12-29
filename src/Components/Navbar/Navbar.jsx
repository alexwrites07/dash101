import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import nm from '../../assets/ac.png';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJobCornerOpen, setIsJobCornerOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleJobCornerDropdown = () => {
    setIsJobCornerOpen(!isJobCornerOpen);
  };

  const toggleAuthDropdown = () => {
    setIsAuthDropdownOpen(!isAuthDropdownOpen);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsJobCornerOpen(false);
    setIsAuthDropdownOpen(false);
  };

  return (
    <div className="mt-2">
      <div className="border-b-2 -mt-2 w-full bg-white z-50 shadow-sm">
        <div className="max-w-full mb-2" style={{ margin: '2% 4% 0.5% 4%' }}>
          <nav className="border-gray-200 relative mx-auto">
            <div className="container mx-auto flex items-center justify-between">
              <a href="/" className="flex items-center">
                <img
                  className="w-36 h-36 mr-2 -mt-12 -mb-12"
                  src={nm}
                  alt="logo"
                />
              </a>
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Open main menu</span>
                <svg className={isMobileMenuOpen ? "hidden w-6 h-6" : "w-6 h-6"} fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg className={isMobileMenuOpen ? "w-6 h-6" : "hidden w-6 h-6"} fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
                className={`${isMobileMenuOpen ? "block" : "hidden"} md:flex md:items-center md:justify-end w-full`}
                id="mobile-menu"
              >
                <ul className="bg-white shadow-md md:shadow-none md:bg-transparent flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0 md:text-sm md:font-medium">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-700 hover:bg-gray-50 md:hover:text-[#041F96] md:border-0 block  py-1"
                      onClick={closeAllMenus}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/findtutor"
                      className="text-gray-700 hover:bg-gray-50 md:hover:text-[#041F96] md:border-0 block  py-1"
                      onClick={closeAllMenus}
                    >
                      Find Tutor
                    </Link>
                  </li>
                  <li className="relative">
                    <button
                      onClick={toggleJobCornerDropdown}
                      className="text-gray-700 hover:bg-gray-50 md:hover:text-[#041F96] md:border-0  py-1 font-medium flex items-center"
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
                        isJobCornerOpen ? "absolute right-0 mt-2 bg-white z-10 w-36 shadow-md" : "hidden"
                      }`}
                    >
                      <ul className="py-1 space-y-1">
                        <li>
                          <Link to="/jobpost" className="text-sm hover:bg-gray-100 block px-3 py-1" onClick={closeAllMenus}>
                            Find Job
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/organizationpost"
                            className="text-sm hover:bg-gray-100 block px-3 py-1"
                            onClick={closeAllMenus}
                          >
                            Find Organization
                          </Link>
                        </li>
                        <li>
                          <Link to="/needpost" className="text-sm hover:bg-gray-100 block px-3 py-1" onClick={closeAllMenus}>
                            Find Needs
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="text-gray-700 hover:bg-gray-50 md:hover:text-[#041F96] md:border-0 block py-1"
                      onClick={closeAllMenus}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-gray-700 hover:bg-gray-50 md:hover:text-[#041F96] md:border-0 block py-1"
                      onClick={closeAllMenus}
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="relative">
                    <button
                      onClick={toggleAuthDropdown}
                      className="text-gray-700 hover:bg-gray-50 md:hover:text-[#041F96] md:border-0  py-1 font-medium flex items-center"
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
                        isAuthDropdownOpen ? "absolute right-0 mt-2 bg-white z-10 w-36 shadow-md" : "hidden"
                      }`}
                    >
                      <ul className="py-1 space-y-1">
                        <li>
                          <Link to="/login" className="text-sm hover:bg-gray-100 block px-3 py-1" onClick={closeAllMenus}>
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link to="/signup" className="text-sm hover:bg-gray-100 block px-3 py-1" onClick={closeAllMenus}>
                            Sign Up
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
