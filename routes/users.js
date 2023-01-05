var express = require('express');
var router = express.Router();

//** controllers */
const main_controller = require('../controllers/users_controllers/main_controller')

/* GET users listing. */
router.get('/', main_controller.profile);

module.exports = router;
