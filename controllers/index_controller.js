const query = require('../models/users/UserManagment_model')
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

class Index {
    static async index(req ,res){
        res.send({"message":"Welcome to Bouvier Artesanal"})
    };

    static async login(req,res) {
        res.render('index/login.ejs', {
            title: "Iniciar sesión"
        })
    }

    static async login_post(req,res){
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
                token: `Bearer ${token}`,
                link: 'You can access to your profile: https://localhost:3000/perfil'            
            })
    
        } else {
            console.log(error)
            res.sendStatus(404)
        }
    }

    static async logout(req,res){
        res.clearCookie('jwt');
        res.redirect('/')
    }
};

module.exports = Index;