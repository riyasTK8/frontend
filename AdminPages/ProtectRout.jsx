import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'


 const protectedrout = ({Children})=>{
    const token = localStorage.getItem("token")

      if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default protectedrout