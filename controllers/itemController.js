const Item = require('../models/itemModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllItem = async (req, res, next) => {
	const features = new APIFeatures(Item.find(), req.query).filter().sort().limitFields().paginate();
	const items = await features.query;
	res.status(200).json({
		status: 'success',
		results: items.length,
		data: {
			items
		}
	});
};

exports.getItem = async (req, res, next) => {
	const item = await Item.find({ itemCode: req.params.itemCode });
	res.status(200).json({
		status: 'success',
		data: {
			item
		}
	});
};

exports.createItem = async (req, res, next) => {
	const newItem = await Item.create(req.body);
	res.status(201).json({
		status: 'success',
		data: {
			newItem
		}
	});
};

exports.updateItem = async (req, res, next) => {
	const updatedItem = await Item.findOneAndUpdate({ itemCode: req.params.itemCode }, req.body, {
		new: true,
		runValidators: true
	});
	res.status(200).json({
		status: 'success',
		data: {
			updatedItem
		}
	});
};

exports.deleteItem = async (req, res, next) => {
	const deletedItem = await Item.findOneAndDelete({ itemCode: req.params.itemCode });

	res.status(204).json({
		status: 'ok',
		data: null
	});
};
