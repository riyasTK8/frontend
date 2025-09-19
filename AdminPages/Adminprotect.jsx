
import React from "react";
import { Navigate } from "react-router-dom";

function AdminProtected({ children }) {
  const isAdmin = localStorage.getItem("admin") === "true";
  console.log(isAdmin)
  return isAdmin ? children : <Navigate to="/adminlogin" replace />;
}

export default AdminProtected;
