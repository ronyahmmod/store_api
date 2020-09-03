const catchAsync = require('../utils/catchAsync');
const Item = require('../models/itemModel');
const APIFeatures = require('../utils/apiFeatures');

// SHOW THE ADD PRODUCT FROM THROUGH addProductForm.pug
exports.viewAddProductForm = catchAsync(async (req, res, next) => {
	res.status(200).render('addProductForm', {
		title: 'Add a new product'
	});
});

// handle submited newly product data and redirect to showAllProductsRoute
exports.addSubmittedProductData = catchAsync(async (req, res, next) => {
	const newItem = await Item.create(req.body);
	res.redirect('/showAllProducts');
});

exports.showAllProducts = catchAsync(async (req, res, next) => {
	const features = new APIFeatures(Item.find(), req.query).filter().sort().limitFields().paginate();
	const allItems = await features.query;
	// console.log(allItems);
	res.status(200).render('showAllProducts', {
		length: allItems.length,
		data: allItems
	});
});

// remove a specipic product
exports.removeProduct = catchAsync(async (req, res, next) => {
	const deleteItem = await Item.findByIdAndDelete(req.params.id);
	res.redirect('/showAllProducts');
});

// show edit product data
exports.showEditProductForm = catchAsync(async (req, res, next) => {
	const item = await Item.findById(req.params.id);
	res.status(200).render('editProductForm', {
		status: 'success',
		data: item
	});
});

// submit edit product data
exports.submitEditProductData = catchAsync(async (req, res, next) => {
	const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
	res.redirect('/showAllProducts');
});

// show search product form
exports.showSearchProductForm = catchAsync(async (req, res, next) => {
	res.status(200).render('searchProductForm', {
		status: 'success'
	});
});

exports.showSearchProductData = catchAsync(async (req, res, next) => {
	const item = await Item.findOne({ itemCode: req.body.itemCode });
	console.log(item);
	res.status(200).render('searchProductData', {
		status: 'success',
		data: item
	});
});
