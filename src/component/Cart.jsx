import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { ShopContext } from './Shopcontext'
import { FiTrash2 } from 'react-icons/fi'
import { IoMdRemove } from 'react-icons/io'
import { FiPlus } from "react-icons/fi";
import Checkout from './Checkout'
const Cart = () => {
  const { cart, removeFromCart, clearCart,
    increaseQuantity, decreaseQuantity, quantity, total, } = useContext(ShopContext)
  return (
    <div className='max-w-7xl mx-auto px-6 mt-26 flex flex-col lg:flex-row gap-8'>
      {/* left Section */}
      <div className='lg:2/3 bg-white p-6'>

        {/* Header */}
        <div className='flex justify-between items-center border-b pb-4'>
          <h1 className='text-2xl font-semibold '>Shopping Cart</h1>
          <h1 className='text-lg'>Items: ({quantity})</h1>
          <FiTrash2 onClick={clearCart} className='text-red-500 text-2xl cursor-pointer'/>
        </div>

        {/* Sub-header  */}
        <div className='grid grid-cols-4 items-center py-4 border-b text-gray  '>
          <span>Product </span>
          <span>Quantity</span>
          <span>Price</span>
          <span>Total</span>
        </div>

        {/* Cart items  */}
        <div>
          {cart.length > 0 ? (
            cart.map((item) => {
              const { id, image, name, price, amount } = item
              return (
                <div key={id} className='grid grid-cols-4 items-center py-4 border-b text-gray-700  '>
                  <div className='flex items-center space-x-4'>
                    <img src={image} alt="" className='w-16 h-16 rounded-md object-cover'/>
                    <div>
                      <h3 className='font-semibold'>{name}</h3>
                      <button onClick={() => removeFromCart(id)} className='text-red-500 text-sm flex items-center gap-1 mt-2'><FiTrash2 />Remove</button>
                    </div>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <button onClick={() => decreaseQuantity(id)} className='	w-10 h-10 hover:scale-110 bg-gray-200 rounded-full flex items-center justify-center text-xl'><IoMdRemove /></button>
                    <span className='text-lg'>{amount}</span>
                    <button onClick={() => increaseQuantity(id)} className='	w-10 h-10 hover:scale-110 bg-gray-200 rounded-full flex items-center justify-center text-xl'><FiPlus /></button>
                  </div>
                  <p className='text-lg font-medium'>${price}</p>
                  <p className='text-lg font-semibold'>${price * amount}</p>
                </div>

              )

            })
          ) : (
            <p className='text-gray-500 mt-4'> Your Cart is empty</p>

          )}
        </div>

        {/* Right section  */}
        <div className='lg:w-1/3 bg-gray-100 p-6 rounded-lg pb-4'>
          <h2 className='text-xl font-semibold border-b pb-4'>Cart Summary</h2>
          <div className='flex justify-between mt-2'> 
            <span className='text-gray-700'>Items:</span>
            <span className='font-medium'> {quantity} </span>
          </div>

          <div className='flex justify-between mt-2'>
            <span className='text-gray-700'>Subtotal</span>
            <span className='font-medium'>${isNaN(total) ? 0 : total}</span>
          </div>
          <Link to="/checkout">
          <button id='checkout'className='w-full bg-green-500 text-white pu-3 mt-4 rounded text-lg' >CHECKOUT</button>
          </Link>
        </div>
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
