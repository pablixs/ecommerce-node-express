const { query } = require('../../config/db');
const Products_model = require('../../models/products/Products.js');

class Products {

    static async index(req ,res) {
        const { success, data, error } = await Products_model.get_categories()
        if(success){
            res.send(data)
        } else {
            res.send(error)
        }
    }

    static async category(req,res)  {
        const { success, data:categories, error } = await Products_model.get_categories()
        console.log(req.params)
        console.log('******************')
        console.log(categories)
    
        const query_category = req.params.category;
        // console.log(query_category)
    
        console.log(query_category)
    
        if(success){
    
            const coincidences = categories.findIndex(categories => categories.name === query_category );
            console.log(coincidences)
            if(coincidences !== -1){
                const { success:newSuccess, data:products, error:newError } = await Products_model.get_product_by_category(categories[coincidences].id)
                res.send({
                    'Esta es la categoria que coincide': categories[coincidences],
                    'Estos son los productos que coinciden con la categoria': products
                })
    
            } else {
                res.send({"message": "No hubo categorias con ese nombre"})
            }
    
    
        } else {
            res.status(404).send(error);
        }
    }

    static async category_product(req,res) {
        const { success, data:categories, error } = await Products_model.get_categories()
        console.log(req.params)
        console.log('******************')
        console.log(categories)
    
        const { category:query_category, product:query_product } = req.params;
        // console.log(query_category)
    
        console.log(query_category)
    
        if(success){
            const coincidences = categories.findIndex(categories => categories.name === query_category );
            console.log(coincidences)
            if(coincidences !== -1){
                const { success:newSuccess, data:product, error:newError } = await Products_model.get_product_by_category(categories[coincidences].id)
                console.log(product)
                const final_product = product.findIndex(product => product.name_url === query_product);             
                res.send({
                    'Esta es la categoria que coincide': categories[coincidences],
                    'Estos son los productos que coinciden con la url': product[final_product]
                })
    
            } else {
                res.send({"message": "No hubo categorias con ese nombre"})
            }
    
    
        } else {
            res.status(404).send(error);
        }
    }

};

module.exports = Products;