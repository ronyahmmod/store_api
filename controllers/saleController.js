const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

const Sale = require('../models/saleModel');

// POST sale/
exports.saleProduct = catchAsync(async (req, res, next) => {
	// 1) GET WHICH PRODUCT SOLD BY THE CUSTOMAR
	// 2) SELECT OR ADD A CUSTOMAR
	// 3) CREATE A SALE VOUCHAR
	// 4) CONFIRM PAYMENT
	// 5) UPDATE STOCK OF THE SPECIFIED PRODUCT
	const user = req.user;
	const customar = req.customar;

	if (!customar) {
		return next(new AppError('Please must select a customar'));
	}
});
