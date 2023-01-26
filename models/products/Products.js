const {
    query
} = require('../../config/db')
class Products {
    static async get_categories() {
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

    static async get_product_by_category(id) {
        const data = await query('SELECT * FROM products WHERE category_id = ?', [id]);
        try {
            if (data.length === 0) return {
                success: false,
                error: 'No se encontraron categorias'
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

    static async new_product(name, short_description, category_id, stock, price) {
        const convert = () => {
            return name.toLowerCase().replace(/[á]/g, 'a').replace(/[é]/g, 'e').replace(/[í]/g, 'i').replace(/[ó]/g, 'o').replace(/[ú]/g, 'u').replace(/[\s]/g, '-').replace(/[^\w ]+/g, '-');
        }
        console.log(convert())
        const data = await query('INSERT INTO products(name,name_url,short_description,category_id,stock,price) VALUES (?,?,?,?,?,?)', [name, convert(), short_description, category_id, stock, price])
        try {
            if (data.length === 0) return {
                success: false,
                error: 'No se encontraron categorias'
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

    static async get_product_by_id(id) {
        const data = await query('SELECT * FROM products WHERE id = ?', [id]);
        try {
            if (data.length === 0) return {
                success: false,
                error: 'No se encontro producto con ese id'
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

    static async get_randoms_products(quantity) {
        try {
            const data = await query('SELECT * FROM products ORDER BY RAND() LIMIT ?', [quantity]);
            if (data.length === 0) {
                return {
                    success: false,
                    error: 'No se pudieron encontrar los productos.'
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

    static async change_stock_products(product_quantity, product_id) {
        try {
            const data = await query('UPDATE products SET stock = stock - ? WHERE id = ?', [product_quantity, product_id])
            if (data.length === 0 || data.affectedRows === 0 ) {
                return {
                    success: false,
                    error: 'No se pudo restar el stock de ese producto.'
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
};

module.exports = Products;