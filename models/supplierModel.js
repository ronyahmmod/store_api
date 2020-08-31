const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
	supplierName: {
		type: String,
		required: [ true, 'A supplier must have a name' ],
		trim: true
	},
	supplierAddress: {
		type: String,
		required: [ true, 'A supplier must have address' ],
		trim: true
	},
	supplierMobile: {
		type: String,
		required: [ true, 'A supplier must have a mobile number' ],
		trim: true
	},
	supplierEmail: {
		type: String,
		trim: true
	},
	supplierFb: {
		type: String,
		trim: true
	},
	due: Number,
	remark: String
});

module.exports = mongoose.model('Supplier', supplierSchema);
