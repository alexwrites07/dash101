import React, { useState } from 'react';
import { HiArrowSmRight, HiUser, HiViewBoards, HiShoppingBag, HiHeart, HiBell, HiChat, HiCalendar, HiLogout, HiMenu, HiLockClosed, HiTrash, HiUserGroup, HiCash } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import './SideBar.css'

const Sidebar = ({ activeTab }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const sidebarLinks = [
        { to: '/user-dashboard', icon: <HiViewBoards className="w-6 h-6" />, label: 'User Dashboard' },
        { to: '/your-profile', icon: <HiUser className="w-6 h-6" />, label: 'Your Profile' },
        { to: '/upload-resume', icon: <HiArrowSmRight className="w-6 h-6" />, label: 'My Resume' },
        { to: '/applied-company', icon: <HiShoppingBag className="w-6 h-6" />, label: 'My Applied' },
        { to: '/shortlist-jobs', icon: <HiHeart className="w-6 h-6" />, label: 'Shortlist Jobs' },
        { to: '/alerts-jobs', icon: <HiBell className="w-6 h-6" />, label: 'Alerts Jobs' },
        { to: '/following-employer', icon: <HiUserGroup className="w-6 h-6" />, label: 'Following Employer' },
        { to: '/messages', icon: <HiChat className="w-6 h-6" />, label: 'Messages' },
        { to: '/meetings', icon: <HiCalendar className="w-6 h-6" />, label: 'Meetings' },
        { to: '/update-password', icon: <HiLockClosed className="w-6 h-6" />, label: 'Update Password' },
        { to: '/delete-profile', icon: <HiTrash className="w-6 h-6" />, label: 'Delete Profile' },
        { to: '/pricing', icon: <HiCash className="w-6 h-6" />, label: 'Pricing' },
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
