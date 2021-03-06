const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [ true, 'A product must have a name? Please provide this' ],
			trim: true
		},
		description: {
			type: String,
			required: [ true, 'A product must have a description about product' ],
			trim: true
		},
		pricePerUnit: {
			type: Number,
			required: [ true, 'A product must have a unit price, that actually sale value of a price' ]
		},
		color: {
			type: String,
			required: [ true, 'A product must have a color' ],
			trim: true
		},
		size: {
			type: Array,
			required: [ true, 'A product must have a size, it is array [height, width, diameter]' ]
		},
		baseUnit: {
			type: String,
			required: [ true, 'Please provide base unit like, cm, inch, ft, etc' ],
			trim: true,
			enum: [ 'cm', 'ft', 'inch', 'kg' ],
			default: 'cm'
		},
		activeForSale: {
			type: Boolean,
			default: true
		},
		company: {
			type: String,
			required: [ true, 'Provide company name of the product' ],
			trim: true
		},
		origin: {
			type: String,
			required: [ true, 'Where this product is made or manufacture' ],
			trim: true
		},
		type: {
			type: String,
			required: [ true, 'Provide the product type is wall, floor, etc' ],
			trim: true
		},
		model: {
			type: String,
			required: [ true, 'A product have a model' ],
			trim: true,
			unique: true
		},
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
			required: [ true, 'A product must have a category' ]
		},

		taxPercentage: Number,
		remark: String
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

productSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'category',
		select: '-__v'
	});
	next();
});

productSchema.virtual('stock', {
	ref: 'Stock',
	foreignField: 'product',
	localField: '_id'
});
const product = mongoose.model('Product', productSchema);
module.exports = product;
