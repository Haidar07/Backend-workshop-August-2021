const mysql = require("mysql2")
const {Sequelize} = require("sequelize")

module.exports = new Sequelize('back-end', 'root', '@Jawad/Adchit', {
    host: 'localhost',
    dialect: 'mysql', 
});

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     database: "back-end",
//     password: "@Jawad/Adchit",
// })
// module.exports = pool.promise(); 


