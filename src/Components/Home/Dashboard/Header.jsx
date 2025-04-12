import React, { useState, useEffect } from "react";
import { HiBell, HiUser } from "react-icons/hi";
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from "@radix-ui/react-dropdown-menu";
import "@reach/menu-button/styles.css";
import "./Header.css";
import nm from '../../../assets/av.png'
import { useLocation, Link } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [notificationMessage, setNotificationMessage] = useState("");
 // Set initial notification count
  const [notificationRead, setNotificationRead] = useState(false); // State to track if notification is read
  const location = useLocation(); // Get current location

  // Effect to reset the notification on navigating to dashboard
  useEffect(() => {
    if (location.pathname === '/dashboard') {
      setNotificationRead(true); // Mark as read when on the dashboard
    }
  }, [location.pathname]); // Runs every time the location changes

  // Handle click on the notification icon
 
  // Fetch unread notifications count and message
  const fetchUnreadNotifications = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("https://server.avyudha.com/unreadNotifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.message === "No unread notifications found for this user.") {
        setNewNotificationCount(0);
        setNotificationMessage(""); // Reset message
      } else if (response.data?.notifications?.length) {
        setNewNotificationCount(response.data.notifications.length);
        
        setNotificationMessage(response.data.notifications[0]?.message || "New notifications");
      }
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  };

  // Handle notification icon click
  const handleNotificationClick = () => {
    setNotificationRead(true); // Mark notification as read when clicked
    navigate('/dashboard');
  };

  useEffect(() => {
    // Fetch unread notifications on component mount
    fetchUnreadNotifications();

    // Optionally, fetch notifications at intervals
    const intervalId = setInterval(fetchUnreadNotifications, 3000); // Refresh every 30 seconds

    return () => clearInterval(intervalId); // Cleanup interval
  }, []);

  return (
    <header className="header fixed top-0 left-0 right-0 bg-white text-black flex items-center justify-between p-12 shadow-lg h-16">
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img
          className="w-36 h-36 -mt-12 -mb-12 "
          src={nm}
          alt="logo"
        />
      </a>

      {/* Notification Bell and User Menu */}
      <div className="flex">
      <div className="relative">
        <HiBell
          className={`w-6 h-6 mr-6 cursor-pointer transition duration-300 ${
            notificationRead || newNotificationCount === 0
              ? 'text-gray-400' // Normal color if read or no notifications
              : 'text-red-600' // Red color if not read
          }`}
          onClick={handleNotificationClick} // Mark as read on click
        />
        {/* Show red badge for new notifications */}
        {newNotificationCount > 0 && !notificationRead && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {newNotificationCount}
          </span>
        )}
      </div>
    
      {/* Example links to navigate */}
      {/* <Link to="/dashboard">Go to Dashboard</Link> */}
      {/* <Link to="/other-page">Go to Other Page</Link> */}
   

        {/* User Menu */}
        <Menu>
          <MenuButton className="flex items-center space-x-2 focus:outline-none">
            <HiUser className="w-8 h-8 rounded-full cursor-pointer hover:text-gray-400 transition duration-300" />
          </MenuButton>
          <MenuList className="logout absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md focus:outline-none">
            <MenuItem
              as={MenuLink}
              href="/your-profile"
              className="block px-4 py-2 hover:bg-gray-100 transition duration-300"
            >
              My Profile
            </MenuItem>
            <MenuItem
              as={MenuLink}
              href="/logout"
              className="block px-4 py-2 hover:bg-gray-100 transition duration-300"
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
