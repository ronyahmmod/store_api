const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Category = require('../models/categoryModel');

exports.createCategory = catchAsync(async (req, res, next) => {
	const newCategory = await Category.create(req.body);
	if (!newCategory) return next(new AppError('Problem to create new category', 404));

	res.status(201).json({
		status: 'success',

		data: {
			newCategory
		}
	});
});

exports.getAllCategory = catchAsync(async (req, res, next) => {
	const allCategory = await Category.find();
	res.status(200).json({
		status: 'success',
		length: allCategory.length,
		data: {
			allCategory
		}
	});
});

exports.getCategory = catchAsync(async (req, res, next) => {
	const category = await Category.findById(req.params.id);
	res.status(200).json({
		status: 'success',
		data: {
			category
		}
	});
});

exports.updateCategory = catchAsync(async (req, res, next) => {
	// TODO: filtering req.body for unwanted category information update
	const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
	res.status(200).json({
		status: 'success',
		data: {
			updatedCategory
		}
	});
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
	await Category.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: 'success',
		data: null
	});
});
