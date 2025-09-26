import React, { useEffect, useState } from 'react'
import Api from '../global/Apiinstance.jsx'

export default function List() {
  const [products, setProducts] = useState([])  // State to store fetched products

  useEffect(() => {
    const Userlist = async () => {
      try {
        const Fetchdata = await Api.get("admin/showproducts")
        console.log(Fetchdata.data.products)

        if (Fetchdata) {
          console.log("product data fetched successfully")
          setProducts(Fetchdata.data.products || [])  // Save products to state, fallback empty array
        }
      } catch (error) {
        console.log("errors", error)
      }
    }

    Userlist()
  }, [])

  return (
    <>
      <h1>Product List</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Name</th>
              <th>Product Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id || product._id}>
                <td>{product.id || product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}



