import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import Api from "../../Apiinstance";

export default function ProductDetails() {
  const [pro, setPro] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const products = await Api.get("/admin/showproducts");
      setPro(products.data.products);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteproduct(id) {
    try {
      await Api.delete(`/admin/deleteproduct/${id}`);
      getProducts();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full overflow-x-auto shadow-md sm:rounded-lg pt-12 px-6 bg-white dark:bg-white">
    
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            onClick={() => navigate("/Addproduct")}
          >
            Add Product
          </button>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Product Details
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pro.map((ele) => (
              <tr key={ele._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {ele.productname}
                </td>
                <td className="px-6 py-4">{ele.productprice}</td>
                <td className="px-6 py-4">
                  <img
                    src={`http://localhost:9000/${ele.productimage}`}
                    alt="product"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">{ele.productcategory || "Accessories"}</td>
                <td className="px-6 py-4">{ele.productdescription}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded"
                    onClick={() => navigate(`/Updateproduct/${ele._id}`)} // ✅ Navigate to Update page
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded"
                    onClick={() => deleteproduct(ele._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
