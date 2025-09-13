import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slidebar from "./SideBar";
import axios from "axios";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [productname, setProductName] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [productid, setProductId] = useState(""); // renamed from productcategory
  const [productdescription, setProductDescription] = useState("");
  const [productimage, setProductImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/admin/product/${id}`);
        const product = res.data;

        setProductName(product.productname);
        setProductPrice(product.productprice);
        setProductId(product.productcategory); 
        setProductDescription(product.productdescription);
        setExistingImage(product.productimage);
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Failed to load product.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("productprice", productprice);
    formData.append("productcategory", productid); 
    formData.append("productdescription", productdescription);
    if (productimage) {
      formData.append("productimage", productimage);
    }

    try {
      const res = await axios.put(
        `http://localhost:9000/admin/updateproduct/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update response:", res.data);
      alert("Product updated successfully!");
      navigate("/ProductDetails");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Slidebar />
      <div className="flex-1 p-10 bg-gray-900">
        <h1 className="text-3xl font-bold mb-6">Update Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Product Name</label>
            <input
              type="text"
              value={productname}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Product Price ($)</label>
            <input
              type="number"
              value={productprice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Product ID</label>
            <input
              type="text"
              value={productid}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Product Description</label>
            <textarea
              value={productdescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={4}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Current Image</label>
            {existingImage ? (
              <img
                src={`http://localhost:9000/uploads/${existingImage}`}
                alt="Current product"
                className="w-32 h-32 object-cover rounded mb-2"
              />
            ) : (
              <p>No image available</p>
            )}
            <label className="block mb-2 text-sm font-medium">Change Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white font-semibold transition"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
