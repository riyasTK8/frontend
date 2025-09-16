import React from 'react'
import Navbar from './Navbar'



export default function Userorder() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Navbar />

      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Product Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Subtotal</th>
              <th className="py-2 px-4 border-b">Delivery Status</th>
              <th className="py-2 px-4 border-b">Order Date</th>
            </tr>
          </thead>
          <tbody>
       
            <tr className="font-bold bg-gray-200">
              <td colSpan="4" className="text-right py-2 px-4">
                Total:
              </td>
              <td className="py-2 px-4">{/* Total amount here */}</td>
              <td colSpan="2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
