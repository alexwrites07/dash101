import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
    <div className='mt-2'>
      <div className="border-b-2 -mt-2 w-full bg-white z-50 shadow-sm">
        <div className="max-w-full mb-2" style={{ margin: '2% 4% 0.5% 4%' }}>
          <nav className="border-gray-200 relative mx-auto">
            <div className="container mx-auto flex items-center justify-between">
              <a href="/" className="flex items-center">
                <img className="w-32 h-12 mr-2 -mt-1" src="https://kridhatutor.com/wp-content/uploads/2020/04/kridha-tutor-tuition-logo-e1681547247439.webp" alt="logo" />
              </a>
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
                aria-expanded={isMobileMenuOpen ? "true" : "false"}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Open main menu</span>
                <svg className={isMobileMenuOpen ? "hidden w-6 h-6" : "w-6 h-6"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
                <svg className={isMobileMenuOpen ? "w-6 h-6" : "hidden w-6 h-6"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <div className={isMobileMenuOpen ? "absolute top-full left-0 w-full md:flex md:items-center md:justify-end md:relative md:top-0" : "hidden md:flex md:items-center md:justify-end w-full"} id="mobile-menu">
                <ul className="bg-white shadow-md md:shadow-none md:bg-transparent flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
                  <li>
                    <Link to="/" className="bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-[#041F96] md:p-0 rounded focus:outline-none" aria-current="page" onClick={closeMobileMenu}>Home</Link>
                  </li>
                  <li>
                    <Link to="/jobpost" className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-[#041F96] md:p-0" onClick={closeMobileMenu}>Find Job</Link>
                  </li>
                  <li>
                    <Link to="/findtutor" className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-[#041F96] md:p-0" onClick={closeMobileMenu}>Find Tutor</Link>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-[#041F96] md:p-0" onClick={closeMobileMenu}>Services</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-[#041F96] md:p-0" onClick={closeMobileMenu}>Pricing</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-[#041F96] md:p-0" onClick={closeMobileMenu}>Contact</a>
                  </li>
                  <li className="relative">
                    <button
                      onClick={toggleDropdown}
                      id="dropdownNavbarLink"
                      data-dropdown-toggle="dropdownNavbar"
                      className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-[#041F96] md:p-0 font-medium flex items-center justify-between w-full"
                      aria-expanded={isDropdownOpen ? "true" : "false"}
                      aria-controls="dropdownNavbar"
                    >
                      Login
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </button>
                    <div id="dropdownNavbar" className={isDropdownOpen ? "absolute right-0 mt-2 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44" : "hidden"}>
                      <ul className="py-1" aria-labelledby="dropdownNavbarLink">
                        <li>
                          <Link to="/login" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2" onClick={closeMobileMenu}>Login</Link>
                        </li>
                        <li>
                          <Link to="/dashboard" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2" onClick={closeMobileMenu}>Dashboard</Link>
                        </li>
                        <li>
                          <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2" onClick={closeMobileMenu}>Settings</a>
                        </li>
                      </ul>
                      <div className="py-1">
                        <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2" onClick={closeMobileMenu}>Sign out</a>
                      </div>
                    </div>
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
