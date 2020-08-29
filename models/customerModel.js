const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
	customarName: {
		type: String,
		required: [ true, 'A customar must have a name' ],
		trim: true
	},
	customarFatherName: {
		type: String,
		trim: true
	},
	customarMotherName: {
		type: String,
		trim: true
	},
	customarAddress: {
		type: String,
		required: [ true, 'A customar must have a address' ],
		trim: true
	},
	customarMobile: {
		type: String,
		required: [ true, 'A customar must have a mobile number' ],
		trim: true
	},
	customerFb: {
		type: String,
		trim: true
	},
	customarEmail: {
		type: String,
		trim: true
	},
	due: {
		type: Number,
		default: 0
	},
	transactions: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'TransactionC'
		}
	],
	remark: String
});
