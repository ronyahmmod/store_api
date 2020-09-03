const express = require('express');
const configController = require('../controllers/configController');

const router = express.Router();

router.route('/').get(configController.getConfig);

module.exports = router;
