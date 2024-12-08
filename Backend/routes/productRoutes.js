const express = require('express');
const multer = require('multer');
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();



// Routes
router.post('/add', addProduct);
router.get('/', getAllProducts);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
