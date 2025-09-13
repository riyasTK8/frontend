import React, { useEffect, useState } from "react";
import Api from "../../Apiinstance";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await Api.get("user/showcart");
      const items = res.data.cart.cartitems || [];
      const total = res.data.cart.total || 0;
      setCartItems(items);
      setTotalAmount(total);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;
    setCartItems(updatedItems);
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      setUpdating(true);
      await Api.put(`user/updatecart/${productId}`, { quantity });
      await fetchCart();
    } catch (err) {
      console.error("Failed to update cart item", err);
    } finally {
      setUpdating(false);
    }
  };

  const deleteCartItem = async (productId) => {
    try {
      await Api.delete(`user/deletecart/${productId}`);
      await fetchCart();
    } catch (err) {
      console.error("Failed to delete cart item", err);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading cart...</p>;
  }

  if (cartItems.length === 0) {
    return <p className="text-center py-10 text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <ul>
        {cartItems.map((item, index) => (
          <li
            key={item.productId}
            className="mb-4 p-4 border rounded bg-white s hadow flex gap-4 items-center"
          >
        <img
  src={`http://localhost:9000/${item.product?.productimage}`}
  alt={item.product?.productname || "Product image"}
  className="w-24 h-24 object-cover rounded"
/>

            <div className="flex-1">
              <p>
                <strong>Product:</strong> {item.product?.productname || item.name}
              </p>
              <p>
                <strong>Price:</strong> ₹{item.price}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <label>Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      index,
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="border px-2 py-1 w-20"
                />
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => updateCartItem(item.productId, item.quantity)}
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Update"}
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => deleteCartItem(item.productId)}
                >
                  Delete
                </button>
              </div>

              <p className="mt-2">
                <strong>Subtotal:</strong> ₹{item.subtotal}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <h3 className="text-xl font-semibold">Total: ₹{totalAmount}</h3>
      </div>
    </div>
  );
}




