// src/AdminPages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Apiinstance";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleAdminLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await Api.post('/admin/login', { email, password });

    if (response.data.success) {
      localStorage.setItem("admin", "true");
      navigate("/slidebar");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Try again later.");
  }
};

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow md:max-w-md xl:p-0">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
