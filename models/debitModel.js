const mongoose = require('mongoose');

const debitSchema = new mongoose.Schema({
	debitedDate: {
		type: Date,
		required: [ true, 'Credit must have a date' ],
		default: Date.now()
	},
	task: {
		type: String,
		required: [ true, 'Credit must have a task' ]
	},
	amount: {
		type: Number,
		required: [ true, 'Credit must have amount' ]
	},
	remark: String,
	debitedBy: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Debit', debitSchema);
