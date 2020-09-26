const mongoose = require('mongoose');

const businessStatusSchema = new mongoose.Schema({
	totalSold: Number,
	totalBuy: Number,
	profit: Number,
	loss: Number,
	totalSaleDue: Number,
	totalBuyDue: Number,
	lastUpdate: {
		type: Date,
		default: Date.now()
	},
	credit: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Credit'
	},
	debit: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Debit'
	},
	remark: String
});

const businessStatus = mongoose.model('BusinessStatus', businessStatusSchema);
module.exports = businessStatus;
