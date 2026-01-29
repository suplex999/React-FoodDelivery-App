// import { Link } from 'react-router-dom'
// import React, { useContext } from 'react'
// import { ShopContext } from './ShopContext'
// import { FiTrash2 } from 'react-icons/fi'
// import { IoMdRemove } from 'react-icons/io'
// import { FiPlus } from "react-icons/fi";
// import Checkout from './Checkout'
// const Cart = () => {
//   const { cart, removeFromCart, clearCart,
//     increaseQuantity, decreaseQuantity, quantity, total, } = useContext(ShopContext)
//   return (
//     <div className='max-w-7xl mx-auto px-6 mt-26 flex flex-col lg:flex-row gap-8'>
//       {/* left Section */}
//       <div className='lg:2/3 bg-white p-6'>

//         {/* Header */}
//         <div className='flex justify-between items-center border-b pb-4'>
//           <h1 className='text-2xl font-semibold '>Shopping Cart</h1>
//           <h1 className='text-lg'>Items: ({quantity})</h1>
//           <FiTrash2 onClick={clearCart} className='text-red-500 text-2xl cursor-pointer'/>
//         </div>

//         {/* Sub-header  */}
//         <div className='grid grid-cols-4 items-center py-4 border-b text-gray  '>
//           <span>Product </span>
//           <span>Quantity</span>
//           <span>Price</span>
//           <span>Total</span>
//         </div>

//         {/* Cart items  */}
//         <div>
//           {cart.length > 0 ? (
//             cart.map((item) => {
//               const { id, image, name, price, amount } = item
//               return (
//                 <div key={id} className='grid grid-cols-4 items-center py-4 border-b text-gray-700  '>
//                   <div className='flex items-center space-x-4'>
//                     <img src={image} alt="" className='w-16 h-16 rounded-md object-cover'/>
//                     <div>
//                       <h3 className='font-semibold'>{name}</h3>
//                       <button onClick={() => removeFromCart(id)} className='text-red-500 text-sm flex items-center gap-1 mt-2'><FiTrash2 />Remove</button>
//                     </div>
//                   </div>

//                   <div className='flex items-center space-x-3'>
//                     <button onClick={() => decreaseQuantity(id)} className='	w-10 h-10 hover:scale-110 bg-gray-200 rounded-full flex items-center justify-center text-xl'><IoMdRemove /></button>
//                     <span className='text-lg'>{amount}</span>
//                     <button onClick={() => increaseQuantity(id)} className='	w-10 h-10 hover:scale-110 bg-gray-200 rounded-full flex items-center justify-center text-xl'><FiPlus /></button>
//                   </div>
//                   <p className='text-lg font-medium'>${price}</p>
//                   <p className='text-lg font-semibold'>${price * amount}</p>
//                 </div>

//               )

//             })
//           ) : (
//             <p className='text-gray-500 mt-4'> Your Cart is empty</p>

//           )}
//         </div>

//         {/* Right section  */}
//         <div className='lg:w-1/3 bg-gray-100 p-6 rounded-lg pb-4'>
//           <h2 className='text-xl font-semibold border-b pb-4'>Cart Summary</h2>
//           <div className='flex justify-between mt-2'> 
//             <span className='text-gray-700'>Items:</span>
//             <span className='font-medium'> {quantity} </span>
//           </div>

//           <div className='flex justify-between mt-2'>
//             <span className='text-gray-700'>Subtotal</span>
//             <span className='font-medium'>${isNaN(total) ? 0 : total}</span>
//           </div>
//           <Link to="/checkout">
//           <button id='checkout'className='w-full bg-green-500 text-white pu-3 mt-4 rounded text-lg' >CHECKOUT</button>
//           </Link>
//         </div>
//       </div>
//     </div>


//   )
// }

// export default Cart

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from './ShopContext'
import { FiTrash2, FiX } from 'react-icons/fi'
import { IoMdRemove, IoMdAdd } from 'react-icons/io'

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    clearCart, 
    increaseQuantity, 
    decreaseQuantity, 
    quantity, 
    total 
  } = useContext(ShopContext)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffffff] via-white to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4 bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-emerald-200/50">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#ed0ff6] via-sky-600 to-[#15d3ef] bg-clip-text text-transparent">
              Your Cart
            </h1>
            <p className="text-xl text-slate-600 mt-2">{quantity} delicious items</p>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-2 bg-red-500/90 hover:bg-red-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              <FiTrash2 size={24} />
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="text-center py-32 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50">
            <div className="w-32 h-32 bg-gradient-to-r from-slate-200 to-slate-300 rounded-3xl mx-auto mb-8 flex items-center justify-center">
              <span className="text-4xl">🛒</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-md mx-auto">
              Add some tasty items and come back here
            </p>
            <Link
              to="/ProductList"
              className="inline-block bg-gradient-to-r from-[#ed0ff6] to-sky-500 hover:from-[#ed0ff6] hover:to-sky-600 text-white px-12 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
            >
              🍔 Start Shopping →
            </Link>
          </div>
        ) : (
          /* Cart Items + Summary */
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="xl:col-span-2 space-y-6">
              {cart.map((item) => {
                const { id, image, name, price, amount } = item
                const itemTotal = price * amount
                return (
                  <div
                    key={id}
                    className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl hover:-translate-y-2 border border-emerald-200/50 transition-all duration-500 hover:border-sky-300/70"
                  >
                    <div className="flex items-center gap-6">
                      {/* Image */}
                      <div className="relative">
                        <img
                          src={image}
                          alt={name}
                          className="w-28 h-28 rounded-2xl object-cover shadow-2xl group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                          {amount}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-black">
                          {name}
                        </h3>
                        <p className="text-xl font-bold text-sky-600 mb-4">
                          ₹{price.toFixed(0)}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-4">
                        {/* Quantity */}
                        <div className="flex items-center bg-slate-100/80 rounded-2xl p-2 backdrop-blur-sm">
                          <button
                            onClick={() => decreaseQuantity(id)}
                            className="w-12 h-12 bg-white/70 hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center text-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                          >
                            <IoMdRemove />
                          </button>
                          <span className="px-6 py-2 text-xl font-bold text-slate-800 min-w-[2.5rem] text-center">
                            {amount}
                          </span>
                          <button
                            onClick={() => increaseQuantity(id)}
                            className="w-12 h-12 bg-white/70 hover:bg-emerald-500 hover:text-white rounded-xl flex items-center justify-center text-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                          >
                            <IoMdAdd />
                          </button>
                        </div>

                        {/* Price & Remove */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-sky-600 mb-2">
                            ₹{itemTotal.toLocaleString()}
                          </p>
                          <button
                            onClick={() => removeFromCart(id)}
                            className="p-2 hover:bg-red-500/20 hover:text-red-600 rounded-xl transition-all duration-200 group-hover:scale-110"
                          >
                            <FiX size={22} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-sky-200/50 sticky top-24">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-[#f947ff] bg-clip-text text-transparent mb-8 text-center">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-2xl font-bold py-3 border-b border-slate-200">
                    <span>Total ({quantity} items):</span>
                    <span className="text-sky-600">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="text-center py-4 bg-emerald-100/80 rounded-2xl text-emerald-800 font-semibold">
                    🚚 Free Delivery
                  </div>
                </div>

                <Link to="/checkout">
                  <button className="w-full bg-gradient-to-r from-[#f947ff] via-sky-400 to-black hover:from-sky-200 hover:via-sky-500 hover:to-white text-white py-6 px-8 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase tracking-wide">
                    🛒 Proceed to Checkout
                  </button>
                </Link>

                <div className="mt-8 pt-6 border-t border-slate-200 text-sm text-slate-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Cash on Delivery</span>
                    <span>✅ Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Secure Checkout</span>
                    <span>🔒 Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart




// Cart.jsx (full component with right-aligned checkout)
// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { ShopContext } from './ShopContext';
// import { FiTrash2 } from 'react-icons/fi';
// import { IoMdRemove, IoMdAdd } from 'react-icons/io';  // Fixed: IoMdAdd for +

// const Cart = () => {
//   const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, quantity, total } = useContext(ShopContext);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Responsive Grid: Mobile stack, Desktop 2-col with right checkout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
//           {/* Left: Cart Items (full width mobile, 2/3 desktop) */}
//           <div className="lg:col-span-8">  {/* 8/12 = 2/3 */}
//             <div className="bg-white rounded-3xl shadow-2xl p-8">
              
//               {/* Header */}
//               <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b pb-8 mb-8 gap-4">
//                 <h1 className="text-4xl font-bold text-gray-800">Shopping Cart</h1>
//                 <div className="flex items-center gap-6">
//                   <span className="text-2xl font-semibold text-gray-600">({quantity || 0} items)</span>
//                   {cart.length > 0 && (
//                     <FiTrash2 
//                       onClick={clearCart} 
//                       className="text-red-500 text-3xl cursor-pointer hover:scale-110 transition-transform p-3 rounded-2xl hover:bg-red-50" 
//                     />
//                   )}
//                 </div>
//               </div>

//               {/* Items Table Header */}
//               <div className="grid grid-cols-1 md:grid-cols-4 items-center py-6 border-b mb-8 text-xl font-semibold text-gray-600">
//                 <span>Product</span>
//                 <span className="md:col-start-2">Quantity</span>
//                 <span className="md:col-start-3">Price</span>
//                 <span>Total</span>
//               </div>

//               {/* Items List */}
//               {cart.length > 0 ? (
//                 cart.map((item) => (
//                   <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 items-center py-8 border-b last:border-none hover:bg-sky-50/50 p-6 rounded-2xl transition-all">
//                     <div className="md:col-span-1 flex items-center space-x-6 mb-4 md:mb-0">
//                       <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover shadow-lg flex-shrink-0" />
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
//                         <button 
//                           onClick={() => removeFromCart(item.id)}
//                           className="text-red-500 hover:text-red-600 text-sm font-semibold flex items-center gap-2 transition-colors"
//                         >
//                           <FiTrash2 size={16} /> Remove
//                         </button>
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-center md:justify-start space-x-4 mb-4 md:mb-0">
//                       <button 
//                         onClick={() => decreaseQuantity(item.id)}
//                         className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-xl flex items-center justify-center text-2xl transition-all hover:scale-110 disabled:opacity-50"
//                         disabled={item.amount <= 1}
//                       >
//                         <IoMdRemove />
//                       </button>
//                       <span className="text-3xl font-bold w-16 text-center">{item.amount}</span>
//                       <button 
//                         onClick={() => increaseQuantity(item.id)}
//                         className="w-12 h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-xl flex items-center justify-center text-2xl transition-all hover:scale-110 shadow-md"
//                       >
//                         <IoMdAdd />
//                       </button>
//                     </div>
//                     <p className="text-2xl font-bold text-gray-900 text-center md:text-left">₹{item.price}</p>
//                     <p className="text-3xl font-extrabold text-sky-600 text-right">₹{(item.price * item.amount).toLocaleString()}</p>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-24">
//                   <div className="w-32 h-32 bg-gray-200 rounded-3xl mx-auto mb-8 flex items-center justify-center">
//                     <span className="text-4xl">🛒</span>
//                   </div>
//                   <h2 className="text-3xl font-bold text-gray-500 mb-4">Your cart is empty</h2>
//                   <Link 
//                     to="/Productlist" 
//                     className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-12 py-4 rounded-2xl text-xl font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105"
//                   >
//                     Start Shopping →
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right: Checkout Summary (hidden mobile, 1/3 desktop right) */}
//           <div className="lg:col-span-4 hidden lg:block sticky top-24 self-start">  {/* Right side */}
//             <div className="bg-gradient-to-br from-white to-sky-50 rounded-3xl p-10 shadow-2xl border border-sky-100 h-fit">
//               <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-6">Order Summary</h2>
              
//               <div className="space-y-6 mb-10">
//                 <div className="flex justify-between text-2xl">
//                   <span className="text-gray-700 font-semibold">Items:</span>
//                   <span className="font-bold">{quantity || 0}</span>
//                 </div>
//                 <div className="flex justify-between text-3xl">
//                   <span className="text-gray-800 font-bold">Total:</span>
//                   <span className="text-sky-600 font-black">₹{total.toLocaleString()}</span>
//                 </div>
//               </div>
              
//               <Link to="/checkout" className="block w-full">
//                 <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-6 px-8 text-2xl font-bold rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] uppercase tracking-wide">
//                   Proceed to Checkout
//                 </button>
//               </Link>
              
//               <p className="text-center text-sm text-gray-500 mt-6">Secure checkout • Free shipping over ₹500</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


// latest cart 
