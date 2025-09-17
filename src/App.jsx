import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../AdminPages/ProtectRout"; // Corrected name; use PascalCase

import SlideBar from "../AdminPages/SideBar";
import ProductDetails from "../AdminPages/ProductDetails";
import AddProduct from "../AdminPages/Addproduct";
import UpdateProduct from "../AdminPages/UpdateProduct";
import CategoryDetails from "../AdminPages/CategoryDeatails";
import AddCategory from "../AdminPages/AddCategory";
import UpdateCategory from "../AdminPages/UpdateCategory";
import RegisterDetails from "../UserPages/Register";
import Userhome from "../UserPages/Userhome";
import SingleProduct from "../UserPages/Singleproduct";
import Homepage from "../AdminPages/Homepage";
import Cartpage from "../UserPages/Cart";
import Userlogin from "../UserPages/Userlogin";
import AdminLiogin from "../AdminPages/Adminlogin";

import Navbar from "../UserPages/Navbar";
import Orderdetails from "../UserPages/Userorders";
import Userdetails from "../AdminPages/Userdetails";
import Allorders from "../AdminPages/Allorders";
import Userlogout from "../UserPages/Logout";

function App() {
  return (
    <Routes>
     
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Userlogin />} />
      <Route path="/register" element={<RegisterDetails />} />
      <Route path="/adminlogin" element={<AdminLiogin />} />
      <Route path="/registerdetails" element={<RegisterDetails />} />


      <Route element={<ProtectedRoute />}>
        <Route path="/slidebar" element={<SlideBar />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/updateproduct/:id" element={<UpdateProduct />} />
        <Route path="/categorydetails" element={<CategoryDetails />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/updatecategory/:id" element={<UpdateCategory />} />
        <Route path="/userhome" element={<Userhome />} />
        <Route path="/showsingleproduct/:id" element={<SingleProduct />} /> 
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/userorders" element={<Orderdetails />} />
        <Route path="/userdetails" element={<Userdetails />} />
        <Route path="/adminorders" element={<Allorders />} />
        <Route path="/userlogout" element={<Userlogout />} />
      </Route>
    </Routes>
  );
}

export default App;


