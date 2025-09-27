import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Api from '../global/Apiinstance.jsx';

export default function Orderdetails() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    showOrders();
  }, []);

  const showOrders = async () => {
    try {
      const response = await Api.get("user/findorder");
      setOrders(response.data.orders);
    } catch {
      console.log("Can't fetch data");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Navbar />
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order number</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Product Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Subtotal</th>
              <th className="py-2 px-4 border-b">Delivery Status</th>
              <th className="py-2 px-4 border-b">Order Date</th>
            </tr>
          </thead>
<tbody>
  {orders.map((order, orderIndex) =>
    (order.items || []).map((item, itemIndex) => (
      <tr key={item._id || `${orderIndex}-${itemIndex}`}>
        <td className="py-2 px-4 border-b">{orderIndex + 1}</td>
        <td className="py-2 px-4 border-b">{item.productName}</td>
        <td className="py-2 px-4 border-b">₹{item.productPrice}</td>
        <td className="py-2 px-4 border-b">{item.quantity}</td>
        <td className="py-2 px-4 border-b">₹{item.subtotal}</td>
        <td className="py-2 px-4 border-b">{order.deliveryStatus}</td>
        <td className="py-2 px-4 border-b">
          {new Date(order.createdAt).toLocaleDateString()}
        </td>
      </tr>
    )).concat([
      <tr key={`total-${order._id || orderIndex}`} className="font-bold bg-gray-200">
        <td colSpan="4" className="text-right py-2 px-4">Total:</td>
        <td className="py-2 px-4">₹{order.total}</td>
        <td colSpan="2"></td>
      </tr>
    ])
  )}
</tbody>        </table>
      </div>
    </div>
  );
}
