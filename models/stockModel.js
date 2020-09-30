const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.ObjectId,
		ref: 'Product',
		required: [ true, 'Must use a product' ]
	},
	inStock: {
		type: Number,
		required: [ true, 'Provide how much products are available in this store, must a non-zero value >=0' ],
		min: [ 0, 'Stock is not less than zero, 0' ]
	},
	lastUpdateTime: {
		type: Date,
		default: Date.now()
	},
	remark: String
});

// stockSchema.pre(/^find/, function(next) {
// 	this.populate({
// 		path: 'product',
// 		select: '-category-_id-__v'
// 	});
// 	next();
// });

const stock = mongoose.model('Stock', stockSchema);
module.exports = stock;
