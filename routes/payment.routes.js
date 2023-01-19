const express = require('express');
const router = express.Router();


const payment_controller = require('../controllers/payment_controller');
const passport = require('passport');
const { payment } = require('mercadopago');
router.use(passport.initialize());
require('../middlewares/auth');






// router.get('/', passport.authenticate('jwt', {

//     session: false
// }), (req, res) => {


//     res.render('./users_view/payment', {
//         title: 'Pagar'
//     })
// })

router.post('/mercadopago', passport.authenticate('jwt', {session: false}), payment_controller.mercadopago);

// router.post('/mercadopago/try', async (req,res) => {
//     let preference = {
//         items: [],
//         back_urls: {
//             success: "http://localhost:3000/pagar/success",
//             failure: "http://localhost:3000/pagar/failure",
//             pending: "http://localhost:3000/pagar/pending"
//         },
//         auto_return: "approved",
//     }

//     const {
//         title,
//         unit_price,
//         quantity
//     } = req.body;
//     console.log(title, unit_price, quantity)
//     preference.items.push({
//         title,
//         unit_price: parseFloat(unit_price),
//         quantity: parseFloat(quantity)
//     });


//         const response = await mercadopago.preferences.create(preference);
//         const preferenceId = response.body.id;
//         console.log(preferenceId)
//         res.send(response)

// })

router.post('/notification/:guid',payment_controller.notification )

router.get('/success', (req, res) => {
    res.render('./users_view/after.ejs', {
        message: "Salio piola",
        title: "Hola"
    })
})
router.get('/failure', (req, res) => {
    res.render('./users_view/after.ejs', {
        message: "Salio re mal",
        title: "Hola"
    })
})
router.get('/pending', (req, res) => {
    res.render('./users_view/after.ejs', {
        message: "Ta pendiente loco",
        title: "Hola"
    })
})



module.exports = router;