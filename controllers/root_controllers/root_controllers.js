class Main {
    static index(req, res){
        res.render('./index',{
            title: 'Bouvier Artesanal'
        })
    }
};

module.exports = Main;