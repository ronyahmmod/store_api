const mongoose = require('mongoose');

const wasteProductSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	},
	cause: {
		type: String
	},
	amount: Number,
	wastedAt: {
		type: Date,
		default: Date.now()
	},
	remark: String
});

const wastedProduct = mongoose.model('WastedProduct', wasteProductSchema);
module.exports = wasteProduct;
