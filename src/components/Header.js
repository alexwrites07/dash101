import React from 'react';
import bellIcon from '../assets/Bell.svg';
import profilePic from '../assets/Ellipse 13.svg';

const Header = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '20px', borderBottom: '1px solid #E0E0E0' }}>
      <img src={bellIcon} alt="Notification Bell" style={{ width: '24px', height: '24px', marginRight: '20px' }} />
      <img src={profilePic} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
    </header>
  );
};

export default Header;
