const express = require('express');
const router = express.Router();
const cookie = require('cookie-parser');

const Products = require('../../models/products/Products.js');

// const passport = require('passport');

// router.use(passport.initialize());

// require('../middlewares/auth');


//* crud */

router.post('/newproduct', async(req,res) => {
    const { name, short_description, category_id, stock, price } = req.body;

    const { success, data, error } = await Products.new_product(name, short_description, category_id, stock, price);

    if(success){
        res.send(data)
    } else {
        res.sendStatus(404).send({
            "message": "No se pudo añadir el nuevo producto",
            error
        })
    }
})

//*  */

router.get('/', async (req ,res) => {
    const { success, data, error } = await Products.get_categories()
    if(success){
        res.send(data)
    } else {
        res.send(error)
    }
});

router.get('/:category', async (req,res) => {
    const { success, data:categories, error } = await Products.get_categories()
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
            const { success:newSuccess, data:products, error:newError } = await Products.get_product_by_category(categories[coincidences].id)
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
})

router.get('/:category/:product', async(req,res) => {
    const { success, data:categories, error } = await Products.get_categories()
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
            const { success:newSuccess, data:product, error:newError } = await Products.get_product_by_category(categories[coincidences].id)
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
})


// router.get('/profile', passport.authenticate('jwt', {session : false}),async(req,res) =>{
//     console.log(req.user)
//     res.send({"message":"Done"})
// })

module.exports = router;