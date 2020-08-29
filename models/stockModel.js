const mongoose = require('mongoose');

const stockShema = new mongoose.Schema({
	item: {
		type: mongoose.Schema.ObjectId,
		ref: 'Item'
	},
	quantity: Number
});

module.exports = mongoose.model('Stock', stockShema);
