var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser');

//** controllers */
const main_controller = require('../controllers/users_controllers/main_controller')

const query = require('../models/users/UserManagment_model')
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');

router.use(cookieParser())
router.use(passport.initialize());


require('../middlewares/auth');

router.get('/', async (req ,res) => {
    res.send({"message":"Welcome to Bouvier Artesanal"})
})

//* register
// router.post('/newuser', async(req,res) => {
//     const { email, password, phone, first_name, last_name } = req.body;

//     const guid = uuidv4();

//     console.log(email, password);

//     const passwordHash = hashSync(password, 10)

//     const new_user = {
//         guid,
//         email,
//         password: passwordHash,
//         phone,
//         first_name,
//         last_name
//     }

//     const keys = Object.keys(new_user)
//     const values = Object.values(new_user)

//     // const { success, data, error } = await query.new_user(new_user.guid,new_user.email, new_user.password, new_user.phone, new_user.first_name, new_user.last_name);
//     const { success, data, error } = await query.new_user(keys, values);
 
//     if (success) {
//         res.send(data)
//     } else {
//         res.send(error)
//     }
// })

router.get('/login', async(req,res) => {
    res.render('index/login.ejs', {
        title: "Iniciar sesión"
    })
})

router.post('/auth/login', async (req,res) => {
    const { email:bodyEmail, password:bodyPassword } = req.body;
    console.log(bodyEmail, bodyPassword)

    const { success, data:user, error } = await query.search_user(bodyEmail);

    console.log(user)

    if(success){
        if(!compareSync(bodyPassword, user[0].password)){
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

        const token = jwt.sign(payload, "Mega secret", { expiresIn: "1d"});

        res.cookie('jwt', token);

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


/* GET users listing. */
router.get('/', main_controller.profile);



module.exports = router;
