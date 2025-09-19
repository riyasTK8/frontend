import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminProtected from "../AdminPages/Adminprotect";

import SlideBar from "../AdminPages/SideBar";
import ProductDetails from "../AdminPages/ProductDetails";
import AddProduct from "../AdminPages/Addproduct";
import UpdateProduct from "../AdminPages/UpdateProduct";
import CategoryDetails from "../AdminPages/CategoryDeatails";
import AddCategory from "../AdminPages/AddCategory";
import UpdateCategory from "../AdminPages/UpdateCategory";
import Homepage from "../AdminPages/Homepage";
import AdminLogin from "../AdminPages/Adminlogin";
import UserDetails from "../AdminPages/Userdetails";
import AllOrders from "../AdminPages/Allorders";

import RegisterDetails from "../UserPages/Register";
import UserHome from "../UserPages/Userhome";
import SingleProduct from "../UserPages/Singleproduct";
import CartPage from "../UserPages/Cart";
import UserLogin from "../UserPages/Userlogin";
import Navbar from "../UserPages/Navbar";
import OrderDetails from "../UserPages/Userorders";
import UserLogout from "../UserPages/Logout";
import UserProtected from "../UserPages/Userprotect";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<RegisterDetails />} />
      <Route path="/adminlogin" element={<AdminLogin />} />


      <Route path="/slidebar"element={<AdminProtected><SlideBar /></AdminProtected>}/>
      <Route path="/productdetails"element={ <AdminProtected><ProductDetails /></AdminProtected> }/>
      <Route path="/addproduct"element={<AdminProtected><AddProduct /></AdminProtected>}/>
      <Route path="/updateproduct/:id"element={ <AdminProtected><UpdateProduct /></AdminProtected>}/>
      <Route path="/categorydetails"element={<AdminProtected><CategoryDetails /></AdminProtected>}/>
      <Route path="/addcategory"element={<AdminProtected><AddCategory /></AdminProtected>}/>
      <Route path="/updatecategory/:id"element={<AdminProtected><UpdateCategory /> </AdminProtected>}/>
    <Route path="/userdetails"element={<AdminProtected><UserDetails /></AdminProtected>}/>
      <Route path="/adminorders" element={<AdminProtected><AllOrders /></AdminProtected>}/>



      <Route path="/navbar" element={<Navbar />} />


      <Route path="/userlogout" element={<UserLogout />} />
      <Route path="/userhome" element={<UserProtected><UserHome /></UserProtected>}/>
      
      <Route path="/showsingleproduct/:id"element={ <SingleProduct /> }/>
      <Route path="/cart"element={<UserProtected> <CartPage /> </UserProtected>}/>
      <Route path="/userorders"element={<UserProtected><OrderDetails /></UserProtected>}/>
    
    </Routes>
  );
}

export default App;
