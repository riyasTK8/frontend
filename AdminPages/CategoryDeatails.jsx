import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import Api from "../../Apiinstance.jsx";

export default function CategoryDetails() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await Api.get("/admin/showcategory");
      setCategories(res.data.categories || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, categoryName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete category "${categoryName}"?`
    );
    if (!confirmDelete) return;

    try {
      const res = await Api.delete(`/admin/deletecategory/${id}`);
      if (res.status === 200) {
        fetchCategories();
      } else {
        alert("Failed to delete category.");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("An error occurred while deleting the category.");
    }
  };

  return (
    <div className="bg-black min-h-screen">
  
      <Sidebar />

    
      <div className="ml-64 px-6 pt-12 bg-white min-h-screen dark:bg-gray-900">
        {/* Add Category Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/Addcategory")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Add Category
          </button>
        </div>

       
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading categories...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
            <caption className="p-5 text-lg font-semibold text-gray-900 dark:text-white">
              Category Details
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3">Category Name</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr
                    key={category._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {category.categoryname}
                    </td>
                    <td className="px-6 py-4">{category.categorydescription}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => navigate(`/Updatecategory/${category._id}`)}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(category._id, category.categoryname)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

