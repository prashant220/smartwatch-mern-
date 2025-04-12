const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Place Order or Buy Now
router.post('/place', verifyToken, async (req, res) => {
  const { shippingInfo, total, buyNow = false, product, quantity = 1 } = req.body;

  try {
    let orderItems = [];

    if (buyNow && product) {
      // ✅ Buy Now path
      orderItems = [{
        product: product._id,
        quantity
      }];
    } else {
      // ✅ Normal cart checkout path
      const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }

      orderItems = cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      }));

      // Clear cart after placing order
      cart.items = [];
      await cart.save();
    }

    const order = new Order({
      user: req.user.id,
      shippingInfo,
      total,
      items: orderItems
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });

  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
