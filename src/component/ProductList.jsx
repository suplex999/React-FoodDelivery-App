import { use, useContext } from "react"
import React from 'react'
import { ShopContext } from "./Shopcontext"
import { Link } from "react-router-dom"
const ProductList = () => {
  const { products, productsLoading, addToCart } = useContext(ShopContext);
  if (productsLoading) return <div>Loading...</div>;
  return (
    <div className='max-w-7xl mx-auto px-6 text-center mt-20'>
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Our Awesome Dishes</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap6">
        {products.map((product) => {
          const {id, image, name, price} = product
          return (
            <div key={id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-md transition-transform duration-200 hover:-translate-y-1">
              <Link to={`/product/${id}`}>
              <img src= {image} alt="" className="h-64 w-full object-contain rounded-lg transform scale-90 hover:scale-100 transition-transform duration-200" />
              </Link>
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
                <p className="text-gray-600">{price}</p>
              </div>
              <button onClick={()=> addToCart(product,id)} className="w-full py-2 mt-4 text-lg font-medium text-white bg-sky-500 rounded:bg-sky-700 transition duration-300"> Add to Cart</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductList