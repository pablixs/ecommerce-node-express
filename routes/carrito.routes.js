const express = require('express');
const router = express.Router();

//* Controllers */

const cart_controllers = require('../controllers/cart_controller');

const passport = require('passport');
router.use(passport.initialize());
require('../middlewares/auth');


router.get('/', passport.authenticate('jwt',{session: false, failureRedirect: '/login'}), cart_controllers.index)

router.post('/add', passport.authenticate('jwt',{session: false, failureRedirect: '/login'}), cart_controllers.add_to_cart);

router.post('/update/:product_id', passport.authenticate('jwt',{session: false, failureRedirect: '/login'}), cart_controllers.remove_from_cart);

router.post('/crear-orden', passport.authenticate('jwt',{session: false, failureRedirect: '/login'}), cart_controllers.create_order);
// router.get('/item', (req, res) => {
//     res.render('./users_view/cart.ejs', {
//         title: 'add'
//     })
// });


module.exports = router;