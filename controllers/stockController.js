const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Stock = require('../models/stockModel');

// CREATE
exports.createStock = catchAsync(async (req, res, next) => {
	if (!req.params.productId) {
		return next(new AppError('Sorry please send POST request /api/v1/product/productId/stock', 404));
	}

	const newStock = await Stock.create({
		product: req.params.productId,
		inStock: req.body.inStock,
		lastUpdateTime: req.body.lastUpdateTime,
		remark: req.body.remark
	});

	res.status(201).json({
		status: 'success',
		data: {
			data: newStock
		}
	});
});

// READ
exports.getStock = catchAsync(async (req, res, next) => {
	if (!req.params.productId) {
		return next(new AppError('Sorry please send GET request /api/v1/product/productId/stock', 404));
	}

	const stock = await Stock.find({ product: req.params.productId });

	res.status(200).json({
		status: 'success',
		data: {
			data: stock
		}
	});
});

// UPDATE
exports.updateStock = catchAsync(async (req, res, next) => {
	if (!req.params.productId) {
		return next(new AppError('Sorry please send PATCH request /api/v1/product/productId/stock', 404));
	}

	const updatedStock = await Stock.findOneAndUpdate(
		{ product: req.params.productId },
		{
			inStock: req.body.inStock,
			lastUpdateTime: req.body.lastUpdateTime ? req.body.lastUpdateTime : Date.now(),
			remark: req.body.remark ? req.body.remark : ''
		},
		{ new: true, runValidators: true }
	);

	res.status(200).json({
		status: 'success',
		data: {
			data: updatedStock
		}
	});
});
