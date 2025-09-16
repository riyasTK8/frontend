import React from "react";
import Carticon from "../src/assets/Icons/cart.png"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Books</option>
          <option>Home</option>
        </select>
      </div>

      <div className="flex-grow max-w-md mx-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center space-x-4" >
            <Link to="/Userhome" ><button className="relative text-amber-50 bg-blue-700 h-[37px] w-[70px] rounded-[5px]">
             Home
        </button>
        </Link> 

        
    

       <Link to="/cart" ><button className="relative">
          <img src={Carticon} alt="Cart" className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
      
          </span>
        </button></Link>


          <Link to="/userorders"><button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
          Your Orders
        </button></Link> 


        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
