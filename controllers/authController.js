const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/mail');


const signToken = (id) => {
	return jwt.sign({ id: id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
};

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);
	const cookieOptions = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
		httpOnly: true
	};
	user.password = undefined;
	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
	res.cookie('jwt', token, cookieOptions);
	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user
		}
	});
};
exports.signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		mobile: req.body.mobile
		// photo: req.body.photo
	});
	if (!newUser) {
		return next(new AppError('Error', 400));
	}
	// sign token
	createSendToken(newUser, 201, res);
	// res.redirect('/secret');
});

exports.signin = catchAsync(async (req, res, next) => {
	let token;
	// 1) GET THE USER EMAIL AND PASSWORD
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new AppError('Please provide email and password', 400));
	}
	// 2) CHECK THE EMAIL AND PASSWORD CORRECT
	const user = await User.findOne({ email }).select('+password');

	if (!user || !await user.correctPassword(password, user.password)) {
		return next(new AppError('Email or password error', 404));
	} else {
		token = signToken(user._id);
	}
	// 3) IF CORRECT SIGN TOKEN AND SEND IT
	createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
	// 1) Getting token and chekc of it's there
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}
	if (!token) {
		return next(new AppError('You are not logged in to get access', 401));
	}
	// 2) Verification token
	const currentUser = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) Check if user stil exists
	const freshUser = await User.findById(currentUser.id);
	if (!freshUser) {
		return next(AppError('The user belonging this token is no longer exists', 401));
	}
	// 4) Check if user changed password after the token was issued
	if (freshUser.changedPasswordAfter(currentUser.iat)) {
		return next(new AppError('User recently changed password! please login again', 401));
	}
	req.user = freshUser;
	next();
});

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		console.log(req.user.role === roles[0]);
		if (!roles.includes(req.user.role)) {
			return next(new AppError('You dont have permission to perform this action', 403));
		}
		next();
	};
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
	// 1) GET user based one POSTED email
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new AppError('There is no user exist with this email', 404));
	}
	// 2) Generate the random reset token
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });
	// 3) Send it to user email
	const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
	const message = `Forgot your password? submit a PATCH request with your new password and password
	confirm to ${resetURL}\nIf you didn't forget your password, please ignore this email!`;
	try {
		await sendEmail({
			email: user.email,
			subject: 'Your password reset valid for 10 min',
			message: message
		});
		res.status(200).json({
			status: 'success',
			message: 'Token sent to email'
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });
		return next(new AppError('There is an error, Please try again letter', 500));
	}
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	console.log(req.params.token);
	// 1) get user based on token
	const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
	console.log(hashedToken);
	// 2) If the token has not expired and there is user, set a new password
	const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
	console.log(user);
	// 3) Update changedPasswordAt property for the user
	if (!user) {
		return next(new AppError('Token is invalid or has expired', 400));
	}
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();
	// 4) Log the user in, send JWT
	// sign token
	createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
	// 1) Get user from collection
	const user = await User.findOne({ email: req.user.email }).select('+password');
	const { password, passwordConfirm, currentPassword } = req.body;
	// if(password !== passwordConfirm) return next(new AppError('password and confirmPassword must be same', 500))
	// 2) Check if the posted password is correct
	if (!user.correctPassword(currentPassword, user.password)) {
		return next(new AppError('Your password is incorrect pls try again', 500));
	}
	// 3) If so password is correct update the password
	user.password = password;
	user.passwordConfirm = passwordConfirm;
	await user.save();
	// 4) Log user is, send JWT
	createSendToken(user, 200, res);
});
