import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./SideBar";
import Api from "../../Apiinstance"; 

export default function UpdateCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categoryname, setCategoryName] = useState("");
  const [categorydescription, setCategoryDescription] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await Api.get(`/admin/showcategory/${id}`);
        const category = res.data;
        setCategoryName(category.categoryname);
        setCategoryDescription(category.categorydescription);
      } catch (err) {
        console.error("Error fetching category:", err);
        alert("Failed to load category details.");
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put(`/admin/updatecategory/${id}`, {
        categoryname,
        categorydescription,
      });

      alert("Category updated successfully!");
      navigate("/CategoryDetails");
    } catch (err) {
      console.error("Error updating category:", err);
      alert("Failed to update category.");
    }
  };

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-900">
        <h1 className="text-3xl font-bold mb-6">Update Category</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Category Name</label>
            <input
              type="text"
              value={categoryname}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Category Description</label>
            <textarea
              value={categorydescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              rows={4}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white font-semibold transition"
            >
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
