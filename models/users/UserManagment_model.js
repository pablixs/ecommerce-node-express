const { query } = require('../../config/db')

class UserManagment {
    static async users_list(){
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

    static async new_user(keys, values){
        try {
            const data = await query(`INSERT INTO users (${keys.join(', ')}) VALUES (?)`,[values])
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

    static async search_user(email){
        try {
            const data = await query('SELECT * FROM users WHERE email = ?',[email]);
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
}

module.exports = UserManagment