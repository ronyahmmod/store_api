const mongoose = require('mongoose');

const buySchema = new mongoose.Schema({
	createdTime: {
		type: Date,
		default: Date.now()
	},
	paidTime: {
		type: Date,
		default: Date.now()
	},
	buyAmount: Number,
	paidAmount: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	remark: String
});

const buy = mongoose.model('Buy', buySchema);
module.exports = buy;
