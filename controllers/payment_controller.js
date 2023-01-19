require('dotenv').config();
const User_model = require('../models/users/UserManagment_model');
const cart_helper = require('../helpers/cart_helper');

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
            notification_url: `https://6418-2800-810-481-82b3-2c8c-d051-7e9d-2ad4.sa.ngrok.io/pagar/notification/${user[0].guid}`,
            payer: {
                web_guid: user[0].guid,
                first_name: user[0].first_name,
                last_name: user[0].last_name
            }
        }

        for (let i = 0; i < cart_json.length; i++) {
            console.log(await cart_helper.detect_stock(cart_json[i]))
            if (await cart_helper.detect_stock(cart_json[i])) {
                console.log(cart_json[i])
                preference.items.push({
                    title: cart_json[i].product_name,
                    unit_price: cart_json[i].product_price,
                    quantity: 1
                })
            } else {
                return res.status(404).send('Un producto que querias pagar no tiene más stock.')
            }

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

    static async notification(req, res) {
        const { query } = req;
        const { guid } = req.params;
        const topic = query.topic || query.type;
        switch (topic) {
            case "payment":
                const paymentId = query.id || query['data.id'];
                console.log(topic, 'getting payment', paymentId);
                const payment = await mercadopago.payment.findById(paymentId);
                var { body } = await mercadopago.merchant_orders.findById(payment.body.order.id);
                break;
            case "merchant_order":
                const orderId = query.id;
                console.log(topic, 'getting merchant order', orderId)
                var { body } = await mercadopago.merchant_orders.findById(orderId)
        }
        console.log(body.payments);

        let paidAmount = 0;
        body.payments.forEach(payment => {
            if(payment.status === 'approved') {
                paidAmount += payment.transaction_amount
            }
        });

        if(paidAmount >= body.total_amount){
            console.log('El pago se completó')
        } else {
            console.log('El pago está en proceso o no se completó')
        }

        // console.log(guid)
        // console.log(topic)
        res.status(200).end();
    }
}

module.exports = Payment;