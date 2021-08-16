const { Sequelize, DataTypes} = require('sequelize');
const db = require("../utilities/database"); 

const Hobby = db.define('Hobbies', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }, 
  title: DataTypes.STRING,
  imgUrl: DataTypes.STRING,
  description: DataTypes.STRING,
  },
  { freezeTableName: true, })


module.exports = Hobby; 
