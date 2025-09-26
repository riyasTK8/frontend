import React, { useEffect, useState } from 'react';
import Api from '../global/Apiinstance.jsx';
import Slidebar from './SideBar';

export default function Allorders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await Api.get("/admin/findallorders");
      
      // ✅ Sanitize each order to ensure items is always an array
      const safeOrders = (data.allorders || []).map(order => ({
        ...order,
        items: Array.isArray(order.items) ? order.items : []
      }));

      setOrders(safeOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handleStatusUpdate = async (orderId, currentStatus) => {
    if (currentStatus === "pending") {
      try {
        await Api.put(`/admin/updateorder/${orderId}`, {
          orderStatus: "delivered"
        });
        fetchOrders(); // refresh orders
      } catch (error) {
        console.error("Update failed:", error);
      }
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Slidebar />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">All Orders</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
              <tr>
                <th className="py-3 px-4 border">Order ID</th>
                <th className="py-3 px-4 border">User ID</th>
                <th className="py-3 px-4 border">Product Name</th>
                <th className="py-3 px-4 border">Price</th>
                <th className="py-3 px-4 border">Quantity</th>
                <th className="py-3 px-4 border">Subtotal</th>
                <th className="py-3 px-4 border">Created Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">

              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <React.Fragment key={order._id}>
                    {order.items.map((item, index) => (
                      <tr key={`${order._id}-${index}`} className="hover:bg-gray-50 transition">
                        <td className="py-3 px-4 border">{order._id}</td>
                        <td className="py-3 px-4 border">{order.userId}</td>
                        <td className="py-3 px-4 border">{item.productName}</td>
                        <td className="py-3 px-4 border">₹{item.productPrice?.toLocaleString()}</td>
                        <td className="py-3 px-4 border">{item.quantity}</td>
                        <td className="py-3 px-4 border">₹{item.subtotal?.toLocaleString()}</td>
                        <td className="py-3 px-4 border">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                        </td>
                      </tr>
                    ))}

                    <tr className="bg-gray-100 font-medium text-gray-800">
                      <td colSpan="5" className="py-3 px-4 border text-right">Order Total:</td>
                      <td className="py-3 px-4 border">₹{order.total?.toLocaleString()}</td>
                      <td className="py-3 px-4 border">
                        <button
                          className={`w-full py-1 px-2 rounded text-sm font-semibold ${
                            order.deliveryStatus === "pending"
                              ? "bg-orange-500 text-white hover:bg-orange-600"
                              : "bg-green-600 text-white cursor-not-allowed"
                          }`}
                          onClick={() => handleStatusUpdate(order._id, order.deliveryStatus)}
                          disabled={order.deliveryStatus === "delivered"}
                        >
                          {order.deliveryStatus}
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}






