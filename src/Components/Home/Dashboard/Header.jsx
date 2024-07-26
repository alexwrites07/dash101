import React from 'react';
import { HiBell, HiUser } from 'react-icons/hi';
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import './Header.css'

const Header = () => {
    return (
        <header className="header fixed top-0 left-0 right-0 z-1000 bg-white text-black flex items-center justify-between p-12 shadow-lg h-16">
                <img className="w-32 h-12 shadow-lg" src="https://kridhatutor.com/wp-content/uploads/2020/04/kridha-tutor-tuition-logo-e1681547247439.webp" alt="logo" />
                <div className='flex'>
            <HiBell className="w-6 h-6 mr-6 cursor-pointer hover:text-gray-400 transition duration-300" />
            <Menu>
                <MenuButton className="flex items-center space-x-2 focus:outline-none">
                    <HiUser className="w-8 h-8 rounded-full cursor-pointer hover:text-gray-400 transition duration-300" />
                </MenuButton>
                <MenuList className="logout absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md focus:outline-none">

                    <MenuItem as={MenuLink} href="/your-profile" className="block px-4 py-2 hover:bg-gray-100 transition duration-300">
                        My Profile
                    </MenuItem>
                    <MenuItem as={MenuLink} href="/logout" className="block px-4 py-2 hover:bg-gray-100 transition duration-300">
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
            </div>
        </header>
    );
};

export default Header;
