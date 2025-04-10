const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Place Order
router.post('/place', verifyToken, async (req, res) => {
  const { shippingInfo, total } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    const order = new Order({
      user: req.user.id,
      shippingInfo,
      total,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      }))
    });

    await order.save();

    // Clear cart after successful order
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
