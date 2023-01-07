const express = require('express');
const router = express.Router();
const { query } = require('../config/db')

router.get('/item', (req,res) => {
    res.render('./users_view/cart.ejs', {title: 'add'})
});

router.post('/add', (req, res) => {
    res.send({
        "message":"Cart",
    })
});

// router.get('/', async function(req,res) {
//     res.send({"message":"Cart"})
// });

router.get('/', async function(req,res) {
    res.send({hola:'hola'})
});

module.exports = router;