import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Import assets
import menuIcon from '../assets/sidebar/Menu.svg';
import dashboardIcon from '../assets/sidebar/ViewGridOutline.svg';
import learnIcon from '../assets/sidebar/LightBulbOutline.svg';
import upskillIcon from '../assets/sidebar/ClipboardOutline.svg';
import forumsIcon from '../assets/sidebar/UserGroupOutline.svg';
import comp from '../assets/Component 7.svg';
import contestIcon from '../assets/sidebar/ChartBarOutline.svg';
import leaderboardIcon from '../assets/sidebar/StarOutline.svg';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true); // State to track sidebar expansion
  const menuItems = [
    { name: 'Dashboard', icon: dashboardIcon, path: '/' },
    { name: 'Learn', icon: learnIcon, path: '/learn' },
    { name: 'Upskill', icon: upskillIcon, path: '/upskill' },
      { name: 'Forums', icon: forumsIcon, path: '/forums' },
  
      { name: 'Contest', icon: contestIcon, path: '/contest' },
      { name: 'Leaderboard', icon: leaderboardIcon, path: '/leaderboard' }
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  return (
    <aside style={{
      width: isExpanded ? '250px' : '60px', // Width changes based on state
      padding: '20px',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F1FBFF 100%)',
      transition: 'width 0.3s' // Smooth transition for width change
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', cursor: 'pointer' }} onClick={toggleSidebar}>
        <img src={menuIcon} alt="Menu Icon" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
        {isExpanded && ( // Only show the title if the sidebar is expanded
          <h1 style={{ fontFamily: 'DM Sans', fontSize: '20px', fontWeight: '700', color: 'black' }}><img src={comp} style={{ width: '200px', height: '200px', marginLeft: '20px',marginTop:'-90px',marginBottom:'-95px' }}></img></h1>
        )}
      </div>
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {menuItems.map((item, index) => (
            <li key={index} style={{ margin: '20px 0' }}>
              <NavLink to={item.path} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black' }}>
                <img src={item.icon} alt={`${item.name} icon`} style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                {isExpanded && ( // Only show the name if the sidebar is expanded
                  <span style={{ fontFamily: 'DM Sans', fontSize: '20px', fontWeight: '400', lineHeight: '40px', letterSpacing: '-0.03em' }}>
                    {item.name}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
