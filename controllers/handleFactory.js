const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getOne = (Model, populateOtions) =>
	catchAsync(async (req, res, next) => {
		let query = Model.query(req.params.id);
		if (populateOtions) {
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
		const features = new APIFeatures(Model.query(), req.query).filter().sort().limitFields().paginate();
		const doc = await features.query;

		// SEND RESPONSE
		res.status(200).json({
			status: 'success',
			results: doc.length,
			data: {
				data: doc
			}
		});
	});
