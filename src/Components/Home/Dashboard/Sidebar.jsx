import React, { useState, useEffect } from 'react';
import {
  HiArrowSmRight, HiUser, HiViewBoards, HiShoppingBag, HiHeart, HiBell,
  HiChat, HiCalendar, HiLogout, HiMenu, HiLockClosed, HiTrash, HiUserGroup, HiCash
} from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const Sidebar = ({ activeTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const type = localStorage.getItem('type');
    setUserType(type);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  let sidebarLinks = [
    { to: '/update-password', icon: <HiLockClosed className="w-6 h-6" />, label: 'Update Password' },
    { to: '/delete-profile', icon: <HiTrash className="w-6 h-6" />, label: 'Delete Profile' },
    { to: '/messages', icon: <HiChat className="w-6 h-6" />, label: 'Messages' },
    { to: '/meetings', icon: <HiCalendar className="w-6 h-6" />, label: 'Meetings' },
    { to: '/logout', icon: <HiLogout className="w-6 h-6" />, label: 'Logout' },
  ];

  if (userType === 'tutor') {
    sidebarLinks = [
      { to: '/user-dashboard', icon: <HiViewBoards className="w-6 h-6" />, label: 'User Dashboard' },
      { to: '/your-profile', icon: <HiUser className="w-6 h-6" />, label: 'Your Profile' },
      { to: '/upload-resume', icon: <HiArrowSmRight className="w-6 h-6" />, label: 'My Resume' },
      { to: '/applied-company', icon: <HiShoppingBag className="w-6 h-6" />, label: 'My Applied' },
      { to: '/shortlist-jobs', icon: <HiHeart className="w-6 h-6" />, label: 'Shortlist Jobs' },
      { to: '/alerts-jobs', icon: <HiBell className="w-6 h-6" />, label: 'Alerts Jobs' },
      { to: '/following-employer', icon: <HiUserGroup className="w-6 h-6" />, label: 'Following Employer' },
      { to: '/pricing', icon: <HiCash className="w-6 h-6" />, label: 'Pricing' },
      ...sidebarLinks,
    ];
  } else if (userType === 'student') {
    sidebarLinks = [
      { to: '/your-profile', icon: <HiUser className="w-6 h-6" />, label: 'Your Profile' },
      { to: '/pricing', icon: <HiCash className="w-6 h-6" />, label: 'Pricing' },
      { to: '/learningneeds', icon: <HiUser className="w-6 h-6" />, label: 'Learning Needs' },
      { to: '/myclasses', icon: <HiHeart className="w-6 h-6" />, label: 'My Classes' },
      { to: '/reviews', icon: <HiChat className="w-6 h-6" />, label: 'Reviews' },
      ...sidebarLinks,
    ];
  } else if (userType === 'organization') {
    sidebarLinks = [
      { to: '/user-dashboard-employer', icon: <HiViewBoards className="w-6 h-6" />, label: 'User Dashboard' },
      { to: '/your-profile', icon: <HiUser className="w-6 h-6" />, label: 'Profile' },
      { to: '/my-jobs-employer', icon: <HiUser className="w-6 h-6" />, label: 'My Jobs' },
      { to: '/upload-resume-employer', icon: <HiArrowSmRight className="w-6 h-6" />, label: 'Submit Job' },
      { to: '/applied-company-employer', icon: <HiShoppingBag className="w-6 h-6" />, label: 'Applicants Jobs' },
      { to: '/shortlist-jobs-employer', icon: <HiHeart className="w-6 h-6" />, label: 'Shortlist Candidates' },
      { to: '/alerts-jobs-employer', icon: <HiBell className="w-6 h-6" />, label: 'Candidate Alert' },
      { to: '/messages-employer', icon: <HiChat className="w-6 h-6" />, label: 'Messages' },
      { to: '/meetings-employer', icon: <HiCalendar className="w-6 h-6" />, label: 'Meetings' },
      { to: '/pricing-employer', icon: <HiCash className="w-6 h-6" />, label: 'Pricing' },
      ...sidebarLinks,
    ];
  }

  return (
    <>
      {/* Sidebar for large screens */}
      <aside
        className={`fixed left-0 top-24 z-20 w-80 h-full pt-10 bg-white shadow-lg border-r-2 border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            <li className="text-black mb-2">
              <p>Welcome User</p> {/* Replace with user email */}
            </li>
            {sidebarLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={`flex items-center p-2 rounded-lg text-black hover:bg-gray-200 group ${activeTab === link.to ? 'bg-gray-200' : ''}`}
                >
                  {link.icon}
                  <span className="ml-3">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Button for mobile screens */}
      <div className="lg:hidden fixed top-24 left-0 z-50 w-full text-black flex items-center justify-between p-4 ">
        <button onClick={toggleSidebar} className="text-black focus:outline-none">
          <HiMenu className="w-8 h-8" />
        </button>
      </div>

      {/* Overlay to close the sidebar on mobile */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
