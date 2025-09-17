import React from "react";
import Carticon from "../src/assets/Icons/cart.png";
import { Link } from "react-router-dom";
import Api from "../../Apiinstance";
import { useState } from "react";
import { useEffect } from "react";


const Navbar = () => {
    
  return (
    <nav className="bg-white shadow-md px-8 py-3 flex justify-between items-center sticky top-0 z-50">
      
      

      
      <div className="flex-grow max-w-lg mx-8">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border border-gray-200 rounded-full px-5 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
        />
      </div>

      
      <div className="flex items-center space-x-8">
        <Link to="/Userhome" className="text-gray-600 hover:text-blue-600 font-medium transition duration-200">
          Home
        </Link>

        <Link to="/cart" className="relative group">
          <img src={Carticon} alt="Cart" className="w-6 h-6 inline" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1 rounded-full group-hover:scale-110 transition">
            3
          </span>
        </Link>

        <Link to="/userorders" className="text-gray-600 hover:text-green-600 font-medium transition duration-200">
          Your Orders
        </Link>

        <Link to="/userlogout" ><button className="text-gray-600 hover:text-red-500 font-medium transition duration-200 border-none bg-transparent cursor-pointer">
          Logout
        </button></Link>
      </div>
    </nav>
  );
};

export default Navbar;

