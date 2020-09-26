const mongoose = require('mongoose');
const validator = require('validator');

const buyerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'Buyer must have a name' ],
		trim: true
	},
	address: String,
	mobile: {
		type: String,
		required: [ true, 'A buyer must have a mobile number' ]
	},
	email: {
		type: String,
		validate: {
			validator: validator.email,
			message: 'Please provide valid email address'
		},
		default: `example.buyer.${this.name}\.com`
	},
	company: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	buyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Buy'
	},
	due: {
		type: Number
	},
	remark: String
});

const buyer = mongoose.model('Buyer', buyerSchema);
module.exports = buyer;
