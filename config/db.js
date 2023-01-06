require('dotenv').config()

const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
})

function query(sql,data){
    return new Promise(function (resolve,reject){
        connection.query(sql,data,function(error,result,fields){
            if(error!=null){
                console.log(error)
    
                return reject({
                    error:true,
                    message:error.sqlMessage
                })
            }else{
                return resolve(result, fields)
            }
        })
    })
}

connection.connect (
    (err)=>{
        if(!err){
            console.log('Conexion establecida')
        } else {
            console.log('Error de conexion',err)
        }
    }
);

module.exports = {
    connection,
    query
}