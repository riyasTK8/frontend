import React from "react";
import { Navigate } from "react-router-dom";

function UserProtected({ children }) {
  const isUser = localStorage.getItem("user") === "true";
  console.log(isUser)
  return isUser ? children : <Navigate to="/userlogin" replace />;
}

export default UserProtected;

