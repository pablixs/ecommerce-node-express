class Main {
    static profile(req, res){
        res.render('./users_view/profile',{
            title: 'Perfil'
          })
    }
};

module.exports = Main;