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
            console.log(order)

            if(success){
                if(order[0].user_id === user[0].id){
                    console.log(order)
                    console.log(req.params)
                    return res.send(order)
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
};

module.exports = User;