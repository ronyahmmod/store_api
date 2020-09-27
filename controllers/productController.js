const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Product = require('../models/productModel');

// CREATE
exports.createProduct = catchAsync(async (req, res, next) => {
	const newProduct = await Product.create({
		name: req.body.name,
		description: req.body.description,
		pricePerUnit: req.body.pricePerUnit,
		color: req.body.color,
		size: req.body.size,
		baseUnit: req.body.baseUnit,
		activeForSale: req.body.activeForSale,
		company: req.body.company,
		origin: req.body.origin,
		type: req.body.type,
		model: req.body.model,
		category: req.body.category,
		remark: req.body.remark
	});
	res.status(201).json({
		status: 'success',
		data: {
			newProduct
		}
	});
});
// READ
exports.getAllProduct = catchAsync(async (req, res, next) => {
	const allProduct = await Product.find();
	res.status(200).json({
		status: 'success',
		length: allProduct.length,
		data: {
			allProduct
		}
	});
});
