const mongoose = require('mongoose');

const transactionCSchema = new mongoose.Schema({
	orderdate: {
		type: Date,
		required: [ true, 'A transaction must have an order date' ],
		default: Date.now()
	},
	orderItems: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'Item'
		}
	],
	paid: [
		{
			date: {
				type: Date,
				default: Date.now()
			},
			amount: {
				type: Number
			},
			paidBy: {
				type: String,
				enum: {
					values: [ 'cash', 'check', 'mobileBanking' ],
					message: 'Select paid option cash|check|mobileBanking'
				}
			}
		}
	],
	shippedItems: [
		{
			date: {
				type: Date,
				default: Date.now()
			},
			item: {
				type: mongoose.Schema.ObjectId,
				ref: 'Item'
			},
			remark: String
		}
	],
	waitingItems: [
		{
			date: {
				type: Date,
				default: Date.now()
			},
			item: {
				type: mongoose.Schema.ObjectId,
				ref: 'Item'
			},
			remark: String
		}
	],
	remark: String,
	transactionedBy: {
		type: mongoose.shipedDate.ObjectId,
		ref: 'User'
	},
	customar: {
		type: mongoose.Schema.ObjectId,
		ref: 'Customar'
	}
});

module.exports = mongoose.model('TransactionS', transactionSSchema);
