var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('./users_view/profile',{
    title: 'Perfil'
  })
});

module.exports = router;
