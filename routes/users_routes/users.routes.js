var express = require('express');
var router = express.Router();

//** controllers */
const user_controller = require('../../controllers/users_controllers/users_controllers')
const passport = require('passport');


router.use(passport.initialize());

require('../../middlewares/auth');

router.get('/', passport.authenticate('jwt', { session: false }), user_controller.index)


module.exports = router;