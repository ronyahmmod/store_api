const handleFactory = require('../controllers/handleFactory');
const Stock = require('../models/stockModel');

// CREATE
exports.createStock = handleFactory.createOne(Stock, [ 'inStock', 'lastUpdateTime', 'remark' ]);

// READ
exports.getStock = handleFactory.getOne(Stock);

// UPDATE
exports.updateStock = handleFactory.updateOne(Stock, [ 'inStock', 'lastUpdateTime' ]);
