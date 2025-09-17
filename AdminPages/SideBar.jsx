import React from "react";
import { Link } from "react-router-dom";

import LogoIcon from "../src/assets/Icons/LogoIcon.png";
import HomeIcon from "../src/assets/Icons/HomeIcon.png";
import UserIcon from "../src/assets/Icons/user.png";
import ProductIcon from "../src/assets/Icons/Products.png";
import CategoryIcon from "../src/assets/Icons/category.png";
import OrderIcon from "../src/assets/Icons/order.png";
import LogoutIcon from "../src/assets/Icons/Logout.png";

export default function Slidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-black shadow-lg z-50 flex flex-col justify-between">

      <div>
        <div className="flex items-center pl-5 gap-4 pt-7 hover:bg-gray-800 cursor-pointer transition-all duration-200 rounded-r-full pr-4 py-2">
          <img src={HomeIcon} className="h-8 w-8 object-contain" alt="HomeIcon" />
          <h1 className="text-white text-lg font-medium">Home</h1>
        </div>

        <Link to="/Userdetails">
          <div className="flex items-center pl-5 gap-4 pt-6 hover:bg-gray-800 cursor-pointer transition-all duration-200 rounded-r-full pr-4 py-2">
            <img src={UserIcon} className="h-8 w-8 object-contain" alt="UserIcon" />
            <h1 className="text-white text-lg font-medium">Users</h1>
          </div>
        </Link>

        <Link to="/ProductDetails">
          <div className="flex items-center pl-5 gap-4 pt-6 hover:bg-gray-800 cursor-pointer transition-all duration-200 rounded-r-full pr-4 py-2">
            <img src={ProductIcon} className="h-8 w-8 object-contain" alt="ProductIcon" />
            <h1 className="text-white text-lg font-medium">Products</h1>
          </div>
        </Link>

        <Link to="/Categorydetails">
          <div className="flex items-center pl-5 gap-4 pt-6 hover:bg-gray-800 cursor-pointer transition-all duration-200 rounded-r-full pr-4 py-2">
            <img src={CategoryIcon} className="h-8 w-8 object-contain" alt="CategoryIcon" />
            <h1 className="text-white text-lg font-medium">Categories</h1>
          </div>
        </Link>

        <Link to="/adminorders">
          <div className="flex items-center pl-5 gap-4 pt-6 hover:bg-gray-800 cursor-pointer transition-all duration-200 rounded-r-full pr-4 py-2">
            <img src={OrderIcon} className="h-8 w-8 object-contain" alt="OrderIcon" />
            <h1 className="text-white text-lg font-medium">Orders</h1>
          </div>
        </Link>
      </div>

  
      <div className="mb-10">
        <div className="flex items-center pl-5 gap-4 hover:bg-red-700 cursor-pointer transition-all duration-200 rounded-r-full pr-4 py-2">
          <img src={LogoutIcon} className="h-8 w-8 object-contain" alt="LogoutIcon" />
          <h1 className="text-white text-lg font-medium">Logout</h1>
        </div>
      </div>
    </div>
  );
}

