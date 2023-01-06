const { query } = require('../../config/db')
class Products {
    static async get_categories(){
        const data = await query('SELECT * FROM product_category');
        if (data.length === 0) return {
            success: false,
            error: 'No se encontraron categorias'
        }

        try {
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
};

module.exports = Products;
