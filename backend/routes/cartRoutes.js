// backend/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Cart = require('../models/Cart');

// Get cart for user
router.get('/:userId', verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
    res.json(cart || { user: req.params.userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add to cart 
router.post('/add', verifyToken, async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity; 
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from cart
router.delete('/remove/:userId/:productId', verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Clear entire cart
router.delete('/clear/:userId', verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: 'Cart cleared successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
