const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

// HOMEPAGE
router.route('/').get(viewController.viewHomePage);

module.exports = router;
