const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) {
			newObj[el] = obj[el];
		}
	});
	return newObj;
};
exports.updateMe = catchAsync(async (req, res, next) => {
	// 1) Create error it user POST password data
	if (req.body.password || req.body.paswordConfirm) {
		return next(new AppError('This route is not password upate. please use /updatePassword', 400));
	}

	// 2) filtered out unwanted fieldnames, that are not allowed to the updated
	const filterBody = filterObj(req.body, 'name', 'email');

	// 3) Update user document
	const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
		new: true,
		runValidators: true
	});
	res.status(200).json({
		status: 'success',
		data: {
			user: updatedUser
		}
	});
});

exports.deleteMe = catchAsync(async (req, res, next) => {
	await User.findByIdAndUpdate(req.user.id, { active: false });

	res.status(204).json({
		status: 'success',
		data: null
	});
});
