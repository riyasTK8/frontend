import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Apiinstance";


export default function RegisterDetails() {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [age,setage] = useState("")
  const [place,setplace] = useState("")
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const RegisterUser = async (e) => {
    e.preventDefault(); 

    try {
         
      const response = await Api.post("user/signup", {
        name,
        phone,
        age,
        place,
        email,
        password,
      });

      if (response) {
        console.log("User Registered Successfully");
        navigate("/login"); 
      }
    } catch (error) {
      console.log("registration not successed");
      
      navigate("/Registerdetails"); 
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
        <div className="mb-6 text-center">
          <h1 className="mt-4 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Register Your Account
          </h1>
        </div>

        <form className="space-y-4" onSubmit={RegisterUser}>
          
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter your name"
              required
              autoComplete="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              placeholder="Enter your phone"
              required
              autoComplete="tel"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
             
          <div>
            <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your age
            </label>
            <input
              id="agee"
              type="number"
              value={age}
              onChange={(e) => setage(e.target.value)}
              placeholder="Enter your age"
              required
        
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

             
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Place
            </label>
            <input
              id="place"
              type="tel"
              value={place}
              onChange={(e) => setplace(e.target.value)}
              placeholder="Enter your place"
              required
              
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>


          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="name@gmail.com"
              required
              autoComplete="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

    
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create an account
          </button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

