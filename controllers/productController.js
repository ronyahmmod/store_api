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
		stockId: req.body.stockId,
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

// READ
exports.getProduct = catchAsync(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	res.status(200).json({
		status: 'success',
		data: {
			product
		}
	});
});

// UPDATE
exports.updateProduct = catchAsync(async (req, res, next) => {
	// TODO: filtering req.body for unwanted category information update
	const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
	res.status(200).json({
		status: 'success',
		data: {
			updatedProduct
		}
	});
});

// DELETE
exports.deleteProduct = catchAsync(async (req, res, next) => {
	await Product.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: 'success',
		data: null
	});
});
