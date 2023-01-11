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
}

module.exports = UserManagment