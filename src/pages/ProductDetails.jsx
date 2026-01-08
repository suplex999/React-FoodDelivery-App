import React, { useContext } from 'react'
import { productsData } from './data'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../component/Shopcontext'

const ProductDetails = () => {
  const {addTocart} = useContext(ShopContext)

  const {id} = useParams()

  const product = productsData.find((product)=> product.id === parseInt(id))

  return (
    <div className='mt-20 max-w-6xl ms-auto px-6 py-16 flex flex-col md:flex-row gap-10'>
      <div className='md:w-1/2 flex justify-center'>
        <img src={product.image} alt="" className='w- [460px] rounded-lg shadow-md'/>
      </div>
      <div className='md:w-1/2 space-y-6'>
        <h3 className='text-3xl font-semibold'>{product.name}</h3>
        <p className='text-2xl text-sky-500 font-bold'>	₹{product.price}</p>
        <p className='text-lg text-gray-600'>{product.description}</p>
        <button onClick={()=> addTocart(product,id)} className='bg-sky-500 text-white text-lg py-3 px-10 rounded-lg'>ADD TO CART</button>
      </div>
    </div>
    
  )
}

export default ProductDetails