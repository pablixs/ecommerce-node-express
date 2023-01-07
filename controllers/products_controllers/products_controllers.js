const {
    query
} = require('../../config/db');
const Products_model = require('../../models/products/Products.js');
const handleQueryResult = require('../../helpers/handleQueryResult');

class Products {

    static async index(req, res) {
        const {
            success,
            data,
            error
        } = await Products_model.get_categories()
        if (success) {
            res.send(data)
        } else {
            res.send(error)
        }
    }

    static async category(req, res) {
        const {
            success,
            data: categories,
            error
        } = await Products_model.get_categories()

        const query_category = req.params.category;

        const categorias = handleQueryResult(success, categories, error);

        console.log(categorias);


        const coincidences = categorias.findIndex(categorias => categorias.name === query_category);
        if (coincidences !== -1) {
            const {
                success: newSuccess,
                data: products,
                error: newError
            } = await Products_model.get_product_by_category(categories[coincidences].id)

            const products_handled = handleQueryResult(newSuccess, products, newError);
            res.send({
                'Esta es la categoria que coincide': categories[coincidences],
                'Estos son los productos que coinciden con la categoria': products_handled
            })

        } else {
            res.send({
                "message": "No hubo categorias con ese nombre"
            })
        }
    }

    static async category_product(req, res) {
        try {
            const {
                success,
                data: categories,
                error
            } = await Products_model.get_categories()

            const categories_handled = handleQueryResult(success, categories, error);

            const {
                category: query_category,
                product: query_product
            } = req.params;


            const coincidences = categories_handled.findIndex(categories_handled => categories_handled.name === query_category);

            if (coincidences !== -1) {
                const {
                    success: newSuccess,
                    data: product,
                    error: newError
                } = await Products_model.get_product_by_category(categories[coincidences].id)

                const product_handled = handleQueryResult(newSuccess, product, newError);

                const final_product = product_handled.findIndex(product_handled => product_handled.name_url === query_product);

                if(final_product !== -1) { 
                    res.status(200).send({
                    'Esta es la categoria que coincide': categories[coincidences],
                    'Estos son los productos que coinciden con la url': product_handled[final_product]
                })} else {

                    res.status(404).send('No se encontró un producto con ese url')
                }
                
            } else {
                res.send({
                    "message": "No hubo categorias con ese nombre"
                })
            }

        } catch (error) {
            res.status(404).send(error)
        }
    }

};

module.exports = Products;