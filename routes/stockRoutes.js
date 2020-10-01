const { resetPassword } = require('../controllers/authController');

const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router({ mergeParams: true });

router.route('/').post(stockController.createStock);
router.route('/:id').get(stockController.getStock).patch(stockController.updateStock);

module.exports = router;
