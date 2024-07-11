import React from 'react';
import { HiBell, HiUser } from 'react-icons/hi';
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from '@reach/menu-button';
import '@reach/menu-button/styles.css';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-20 bg-white text-black flex items-center justify-end p-12 shadow-lg h-16">
            <HiBell className="w-6 h-6 mr-6 cursor-pointer hover:text-gray-400 transition duration-300" />
            <Menu>
                <MenuButton className="flex items-center space-x-2 focus:outline-none">
                    <HiUser className="w-8 h-8 rounded-full cursor-pointer hover:text-gray-400 transition duration-300" />
                </MenuButton>
                {/* <img className="w-32 h-12 shadow-lg" src="https://kridhatutor.com/wp-content/uploads/2020/04/kridha-tutor-tuition-logo-e1681547247439.webp" alt="logo" /> */}
                <MenuList className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md focus:outline-none">

                    <MenuItem as={MenuLink} href="/your-profile" className="block px-4 py-2 hover:bg-gray-100 transition duration-300">
                        My Profile
                    </MenuItem>
                    <MenuItem as={MenuLink} href="/logout" className="block px-4 py-2 hover:bg-gray-100 transition duration-300">
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </header>
    );
};

export default Header;
