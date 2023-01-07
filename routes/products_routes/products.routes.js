const express = require('express');
const router = express.Router();
const cookie = require('cookie-parser');

const products_controller = require('../../controllers/products_controllers/products_controllers')

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

router.get('/', products_controller.index);

router.get('/:category', products_controller.category);

router.get('/:category/:product', products_controller.category_product);

module.exports = router;