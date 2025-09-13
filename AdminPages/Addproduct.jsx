import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slidebar from "./SideBar";
import axios from "axios";

export default function AddProduct() {
  const navigate = useNavigate();

  const [productname, setProductName] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [productimage, setProductImage] = useState(null);
  const [productcategory, setProductCategory] = useState(""); // now will be category ID
  const [productdescription, setProductDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("productprice", productprice);
    formData.append("productcategory", productcategory); // ID
    formData.append("productdescription", productdescription);
    formData.append("productimage", productimage);

    try {
      const response = await axios.post(
        "http://localhost:9000/admin/addproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product added:", response.data);
      navigate("/ProductDetails");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Error adding product. Check console for details.");
    }
  };

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Slidebar />
      <div className="flex-1 p-10 bg-gray-900">
        <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium">Product Name</label>
            <input
              type="text"
              value={productname}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Product Price ($)</label>
            <input
              type="number"
              value={productprice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Enter product price"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Category ID</label>
            <input
              type="text"
              value={productcategory}
              onChange={(e) => setProductCategory(e.target.value)}
              placeholder="Enter Category ID (ObjectId)"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Product Description</label>
            <textarea
              rows="4"
              value={productdescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Describe the product"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-semibold transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
