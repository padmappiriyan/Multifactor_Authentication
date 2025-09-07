import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { IoIosSearch } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useSession } from '../context/SessionContext';
import { logoutUser } from '../service/authApi.js';

const Navbar = () => {
  const { isLoggedIn, logout } = useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { data } = await logoutUser();
    await logout(data);
    navigate('/login');
  }

  return (
    <nav className="bg-white text-sm shadow-md text-black">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
      
        <div className="text-lg font-bold">My Organization</div>

        
        <div className="flex items-center space-x-4">
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              isActive ? "bg-blue-700 px-3 py-2 rounded-lg text-sm font-medium text-white" : "px-3 py-2 rounded-lg text-sm font-medium"
            }
          >
            Home
          </NavLink>

          <NavLink 
            to="/about" 
            className={({ isActive }) =>
              isActive ? "bg-blue-700 px-3 py-2 rounded-lg text-sm font-medium text-white" : "px-3 py-2 rounded-lg text-sm font-medium"
            }
          >
            About
          </NavLink>

          <NavLink 
            to="/contact" 
            className={({ isActive }) =>
              isActive ? "bg-blue-700 px-3 py-2 rounded-lg text-sm font-medium text-white" : "px-3 py-2 rounded-lg text-sm font-medium"
            }
          >
            Contact
          </NavLink>

          
          <div className='relative'>
            <input
              type="text"
              placeholder="Search products"
              className="px-3 py-2 rounded-2xl text-sm text-black focus:outline-none border border-gray-300"
            />
            <IoIosSearch className='absolute top-1/2 transform -translate-y-1/2 right-2.5 w-5 h-5 text-gray-500' />
          </div>
        </div>

        
        <div className="flex items-center space-x-8">
          {isLoggedIn && <MdOutlineManageAccounts className='w-7 h-7 cursor-pointer' />}
          <FaShoppingCart className="text-xl cursor-pointer" />
          <button
            type="button"
            className="text-black cursor-pointer hover:bg-blue-600 px-3 py-2 rounded-lg text-sm font-medium"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
