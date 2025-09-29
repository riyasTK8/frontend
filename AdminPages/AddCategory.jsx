import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import axios from "axios";

export default function AddCategory() {
  const navigate = useNavigate();

  const [categoryname, setCategoryName] = useState("");
  const [categorydescription, setCategoryDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9000/admin/addcategory", {
        categoryname,
        categorydescription,
      });

      console.log("Category added:", response.data);
      navigate("/CategoryDetails");
    } catch (err) {
      console.error("Error adding category:", err);
      alert("Failed to add category. Check console for details.");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      
      <Sidebar />

   
      <div className="ml-64 p-10 bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Add New Category</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium">Category Name</label>
            <input
              type="text"
              value={categoryname}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Category Description</label>
            <textarea
              rows="4"
              value={categorydescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-semibold transition"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}