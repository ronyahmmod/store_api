const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	type: {
		type: String,
		required: [ true, 'Please provide category type like: [tiles, sanitary]' ],
		trim: true
	},
	name: {
		type: String,
		required: [ true, 'Please provide category name' ],
		trim: true
	},
	description: {
		type: String
	},
	remark: {
		type: String
	}
});

const category = mongoose.model('Category', categorySchema);
module.exports = category;
