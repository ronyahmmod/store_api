const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Stock = require('../models/stockModel');

// CREATE
exports.createStock = catchAsync(async (req, res, next) => {
	const newStock = await Stock.create({
		inStock: req.body.inStock,
		lastUpdateTime: req.body.lastUpdateTime,
		remark: req.body.remark
	});
	res.status(201).json({
		status: 'success',
		data: {
			newStock
		}
	});
});

// UPDATE
exports.updateStock = catchAsync(async (req, res, next) => {
	// 1) Check you provide a non-zero or <=0 stock
	const { inStock } = req.body;
	if (inStock <= 0) return next(new AppError('Stock could not be a non-zero <=0 value'));
	// 2) If true then update it
	const updatedStock = await Stock.findByIdAndUpdate(req.params.id, { inStock }, { new: true });
	res.status(200).json({
		status: 'success',
		data: {
			updatedStock
		}
	});
});
