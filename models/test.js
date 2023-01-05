const { query } = require('../config/db')

class Test {
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

    static async new_user(email,password){
        try {
            const data = await query('INSERT INTO users(`name`,`password`,`email`) VALUES (?,?,?)',['Pruebinha',password, email])
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

module.exports = Test