const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { 
  getAllProducts, 
  getProductById, 
  getRelatedProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

// ✅ CRUD Operations
router.get('/', getAllProducts);           // GET all products
router.get('/:id', getProductById);        // GET a single product by ID
router.get('/related/all', getRelatedProducts); // GET related products
router.post('/', upload.single('image'), createProduct);          // POST a new product
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);      // DELETE a product by ID

module.exports = router;
