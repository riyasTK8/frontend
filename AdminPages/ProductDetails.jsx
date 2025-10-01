import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import Api from "../global/Apiinstance.jsx";
import { IMAGE_BASE_URL } from "../global/Apiinstance.jsx";

export default function ProductDetails() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await Api.get("/admin/categoryname");
      setProducts(response.data.message); 
      console.log("Fetched Products:", response.data.message);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await Api.delete(`/admin/deleteproduct/${id}`);
      fetchProducts(); 
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex bg-black min-h-screen">
      < Sidebar />
      <div className="flex flex-col w-full overflow-x-auto shadow-md sm:rounded-lg pt-12 px-6 bg-white">
   
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            onClick={() => navigate("/Addproduct")}
          >
            Add Product
          </button>
        </div>

      
        <table className="w-full text-sm text-left text-gray-700">
          <caption className="p-5 text-lg font-semibold text-gray-900 bg-white">
            Product Details
          </caption>
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Price (₦)</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Category ID</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product._id || index}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {product.productname}
                  </td>
                  <td className="px-6 py-4">
                    ₦{Number(product.productprice).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                <img
                src={`${IMAGE_BASE_URL}/${product.productimage}`}
                alt={product.productname}
                className="w-16 h-16 object-cover rounded"
/>
                  </td>
                  <td className="px-6 py-4">{product.category || "N/A"}</td>
                  <td className="px-6 py-4">{product.productcategory}</td>
                  <td className="px-6 py-4">{product.productdescription}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded"
                      onClick={() => navigate(`/Updateproduct/${product._id}`)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
