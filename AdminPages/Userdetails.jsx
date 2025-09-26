import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../globel/Apiinstance.jsx";
import Slidebar from "./SideBar";

export default function Userdetails() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
      const response = await Api.get("admin/finduser");
      setUsers(response.data.message);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };


  const toggleUser = async (id) => {
    try {
      const res = await Api.patch(`admin/toggle-status/${id}`);
      if (res.data.success) {
  
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, active: res.data.active } : u
          )
        );
      } else {
        alert(res.data.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
      alert("Something went wrong while updating status.");
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Slidebar />
      <div className="ml-64 px-6 pt-12 bg-white min-h-screen dark:bg-gray-900">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
            <caption className="p-5 text-lg font-semibold text-gray-900 dark:text-white">
              User Details
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3">User Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Age</th>
                <th className="px-6 py-3">Place</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.age}</td>
                  <td className="px-6 py-4">{user.place}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => toggleUser(user._id)}
                      className={`font-semibold py-1 px-3 rounded transition-colors duration-200 ${
                        user.active
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                    >
                      {user.active ? "Active" : "Deactive"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
