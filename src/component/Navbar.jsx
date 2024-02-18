import React, { useState } from 'react';
import logo from '/logo.png';
import { useNavigate } from "react-router-dom";
import { useUserAuth } from '../context/UserAuthContext.jsx';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useUserAuth();
    const navigate = useNavigate();

    const Logout = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <nav className="bg-white text-gray-800 shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div>
                            {/* Website Logo */}
                            <a href="#" className="flex items-center py-4 px-2">
                                <img src={logo} className='w-40' alt="Logo" />
                            </a>
                        </div>
                        {/* Primary Navbar items */}
                        <div className="hidden md:flex items-center space-x-1">
                            <a href="/book" className="py-4 px-2 text-green-800 hover:text-green-600 transition duration-300">รายการหนังสือ</a>
                            <a href="/member" className="py-4 px-2 text-green-800 hover:text-green-600 transition duration-300">สมาชิกห้องสมุด</a>
                            <a href="/borrow_list" className="py-4 px-2 text-green-800 hover:text-green-600 transition duration-300">รายการยืมหนังสือ</a>
                            <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-2 rounded' type="button" onClick={Logout}>Logout</button>
                        </div>
                        
                    </div>
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
                            <svg className="w-6 h-6 text-green-800 hover:text-green-600"
                                x-show="!showMenu"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <a href="/book" className="block py-2 px-4 text-sm text-green-800 hover:bg-green-100">รายการหนังสือ</a>
                <a href="/member" className="block py-2 px-4 text-sm text-green-800 hover:bg-green-100">สมาชิกห้องสมุด</a>
                <a href="/borrow_list" className="block py-2 px-4 text-sm text-green-800 hover:bg-green-100">รายการยืมหนังสือ</a>
            </div>
        </nav>
    );
};

export default Navbar;
