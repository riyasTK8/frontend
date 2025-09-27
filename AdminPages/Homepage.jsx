import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Carticon from "../src/assets/Icons/cart.png";
import LoginIcon from "../src/assets/Icons/Login.png";

import Banner1 from "../src/assets/Icons/banner1.jpg";
import Banner2 from "../src/assets/Icons/banner2.jpg";
import Banner3 from "../src/assets/Icons/banner3.jpg";

import Api from "../global/Apiinstance.jsx";

export default function Homepage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [Banner1, Banner2, Banner3];

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await Api.get("/admin/showproducts");
      setProducts(response?.data?.products || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setProducts([]); // fallback
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await Api.get("/admin/showcategory");
      setCategory(response?.data?.categories || []);
    } catch (error) {
      console.error("Can't fetch categories", error);
      setCategory([]); // fallback
    }
  };

  // Fetch products by selected category
  const fetchProductByCategory = async (id) => {
    try {
      const response = await Api.get(`/user/findproductbycategory/${id}`);
      setProducts(response?.data?.products || []);
    } catch (error) {
      console.error("Failed to fetch products by category", error);
      setProducts([]); // fallback
    }
  };

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    setSelectedCategory(selectedId);

    if (selectedId === "") {
      fetchProducts();
    } else {
      fetchProductByCategory(selectedId);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToProductDetails = (id) => {
    navigate(`/showsingleproduct/${id}`);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen pt-20">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed z-40 w-full top-0">
        {/* Search */}
        <div className="flex-grow max-w-md mx-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 relative">
          <button onClick={goToLogin} className="relative">
            <img src={LoginIcon} alt="Login" className="w-6 h-6" />
          </button>

          <Link to="/login">
            <button className="relative">
              <img src={Carticon} alt="Cart" className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
            </button>
          </Link>
        </div>
      </nav>

      {/* Banner Carousel */}
      <div className="max-w-7xl mx-auto mt-6 px-6">
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg h-64 md:h-80">
          <img
            src={banners[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        </div>
      </div>

      {/* Category Dropdown */}
      <div className="flex flex-wrap items-center space-x-4 px-6 mt-10 mb-8">
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="border border-gray-300 bg-white text-gray-700 text-base font-medium px-2 py-1 rounded focus:outline-none cursor-pointer"
        >
          <option value="">All Categories</option>
          {(category || []).map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryname}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(products || []).map((product) => (
          <div
            key={product._id}
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
              ₹{product.productprice}
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



