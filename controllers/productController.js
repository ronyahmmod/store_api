const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
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
		company: req.body.company,
		origin: req.body.origin,
		type: req.body.type,
		model: req.body.model,
		category: req.body.category,
		remark: req.body.remark
	});

	res.status(201).json({
		status: 'succsess',
		data: {
			data: newProduct
		}
	});
});
// READ
exports.getAllProduct = catchAsync(async (req, res, next) => {
	const features = new APIFeatures(Product.find(), req.query).filter().sort().limitFields().paginate();
	const allProducts = await features.query;

	res.status(200).json({
		status: 'success',
		length: allProducts.length,
		data: {
			data: allProducts
		}
	});
});

// READ
exports.getProduct = catchAsync(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new AppError('There is no product with this id', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			data: product
		}
	});
});

// UPDATE
exports.updateProduct = catchAsync(async (req, res, next) => {
	const updatedProduct = await Product.findByIdAndUpdate(
		req.params.id,
		{
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
			taxPercentage: req.body.taxPercentage,
			remark: req.body.remark
		},
		{ new: true }
	);

	res.status(200).json({
		status: 'success',
		data: {
			data: updatedProduct
		}
	});
});

// DELETE
exports.deleteProduct = catchAsync(async (req, res, next) => {
	await Product.findByIdAndDelete(req.params.id);

	res.status(200).json({
		status: 'success',
		data: null
	});
});
