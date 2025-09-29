import React, { useState, useEffect } from "react";
import Carticon from '../src/assets/Icons/cart.png';
import Api from "../global/Apiinstance.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Userhome() {
  const nav = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  function details(id) {
    console.log(id);
    nav(`/showsingleproduct/${id}`);
  }

  useEffect(() => {
    takeProducts();
    findCategory();
 
  }, []);

  const takeProducts = async () => {
    try {
      const response = await Api.get("admin/showproducts");
      if (response.data && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
        console.log("Products fetched successfully");
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log("Failed to fetch products", error);
    }
  };

  const findCategory = async () => {
    try {
      const response = await Api.get("/admin/showcategory");
      if (response.data && Array.isArray(response.data.categories)) {
        setCategory(response.data.categories);
      } else {
        setCategory([]);
      }
    } catch (error) {
      console.error("Can't fetch category", error);
    }
  };

  const fetchProductByCategory = async (id) => {
    try {
      const response = await Api.get(`/user/findproductbycategory/${id}`);
      if (response.data && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
      }
      console.log("Products by category fetched successfully");
    } catch (error) {
      console.error("Failed to fetch products by category", error);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    setSelectedCategory(selectedId);

    if (selectedId === "") {
      takeProducts();
    } else {
      fetchProductByCategory(selectedId);
    }
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <Navbar />

      <div className="flex flex-wrap items-center space-x-4 px-6 mt-10 mb-8">
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="border border-gray-300 bg-white text-gray-700 text-base font-medium px-2 py-1 rounded focus:outline-none cursor-pointer"
        >
          <option value="">All Categories</option>
          {category && category.map((cat, index) => (
            <option key={index} value={cat._id}>
              {cat.categoryname}
            </option>
          ))}
        </select>
      </div>

      <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products && products.map((element, index) => (
          <div
            onClick={() => { details(element._id); }}
            key={index}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col cursor-pointer"
          >
            <img
              src={`http://localhost:9000/${element.productimage}`}
              alt={element.productname}
              className="rounded-lg mb-4 object-cover h-40 w-full"
            />
            <h3 className="text-lg font-semibold mb-1">{element.productname}</h3>
            <p className="text-gray-600 text-sm mb-2">{element.productdescription}</p>
            <span className="text-indigo-600 font-bold text-lg mb-4">
              ${element.productprice}
            </span>
            <button className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


