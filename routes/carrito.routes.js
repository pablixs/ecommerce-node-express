const express = require('express');
const router = express.Router();
const {
    query
} = require('../config/db');

const User_model = require('../models/users/UserManagment_model');
const handleQueryResult = require('../helpers/handleQueryResult')
const cart_helper = require('../helpers/cart_helper')
const passport = require('passport');
router.use(passport.initialize());
require('../middlewares/auth');


let cart = [];

router.get('/item', (req, res) => {
    res.render('./users_view/cart.ejs', {
        title: 'add'
    })
});

router.post('/add', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {

    try {
        const {
            user
        } = req;
        if (user[0].cart_created === 0) {
            const {
                success,
                data,
                error
            } = await User_model.create_cart_by_guid(user[0].guid, user[0].id);

            if (!success) {
                res.send(error);
                return;
            }

            console.log(data)
        }

        //** getting the last state of the cart */

        const {
            success: second_success,
            data: last_cart,
            error: second_error
        } = await User_model.get_cart_by_user_id(user[0].id);


        if (last_cart[0].products !== null) {
            cart = (JSON.parse(last_cart[0].products));
        }
        console.log('Primer estado del carrito :')
        console.log(cart)
        console.log('Primer estado del carrito :')

        //** starting to work with the new objects to add to the cart */

        let product = req.body;
        console.log('aca' + cart.length)
        // console.log(product)

        //* final stage of the cart
        if(!cart_helper.is_product_in_cart(cart, product.product_id)){
            console.log('No estaba en el carrito ese producto')
            cart.push(product)
        } else {
            for(let i = 0; i < cart.length; i++){
                if (cart[i].product_id === product.product_id){
                    console.log('hubo coincidencia')
                    let add_new = {
                        product_id: product.product_id,
                        product_name: product.product_name,
                        product_price: product.product_price * (cart[i].product_quantity + product.product_quantity),
                        product_quantity: product.product_quantity + cart[i].product_quantity
                    }
                    cart.splice(cart.indexOf(i), 1);
                    cart.push(add_new)
                        console.log(cart)
                }
            }
        };

        const amount = cart_helper.calculate_amount(cart)
        
        // cart.push(product)
        console.log(cart)

        cart = JSON.stringify(cart);
        cart = cart.replace(/[\[\]]/g, '')
        console.log('CART REPLACED []')
        cart = '[' + cart + ']'
        console.log(cart)

        const {
            success: third_sccess,
            data: response,
            error: third_error
        } = await User_model.add_to_cart_by_user_id(cart, amount,user[0].id)

        console.log(response)

        res.send({
            user,
            product
        })
    } catch (error) {
        console.log(error)
        res.send({
            error
        })
    }
});

router.post('/remove/:quantity', passport.authenticate('jwt', { session:false })), async (req, res) => {

};

router.get('/', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    const {
        user
    } = req;
    const {
        success,
        data,
        error
    } = await User_model.get_cart_by_user_id(user[0].id);
    let products = JSON.parse(data[0].products)
    res.send({
        data,
        products

    })
})

module.exports = router;