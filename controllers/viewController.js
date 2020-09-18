const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

// Show homepage
exports.showHomePage = (req, res) => {
	/*
		1. Check an user loged in or not
		2. If user loged in it displays login user information
		3. provide user information
	*/
	res.status(200).render('homepage');
};

// show signin page
exports.showSigninPage = (req, res) => {
	res.status(200).render('signin');
};

// show signup page
exports.showSignupPage = (req, res) => {
	res.status(200).render('signup');
};

// Show secret page
exports.showSecret = (req, res) => {
	res.status(200).render('secret');
};
