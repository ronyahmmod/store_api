const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.createOne = (Model, fieldNames) =>
	catchAsync(async (req, res, next) => {
		if (!fieldNames) return next(new AppError('Please provide which field you want to create', 404));
		const obj = {};
		fieldNames.forEach((el) => (obj[el] = req.body[el]));
		if (req.params.productId) obj['product'] = req.params.productId;
		console.log(req.params.productId);
		const doc = await Model.create(obj);

		res.status(201).json({
			status: 'success',
			data: {
				data: doc
			}
		});
	});

exports.getOne = (Model, populateOtions) =>
	catchAsync(async (req, res, next) => {
		let query = {};
		if (req.params.productId) query = Model.find({ product: req.params.productId });
		else query = Model.findById(req.params.id);

		if (populateOtions) {
			// console.log(populateOtions);
			query = query.populate(populateOtions);
		}
		const doc = await query;

		if (!doc) {
			return next(new AppError('There is no document found with this ID', 404));
		}

		res.status(200).json({
			status: 'succsess',
			data: {
				data: doc
			}
		});
	});

exports.getAll = (Model) =>
	catchAsync(async (req, res, next) => {
		const features = new APIFeatures(Model.find(), req.query).filter().sort().limitFields().paginate();
		const docs = await features.query;

		// SEND RESPONSE
		res.status(200).json({
			status: 'success',
			results: docs.length,
			data: {
				data: docs
			}
		});
	});

exports.updateOne = (Model, fieldNames) =>
	catchAsync(async (req, res, next) => {
		if (!fieldNames) return next(new AppError('Please provide which field you want to create', 404));
		const obj = {};
		fieldNames.forEach((el) => {
			if (req.body[el]) obj[el] = req.body[el];
		});
		const doc = await Model.findByIdAndUpdate(req.params.id, obj, { new: true });

		res.status(200).json({
			status: 'succsess',
			data: {
				data: doc
			}
		});
	});

exports.deleteOne = (Model) =>
	catchAsync(async (req, res, next) => {
		await Model.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null
		});
	});
