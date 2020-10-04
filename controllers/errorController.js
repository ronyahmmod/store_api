const { errorMonitor } = require('nodemailer/lib/mailer');
const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
	const message = `Invalid path ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	const message = `Duplicate field value: ${value}. Pls use another value`;
	return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	const message = `Invalid input data. ${errors.join('. ')}`;
	return new AppError(message, 400);
};
const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack
	});
};

const sendErrorProd = (err, res) => {
	// Operational, trusted error: send message to client
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message
		});
	} else {
		// programming or other unknown error
		// 1) Log the error
		console.error('Error 🤢', err);
		// 2) Send generic message
		res.status(500).json({
			status: 'error',
			message: 'Something went very wrong!'
		});
	}
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, res);
	} else if (process.eventNames.NODE_ENV === 'production') {
		let error = { ...err };
		if (error.name === 'CastError') error = handleCastErrorDB(error);
		if (error.code === 11000) error = handleDuplicateFieldDB(error);
		if ((error.name = 'ValidationError')) error = handleValidationErrorDB(error);
		sendErrorProd(error, res);
	}
};
