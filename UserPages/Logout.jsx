import React from "react";
import { useNavigate } from "react-router-dom";
import Api from "../global/Apiinstance.jsx"; 
import Navbar from "./Navbar";

export default function Userlogout() {
  const navigate = useNavigate();

  const handleLogoutDecision = async (decision) => {
    if (decision === "yes") {
      try {
        const response = await Api.post("/user/logout"); 
        console.log(response.data.message);
        localStorage.removeItem("user")
        navigate("/"); 
      } catch (error) {
        console.error("Logout failed", error);
        alert("Logout failed. Try again.");
      }
    } else {
      navigate("/userhome"); 
    }
  };

  return (
    <section className="bg-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-700 dark:border-gray-700">
          <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold text-center text-gray-900 dark:text-white">
              Do you want to sign out?
            </h1>
            <div className="flex justify-around">
              <button
                onClick={() => handleLogoutDecision("yes")}
                className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Yes
              </button>
              <button
                onClick={() => handleLogoutDecision("no")}
                className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


