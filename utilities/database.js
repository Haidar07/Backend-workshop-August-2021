const {Sequelize} = require("sequelize")

module.exports = new Sequelize('back-end', 'root', '@Jawad/Adchit', {
    host: 'localhost',
    dialect: 'mysql', 
});

