import React from "react";
import LogoIcon from "../src/assets/Icons/LogoIcon.png";
import HomeIcon from "../src/assets/Icons/HomeIcon.png";
import UserIcon from "../src/assets/Icons/user.png";
import ProductIcon from "../src/assets/Icons/Products.png";
import CategoryIcon from "../src/assets/Icons/category.png";
import LogoutIcon from "../src/assets/Icons/Logout.png";
import { Link } from "react-router-dom";

export default function Slidebar() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen w-64 shadow-lg">
      <div className="flex items-center pl-5 gap-4 pt-7 hover:bg-gray-800 cursor-pointer transition-all duration-200 rounded-r-full pr-4 py-2">
        <img src={HomeIcon} className="h-8 w-8 object-contain" alt="HomeIcon" />
        <h1 className="text-white text-lg font-medium">Home</h1>
      </div>

      <div className="flex items-center pl-5 gap-4 pt-10 hover:bg-gray-800 cursor-pointer transition-all duration-200 rounded-r-full pr-4 py-2">
        <Link to="/Userdetails">
          <img src={UserIcon} className="h-8 w-8 object-contain" alt="UserIcon" />
        </Link>
        <h1 className="text-white text-lg font-medium">Users</h1>
      </div>

      <div className="flex items-center pl-5 gap-4 pt-10 hover:bg-gray-800 cursor-pointer transition-all duration-200 rounded-r-full pr-4 py-2">
        <Link to="/ProductDetails">
          <img src={ProductIcon} className="h-8 w-8 object-contain" alt="ProductIcon" />
        </Link>
        <h1 className="text-white text-lg font-medium">Products</h1>
      </div>

      <div className="flex items-center pl-5 gap-4 pt-10 hover:bg-gray-800 cursor-pointer transition-all duration-200 rounded-r-full pr-4 py-2">
        <Link to="/Categorydetails">
          <img src={CategoryIcon} className="h-8 w-8 object-contain" alt="CategoryIcon" />
        </Link>
        <h1 className="text-white text-lg font-medium">Categories</h1>
      </div>

      <div className="fixed bottom-10 flex items-center pl-5 gap-4 hover:bg-red-800 cursor-pointer transition-all duration-200 rounded-r-full pr-4 py-2">
        <img src={LogoutIcon} className="h-8 w-8 object-contain" alt="LogoutIcon" />
        <h1 className="text-white text-lg font-medium">Logout</h1>
      </div>
    </div>
  );
}
