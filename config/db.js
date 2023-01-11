require('dotenv').config()

const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
})

function query(sql,data){
    return new Promise(function (resolve,reject){
        pool.query(sql,data,function(error,result,fields){
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

pool.getConnection((err,connection) => {
    if(!err){
        console.log('Conexion establecida');
        connection.release();
    } else {
        console.log(`Error al establecer conexión: ${err}`)
    }
})



module.exports = {
    query
}