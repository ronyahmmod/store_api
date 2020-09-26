const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'A user must have a name' ],
		trim: true
	},
	fatherName: String,
	motherName: String,
	email: {
		type: String,
		required: [ true, 'A user must have email address' ],
		unique: true,
		trim: true,
		lowercase: true,
		validate: [ validator.isEmail, 'Please provide a valid email' ]
	},
	photo: {
		type: String,
		// required: [true, 'A user must have a photo'],
		trim: true
	},
	role: {
		type: String,
		enum: [ 'employe', 'admin' ],
		default: 'employe'
	},
	password: {
		type: String,
		required: [ true, 'A user must have a password' ],
		trim: true,
		maxlength: [ 40, 'User password should be less than 40 charachers' ],
		minlength: [ 8, 'User password should be gretter than 10 charachters' ],
		select: false
	},
	passwordConfirm: {
		type: String,
		required: [ true, 'Confirm password must be same on password' ],
		trim: true,
		maxlength: [ 40, 'Confirm password should be less than 40 charachers' ],
		minlength: [ 8, 'Confirm password should be gretter than 10 charachters' ],
		validate: {
			// custom validators only works when document save
			validator: function(val) {
				return val === this.password;
			},
			message: 'Confirm password must be same on password'
		}
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
	active: {
		type: Boolean,
		default: true,
		select: false
	},
	nid: String,
	soldProduct: Number,
	joinDate: {
		type: Date
	},
	mobile: {
		type: String,
		required: [ true, 'A user have mobile number' ],
		trim: true
	},
	remark: String
});

userSchema.pre('save', async function(next) {
	// Only run this function if password is modified
	if (!this.isModified('password')) return next();
	// Hasing password
	this.password = await bcrypt.hash(this.password, 12);
	// delete confirm password
	this.passwordConfirm = undefined;
	next();
});

userSchema.pre('save', async function(next) {
	if (!this.isModified('password') || !this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
});

userSchema.pre(/^find/, function(next) {
	this.find({ active: { $ne: false } });
	next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
		return JWTTimestamp < changedTimestamp;
	}
	return false;
};

userSchema.methods.createPasswordResetToken = function() {
	const resetToken = crypto.randomBytes(32).toString('hex');
	console.log(resetToken);
	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
	return resetToken;
};

module.exports = mongoose.model('User', userSchema);
