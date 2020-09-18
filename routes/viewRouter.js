const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

// HOMEPAGE
router.route('/').get(viewController.showHomePage);
router.route('/signin').get(viewController.showSigninPage);
router.route('/signup').get(viewController.showSignupPage);

router.route('/secret').get(viewController.showSecret);
module.exports = router;
