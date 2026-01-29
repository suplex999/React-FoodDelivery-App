// import { use, useContext } from "react"
// import React from 'react'
// import { ShopContext } from "./ShopContext"
// import { Link } from "react-router-dom"
// const ProductList = () => {
//   const { products, productsLoading, addToCart } = useContext(ShopContext);
//   if (productsLoading) return <div>Loading...</div>;
//   return (
//     <div className='max-w-7xl mx-auto px-6 text-center mt-20'>
//       <h2 className="text-3xl font-semibold mb-8 text-gray-800">Our Awesome Dishes</h2>
//       <div className="relative w-full sm:w-80">
//       <input
//           className="w-full pl-16 pr-6 py-6 bg-white/90 backdrop-blur-xl rounded-3xl text-xl font-semibold text-slate-900 shadow-2xl border-2 border-purple-200/50 focus:border-cyan-400/70 focus:ring-4 focus:ring-purple-200/50 hover:shadow-3xl transition-all duration-300"
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search dishes..."
//             />
//             {query && (
//               <button
//                 type="button"
//                 onClick={() => setQuery("")}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 hover:text-slate-600"
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap6">
//         {products.map((product) => {
//           const {id, image, name, price} = product
//           return (
//             <div key={id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-md transition-transform duration-200 hover:-translate-y-1">
//               <Link to={`/product/${id}`}>
//               <img src= {image} alt="" className="h-64 w-full object-contain rounded-lg transform scale-90 hover:scale-100 transition-transform duration-200" />
//               </Link>
//               <div className="mt-4">
//                 <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
//                 <p className="text-gray-600">₹{price}</p>
//               </div>
//               <button onClick={()=> addToCart(product,id)} className="w-full py-2 mt-4 text-lg font-medium text-white bg-sky-500 rounded:bg-sky-700 transition duration-300
//                             hover:-translate-y-0.5 hover:shadow-md hover:bg-sky-600 
//                             active:scale-95 active:shadow-inner" > Add to Cart</button>
                            
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default ProductList

import React, { useContext, useState } from 'react'  // ✅ Added useState
import { Link } from 'react-router-dom'
import { ShopContext } from './ShopContext'

const ProductList = () => {
  const { products, productsLoading, addToCart } = useContext(ShopContext)
  
  // ✅ ADD THESE STATE HOOKS
  const [query, setQuery] = useState('')

  if (productsLoading) return <div className="text-center py-20 text-xl">Loading delicious dishes...</div>

  // ✅ LIVE FILTERING LOGIC
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase().trim()) ||
    product.description?.toLowerCase().includes(query.toLowerCase().trim())
  )

  return (
    <div className='max-w-7xl mx-auto px-6 text-center mt-20 bg-gradient-to-br from-purple-50 via-cyan-50/30 to-gray-50 min-h-screen py-20'>
      <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-500 bg-clip-text text-transparent">
        Our Awesome Dishes
      </h2>

      {/* Fixed Search Bar */}
      <div className="relative w-full sm:w-96 mx-auto mb-12">
        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          className="w-full pl-16 pr-12 py-6 bg-white/95 backdrop-blur-xl rounded-3xl text-xl font-semibold text-slate-900 shadow-2xl border-2 border-purple-200/50 focus:border-cyan-400/70 focus:ring-4 focus:ring-purple-200/50 hover:shadow-3xl transition-all duration-300"
          type="text"
          value={query}  // ✅ Now connected
          onChange={(e) => setQuery(e.target.value)}  // ✅ Now works
          placeholder="Search Pizza, Burger, Biryani..."
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}  // ✅ Now works
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-500 text-lg font-semibold px-3 py-1 rounded-xl hover:bg-purple-100 transition-all duration-200"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results Count */}
      <p className="text-xl text-slate-700 mb-12 font-semibold">
        Found {filteredProducts.length} {filteredProducts.length === 1 ? 'dish' : 'dishes'}
        {query && <span className="text-purple-600 ml-2">🔍 "{query}"</span>}
      </p>

      {/* Fixed Grid + Modern Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
        {filteredProducts.map((product) => {
          const { id, image, name, price } = product
          return (
            <div key={id} className="group bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl hover:shadow-3xl hover:-translate-y-3 border border-purple-200/50 hover:border-cyan-300/70 transition-all duration-500 overflow-hidden hover:scale-[1.02]">
              <Link to={`/product/${id}`}>
                <img 
                  src={image} 
                  alt={name}
                  className="h-64 w-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl" 
                />
              </Link>
              <div className="mt-6 space-y-3">
                <h4 className="text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-purple-700 transition-colors">
                  {name}
                </h4>
                <p className="text-3xl font-bold text-cyan-600">₹{price}</p>
              </div>
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  addToCart(product, id)
                }}
                className="w-full py-4 mt-6 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-wide"
              >
                Add to Cart
              </button>
            </div>
          )
        })}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-32 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-200 to-cyan-200 rounded-3xl mx-auto mb-8 flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">No dishes found</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-md mx-auto">
            Try "Pizza", "Burger" or "Biryani"
          </p>
          <button
            onClick={() => setQuery('')}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-12 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductList
