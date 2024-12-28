import React, { useState, useEffect } from "react";
import { HiBell, HiUser } from "react-icons/hi";
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import "../Dashboard/Header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [notificationMessage, setNotificationMessage] = useState("");

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
    if (notificationMessage) {
      alert(notificationMessage); // Show the notification message
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    // Fetch unread notifications on component mount
    fetchUnreadNotifications();

    // Optionally, fetch notifications at intervals
    const intervalId = setInterval(fetchUnreadNotifications, 3000); // Refresh every 30 seconds

    return () => clearInterval(intervalId); // Cleanup interval
  }, []);

  return (
    <header className="header fixed top-0 left-0 right-0 z-1000 bg-white text-black flex items-center justify-between p-12 shadow-lg h-16">
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img
          className="w-32 h-12 shadow-lg"
          src="https://kridhatutor.com/wp-content/uploads/2020/04/kridha-tutor-tuition-logo-e1681547247439.webp"
          alt="logo"
        />
      </a>

      {/* Notification Bell and User Menu */}
      <div className="flex">
        <div className="relative">
          <HiBell
            className={`w-6 h-6 mr-6 cursor-pointer transition duration-300 ${
              newNotificationCount > 0 ? "text-red-600": "hover:text-gray-400" 
            }`}
            onClick={handleNotificationClick}
          />
          {/* Show red badge for new notifications */}
          {newNotificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {newNotificationCount}
            </span>
          )}
        </div>

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
              href="/"
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
