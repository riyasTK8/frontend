import React, { useState, useEffect } from "react";
import Carticon from "../src/assets/Icons/cart.png";
import LoginIcon from "../src/assets/Icons/Login.png";
import Api from "../../Apiinstance";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Banner1 from "../src/assets/Icons/banner1.jpg";
import Banner2 from "../src/assets/Icons/banner2.jpg";
import Banner3 from "../src/assets/Icons/banner3.jpg";

export default function Homepage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const banners = [Banner1, Banner2, Banner3];
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await Api.get("admin/showproducts");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToProductDetails = (id) => {
    console.log("Navigating to:", id);
    navigate(`/showsingleproduct/${id}`);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen pt-20">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed z-40 w-full top-0">
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

        <div className="flex items-center space-x-4 relative">
          <button onClick={goToLogin} className="relative">
            <img src={LoginIcon} alt="Login" className="w-6 h-6" />
          </button>

          <Link to= "/login" > <button className="relative">
            <img src={Carticon} alt="Cart" className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
          </button></Link>
        </div>
      </nav>


      <div className="max-w-7xl mx-auto mt-6 px-6">
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg h-64 md:h-80">
          <img
            src={banners[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        </div>
      </div>

   
      <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            onClick={() => goToProductDetails(product._id)}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col cursor-pointer"
          >
            <img
              src={`http://localhost:9000/${product.productimage}`}
              alt={product.productname}
              className="rounded-lg mb-4 object-cover h-40 w-full"
            />
            <h3 className="text-lg font-semibold mb-1">{product.productname}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.productdescription}</p>
            <span className="text-indigo-600 font-bold text-lg mb-4">
              ${product.productprice}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation(); 
                goToLogin(); 
              }}
              className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

