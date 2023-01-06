const express = require('express');
const router = express.Router();
const cookie = require('cookie-parser');

const Products = require('../../models/products/Products.js');
const { query } = require('express');

// const passport = require('passport');

// router.use(passport.initialize());

// require('../middlewares/auth');

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

        const conicidences = categories.findIndex(categories => categories.name === query_category );
        console.log(conicidences)
        if(conicidences !== -1){
            res.send({'Esta es la categoria que coincide': categories[conicidences]})

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