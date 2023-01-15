const express = require('express');
const router = express.Router();
require('dotenv').config();

const User_model = require('../models/users/UserManagment_model')
const passport = require('passport');
router.use(passport.initialize());
require('../middlewares/auth');

const mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN
});




// const response = await mercadopago.preferences.create(preference);

router.get('/', passport.authenticate('jwt', {

    session: false
}), (req, res) => {


    res.render('./users_view/payment', {
        title: 'Pagar'
    })
})

router.post('/mercadopago', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {

    const { user } = req;

    const { success, data: cart, error } = await User_model.get_cart_by_user_id(user[0].id)

    cart_json = JSON.parse(cart[0].products);

    // console.log(cart_json)

    let preference = {
        items: [],
        back_urls: {
            success: "http://localhost:3000/pagar/success",
            failure: "http://localhost:3000/pagar/failure",
            pending: "http://localhost:3000/pagar/pending"
        },
        auto_return: "approved",
    }
    const { title, unit_price, quantity } = req.body;


    for (let i = 0; i < cart_json.length; i++) {
        console.log(cart_json[i])
        preference.items.push({
            title: cart_json[i].product_name,
            unit_price: cart_json[i].product_price,
            quantity: cart_json[i].product_quantity
        })
    }

    console.log(preference)

    try {
        const response = await mercadopago.preferences.create(preference);
        const preferenceId = response.body.id;
        console.log(preferenceId)
        res.send(response);
        // res.render('./users_view/pagar.ejs', {
        //     preferenceId,
        //     title: "Pagar con mp"
        // })
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

router.post('/mercadopago/try', async (req,res) => {
    let preference = {
        items: [],
        back_urls: {
            success: "http://localhost:3000/pagar/success",
            failure: "http://localhost:3000/pagar/failure",
            pending: "http://localhost:3000/pagar/pending"
        },
        auto_return: "approved",
    }

    const {
        title,
        unit_price,
        quantity
    } = req.body;
    console.log(title, unit_price, quantity)
    preference.items.push({
        title,
        unit_price: parseFloat(unit_price),
        quantity: parseFloat(quantity)
    });


        const response = await mercadopago.preferences.create(preference);
        const preferenceId = response.body.id;
        console.log(preferenceId)
        res.send(response)

})

router.get('/success', (req, res) => {
    res.render('./users_view/after.ejs', {
        message: "Salio piola"
    })
})
router.get('/failure', (req, res) => {
    res.render('./users_view/after.ejs', {
        message: "Salio re mal"
    })
})
router.get('/pending', (req, res) => {
    res.render('./users_view/after.ejs', {
        message: "Ta pendiente loco"
    })
})



module.exports = router;