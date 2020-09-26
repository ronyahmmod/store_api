const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
		unique: true
	},
	inStock: {
		type: Number,
		required: [ true, 'Provide how much products are available in this store, must a non-zero value >=0' ],
		min: [ 0, 'Stock is not less than zero, 0' ]
	},
	lastUpdateTime: {
		type: Date,
		default: Date.now()
	},
	remark: String
});

const stock = mongoose.model('Stock', stockSchema);
module.exports = stock;
