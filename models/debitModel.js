const mongoose = require('mongoose');

const debitSchema = new mongoose.Schema({
	name: String,
	description: String,
	amount: Number,
	debitedDate: {
		type: Date,
		default: Date.now()
	},
	remark: String
});

const debit = mongoose.model('Crdit', debitSchema);
module.exports = debit;
