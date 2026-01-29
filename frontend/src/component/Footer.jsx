import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='bg-black text-white pb-12'>
      <div className='flex justify-between items-center px-8 py-6 border-b border-gray-600 flex-wrap'>
        <h2 className='text-2xl'>Foodkart</h2>
      
       <div className='flex space-x-4'>
        <FaFacebook className='text-2xl cursor-pointer'/>
        <FaInstagram className='text-2xl cursor-pointer'/>
        <FaSquareXTwitter className='text-2xl cursor-pointer'/>
       </div>
      </div>

      <div className='text-center py-4'>
        <p className='text-gray-400'>© Foodkart 2025. All rights reserved.</p>
      </div>

    </div>
    
  )
}

export default Footer