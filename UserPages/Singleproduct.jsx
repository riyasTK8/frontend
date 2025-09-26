import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../globel/Apiinstance.jsx";
import CartIcon from "../src/assets/Icons/cart.png";
import Navbar from "./Navbar";

export default function SingleProduct() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const takeProduct = async () => {
      try {
        const res = await Api.get(`/user/showsingleproduct/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    
    takeProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await Api.post(`user/addcart/${id}`, { quantity: qty });
      alert("Product added to cart!");
      navigate("/cart");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      if (err.response?.status === 401) {
        alert("Please log in to add products to your cart.");
        navigate("/login");
      } else {
        alert("Something went wrong. Try again.");
      }
    }
  };

  const increaseQty = () => setQty(prev => prev + 1);
  const decreaseQty = () => setQty(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) return <p className="text-center py-10">Loading product...</p>;
  if (!product) return <p className="text-center text-red-500 py-10">Product not found.</p>;

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
        <Navbar />
     

      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden md:flex">
        <img
          src={`http://localhost:9000/${product.productimage}`}
          alt={product.productname}
          className="w-full md:w-1/2 h-96 object-cover"
        />

        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.productname}</h1>
            <p className="text-gray-600 mb-4">{product.productdescription}</p>
            <p className="text-indigo-600 text-xl font-bold">₹{product.productprice}</p>
          </div>

          <div className="mt-6 flex items-center space-x-4">
            <div className="flex items-center border rounded px-3 py-1 space-x-3">
              <button onClick={decreaseQty} className="text-lg font-bold px-2 text-gray-600 hover:text-black">-</button>
              <span className="text-lg">{qty}</span>
              <button onClick={increaseQty} className="text-lg font-bold px-2 text-gray-600 hover:text-black">+</button>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}