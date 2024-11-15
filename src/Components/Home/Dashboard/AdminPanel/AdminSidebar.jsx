import React, { useState, useEffect } from 'react';
import {
  HiArrowSmRight, HiUser, HiViewBoards, HiShoppingBag, HiHeart, HiBell,
  HiChat, HiCalendar, HiLogout, HiMenu, HiLockClosed, HiTrash, HiUserGroup, HiCash, HiChevronDown
} from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import '../Sidebar.css';

const Sidebar = ({ activeTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userType, setUserType] = useState('');
  const [widgetsOpen, setWidgetsOpen] = useState(false);

  useEffect(() => {
    const type = localStorage.getItem('type');
    setUserType(type);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleWidgets = () => {
    setWidgetsOpen(!widgetsOpen);
  };

  // Define sidebar links
  const sidebarLinks = [
    { to: '/admin-profile', icon: <HiChat className="w-6 h-6" />, label: 'Admin Profile' },
    { to: '/dpchange', icon: <HiChat className="w-6 h-6" />, label: 'Dp Change' },
    { to: '/docchange', icon: <HiChat className="w-6 h-6" />, label: 'Doc Change' },
    { to: '/student-profiles', icon: <HiUser className="w-6 h-6" />, label: 'Student Profiles' },
    { to: '/tutor-profiles', icon: <HiUser className="w-6 h-6" />, label: 'Tutors Profiles' },
    { to: '/organization-profiles', icon: <HiUser className="w-6 h-6" />, label: 'Organisation Profiles' },
    { to: '/learning-need-posts', icon: <HiViewBoards className="w-6 h-6" />, label: 'Learning Need Posts' },
    { to: '/reviews-rating', icon: <HiHeart className="w-6 h-6" />, label: 'Reviews & Rating' },
    { to: '/blogs-admin', icon: <HiChat className="w-6 h-6" />, label: 'Blogs' },
    

    { to: '/edit-job-post', icon: <HiArrowSmRight className="w-6 h-6" />, label: 'Edit-Job' },
    {
      to: '#', icon: <HiArrowSmRight className="w-6 h-6" />, label: 'Widgets', dropdown: true, onClick: toggleWidgets,
      subLinks: [
        // { to: '/widgets/hero-section', label: 'Hero Section' },
        // { to: '/widgets/footer', label: 'Footer' },
        // { to: '/widgets/headers', label: 'Headers' },
        { to: '/widgets/featured-category', label: 'Featured Category' },
        { to: '/widgets/featured-jobs', label: 'Featured Jobs Post' },
        { to: '/widgets/featured-institution', label: 'Featured Institution' },
        { to: '/widgets/featured-testimonials', label: 'Featured Testimonials' },
      ]
    },
    // { to: '/faqs', icon: <HiArrowSmRight className="w-6 h-6" />, label: 'FAQs' },
    // { to: '/about-us', icon: <HiUserGroup className="w-6 h-6" />, label: 'About Us' },
    // { to: '/contact-us', icon: <HiBell className="w-6 h-6" />, label: 'Contact Us' },
    // { to: '/coins', icon: <HiCash className="w-6 h-6" />, label: 'Coins' },
    // { to: '/logout', icon: <HiLogout className="w-6 h-6" />, label: 'Logout' },
  ];

  return (
    <>
      <aside className={`lg:block fixed left-0 top-20 -mt-4 z-1 w-80 h-full pt-10 shadow-lg transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} sm:translate-x-0 bg-white border-gray-700 custom-sidebar`} aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            {sidebarLinks.map((link, index) => (
              <li key={index} className="text-black">
                {!link.dropdown ? (
                  <NavLink
                    to={link.to}
                    className={`flex items-center p-2 rounded-lg text-black hover:bg-gray-200 group ${activeTab === link.to ? 'bg-gray-200' : ''}`}
                  >
                    {link.icon}
                    <span className="ml-3">{link.label}</span>
                  </NavLink>
                ) : (
                  <>
                    <button
                      onClick={link.onClick}
                      className="flex items-center w-full p-2 rounded-lg text-black hover:bg-gray-200 group"
                    >
                      {link.icon}
                      <span className="ml-3">{link.label}</span>
                      <HiChevronDown className={`ml-auto w-5 h-5 ${widgetsOpen ? 'transform rotate-180' : ''}`} />
                    </button>
                    {widgetsOpen && (
                      <ul className="pl-6 mt-2 space-y-2">
                        {link.subLinks.map((subLink, subIndex) => (
                          <li key={subIndex}>
                            <NavLink
                              to={subLink.to}
                              className="flex items-center p-2 rounded-lg text-black hover:bg-gray-200"
                            >
                              <span>{subLink.label}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 z-50 w-full bg-white text-black flex items-center justify-between p-4 shadow-lg">
        <button className="text-black focus:outline-none">
          <HiMenu className="w-8 h-8" />
        </button>
        <img className="w-32 h-12 shadow-lg" src="https://kridhatutor.com/wp-content/uploads/2020/04/kridha-tutor-tuition-logo-e1681547247439.webp" alt="logo" />
      </div>
    </>
  );
};

export default Sidebar;

