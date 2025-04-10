// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Smartwatch Backend is running!');
});

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Added auth and cart routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

// Register catch-all error handler
app.use((err, req, res, next) => {
  console.error('🔴 Server Error:', err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
