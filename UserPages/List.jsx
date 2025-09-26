import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Api from '../globel/Apiinstance.jsx'
import { data } from 'react-router-dom'


export default function List() {

    useEffect(()=>{Userlist()},
    [])
   
    const Userlist = async ()=>{
   try{
    
    const Fetchdata = await  Api.get("admin/showproducts")
    console.log(Fetchdata.data.products);

    
    if (Fetchdata) {
        console.log("product data fetched successfully");
        
    }

   }
     catch{
        console.log("errors ");
        
     }
     const product = Fetchdata.data.products

    }
  return (
   <>
   
   
   
   <h1>helloooo</h1>
   <h1>id</h1>
   <h1>Productname</h1>
   <h1>product price</h1>

   
   
   </>
  )
}


