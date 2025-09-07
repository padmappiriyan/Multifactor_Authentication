import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="bg-white text-sm shadow-md text-black">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        <div className="text-lg font-bold ">My Organization</div>

       
        <div className="flex items-center space-x-4 ">
          <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
          <Link to="/about" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
          <Link to="/contact" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
          <div className='relative'>
            <input
            type="text"
            placeholder="Search products"
            className="px-3 py-2 rounded-2xl text-sm text-black focus:outline-none border border-gray-300 "
          />
          <IoIosSearch className='absolute top-1/2 transform -translate-y-1/2 right-2.5 w-5 h-5 text-gray-500' />
          </div>
          
          

        </div>

        
        <div className="flex items-center space-x-4 ">
          <FaShoppingCart className="text-xl cursor-pointer" />
          <button className="bg-slate-800 text-white cursor-pointer hover:bg-slate-600 px-3 py-2 rounded-2xl text-sm font-medium">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
