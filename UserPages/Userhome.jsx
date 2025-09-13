import React, { useState, useEffect } from "react";
import Carticon from '../src/assets/Icons/cart.png';
import Api from "../../Apiinstance";
import { Link,useNavigate } from "react-router-dom";

export default function Userhome() {
    const nav = useNavigate()
  const [products, setProducts] = useState([]);
  function details(id){
    console.log(id);
    
    nav(`/showsingleproduct/${id}`)
    
  }

  useEffect(() => {
    takeProducts();
  }, []);

  const takeProducts = async () => {
    try {
      const response = await Api.get("admin/showproducts");
      setProducts(response.data.products);
      console.log("Products fetched successfully");
    } catch (error) {
      console.log("Failed to fetch products", error);
    }
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
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

        <div className="flex items-center space-x-4">
          <button className="relative">
            <img src={Carticon} alt="Cart" className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
          </button>

          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((element, index) => (
          <div
             onClick={()=>{details(element._id)}}
            key={index}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
          >
          <img
              src={`http://localhost:9000/${element.productimage}`}
              
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

