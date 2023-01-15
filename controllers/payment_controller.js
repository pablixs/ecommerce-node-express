require('dotenv').config();
const User_model = require('../models/users/UserManagment_model');

const mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN
});

class Payment {
    static async mercadopago(req, res) {
        const {
            user
        } = req;

        const {
            success,
            data: cart,
            error
        } = await User_model.get_cart_by_user_id(user[0].id)

        let cart_json = JSON.parse(cart[0].products);

        // console.log(cart_json)

        let preference = {
            items: [],
            back_urls: {
                success: "http://localhost:3000/pagar/success",
                failure: "http://localhost:3000/pagar/failure",
                pending: "http://localhost:3000/pagar/pending"
            },
            auto_return: "approved",
            notification_url: "https://0f7f-2800-810-481-82b3-99eb-dd55-d783-fe3d.sa.ngrok.io/pagar/notification"
        }
        const {
            title,
            unit_price,
            quantity
        } = req.body;


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
    }


}

module.exports = Payment;