const mongoose = require('mongoose');
const validator = require('validator');

const customarSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'A customar must have a name' ],
		trim: true
	},
	fatherName: String,
	motherName: String,
	mobile: {
		type: String,
		required: [ true, 'A customar must have a mobile number' ]
	},
	email: {
		type: String,
		validate: {
			validator: validator.email,
			message: 'Please provide valid email address'
		},
		default: `user.example.${this.name}\.com`
	},
	photo: String,
	address: String,
	due: Number,
	createdAt: {
		type: Date,
		default: Date.now()
	},
	remark: String
});

const customar = mongoose.model('Customar', customarSchema);
module.exports = customar;
