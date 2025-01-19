import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HiCreditCard, HiOutlineSwitchHorizontal, HiDocument, HiClipboard, HiLibrary,
  HiMail, HiCalendar, HiLogout, HiX, HiKey, HiViewGrid, HiUpload, HiBriefcase,
  HiBookmark, HiBell, HiUsers, HiMenu, HiUser
} from 'react-icons/hi';
import './SideBarEmployer.css';

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

  const sidebarLinks = {
    default: [
      { to: '/wallet', icon: <HiCreditCard className="w-6 h-6" />, label: 'Wallets' },
      { to: '/transactions', icon: <HiOutlineSwitchHorizontal className="w-6 h-6" />, label: 'Transactions' },
      { to: '/messages', icon: <HiMail className="w-6 h-6" />, label: 'Messages' },
      { to: '/meetings', icon: <HiCalendar className="w-6 h-6" />, label: 'Meetings' },
      { to: '/logout', icon: <HiLogout className="w-6 h-6" />, label: 'Logout' },
      { to: '/delete-profile', icon: <HiX className="w-6 h-6" />, label: 'Delete Profile' },
      { to: '/update-password', icon: <HiKey className="w-6 h-6" />, label: 'Update Password' },
    ],
    tutor: [
      { to: '/dashboard', icon: <HiViewGrid className="w-6 h-6" />, label: 'User Dashboard' },
      { to: '/your-profile', icon: <HiUser className="w-6 h-6" />, label: 'Your Profile' },
      { to: '/resume', icon: <HiDocument className="w-6 h-6" />, label: 'Resume' },
      { to: '/jobpost', icon: <HiClipboard className="w-6 h-6" />, label: 'Jobs' },
      { to: '/needpost', icon: <HiLibrary className="w-6 h-6" />, label: 'Needs' },
      { to: '/upload-resume', icon: <HiUpload className="w-6 h-6" />, label: 'Uploads' },
      { to: '/applied-company', icon: <HiBriefcase className="w-6 h-6" />, label: 'My Applied' },
      { to: '/shortlist-jobs', icon: <HiBookmark className="w-6 h-6" />, label: 'Shortlist Jobs' },
      { to: '/alerts-jobs', icon: <HiBell className="w-6 h-6" />, label: 'Alerts Jobs' },
      { to: '/purchasedcontacts', icon: <HiUsers className="w-6 h-6" />, label: 'Purchased Contacts' },
    ],
    student: [
      { to: '/dashboard', icon: <HiViewGrid className="w-6 h-6" />, label: 'User Dashboard' },
      { to: '/your-profile', icon: <HiUser className="w-6 h-6" />, label: 'Your Profile' },
      { to: '/findtutor', icon: <HiClipboard className="w-6 h-6" />, label: 'Tutors' },
      { to: '/learningneeds', icon: <HiBriefcase className="w-6 h-6" />, label: 'Learning Needs' },
      { to: '/myclasses', icon: <HiCalendar className="w-6 h-6" />, label: 'My Classes' },
      { to: '/purchasedcontacts', icon: <HiUsers className="w-6 h-6" />, label: 'Purchased Contacts' },
    ],
    organization: [
      { to: '/dashboard', icon: <HiBell className="w-6 h-6" />, label: 'User Dashboard' },
      { to: '/your-profile', icon: <HiUser className="w-6 h-6" />, label: 'Profile' },
      { to: '/findtutor', icon: <HiClipboard className="w-6 h-6" />, label: 'Tutors' },
      { to: '/my-jobs-employer', icon: <HiBriefcase className="w-6 h-6" />, label: 'My Jobs' },
      { to: '/upload-resume-employer', icon: <HiUpload className="w-6 h-6" />, label: 'Submit Job' },
      { to: '/shortlist-jobs-employer', icon: <HiBookmark className="w-6 h-6" />, label: 'Shortlist Candidates' },
      { to: '/alerts-jobs-employer', icon: <HiBell className="w-6 h-6" />, label: 'Candidate Alert' },
      { to: '/purchasedcontacts', icon: <HiUsers className="w-6 h-6" />, label: 'Purchased Contacts' },
    ],
  };

  const links = [...(sidebarLinks[userType] || []), ...sidebarLinks.default];

  return (
    <div className="fixed">
    {/* Sidebar for large screens */}
    <div
      className={`fixed top-24 left-0 w-64 h-screen pt-10 bg-white shadow-lg border-r-2 border-gray-200 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 lg:translate-x-0 overflow-y-auto z-50`}
      aria-label="Sidebar"
    >
      <ul className="space-y-2 font-medium">
        <li className="text-black mb-2 ml-2">
          <p>Welcome User</p> {/* Replace with user email */}
        </li>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={`flex items-center p-2 rounded-lg text-black hover:bg-gray-200 group ${
                activeTab === link.to ? 'bg-gray-200' : ''
              }`}
            >
              {link.icon}
              <span className="ml-3">{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  
    {/* Button for mobile screens */}
    <div className="lg:hidden fixed top-24 left-0 z-50 w-full text-black flex items-center justify-between p-4">
      <button
        onClick={toggleSidebar}
        className="text-black focus:outline-none"
      >
        <HiMenu className="w-8 h-8" />
      </button>
    </div>
  
    {/* Overlay to close the sidebar on mobile */}
    {sidebarOpen && (
      <div
        onClick={toggleSidebar}
        className="fixed inset-0 bg-black opacity-50 z-40"
      ></div>
    )}
  </div>
  
  );
};

export default Sidebar;
