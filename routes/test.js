const express = require('express');
const router = express.Router();

const query = require('../models/test')

const bcrypt = require('bcrypt')

router.get('/', async (req ,res) => {
    const { success, data, error } = await query.users_list()
    if(success){
        res.send(data)
    } else {
        res.send(error)
    }
})

router.post('/newuser', async(req,res) => {
    const { email, password } = req.body;

    console.log(email, password);
    const hash = await bcrypt.hash(password, 10);
    
    const { success, data, error } = await query.new_user(email, hash);
 
    if (success) {
        res.send(data)
    } else {
        res.send(error)
    }
})

module.exports = router;