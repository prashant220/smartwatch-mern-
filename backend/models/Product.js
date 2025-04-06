const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  brand: String,
  stock: Number
});

module.exports = mongoose.model('Product', ProductSchema);
