// const fs = require("fs");
// const path = require("path");

const { Sequelize, DataTypes} = require('sequelize');
const db = require("../utilities/database"); 
const bcrypt = require('bcrypt'); 

// const filePath = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "data.json"
// );

// const getUsersFromFiles = (callBack) => {
//   fs.readFile(filePath, (err, fileContenet) => {
//     if (err) {
//       callBack([]);
//     } else {
//       callBack(JSON.parse(fileContenet));
//     }
//   });
// };

const User = db.define('mytable', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }, 
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  firstname:DataTypes.STRING,
  lastname:DataTypes.STRING,
  }, { freezeTableName: true, })

User.beforeCreate((user)=> {
  return bcrypt.hash(user.password, 10).then(hash => {
    user.password = hash;
  }).catch( err => {throw new Error(err)})
})

module.exports = User; 

// module.exports = class User {
//   constructor(id, firstname, lastname, email, password) {
//     this.id = id;
//     this.firstname = firstname;
//     this.lastname = lastname;
//     this.password = password;
//     this.email = email;
//   }
//   save() {
//     return db.execute(
//       'INSERT INTO mytable (firstname, lastname, email, password) VALUES(?, ?, ?, ?)',
//       [this.firstname, this.lastname, this.email, this.password])
//   }
//   static fetchUsers(callBack) {
//     return db.execute(
//       'SELECT * FROM mytable'
//     )
//   }

//   static singIn(email, password, callBack) {
//     getUsersFromFiles((users) => {
//       const user = mytable.find(   // built-in method in js called find 
//         (user) => user.email === email && user.password === password
//       );
//       callBack(user);
//     });
//   }
// }; 



