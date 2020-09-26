const mongoose = require('mongoose');

const soldProductSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	},
	price: {
		type: Number,
		required: [ true, 'This is actually the price when you sold this non-zero value >=0' ]
	},
	quantitySold: {
		type: Number,
		required: [ true, 'Provide how much product sold this time non-zero value >=0' ]
	},
	saleId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Sale'
	},
	taxAmount: Number,
	remark: String
});

const soldProduct = mongoose.model('SoldProduct', soldProductSchema);
module.exports = soldProduct;
