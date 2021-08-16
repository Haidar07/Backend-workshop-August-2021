const User = require("../models/user");
// const path = require("path")

exports.getUsers = async (req, res, next) => {
  const users = await User.findAll()
  console.log(req.user) 
  res.send(users); 
  }

// exports.getAddUser = (req, res, next) => {
//  res.status(201).json("add-user.ejs");
// };

// exports.postAddUser = (req, res, next) => {
//   console.log(req.body);
//   const firstname = req.body.firstname;
//   const lastname = req.body.lastname;
//   const email = req.body.email;
//   const password = req.body.password; 
//   const user = new User(null, firstname,lastname, email, password);
//   user.save();
//   console.log(user);
//   res.redirect("/"); }

exports.postSignUp = async (req, res, next) => {
  console.log(req.body);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password; 
  const user = User.build({firstname, lastname, email, password});
  console.log(user.firstname)
  try{
    await user.save()
    res.send(user)
  }catch(err){
    res.status(400).send(err)
  }
}; 

exports.postSignIn = async (req, res, next) => { 
    
    req.session.user = req.user; 
    console.log(req.user)
    console.log(" I am Signed In ")
    res.send(req.user);
}
