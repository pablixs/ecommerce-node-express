const User_model = require('../models/users/UserManagment_model');
const Product_model = require('../models/products/Products')
const cart_helper = require('../helpers/cart_helper')


class Cart {

    static async index(req, res) {
        const {
            user
        } = req;
        const {
            success,
            data:carrito,
            error
        } = await User_model.get_cart_by_user_id(user[0].id);
        if (success) {
            let products = JSON.parse(carrito[0].products)
            console.log(carrito)
            return res.render('./cart/cart.ejs',{
                title: "Carrito - Bouvier Artesanal",
                products,
                user,
                carrito

            })
        } else {
            let products = false;
            return res.render('./cart/cart.ejs',{
                products,
                title: "Carrito - Bouvier Artesanal",
                user
            })
        }
    }

    static async add_to_cart(req, res) {
        let cart = [];
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

            //** starting to work with the new objects to add to the cart */

            let product = req.body;

            if (await cart_helper.detect_stock(product) !== true) {
                return res.status(404).send('No hay stock de ese producto')
            }

            if (await !cart_helper.is_product_in_cart(cart, product.product_id)) {
                product.product_price *= product.product_quantity;
                cart.push(product)
            } else {
                cart_helper.add_if_is_in_cart(cart, product);
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
                success: third_success,
                data: response,
                error: third_error
            } = await User_model.add_to_cart_by_user_id(cart, amount, user[0].id)

            if (third_success) {
                console.log(response)

                return res.send({
                    user,
                    product
                })
            } else {
                res.status(404).send('Algo salió mal')
            }
        } catch (error) {
            console.log(error)
            res.send({
                error
            })
        }
    }

    static async remove_from_cart(req, res) {
        let cart = [];
        try {
            const {
                user
            } = req;
            if (user[0].cart_created === 0) return res.status(401).send('No tienes un carrito')

            let {
                id: product_id_q,
                quantity: product_quantity_q
            } = req.params;

            product_id_q = parseFloat(product_id_q);
            product_quantity_q = parseFloat(product_quantity_q)

            const {
                success,
                data: last_cart,
                error
            } = await User_model.get_cart_by_user_id(user[0].id);

            if (isNaN(product_id_q) || isNaN(product_quantity_q)) return res.status(404).send('Introduce caracteres validos')

            if (success) {
                if (last_cart[0].products === null || last_cart[0].products.length <= 0) {
                    return res.send('No tienes elementos para eliminar del carrito')
                }

                cart = (JSON.parse(last_cart[0].products));
                console.log(cart)

                if (!cart_helper.is_product_in_cart(cart, product_id_q)) return res.status(404).send('No tienes ese producto para quitar del carrito')

                const position_match = cart_helper.detect_product_in_the_cart(cart, product_id_q);

                const {
                    success: success_two,
                    data: product_by_id,
                    error: error_two
                } = await Product_model.get_product_by_id(product_id_q)
                if (success_two) {
                    console.log(product_by_id)
                    if (cart[position_match].product_quantity < product_quantity_q) return res.send('No puedes eliminar más elementos de los que posees');

                    if (cart[position_match].product_quantity <= product_quantity_q) {
                        console.log('Hay una sola cantidad y el producto se va a eliminar completamente del carrito')
                        cart.splice(position_match, 1);
                    } else if (cart[position_match].product_quantity === product_quantity_q) {
                        console.log('El producto debe ser eliminado completamente ya que se van a eliminar la totalidad de sus cantidades')
                        cart.splice(position_match, 1);
                    } else {
                        cart[position_match].product_quantity -= product_quantity_q;
                        cart[position_match].product_price -= parseFloat(product_by_id[0].price) * product_quantity_q
                    }

                    console.log(cart)

                    const amount = cart_helper.calculate_amount(cart)

                    cart = JSON.stringify(cart);
                    cart = cart.replace(/[\[\]]/g, '')
                    cart = '[' + cart + ']'

                    const {
                        success: success_third,
                        data: response,
                        error: third_error
                    } = await User_model.add_to_cart_by_user_id(cart, amount, user[0].id)

                    if (success_third) {
                        console.log(response)

                        res.send({
                            user,
                            cart: JSON.parse(cart)

                        })
                    } else {
                        res.status(404).send('Algo salió mal')
                    }
                } else {
                    res.status(404).send({
                        'Algo salio mal 2': error_two
                    });
                }
            } else {
                res.status(404).send('Algo salio mal')
            }



        } catch (error) {
            res.status(404).send(error)
        }
    }
}
module.exports = Cart;