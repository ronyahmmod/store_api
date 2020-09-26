const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
	createdTime: {
		type: Date,
		default: Date.now()
	},
	paidTime: {
		type: Date,
		default: Date.now()
	},
	saleAmount: Number,
	paidAmount: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	remark: String
});

const sale = mongoose.model('Sale', saleSchema);
module.exports = sale;
