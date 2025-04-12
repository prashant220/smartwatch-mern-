// backend/controllers/productController.js
const Product = require('../models/Product');

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET related products (for demo, return latest 3)
const getRelatedProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(3);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create a new product
// controllers/productController.js


const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const imagePath = req.file ? `uploads/${req.file.filename}` : '';

    const product = new Product({
      name,
      description,
      price,
      image: imagePath,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Product creation error:', err);
    res.status(500).json({ error: 'Server error while creating product' });
  }
};



// PUT update an existing product
// controllers/productController.js
const fs = require('fs');
const path = require('path');

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    let product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Handle new image upload
    if (req.file) {
      // Delete old image from disk
      if (product.image && fs.existsSync(path.join(__dirname, '..', product.image))) {
        fs.unlinkSync(path.join(__dirname, '..', product.image));
      }

      product.image = `uploads/${req.file.filename}`;
    }

    // Update other fields
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;

    const updated = await product.save();
    res.status(200).json(updated);

  } catch (err) {
    console.error('Product update error:', err);
    res.status(500).json({ error: 'Server error while updating product' });
  }
};

// DELETE a product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
