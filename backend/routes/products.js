const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// ✅ GET ALL PRODUCTS (Public - no auth needed)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().lean();  // Fast query
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Products fetch failed' });
  }
});

module.exports = router;

// // Simple products for testing
// const express = require('express');
// const authMiddleware = require('../middleware/auth'); 
// const router = express.Router();

// router.get('/', (req, res) => {
//   const products = [
//     { id: 1, name: 'Margherita Pizza', price: 299, image: 'pizza.jpg' },
//     { id: 2, name: 'Chicken Biryani', price: 399, image: 'biryani.jpg' },
//     { id: 3, name: 'Veg Burger', price: 199, image: 'burger.jpg' }
//   ];
//   res.json(products);
// });

// // Protected - only logged-in users
// router.post('/', authMiddleware, (req, res) => {
//   // Add product (admin only)
//   res.json({ message: 'Product added', user: req.user });
// });

// module.exports = router;
