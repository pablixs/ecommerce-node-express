const User_model = require('../models/users/UserManagment_model');
const Product_model = require('../models/products/Products');
const {
    hashSync,
    compareSync
} = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid')


class Index {
    static async index(req, res) {
        try {
            const { success,data: categories,error } = await Product_model.get_categories();
            const { success: success_two, data: some_products, error: error_two } = await Product_model.get_randoms_products(6)
            // res.send({"message":"Welcome to Bouvier Artesanal"})
            if (success && success_two) {
                res.render('./index/index.ejs', {
                    title: "Bouvier Artesanal - Cosmética Natural",
                    categories,
                    some_products,
                })
            } else {
                res.status(404).send(error)
            }
        } catch (error) {
            console.log(error)
            res.status(404).send(error)
        }
    };

    static async login(req, res) {
        res.render('index/login.ejs', {
            title: "Iniciar sesión - Bouvier Artesanal"
        })
    }

    static async register(req, res) {
        res.render('./index/register',{
            title: "Registrarme - Bouvier Artesanal"
        })
    }

    static async register_post(req, res) {
        const { email, password, phone, first_name, last_name } = req.body;
    
        const guid = uuidv4();
    
        console.log(email, password);
    
        const passwordHash = hashSync(password, 10)
    
        const new_user = {
            guid,
            email,
            password: passwordHash,
            phone,
            first_name,
            last_name
        }
    
        const keys = Object.keys(new_user)
        const values = Object.values(new_user)
    
        const { success, data, error } = await User_model.new_user(keys, values);
        
        if (success) {
            res.redirect('./login')
        } else {
            res.send(error)
        }
    }

    static async login_post(req, res) {
        const {
            email: bodyEmail,
            password: bodyPassword
        } = req.body;
        console.log(bodyEmail, bodyPassword)

        const {
            success,
            data: user,
            error
        } = await User_model.search_user(bodyEmail);

        console.log(user)

        if (success) {
            if (!compareSync(bodyPassword, user[0].password)) {
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

            const token = jwt.sign(payload, "Mega secret", {
                expiresIn: "30d"
            });

            res.cookie('jwt', token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict'
            });

            return res.status(200).send({
                success: true,
                message: 'Logged in successfully',
                token: `Bearer ${token}`,
                link: 'You can access to your profile: https://localhost:3000/perfil'
            })

        } else {
            console.log(error)
            res.sendStatus(404)
        }
    }

    static async logout(req, res) {
        res.clearCookie('jwt');
        res.redirect('/')
    }
};

module.exports = Index;