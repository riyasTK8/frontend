import React, { useEffect, useState } from "react";
import Api from "../../Apiinstance";
import Navbar from "../UserPages/Navbar";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [editingQuantities, setEditingQuantities] = useState({});

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await Api.get("user/showcart");
      setCartItems(res.data.cart.cartitems);
      setTotalAmount(res.data.cart.total);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  const handleQuantityInputChange = (productId, newQty) => {
    setEditingQuantities(prev => ({
      ...prev,
      [productId]: newQty
    }));
  };

  const updateItem = async (productId) => {
    const quantity = editingQuantities[productId];
    if (!quantity || quantity < 1) {
      return;
    }
    try {
      await Api.put(`user/updatecart/${productId}`, { quantity });
      await fetchCart();
    } catch (err) {
      console.error("Failed to update item", err);
    }
  };

  const deleteItem = async (productId) => {
    try {
      await Api.delete(`user/deletecart/${productId}`);
      await fetchCart();
    } catch (err) {
      console.error("Failed to delete item", err);
    }
  };

  const createOrder = async () => {
    try {
      await Api.post("user/createorder");
      setCartItems([]);
      setTotalAmount(0);
    } catch (err) {
      console.error("Failed to create order", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => {
              const productId = item.productId;
              return (
                <div key={productId} className="bg-white p-4 mb-4 rounded shadow">
                  <div className="flex gap-4">
                    <img
                      src={`http://localhost:9000/${item.product?.productimage}`}
                      alt={item.product?.productname}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p><strong>{item.product?.productname}</strong></p>
                      <p>Price: ₹{item.price}</p>
                      <p>Subtotal: ₹{item.subtotal}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="number"
                          value={editingQuantities[productId] ?? item.quantity}
                          min="1"
                          onChange={(e) =>
                            handleQuantityInputChange(productId, Math.max(1, parseInt(e.target.value) || 1))
                          }
                          className="border px-2 py-1 w-20"
                        />
                        <button
                          onClick={() => updateItem(productId)}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteItem(productId)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-between items-center mt-6">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={createOrder}
              >
                Checkout
              </button>
              <h3 className="text-xl font-semibold">Total: ₹{totalAmount}</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}






