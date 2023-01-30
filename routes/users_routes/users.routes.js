var express = require('express');
var router = express.Router();

//** controllers */
const user_controller = require('../../controllers/users_controllers/users_controllers')
const passport = require('passport');


router.use(passport.initialize());

require('../../middlewares/auth');

router.get('/', passport.authenticate('jwt',{session: false, failureRedirect: '/login'}), user_controller.index);

router.get('/orden/00000:order_id', passport.authenticate('jwt',{session:false, failureRedirect: '/login'}), user_controller.get_order_by_id)

router.post('/orden/continue', passport.authenticate('jwt', { session: false }), user_controller.order_continue)


module.exports = router;