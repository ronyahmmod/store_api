const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'A user must have a name' ],
		trim: true
	},
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
	}
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

module.exports = mongoose.model('User', userSchema);
