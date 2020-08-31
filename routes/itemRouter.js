const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.route('/').get(itemController.getAllItem).post(itemController.createItem);

router
	.route('/:itemCode')
	.get(itemController.getItem)
	.patch(itemController.updateItem)
	.delete(itemController.deleteItem);

module.exports = router;
