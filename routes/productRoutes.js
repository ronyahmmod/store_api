const express = require('express');
const productController = require('../controllers/productController');
const stockRouter = require('../routes/stockRoutes');
const authController = require('../controllers/authController');

const router = express.Router();

// product/5f733307c26ef62f0083f77f/stock
router.use('/:productId/stocks', stockRouter);
router
	.route('/')
	.get(authController.protect, authController.restrictTo('employe'), productController.getAllProduct)
	.post(authController.protect, authController.restrictTo('employe'), productController.createProduct);
router
	.route('/:id')
	.get(authController.protect, productController.getProduct)
	.patch(authController.protect, productController.updateProduct)
	.delete(authController.protect, authController.restrictTo('admin'), productController.deleteProduct);

module.exports = router;
