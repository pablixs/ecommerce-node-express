const express = require('express');
const router = express.Router();

const session = require('express-session');
const { query } = require('../config/db')

// const options = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// };

// const sessionConnection = mysql.createConnection(options)

router.get('/item', (req,res) => {
    res.render('./users_view/cart.ejs', {title: 'add'})
})

router.post('/add', (req, res) => {
    const { id, quantity } = req.body;
    const data = {
        id,
        quantity
    }
    req.session.userinfo = data
    res.send({
        "message":"Cart",
    })
});

router.get('/', async function(req,res) {
    res.send({"message":"Cart"})
})

module.exports = router;