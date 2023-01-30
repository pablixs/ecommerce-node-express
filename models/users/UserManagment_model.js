const {
    query
} = require('../../config/db')

class UserManagment {
    static async users_list() {
        try {
            const data = await query('SELECT * FROM users');
            return {
                success: true,
                data
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    static async new_user(keys, values) {
        try {
            const data = await query(`INSERT INTO users (${keys.join(', ')}) VALUES (?)`, [values])
            return {
                success: true,
                data
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    static async search_user(email) {
        try {
            const data = await query('SELECT * FROM users WHERE email = ?', [email]);
            if (data.length === 0) return {
                success: false,
                error: 'No se encontró un usuario con ese email'
            }
            return {
                success: true,
                data
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    static async search_user_by_guid(guid) {
        try {
            const data = await query('SELECT * FROM users WHERE guid = ? LIMIT 1', [guid]);
            if (data.length === 0) return {
                success: false,
                error: 'No se encontró un usuario con ese email'
            }
            return {
                success: true,
                data
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    static async search_user_by_id(id) {
        try {
            const data = await query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
            if (data.length === 0) return {
                success: false,
                error: 'No se encontró un usuario con ese email'
            }
            return {
                success: true,
                data
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    static async create_cart_by_guid(guid, id) {
        try {
            const data = await query('UPDATE users SET cart_created = 1 WHERE guid = (?);', [guid]);
            console.log(data.affectedRows)
            if (data.affectedRows !== 0) {
                const cart_created = await query('INSERT INTO user_cart(user_id, products, amount) VALUES(?,?,?)', [id, null, null])
                if (data.length === 0 && cart_created.length === 0) return {
                    success: false,
                    error: 'No se encontró un usuario con ese guid'
                }
                return {
                    success: true,
                    data: {
                        data,
                        cart_created
                    }
                }
            }
            return {
                success:false,
                error: 'No se encontró un usuario con ese guid'
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    static async add_to_cart_by_user_id(products, amount,user_id){
        try {
            const data = await query(`UPDATE user_cart SET products = (?), amount = ? WHERE user_id = ? `,[products,amount,user_id]);
            if (data.affectedRows === 0) return {
                success: false,
                error: 'No se encontró un carrito con ese user_id'
            }
            return {
                success: true,
                data
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    static async get_cart_by_user_id(user_id){
        try {
            const data = await query('SELECT * FROM user_cart WHERE user_id = ?', [user_id]);
            if (data.length === 0) return {
                success: false,
                error: 'No se encontró un carrito con ese id'
            }
            return {
                success: true,
                data
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    static async create_order(keys, values){
        try {
            const data = await query(`INSERT INTO orders(${keys.join(', ')}) VALUES(?)`,[values])
            if(data.length === 0){
                return {
                    success: false,
                    error: 'No se pudo crear la orden. Intenta nuevamente'
                }
            }
            return {
                success: true,
                data,
                error: false
            }

        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    static async emtpy_cart_when_order_by_user_id(user_id){
        try {
            let empty = null;
            const data = await query('UPDATE user_cart SET products = ?, amount = 0 WHERE user_id = ?',[empty,user_id])
            if(data.lenght === 0){
                return {
                    success: false,
                    error: 'No se pudo actualizar el estado final del carrito'
                }
            }
            return {
                success: true,
                data,
                error: false,
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    static async get_orders_by_user_id(user_id){
        try {
            const data = await query('SELECT * FROM orders WHERE user_id = ?',[user_id]);
            if(data.length === 0){
                return {
                    success: false,
                    error: 'No se encontraron ordenes para ese usuario'
                }
            }
            return {
                success: true,
                data,
                error:false
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    static async get_orders_by_id(id){
        try {
            const data = await query('SELECT * FROM orders WHERE id = ?',[id]);
            if(data.length === 0 || data === undefined){
                return {
                    success: false,
                    error: 'No se encontro esa orden'
                }
            }
            return {
                success: true,
                data,
                error:false
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    static async set_step_two_order_bv_user_id(payment_method, province, localidad, address_line1, address_line2, postal_code, envio_type, user_id, order_id){
        try {
            const data = await query('UPDATE orders SET payment_method = ?, province = ?, localidad = ?, address_line1 = ?, address_line2 = ?, postal_code = ?, envio_type = ?, current_step = 2 WHERE user_id = ? AND id = ?',[payment_method, province, localidad, address_line1, address_line2, postal_code, envio_type,user_id, order_id])
            if (data.length === 0 || data.affectedRows === 0 ) {
                return {
                    success: false,
                    error: 'No se pudo actualizar la orden.'
                }
            }
            return {
                success: true,
                data
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

}

module.exports = UserManagment