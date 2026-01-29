const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const router = express.Router();

// ✅ AUTH MIDDLEWARE
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'login to checkout' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'foodkart-super-secret-key-2026');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'login to checkout' });
  }
};

// ✅ CREATE ORDER
router.post('/', auth, async (req, res) => {
  try {
    const order = new Order({
      userId: req.user.id,
      ...req.body
    });
    await order.save();
    res.status(201).json({ success: true, orderId: order._id });
  } catch (error) {
    res.status(500).json({ error: 'Order creation failed' });
  }
});

module.exports = router;



// const express = require('express');
// const authMiddleware = require('../middleware/auth');
// const router = express.Router();

// router.get('/me', authMiddleware, (req, res) => {
//   res.json([{ status: 'pending', items: [], userId: req.user.id }]);
// });

// router.put('/cart', authMiddleware, (req, res) => {
//   res.json({ message: 'Cart saved', items: req.body.items });
// });

// router.post('/', authMiddleware, (req, res) => {
//   res.json({ 
//     _id: Date.now().toString(), 
//     ...req.body, 
//     userId: req.user.id 
//   });
// });

// module.exports = router;
