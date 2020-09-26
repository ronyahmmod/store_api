const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
	name: String,
	description: String,
	amount: Number,
	creditedDate: {
		type: Date,
		default: Date.now()
	},
	remark: String
});

const credit = mongoose.model('Crdit', creditSchema);
module.exports = credit;
