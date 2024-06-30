import React, { useState } from 'react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="max-w-full mx-auto" style={{ margin: '2% 4% 0 4%' }}>
        <nav className="border-gray-200">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <a href="#" className="flex">
              <img className="w-32 h-12 mr-2 -mb-2" src="https://kridhatutor.com/wp-content/uploads/2020/04/kridha-tutor-tuition-logo-e1681547247439.webp" alt="logo" />
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
            <div className={isMobileMenuOpen ? "md:flex md:items-center md:justify-end w-full md:w-auto" : "hidden md:flex md:items-center md:justify-end w-full md:w-auto"} id="mobile-menu">
              <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <a href="#" className="bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-[#041F96] md:p-0 rounded focus:outline-none" aria-current="page">Home</a>
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
                    Dropdown
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                  <div id="dropdownNavbar" className={isDropdownOpen ? "absolute right-0 mt-2 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44" : "hidden"}>
                    <ul className="py-1" aria-labelledby="dropdownNavbarLink">
                      <li>
                        <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Dashboard</a>
                      </li>
                      <li>
                        <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Settings</a>
                      </li>
                      <li>
                        <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Earnings</a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sign out</a>
                    </div>
                  </div>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-[#041F96] md:p-0">Services</a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-[#041F96] md:p-0">Pricing</a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-[#041F96] md:p-0">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
