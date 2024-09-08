import React, { useState } from 'react';
import { HiArrowSmRight, HiUser, HiViewBoards, HiShoppingBag, HiHeart, HiBell, HiChat, HiCalendar, HiLogout, HiMenu, HiLockClosed, HiTrash, HiUserGroup, HiCash, HiBookmark } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import './SideBarEmployer.css'

const Sidebar = ({ activeTab }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const sidebarLinks = [
        { to: '/user-dashboard-employer', icon: <HiViewBoards className="w-6 h-6" />, label: 'User Dashboard' },
        { to: '/your-profile-employer', icon: <HiUser className="w-6 h-6" />, label: 'Profile' },
        { to: '/my-jobs-employer', icon: <HiBookmark className="w-6 h-6" />, label: 'My Jobs' },
        { to: '/upload-resume-employer', icon: <HiArrowSmRight className="w-6 h-6" />, label: 'Submit Job' },
        { to: '/applied-company-employer', icon: <HiShoppingBag className="w-6 h-6" />, label: 'Applicants Jobs' },
        { to: '/shortlist-jobs-employer', icon: <HiHeart className="w-6 h-6" />, label: 'Shortlist Candidates' },
        { to: '/alerts-jobs-employer', icon: <HiBell className="w-6 h-6" />, label: 'Candidate Alert' },
        { to: '/messages-employer', icon: <HiChat className="w-6 h-6" />, label: 'Messages' },
        { to: '/meetings-employer', icon: <HiCalendar className="w-6 h-6" />, label: 'Meetings' },
        { to: '/wallet', icon: <HiCash className="w-6 h-6" />, label: 'Wallet' },
        { to: '/update-password-employer', icon: <HiLockClosed className="w-6 h-6" />, label: 'Update Password' },
        { to: '/delete-profile-employer', icon: <HiTrash className="w-6 h-6" />, label: 'Delete Profile' },
        { to: '/', icon: <HiLogout className="w-6 h-6" />, label: 'Logout' },
    ];

    return (
        <>
            <aside className={`lg:block fixed left-0 top-24 mt-4 z--1 w-80 h-full pt-10 shadow-lg h-16 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} sm:translate-x-0 bg-white border-gray-700 custom-sidebar`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium">
                        <li className="text-black mb-2">
                            <p>Welcome 
                            {/* Replace with user email */}
                            User </p>
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
                        <br />
                    </ul>
                </div>
            </aside>

            <div className="lg:hidden fixed top-0 left-0 z-50 w-full bg-white text-black flex items-center justify-between p-4 shadow-lg">
                <button onClick={toggleSidebar} className="text-black focus:outline-none">
                    <HiMenu className="w-8 h-8" />
                </button>
                <img className="w-32 h-12 shadow-lg" src="https://kridhatutor.com/wp-content/uploads/2020/04/kridha-tutor-tuition-logo-e1681547247439.webp" alt="logo" />
            </div>
        </>
    );
};

export default Sidebar;
