const express = require('express');
const productController = require('../controllers/productController');
const stockRouter = require('../routes/stockRoutes');

const router = express.Router();

// product/5f733307c26ef62f0083f77f/stock
router.use('/:productId/stock', stockRouter);
router.route('/').get(productController.getAllProduct).post(productController.createProduct);
router
	.route('/:id')
	.get(productController.getProduct)
	.patch(productController.updateProduct)
	.delete(productController.deleteProduct);

module.exports = router;
