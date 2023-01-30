const User_model = require('../../models/users/UserManagment_model')

class User {
    static async index(req, res){
        try {
            const { user } = req; 
            const {
                success,
                data:orders,
                error
            } = await User_model.get_orders_by_user_id(user[0].id)
            if (success) {
                console.log(orders)
                console.log(user)
                res.render('./user/profile.ejs',{
                    title: 'Mi perfil - Bouvier Artesanal',
                    orders,
                    user
                })
            } else {
                console.log('naoo')
                let orders = false;
                res.render('./user/profile.ejs',{
                    title: 'Mi perfil - Bouvier Artesanal',
                    orders,
                    user
                })
            }
        } catch (error) {
            console.log(error)
            res.status(404).send('Hubo un error inesperado.')
        }
    }

    static async get_order_by_id(req,res){
        try {
            const { user } = req;
            const { order_id } = req.params;
        
            const { success, data:order,  error } = await User_model.get_orders_by_id(order_id);
            let products = JSON.parse(order[0].products)
            console.log(order)

            if(success){
                if(order[0].user_id === user[0].id){
                    console.log(order)
                    console.log(products)
                    return res.render('./user/order.ejs',{
                        title: `Pedido - Bouvier Artesanal`,
                        order,
                        products
                    })
                } else {
                    return res.status(401).send('Esa orden no es tuya wachin no flashes')
                }
            } else {
                return res.status(404).send({error})
            }
            
            
        } catch (error) {
            res.status(400).send(error)
        }
    }
    
    static async order_continue(req,res){
        try {
            const { user } = req;
            const { payment_method, province, localidad, address_line1, address_line2, postal_code, envio_type, order_id } = req.body;

            const { success, data:order_updated, error } = await User_model.set_step_two_order_bv_user_id(payment_method, province, localidad, address_line1, address_line2, postal_code, envio_type, user[0].id,order_id)
            if(success){
                return res.status(200).send({
                    order_updated,
                    message: "Todo okei, ya tenes al step 2 la orden chavalin"
                })
            } else {
                return res.status(404).send({error})
            }

            res.send({payment_method, province, localidad, address_line1, address_line2, postal_code, envio_type})
        } catch (error) {
            console.log(error)
            res.status(404).send({
                error: error
            })
        }
    }
};

module.exports = User;