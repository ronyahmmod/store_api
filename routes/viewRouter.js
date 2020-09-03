const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

// SHOW ADD PRODUCT FORM
router.route('/viewAddProductForm').get(viewController.viewAddProductForm);
// HANDLE ADD PRODUCT SUBMIT DATA
router.route('/addSubmitedProductData').post(viewController.addSubmittedProductData);

// SHOW ALL PRODUCTS
router.route('/showAllProducts').get(viewController.showAllProducts);

// REMOVE A SINGLE PRODUCTS
router.route('/removeProduct/:id').get(viewController.removeProduct);

// SHOW EDIT PRODUCT FORM
router.route('/showEditProductForm/:id').get(viewController.showEditProductForm);

//SUBMIT EDITTED DATA TO SERVER
router.route('/submitEditProductData/:id').post(viewController.submitEditProductData);

// SHOW SEARCH PRODUCT FORM
router.route('/showSearchProductForm').get(viewController.showSearchProductForm);

// SHOW SEARCH PRODUCT Data
router.route('/showSearchProductData').post(viewController.showSearchProductData);

module.exports = router;
