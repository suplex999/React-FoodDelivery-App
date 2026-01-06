import React from 'react'
import Hero from '../component/Hero'
import ProductList from '../component/ProductList'
import Contact from '../component/Contact'
import ProductsPage from '../component/ProductsPage'
const Homepage = () => {
  return (
    <div>
      <Hero/>
      <ProductsPage />
      <ProductList />
      <Contact/>
      </div>
  )
}

export default Homepage