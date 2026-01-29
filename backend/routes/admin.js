const express = require('express');
const upload = require('../middleware/multer');
const Product = require('../models/Product');
const auth = require('../middleware/auth'); // Your JWT auth
const router = express.Router();

// ✅ ADD PRODUCT WITH IMAGE UPLOAD (Admin only)
router.post('/products', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    
    const product = new Product({
      name,
      price: parseFloat(price),
      image: `/uploads/${req.file.filename}`, // ✅ Saved path
      category,
      description
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE PRODUCT IMAGE
router.put('/products/:id/image', auth, upload.single('image'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.image = `/uploads/${req.file.filename}`;
    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
