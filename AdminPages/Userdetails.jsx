import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Apiinstance";
import Slidebar from "./SideBar";

export default function Userdetails() {
  const [user, setuser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await Api.get("admin/finduser");
      console.log("User data fetched successfully:", response.data.message);
      setuser(response.data.message);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };




  return (
    <div className="flex bg-black min-h-screen">
      <Slidebar />
      <div className="flex flex-col w-full overflow-x-auto shadow-md sm:rounded-lg pt-12 px-6 bg-white dark:bg-white">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            User Details
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">User Name</th>
              <th className="px-6 py-3">User Phone</th>
              <th className="px-6 py-3">User Age</th>
              <th className="px-6 py-3">User Place</th>
              <th className="px-6 py-3">User Email</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map((ele) => (
              <tr
                key={ele._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {ele.name}
                </td>
                <td className="px-6 py-4">{ele.phone}</td>
                <td className="px-6 py-4">{ele.age}</td>
                <td className="px-6 py-4">{ele.place}</td>
                <td className="px-6 py-4">{ele.email}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded"
            
                  >
                    Active
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded"
                  
                  >
                    Deactive
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

