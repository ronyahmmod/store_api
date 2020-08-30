const Item = require('../models/itemModel');

exports.getAllItem = async (req, res, next) => {
	res.status(200).json({
		status: 'success',
		message: req.query
	});
};
