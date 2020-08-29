const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [ true, 'A user must have email address' ],
		unique: true,
		trim: true
	},
	photo: {
		type: String,
		// required: [true, 'A user must have a photo'],
		trim: true
	},
	role: {
		type: String,
		enum: [ 'user', 'guied', 'lead-guied', 'admin' ],
		default: 'user'
	},
	password: {
		type: String,
		required: [ true, 'A user must have a password' ],
		trim: true,
		maxlength: [ 40, 'User password should be less than 40 charachers' ],
		minlength: [ 10, 'User password should be gretter than 10 charachters' ],
		select: false
	},
	passwordConfirm: {
		type: String,
		required: [ true, 'Confirm password must be same on password' ],
		trim: true,
		maxlength: [ 40, 'Confirm password should be less than 40 charachers' ],
		minlength: [ 10, 'Confirm password should be gretter than 10 charachters' ],
		validate: {
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

module.exports = mongoose.model('User', userSchema);
