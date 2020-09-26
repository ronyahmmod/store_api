const mongoose = require('mongoose');

const buyProductSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	},
	quantityBuy: {
		type: Number,
		required: [ true, 'Provide how much product buy this time non-zero value >=0' ]
	},
	price: {
		type: Number,
		required: [ true, 'Provide how the buy value of this product non-zero value >=0' ]
	},
	buyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Buy'
	},
	remark: String
});

const buyProdcut = mongoose.model('BuyProduct', buyProductSchema);
module.exports = buyProduct;
