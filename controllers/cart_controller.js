const User_model = require('../models/users/UserManagment_model');
const Product_model = require('../models/products/Products');
const cart_helper = require('../helpers/cart_helper');
const mail_helper = require('../helpers/mail_helper');

class Cart {

    static async index(req, res) {
        let errorMessage = '';
        errorMessage = req.query?.error;
        let add_status = '';
        add_status = req.query?.success
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
            console.log(add_status)
            return res.render('./cart/cart.ejs',{
                title: "Carrito - Bouvier Artesanal",
                products,
                user,
                carrito,
                errorMessage,
                add_status,
                add_status
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
        //* initalizing the cart
        let cart = [];
        try {
            const { user } = req;
            //* looking if the user has his cart created, if cart_created === false > create : continue */
            if (user[0].cart_created === 0) {
                const { success, data, error } = await User_model.create_cart_by_guid(user[0].guid, user[0].id);

                if (!success) {
                    res.send(error);
                    return;
                }

            }

            //** getting the last state of the cart */

            const {
                success: second_success,
                data: last_cart,
                error: second_error
            } = await User_model.get_cart_by_user_id(user[0].id);

            //** If the last cart is not null we will get all the data of the current cart and store it on the cart variable, if not continue */
            if (second_success){
                if (last_cart[0].products !== null) {
                    cart = (JSON.parse(last_cart[0].products));
                }
    
    
                //** starting to work with the new objects to add to the cart */
    
                const { product_id } = req.body;
                const { product_category_name } = req.body;  
                if(isNaN(product_id)) return res.status(404).send('No estas añadiendo un id válido.');
                
    
                //** getting product id from the body */
    
                //** validating product data from db */
                const { success:third_success, data:product_from_db, error:third_error } = await Product_model.get_product_by_id(product_id);
    
                if(third_success){
                    //** establish the product object with db data */ */
                    let product = {
                        product_id: product_from_db[0].id,
                        product_name: product_from_db[0].name,
                        product_price: product_from_db[0].price,
                        product_quantity: 1
                    };
                    //* validating stock */
                    if (await cart_helper.detect_stock(product) !== true) {
                        let errorMessage = 'El producto que intentas añadir no tiene stock actualmente.'
                        return res.status(400).redirect(`http://localhost:3000/productos/${product_category_name}/${product_from_db[0].name_url}?error=${errorMessage}`)
                        // return res.status(404).send('No hay stock de ese producto')
                    }
                    //* validating if current product exists in the last cart */
                    if (await cart_helper.is_product_in_cart(cart, product.product_id)) {
                        cart_helper.add_if_is_in_cart(cart, product)
                    } else {
                        //* if not, add the entire object */
                        product.product_price = product.product_price * product.product_quantity
                        // let add_new = {
                        //     product_id: product.product_id,
                        //     product_name: product.product_name,
                        //     product_price:product.product_price * product.product_quantity,
                        //     product_quantity: product.product_quantity
                        // }
                        // cart.splice(cart.indexOf(i), 1);
                        cart.push(product)
                        // cart_helper.add_if_is_in_cart(cart, product);
                    };
        
                    const amount = cart_helper.calculate_amount(cart)
        
                    cart = JSON.stringify(cart);
                    cart = cart.replace(/[\[\]]/g, '')
                    cart = '[' + cart + ']'
        
                    const {
                        success: fourth_success,
                        data: response,
                        error: fourth_error
                    } = await User_model.add_to_cart_by_user_id(cart, amount, user[0].id)
        
                    if (fourth_success) {
                        console.log(response)

                        return res.status(200).redirect('http://localhost:3000/carrito?success=true')
                    } else {
                        let errorMessage = 'No se pudo añadir el producto a tu carrito. Intenta reiniciando tu sesión.'
                        return res.status(400).redirect(`http://localhost:3000/productos/${product_category_name}/${product_from_db[0].name_url}?error=${errorMessage}`)
                    }
            } else {
                return res.status(400).send({
                    error: 'No se pudo obtener el carrito de ese usuario',
                    second_error
                })
            }
            } else {
                return res.status(400).send({
                    //** this product doesn't exists in db */
                    message: 'Ese carrito no existe en la base de datos',
                    third_error
                })
            }
        } catch (error) {
            console.log(error)
            res.send({
                error
            })
        }
    }

    static async remove_from_cart(req, res) {
        try {
            let cart = [];

            const { user } = req;
            
            let { product_id } = req.params;
            let { product_quantity } = req.body;

            product_id = parseInt(product_id);
            product_quantity = parseInt(product_quantity);


            const {
                success,
                data: last_cart,
                error
            } = await User_model.get_cart_by_user_id(user[0].id);
            cart = (JSON.parse(last_cart[0].products));
            console.log(cart)

            let index = cart.findIndex(product => product.product_id === product_id);

            console.log(index)

            console.log(cart[index])
            cart[index].product_quantity = product_quantity;

            const amount = cart_helper.calculate_amount(cart)

            cart = JSON.stringify(cart);
            cart = cart.replace(/[\[\]]/g, '')
            cart = '[' + cart + ']'

            const {
                success: success_third,
                data: response,
                error: third_error
            } = await User_model.add_to_cart_by_user_id(cart, amount, user[0].id)


            res.redirect('../../carrito')
        } catch (error) {
            console.log(error)
            res.status(404).send({error})
        }
        // try {
        //     const {
        //         user
        //     } = req;
        //     if (user[0].cart_created === 0) return res.status(401).send('No tienes un carrito')

        //     // let {
        //     //     id: product_id_q,
        //     //     quantity: product_quantity_q
        //     // } = req.params;

        //     // product_id_q = parseFloat(product_id_q);
        //     // product_quantity_q = parseFloat(product_quantity_q)


        //     const { product_id, product_quantity } = req.body;

        //     const {
        //         success,
        //         data: last_cart,
        //         error
        //     } = await User_model.get_cart_by_user_id(user[0].id);

        //     if (isNaN(product_id) || isNaN(product_quantity)) return res.status(404).send('Introduce caracteres validos')

        //     if (success) {
        //         if (last_cart[0].products === null || last_cart[0].products.length <= 0) {
        //             return res.send('No tienes elementos para eliminar del carrito')
        //         }

        //         cart = (JSON.parse(last_cart[0].products));
        //         console.log(cart)

        //         if (!cart_helper.is_product_in_cart(cart, product_id)) return res.status(404).send('No tienes ese producto para quitar del carrito')

        //         const position_match = cart_helper.detect_product_in_the_cart(cart, product_id);

        //         //* TRUE = ADD
        //         //* FALSE = REMOVE
        //         const detect_if_add_or_remove = function(quantity) {
        //             if(quantity >= cart[position_match].product_quantity){
        //                 console.log(cart[position_match].product_quantity)
        //                 return true
        //             } else if (quantity < cart[position_match].product_quantity) {
        //                 console.log(cart[position_match].product_quantity)
        //                 return false
        //             }
        //         }
        //         console.log(detect_if_add_or_remove(product_quantity))
        //         return res.send('hasta aca')

        //         const {
        //             success: success_two,
        //             data: product_by_id,
        //             error: error_two
        //         } = await Product_model.get_product_by_id(product_id)
        //         if (success_two) {
        //             console.log(product_by_id)
        //             if (cart[position_match].product_quantity < product_quantity) return res.send('No puedes eliminar más elementos de los que posees');

        //             if (cart[position_match].product_quantity <= product_quantity) {
        //                 console.log('Hay una sola cantidad y el producto se va a eliminar completamente del carrito')
        //                 cart.splice(position_match, 1);
        //             } else if (cart[position_match].product_quantity === product_quantity) {
        //                 console.log('El producto debe ser eliminado completamente ya que se van a eliminar la totalidad de sus cantidades')
        //                 cart.splice(position_match, 1);
        //             } else {
        //                 cart[position_match].product_quantity -= product_quantity;
        //                 cart[position_match].product_price -= parseFloat(product_by_id[0].price) * product_quantity
        //             }

        //             console.log(cart)

        //             const amount = cart_helper.calculate_amount(cart)

        //             cart = JSON.stringify(cart);
        //             cart = cart.replace(/[\[\]]/g, '')
        //             cart = '[' + cart + ']'

        //             const {
        //                 success: success_third,
        //                 data: response,
        //                 error: third_error
        //             } = await User_model.add_to_cart_by_user_id(cart, amount, user[0].id)

        //             if (success_third) {
        //                 console.log(response)

        //                 res.send({
        //                     user,
        //                     cart: JSON.parse(cart)

        //                 })
        //             } else {
        //                 res.status(404).send('Algo salió mal')
        //             }
        //         } else {
        //             res.status(404).send({
        //                 'Algo salio mal 2': error_two
        //             });
        //         }
        //     } else {
        //         res.status(404).send('Algo salio mal')
        //     }



        // } catch (error) {
        //     res.status(404).send(error)
        // }
    }
    
    static async create_order(req,res) {
        try {
            let errorMessage = '';
            const { user } = req;
            const { success, data:cart, error } = await User_model.get_cart_by_user_id(user[0].id) 
            if(success){
                const cart_stock = await JSON.parse(cart[0].products);
                for (let i = 0; i < cart_stock.length; i++) {
                    console.log(cart_stock[i])
                    if (await cart_helper.detect_stock(cart_stock[i]) !== true) {
                        errorMessage = 'Uno de tus productos no tiene más stock. Revisalos.'
                        return res.redirect(`../carrito?error=${errorMessage}`)
                    }
                }
                

                for (let i = 0; i < cart_stock.length; i++) {
                    if(await cart_helper.remove_stock_quantity(cart_stock[i].product_quantity, cart_stock[i].product_id) !== true){
                        errorMessage = 'No se pudo comprobar el stock del producto. Intenta de nuevo o comunicate con nosotros.'
                        return res.redirect(`../carrito?error=${errorMessage}`)
                    };
                   }

                let order_items = {
                    user_id: user[0].id,
                    // method: req.body.method,
                    products: cart[0].products,
                    total: cart[0].amount,
                }

                let order_keys = Object.keys(order_items);
                let order_values = Object.values(order_items)

                
                const { success:success_two, data:order_created, error:error_two } = await User_model.create_order(order_keys, order_values);
                if(success_two){
                    const { success:success_three, data:cart_updated, error:error_three } = await User_model.emtpy_cart_when_order_by_user_id(user[0].id)
                    if(success_three){
                        const { success: success_mail, data:mail_data, error:error_mail } = await mail_helper.order_created(user[0].email);                  

                        if(success_mail){

                            


                            console.log(
                                order_created,
                                cart_updated,
                                mail_data
                            )   
                            return res.redirect(`../perfil/orden/00000${order_created.insertId}`)
                        } else {
                            errorMessage = 'No se pudo enviar el mail con los detalles de la orden..'
                            return res.redirect(`../carrito?error=${errorMessage}`)
                        }

                    } else {
                        errorMessage = 'No se pudo crear la orden. Intenta de nuevo o revisa el estado de los productos.'
                        return res.redirect(`../carrito?error=${errorMessage}`)
                    }
                } else {
                    errorMessage = 'No se pudo crear la orden. Intenta de nuevo o revisa el estado de los productos.'
                    return res.redirect(`../carrito?error=${errorMessage}`)
                }

            } else {
                return res.status(404).send('No se encontró un carrito con ese id');
            }
        } catch (error) {
            console.log(error)
            errorMessage = 'Ocurrió un error inesperado. Comunicate con un administrador o intentalo de nuevo.'
            return res.redirect(`../carrito?error=${errorMessage}`)
        }
    }
}
module.exports = Cart;