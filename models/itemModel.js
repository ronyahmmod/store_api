const mongoose = require('mongoose');

const itemShema = new mongoose.Schema(
	{
		itemCode: {
			type: String,
			required: [ true, 'An item must be a item code' ],
			trim: true,
			unique: true
		},
		itemName: {
			type: String,
			required: [ true, 'An item must have a name' ],
			trim: true
		},
		itemDescription: {
			type: String,
			required: [ true, 'An item must have description' ],
			trim: true
		},
		buyValue: {
			type: Number,
			required: [ true, 'An item must have buy value' ],
			trim: true
		},
		sellValue: {
			type: Number,
			required: [ true, 'An item must have sale value' ],
			trim: true
		},
		itemOrigin: {
			type: String,
			required: [ true, 'Provide information about where this product made' ],
			trim: true
		},
		company: {
			type: String,
			trim: true,
			required: [ true, 'Please provide company name' ]
		},
		color: {
			type: String,
			required: [ true, 'Provide color of this item' ],
			trim: true
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

module.exports = mongoose.model('Item', itemShema);
