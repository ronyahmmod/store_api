const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Category = require('../models/categoryModel');

// CREATE
exports.createCategory = catchAsync(async (req, res, next) => {
	const newCategory = await Category.create({
		type: req.body.type,
		name: req.body.name,
		description: req.body.description,
		remark: req.body.remark
	});
	if (!newCategory) return next(new AppError('Problem to create new category', 404));

	res.status(201).json({
		status: 'success',

		data: {
			newCategory
		}
	});
});

// READ
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

// READ
exports.getCategory = catchAsync(async (req, res, next) => {
	const category = await Category.findById(req.params.id);
	res.status(200).json({
		status: 'success',
		data: {
			category
		}
	});
});

// UPDATE
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

// DELETE
exports.deleteCategory = catchAsync(async (req, res, next) => {
	await Category.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: 'success',
		data: null
	});
});
