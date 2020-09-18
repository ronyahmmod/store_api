const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.showHomePage = (req, res) => {
	/*
		1. Check an user loged in or not
		2. If user loged in it displays login user information
		3. provide user information
	*/
	res.status(200).render('homepage');
};
