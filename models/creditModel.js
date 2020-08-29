const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
	creditedDate: {
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
	creditedBy: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Credit', creditSchema);
