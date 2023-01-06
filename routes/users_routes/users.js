var express = require('express');
var router = express.Router();

//** controllers */
const main_controller = require('../../controllers/users_controllers/main_controller')

const query = require('../../models/users/UserManagment_model')
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { v4: uuidv4 } = require('uuid')

router.use(passport.initialize());

require('../../middlewares/auth');

router.get('/', async (req ,res) => {
    const { success, data, error } = await query.users_list()
    if(success){
        res.send(data)
    } else {
        res.send(error)
    }
})


//     const { email:BodyEmail, password:bodyPassowrd } = req.body;

//     const { success, data:user, error } = await query.search_user(BodyEmail);
//     console.log(user)

//     if(success){
//         if(!compareSync(bodyPassowrd, user[0].password)){
//             return res.status(401).send({
//                 message: 'Incorrect password'
//             });
//         }

//         const payload = {
//             email: user[0].email,
//             id: user[0].id
//         };
//         console.log(user[0].email);
//         console.log(user[0].id)

//         console.log(`This is the payload: ${payload}`)

//         const token = jwt.sign(payload, "Mega secret", { expiresIn: "1d"})

//         return res.status(200).send({
//             success: true,
//             message: 'Logged in successfully',
//             token: `Bearer ${token}`
//         })

//     } else {
//         console.log(error)
//         res.sendStatus(404)
//     }
// });

router.get('/profile', passport.authenticate('jwt', {session : false}),async(req,res) =>{

})



/* GET users listing. */
router.get('/', main_controller.profile);



module.exports = router;
