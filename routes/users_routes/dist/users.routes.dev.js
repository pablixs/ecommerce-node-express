"use strict";

var express = require('express');

var router = express.Router(); //** controllers */

var user_controller = require('../../controllers/users_controllers/users_controllers');

var passport = require('passport');

router.use(passport.initialize());

require('../../middlewares/auth');

router.get('/', passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/login'
}), user_controller.index);
router.get('/orden/00000:order_id', passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/login'
}), user_controller.get_order_by_id);
module.exports = router;