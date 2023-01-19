const express = require('express');
const router = express.Router();
const cookie = require('cookie-parser');

const products_controller = require('../../controllers/products_controllers/products_controllers')

// const passport = require('passport');

// router.use(passport.initialize());

// require('../middlewares/auth');


//* crud */

router.post('/newproduct', products_controller.add_product)

//*  */

router.get('/', products_controller.index);

router.get('/:category', products_controller.category);

router.get('/:category/:product', products_controller.category_product);

module.exports = router;