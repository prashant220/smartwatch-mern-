// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add new product (POST /api/admin/add-product)
router.post('/add-product', async (req, res) => {
  try {
    const { name, brand, price, image, description } = req.body;
    const product = new Product({ name, brand, price, image, description });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
