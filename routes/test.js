const express = require('express');
const router = express.Router();

const query = require('../models/Test')
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.use(passport.initialize());

require('../middlewares/auth');

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
    const passwordHash = hashSync(password, 10)

    const new_user = {
        email,
        password: passwordHash
    }

    const { success, data, error } = await query.new_user(new_user.email, new_user.password);
 
    if (success) {
        res.send(data)
    } else {
        res.send(error)
    }
})

router.post('/login', async (req,res) => {
    const { email:BodyEmail, password:bodyPassowrd } = req.body;

    const { success, data:user, error } = await query.search_user(BodyEmail);
    console.log(user)

    if(success){
        if(!compareSync(bodyPassowrd, user[0].password)){
            return res.status(401).send({
                message: 'Incorrect password'
            });
        }

        const payload = {
            email: user[0].email,
            id: user[0].id
        };
        console.log(user[0].email);
        console.log(user[0].id)

        console.log(`This is the payload: ${payload}`)

        const token = jwt.sign(payload, "Mega secret", { expiresIn: "1d"})

        return res.status(200).send({
            success: true,
            message: 'Logged in successfully',
            token: `Bearer ${token}`
        })

    } else {
        console.log(error)
        res.sendStatus(404)
    }
});

router.get('/profile', passport.authenticate('jwt', {session : false}),async(req,res) =>{

})

module.exports = router;