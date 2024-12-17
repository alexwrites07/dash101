import React, { useState, useEffect } from 'react';
import { HiBell, HiUser } from 'react-icons/hi';
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import './HeaderEmployer.css';
import { useNavigate } from 'react-router-dom';

// Sample notifications array
const initialNotifications = [
  { message: 'You are invited to apply for the job Physics Tutor for IIT JEE.', time: '6 days ago' },
  { message: 'The application is undo approved on your job Chemistry Tutor for IIT JEE by vikashpanjiyar2000.', time: '6 days ago' },
  { message: 'The application is approved on your job Chemistry Tutor for IIT JEE by vikashpanjiyar2000.', time: '6 days ago' },
  { message: 'The application is removed on your job Physics Tutor for IIT JEE by vikashpanjiyar2000.', time: '6 days ago' },
  { message: 'The application is approved on your job Physics Tutor for IIT JEE by vikashpanjiyar2000.', time: '2 weeks ago' },
  { message: 'A new meeting is created on the job Physics Tutor for IIT JEE by vikashpanjiyar2000.', time: '2 weeks ago' },
];

const Header = () => {
  const navigate = useNavigate();

  // State to manage notifications and count of new notifications
  const [notifications, setNotifications] = useState(initialNotifications);
  const [newNotificationCount, setNewNotificationCount] = useState(() => {
    // Get the last viewed time from localStorage
    const lastViewedTime = localStorage.getItem('lastViewedTime');
    if (lastViewedTime) {
      // Calculate new notifications since last viewed
      const newCount = notifications.filter(
        (notification) => new Date(notification.time) > new Date(lastViewedTime)
      ).length;
      return newCount;
    }
    return notifications.length; // All are new if no last viewed time
  });

  // Function to handle the click on the notification icon
  const handleNotificationClick = () => {
    // Update last viewed time in localStorage
    localStorage.setItem('lastViewedTime', new Date().toISOString());
    setNewNotificationCount(0);

    // Navigate to the user dashboard
    navigate('/dashboard');
  };

  useEffect(() => {
    // Simulate fetching new notifications from a server or API
    const fetchNewNotifications = () => {
      // Get the last viewed time from localStorage
      const lastViewedTime = localStorage.getItem('lastViewedTime');

      // Calculate new notifications
      const newCount = notifications.filter(
        (notification) => new Date(notification.time) > new Date(lastViewedTime)
      ).length;
      
      setNewNotificationCount(newCount);
    };

    fetchNewNotifications();
  }, [notifications]); // Dependency on notifications to recalculate on updates


  // // Simulate adding new notifications
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // Simulate a new notification
  //     const newNotification = {
  //       message: `New job alert: Tutor position available - ${new Date().toLocaleTimeString()}`,
  //       time: new Date().toISOString(),
  //     };

  //     // Update notifications
  //     setNotifications((prevNotifications) => {
  //       const updatedNotifications = [newNotification, ...prevNotifications];
  //       return updatedNotifications;
  //     });
  //   }, 1000000); // Add new notification every 10 seconds

  //   return () => clearInterval(intervalId); // Cleanup interval on component unmount
  // }, []);

  return (
    <header className="header fixed top-0 left-0 right-0 z-1000 bg-white text-black flex items-center justify-between p-12 shadow-lg h-16">
      <img
        className="w-32 h-12 shadow-lg"
        src="https://kridhatutor.com/wp-content/uploads/2020/04/kridha-tutor-tuition-logo-e1681547247439.webp"
        alt="logo"
      />
      <div className="flex">
        <div className="relative">
          <HiBell
            className="w-6 h-6 mr-6 cursor-pointer hover:text-gray-400 transition duration-300"
            onClick={handleNotificationClick}
          />
          {/* Show badge only if there are new notifications */}
          {newNotificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {newNotificationCount}
            </span>
          )}
        </div>
        <Menu>
          <MenuButton className="flex items-center space-x-2 focus:outline-none">
            <HiUser className="w-8 h-8 rounded-full cursor-pointer hover:text-gray-400 transition duration-300" />
          </MenuButton>
          <MenuList className="logout absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md focus:outline-none">
            <MenuItem
              as={MenuLink}
              href="/your-profile-employer"
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
