const User_model = require('../../models/users/UserManagment_model')

class User {
    static async index(req, res){
        const {
            success,
            data,
            error
        } = await User_model.search_user_by_guid(req.user[0].guid);
        if (success) {
            console.log(req.user)
            res.send({
                "message": "Done",
                data
            })
        } else {
            res.send(error)
        }
    }

};

module.exports = User;