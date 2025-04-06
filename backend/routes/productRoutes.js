const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById,getRelatedProducts } = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/related/all', getRelatedProducts); 
module.exports = router;
