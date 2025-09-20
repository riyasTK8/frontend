import React, { useState } from "react";
import Carticon from "../src/assets/Icons/cart.png";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Apiinstance";

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      setResults([]); // clear search results if input is empty
      return;
    }

    try {
      const response = await Api.get(`/user/searchproduct/${value}`);
      setResults(response.data);
    } catch (err) {
      console.error("Can't search products:", err);
    }
  };

  const goToProduct = (id) => {
    navigate(`/showsingleproduct/${id}`);
    setResults([]); 
    setSearch(""); 
  };

  return (
    <nav className="bg-white shadow-md px-8 py-3 flex flex-col sticky top-0 z-50">
      <div className="flex justify-between items-center w-full">
        {/* Search Input */}
        <div className="flex-grow max-w-lg mx-8 relative">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full border border-gray-200 rounded-full px-5 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          />


          {results.length > 0 && (
            <ul className="absolute bg-white border rounded-md mt-2 shadow-lg w-full max-w-lg z-50 max-h-60 overflow-y-auto">
              {results.map((product) => (
                <li
                  key={product._id}
                  onClick={() => goToProduct(product._id)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {product.productname}
                </li>
              ))}
            </ul>
          )}
        </div>


        <div className="flex items-center space-x-8">
          <Link
            to="/Userhome"
            className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
          >
            Home
          </Link>

          <Link to="/cart" className="relative group">
            <img src={Carticon} alt="Cart" className="w-6 h-6 inline" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1 rounded-full group-hover:scale-110 transition">
            
            </span>
          </Link>

          <Link
            to="/userorders"
            className="text-gray-600 hover:text-green-600 font-medium transition duration-200"
          >
            Your Orders
          </Link>

          <Link to="/userlogout">
            <button className="text-gray-600 hover:text-red-500 font-medium transition duration-200 border-none bg-transparent cursor-pointer">
              Logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


