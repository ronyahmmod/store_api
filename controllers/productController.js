const Product = require('../models/productModel');
const handleFactory = require('../controllers/handleFactory');

// CREATE
exports.createProduct = handleFactory.createOne(Product, [
	'name',
	'description',
	'pricePerUnit',
	'color',
	'size',
	'baseUnit',
	'activeForSale',
	'company',
	'origin',
	'type',
	'model',
	'category',
	'stockId',
	'remark'
]);
// READ
exports.getAllProduct = handleFactory.getAll(Product);

// READ
exports.getProduct = handleFactory.getOne(Product, { path: 'stock', select: '-__v-_id' });

// UPDATE
exports.updateProduct = handleFactory.updateOne(Product, [
	'name',
	'description',
	'pricePerUnit',
	'color',
	'size',
	'baseUnit',
	'activeForSale',
	'company',
	'origin',
	'type',
	'model',
	'category',
	'stockId',
	'remark'
]);

// DELETE
exports.deleteProduct = handleFactory.deleteOne(Product);
