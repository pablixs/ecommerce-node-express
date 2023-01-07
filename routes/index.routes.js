var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser');

//** controllers */
const index_controller = require('../controllers/index_controller');

router.use(cookieParser())

router.get('/', index_controller.index);

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

router.get('/login', index_controller.login);

router.post('/auth/login', index_controller.login_post);

router.get('/auth/logout', index_controller.logout);


/* GET users listing. */
// router.get('/', main_controller.profile);



module.exports = router;
