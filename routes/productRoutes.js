const express = require('express');
const productController = require('../controllers/productController');
const { route } = require('./viewRouter');

const router = express.Router();

router.route('/').get(productController.getAllProduct).post(productController.createProduct);
router.route('/:id').patch(productController.updateProduct).delete(productController.deleteProduct);

module.exports = router;
