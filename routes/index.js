var express = require('express');
var router = express.Router();

//* controllers
const main_controller = require('../controllers/root_controllers/root_controllers')

/* GET home page. */
router.get('/', main_controller.index);

module.exports = router;
